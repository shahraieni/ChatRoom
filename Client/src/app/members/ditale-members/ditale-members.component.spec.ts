import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitaleMembersComponent } from './ditale-members.component';

describe('DitaleMembersComponent', () => {
  let component: DitaleMembersComponent;
  let fixture: ComponentFixture<DitaleMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DitaleMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DitaleMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
