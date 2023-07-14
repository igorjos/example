export interface iDirStructure
{
    is_file: boolean,
    name: string,
    children?: Array<iDirStructure>
}

export interface iSearchPathResult
{
    contents?: iSearchArrayItem[],
    status: boolean
}

export interface iSearchArrayItem
{
    file_name: string
    file_path: string
    imports?: iSearchArrayItem
}