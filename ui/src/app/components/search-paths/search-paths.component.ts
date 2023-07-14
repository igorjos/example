import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { iSearchPathResult } from 'src/app/interfaces/common';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-search-paths',
  templateUrl: './search-paths.component.html',
  styleUrls: ['./search-paths.component.less']
})
export class SearchPathsComponent implements OnInit
{

  loading: boolean = false;
  imports: iSearchPathResult | undefined = undefined;

  constructor(
    private _fs: FilesystemService
  ) { }

  ngOnInit(): void { }

  makeSearch(f: NgForm)
  {
    if (!f.valid)
    {
      console.log('form not valid, various ways to inform the client on UI')
      return false;
    }

    this.loading = true;

    this._fs.getFileByPath(f.value.path).pipe(take(1)).subscribe((data) =>
    {
      this.imports = data;
      this.loading = false;
    }, () =>
    {
      this.loading = false
    })

    return false; //Prevent screen from refreshing
  }
}
