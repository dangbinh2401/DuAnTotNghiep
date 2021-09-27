import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerUpdateComponent } from './custommer-update.component';

describe('CustommerUpdateComponent', () => {
  let component: CustommerUpdateComponent;
  let fixture: ComponentFixture<CustommerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
