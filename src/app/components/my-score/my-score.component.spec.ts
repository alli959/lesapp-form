import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScoreComponent } from './my-score.component';

describe('MyScoreComponent', () => {
  let component: MyScoreComponent;
  let fixture: ComponentFixture<MyScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
