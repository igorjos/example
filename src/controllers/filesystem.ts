import { FileSystemService } from "../services/filesystem";

/*TODO Custom decorators for verification  */
export class FileSystemController
{
    private _fss: FileSystemService = new FileSystemService();

    constructor() { }

    async getCurrentFiles()
    {
        return await this._fss.getAll();
    }
}