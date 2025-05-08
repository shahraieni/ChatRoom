import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMemberComponent } from './detail-member.component';

describe('DetailMemberComponent', () => {
  let component: DetailMemberComponent;
  let fixture: ComponentFixture<DetailMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMemberComponent]
    });
    fixture = TestBed.createComponent(DetailMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
