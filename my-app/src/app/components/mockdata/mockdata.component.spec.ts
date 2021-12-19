import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockdataComponent } from './mockdata.component';

describe('MockdataComponent', () => {
  let component: MockdataComponent;
  let fixture: ComponentFixture<MockdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
