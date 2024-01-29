import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsZoneComponent } from './friends-zone.component';

describe('FriendsZoneComponent', () => {
  let component: FriendsZoneComponent;
  let fixture: ComponentFixture<FriendsZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsZoneComponent]
    });
    fixture = TestBed.createComponent(FriendsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
