import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlComponent } from './form-control.component';

@Component({
  template: `
    <app-form-control id="testId" label="Test Label">
      <input id="testId" />
    </app-form-control>
  `,
  standalone: true,
  imports: [FormControlComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('FormControlComponent', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create the FormControlComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label correctly', () => {
    const compiled = hostFixture.nativeElement as HTMLElement;
    const labelElement = compiled.querySelector('label');
    expect(labelElement).toBeTruthy();
    expect(labelElement?.textContent).toBe('Test Label');
  });

  it('should bind the label to the input id', () => {
    const compiled = hostFixture.nativeElement as HTMLElement;
    const labelElement = compiled.querySelector('label');
    const inputElement = compiled.querySelector('input');
    expect(labelElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
    expect(labelElement?.getAttribute('for')).toBe(inputElement?.id);
  });

  it('should project content correctly', () => {
    const compiled = hostFixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement?.id).toBe('testId');
  });
});
