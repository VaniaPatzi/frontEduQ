import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItinerarioComponent } from './show-itinerario.component';

describe('ShowItinerarioComponent', () => {
  let component: ShowItinerarioComponent;
  let fixture: ComponentFixture<ShowItinerarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowItinerarioComponent]
    });
    fixture = TestBed.createComponent(ShowItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
