import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartboardComponent } from './startboard.component';

describe('GameboardComponent', () => {
  let component: StartboardComponent;
  let fixture: ComponentFixture<StartboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
