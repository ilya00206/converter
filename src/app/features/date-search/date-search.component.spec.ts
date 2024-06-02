import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateSearchComponent } from './date-search.component';

import { DateStore } from '@store/date.service';

describe('DateSearchComponent', () => {
  let component: DateSearchComponent;
  let fixture: ComponentFixture<DateSearchComponent>;
  let dateStoreMock: jasmine.SpyObj<DateStore>;

  const mockDate = '2024-06-02';

  beforeEach(async () => {
    const mockStore = {
      date: jasmine.createSpy().and.returnValue('2024-06-01'),
      setDate: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [DateSearchComponent],
      providers: [{ provide: DateStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(DateSearchComponent);
    dateStoreMock = TestBed.inject(DateStore) as jasmine.SpyObj<DateStore>;
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize maxDate with today's date", () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.maxDate).toBe(today);
  });

  it('should update store on form submit', async () => {
    component.selectedDate.set(mockDate);
    await fixture.whenStable();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(dateStoreMock.setDate).toHaveBeenCalledWith(mockDate);
  });

  it('should bind maxDate to input element', () => {
    const input = fixture.debugElement.query(By.css('input[type="date"]')).nativeElement;
    const today = new Date().toISOString().split('T')[0];

    expect(input.max).toBe(today);
  });

  it('should bind selectedDate to input element', async () => {
    component.selectedDate.set(mockDate);
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.css('input[type="date"]')).nativeElement;
    expect(input.value).toBe(mockDate);
  });
});
