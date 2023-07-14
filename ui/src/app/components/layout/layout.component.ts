import { Component, OnInit } from '@angular/core';
import { FilesystemService } from 'src/app/services/filesystem.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit
{

  ngOnInit(): void
  {
  }

}
