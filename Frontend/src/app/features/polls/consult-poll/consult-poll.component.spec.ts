import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultPollComponent } from './consult-poll.component';

describe('ConsultPollComponent', () => {
  let component: ConsultPollComponent;
  let fixture: ComponentFixture<ConsultPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultPollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
