import * as fs from 'fs';
import * as path from 'path';

export interface iDirContents extends fs.Dirent
{
    is_file: boolean,
    children?: any
}

export class FileSystemService
{
    //Read a directory with all files and subdirectories
    private async _readDirRecursive(filepath: string) 
    {
        const options: any = { encoding: 'utf8', withFileTypes: true };
        let dirs: Array<iDirContents> = fs.readdirSync(filepath, options) as Array<any>;

        if (dirs.length)
            //Using a for loop, because for loop can work with async/await
            for (let i = 0; i < dirs.length; i++)
                if (!dirs[i].isFile())
                    dirs[i].children = await this._readDirRecursive([filepath, dirs[i].name].join(path.sep))

        //Return array of objects without special properties (methods) attached to them
        return dirs.map((item) =>
        {
            return { name: item.name, is_file: item.isFile(), children: item?.children }
        })
    }

    async getAll()
    {
        return await this._readDirRecursive([process.env.PWD, process.env.FILES_PATH].join(path.sep))
    }
}