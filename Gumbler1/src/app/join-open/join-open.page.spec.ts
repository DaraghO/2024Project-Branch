import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinOpenPage } from './join-open.page';

describe('JoinOpenPage', () => {
  let component: JoinOpenPage;
  let fixture: ComponentFixture<JoinOpenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
