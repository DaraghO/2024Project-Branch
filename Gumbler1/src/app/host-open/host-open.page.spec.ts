import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostOpenPage } from './host-open.page';

describe('HostOpenPage', () => {
  let component: HostOpenPage;
  let fixture: ComponentFixture<HostOpenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostOpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
