import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPathsComponent } from './search-paths.component';

describe('SearchPathsComponent', () => {
  let component: SearchPathsComponent;
  let fixture: ComponentFixture<SearchPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
