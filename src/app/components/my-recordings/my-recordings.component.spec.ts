import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecordingsComponent } from './my-recordings.component';

describe('MyRecordingsComponent', () => {
  let component: MyRecordingsComponent;
  let fixture: ComponentFixture<MyRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecordingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
