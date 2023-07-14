import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirPathsComponent } from './dir-paths.component';

describe('DirPathsComponent', () => {
  let component: DirPathsComponent;
  let fixture: ComponentFixture<DirPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirPathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
