import { File } from 'buffer';
import * as fs from 'fs';
import * as path from 'path';
import QueryString from 'qs';

export interface iDirContents extends fs.Dirent
{
    is_file: boolean,
    children?: any
}

export interface iFileImports
{
    file_path: string,
    file_name: string,
    imports?: iFileContents
}

export interface iFileContents
{
    contents?: Array<iFileImports> | undefined,
    status: boolean
}

export class FileSystemService
{

    private default_path: Array<string | undefined> = [process.env.PWD, process.env.FILES_PATH];

    //Read a directory with all files and subdirectories
    private async _readDirRecursive(filepath: string, filename?: string) 
    {
        const options: any = { encoding: 'utf8', withFileTypes: true };
        let dirs: Array<iDirContents> = fs.readdirSync(filepath, options) as Array<any>;

        if (dirs.length)
            //Using a for loop, because for loop can work with async/await
            for (let i = 0; i < dirs.length; i++)
                if (!dirs[i].isFile())
                    dirs[i].children = await this._readDirRecursive([filepath, dirs[i].name].join(path.sep), filename)

        //Return array of objects without special properties (methods) attached to them
        return dirs.map((item) =>
        {
            return { name: item.name, is_file: item.isFile(), children: item?.children }
        }).filter((item) =>
        {
            //If specific file is requested, then return folder structure with that file present
            if (filename)
                return (item.name === filename && item.is_file) || !item.is_file
            //If not return everything
            return true;
        })
    }

    private _getImports(full_path: string, imports: Array<string>)
    {
        //Current path of the file that needs to be checked
        const current_path = full_path
            .replace(this.default_path.join(path.sep), "")
            .replace(/^\//, "")
            .split(path.sep);

        current_path.pop(); //remove last item (the current file);

        const files: Array<any> = [];

        for (let i = 0; i < imports.length; i++)
        {
            const import_path: string = imports[i]
                .trim()
                .replace(/import /ig, "")
                .replace(/;/g, "")
                .replace(/.\//, "");

            //Check does import (line) within the current file is an existing file and its contents
            const file: iFileContents = this._findFile([...current_path, import_path].join(path.sep));

            const data: iFileImports = {
                file_path: current_path.join(path.sep),
                file_name: import_path,
                imports: undefined
            };

            if (file)
                data.imports = file;

            files.push(data);
        }

        return files;
    }

    /*
        Method used to parse file contents.
    */
    private _parseFileContents(system_path: string, file: undefined | string)
    {
        if (!file)
            return undefined;

        const imports: Array<string> = file
            .split(/\r\n/igm)
            .filter((line: string) => line.match(/import.*;/i))

        if (!imports.length)
            return [];

        const data = this._getImports(system_path, imports)

        return data
    }

    /*
        Check file before reading and if existing return its contents as Buffer<string>
    */
    private _readFile(filepath: string): Buffer | string | undefined
    {
        //Remove unnecessary spaces before/after in filepath. not using trim, because it might have multiple spaces at end of filepath, which trim doesn't cutoff
        filepath = filepath.replace(/ /gm, "");
        const file: Buffer | string | undefined = fs.existsSync(filepath) ?
            fs.readFileSync(filepath, { encoding: 'utf-8' }) : undefined;

        return file;
    }

    /* 
        Method used to look for a file in a filesystem and modified to work only with  .prod files
    */
    private _findFile(filepath: string)
    {
        const file_path_items: Array<string> = filepath.split(/\/|\\/);
        //Update the path to match the current OS win or unix
        const system_path: string = [...this.default_path, ...file_path_items].join(path.sep);

        const file: Buffer | string | undefined = this._readFile(system_path)
        return { status: file ? true : false, contents: this._parseFileContents(system_path, file?.toString()) }
    }

    /*
        Get All files in the system directory where .prog files should be kept.
    */
    async getAll(query: QueryString.ParsedQs | QueryString.ParsedQs[] | string | string[] | [key: string])
    {
        //@ts-ignore
        return await this._readDirRecursive(this.default_path.join(path.sep), query['filename' as key])
    }

    /*
       Look for prog file by provided path and open it for reading.
       Return all its imports
   */
    async getSingleFileByPath(path: string)
    {
        return this._findFile(path);
    }
}