import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { iDirStructure } from '../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService
{

  constructor(
    private _http: HttpClient
  ) { }


  getCurrentFilesystem(): Observable<iDirStructure[]>
  {
    return this._http.get<iDirStructure[]>([environment.apiURL, 'filesystem'].join("/"))
  }

  getFileByPath(path: string): Observable<any>
  {
    return this._http.post([environment.apiURL, 'filesystem'].join("/"), { path })
  }
}
