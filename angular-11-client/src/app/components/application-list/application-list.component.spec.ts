import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsListComponent } from './application-list.component';

describe('ApplicationsListComponent', () => {
  let component: ApplicationsListComponent;
  let fixture: ComponentFixture<ApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
