import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMembersComponent } from './home-members.component';

describe('HomeMembersComponent', () => {
  let component: HomeMembersComponent;
  let fixture: ComponentFixture<HomeMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
