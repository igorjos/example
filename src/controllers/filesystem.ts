import { FileSystemService } from "../services/filesystem";
import qs from 'qs';

/*TODO Custom decorators for verification  */
export class FileSystemController
{
    private _fss: FileSystemService = new FileSystemService();

    constructor() { }

    async getCurrentFiles(query: qs.ParsedQs | qs.ParsedQs[] | string | string[] | [key: string])
    {
        return await this._fss.getAll(query);
    }
}