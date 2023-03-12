import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarAnnotatedComponentExampleStackComponent } from './snackbar-annotated-component-example-stack.component';

describe('SnackbarAnnotatedComponentExampleStackComponent', () => {
  let component: SnackbarAnnotatedComponentExampleStackComponent;
  let fixture: ComponentFixture<SnackbarAnnotatedComponentExampleStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarAnnotatedComponentExampleStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarAnnotatedComponentExampleStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
