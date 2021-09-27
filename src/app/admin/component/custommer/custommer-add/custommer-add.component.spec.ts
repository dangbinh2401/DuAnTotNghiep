import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerAddComponent } from './custommer-add.component';

describe('CustommerAddComponent', () => {
  let component: CustommerAddComponent;
  let fixture: ComponentFixture<CustommerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
