import * as fs from 'fs';
import * as path from 'path';
import QueryString from 'qs';

export interface iDirContents extends fs.Dirent
{
    is_file: boolean,
    children?: any
}

export class FileSystemService
{
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

    async getAll(query: QueryString.ParsedQs | QueryString.ParsedQs[] | string | string[] | [key: string])
    {
        //@ts-ignore
        return await this._readDirRecursive([process.env.PWD, process.env.FILES_PATH].join(path.sep), query['filename' as key])
    }
}