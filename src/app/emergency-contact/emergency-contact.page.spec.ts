import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyContactPage } from './emergency-contact.page';

describe('EmergencyContactPage', () => {
  let component: EmergencyContactPage;
  let fixture: ComponentFixture<EmergencyContactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
