import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDasboardComponent } from './admin-dasboard.component';

describe('AdminDasboardComponent', () => {
  let component: AdminDasboardComponent;
  let fixture: ComponentFixture<AdminDasboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDasboardComponent]
    });
    fixture = TestBed.createComponent(AdminDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
