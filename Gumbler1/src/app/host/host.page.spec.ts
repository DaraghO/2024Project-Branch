import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostPage } from './host.page';

describe('HostPage', () => {
  let component: HostPage;
  let fixture: ComponentFixture<HostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
