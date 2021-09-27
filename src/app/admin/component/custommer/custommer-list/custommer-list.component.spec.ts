import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerListComponent } from './custommer-list.component';

describe('CustommerListComponent', () => {
  let component: CustommerListComponent;
  let fixture: ComponentFixture<CustommerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
