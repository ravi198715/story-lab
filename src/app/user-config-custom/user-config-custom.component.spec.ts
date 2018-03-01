import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigCustomComponent } from './user-config-custom.component';

describe('UserConfigCustomComponent', () => {
  let component: UserConfigCustomComponent;
  let fixture: ComponentFixture<UserConfigCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
