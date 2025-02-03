import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlComponent } from './form-control.component';

@Component({
    template: `
    <app-form-control [id]="'testId'" [label]="'Test Label'">
      <input id="testId" />
    </app-form-control>
  `,
    imports: [FormControlComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestHostComponent {}

describe('FormControlComponent', () => {
  let component: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    component = hostFixture.componentInstance;
    await hostFixture.whenStable();
  });

  it('should create the TestHostComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should project content correctly', () => {
    const inputElement = hostFixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement?.id).toBe('testId');
  });

  it('should display the label correctly', () => {
    const labelElement = hostFixture.nativeElement.querySelector('label');
    expect(labelElement).toBeTruthy();
    expect(labelElement?.textContent).toBe('Test Label');
  });

  it('should bind the label to the input id', () => {
    const labelElement = hostFixture.nativeElement.querySelector('label');
    const inputElement = hostFixture.nativeElement.querySelector('input');
    expect(labelElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
    expect(labelElement?.getAttribute('for')).toBe(inputElement?.id);
  });
});
