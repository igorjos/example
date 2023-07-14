import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-dir-paths',
  templateUrl: './dir-paths.component.html',
  styleUrls: ['./dir-paths.component.less']
})
export class DirPathsComponent implements OnInit
{

  paths: Array<any> = [];

  existingFilePaths$ = this._fs.getCurrentFilesystem().pipe(take(1)).subscribe((data) =>
  {
    this.paths = data;
    console.log(data)
  })

  constructor(
    private _fs: FilesystemService
  ) { }

  ngOnInit(): void
  {
  }

  ngOnDestroy()
  {
    this.existingFilePaths$.unsubscribe()
  }

}
