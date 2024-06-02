import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencySelectComponent } from './currency-select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('CurrencySelectComponent', () => {
  let component: CurrencySelectComponent;
  let fixture: ComponentFixture<CurrencySelectComponent>;
  const mockValue = 'PLN';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencySelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'test');
    fixture.componentRef.setInput('options', []);
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register onChange function', () => {
    const onChangeFn = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeFn);
    component.onChange(mockValue);
    expect(onChangeFn).toHaveBeenCalledWith(mockValue);
  });

  it('should register onTouched function', () => {
    const onTouchedFn = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedFn);
    component.onTouched();
    expect(onTouchedFn).toHaveBeenCalled();
  });

  it('should call onTouched on blur', () => {
    const onTouchedFn = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedFn);
    component.onBlur();
    expect(onTouchedFn).toHaveBeenCalled();
  });

  it('should write value', () => {
    component.writeValue(mockValue);
    expect(component.value()).toBe(mockValue);
  });

  it('should change value and call onChange', () => {
    const onChangeFn = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeFn);
    component.valueChanged(mockValue);
    expect(onChangeFn).toHaveBeenCalledWith(mockValue);
    expect(component.value()).toBe(mockValue);
  });
});
