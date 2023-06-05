import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalidasComponent } from './view-salidas.component';

describe('ViewSalidasComponent', () => {
  let component: ViewSalidasComponent;
  let fixture: ComponentFixture<ViewSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSalidasComponent]
    });
    fixture = TestBed.createComponent(ViewSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
