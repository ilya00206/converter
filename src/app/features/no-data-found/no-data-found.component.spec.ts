import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataFoundComponent } from './no-data-found.component';

import { DateStore } from '@store/date.service';

describe('NoDataFoundComponent', () => {
  let component: NoDataFoundComponent;
  let fixture: ComponentFixture<NoDataFoundComponent>;

  let dateStoreMock: jasmine.SpyObj<DateStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataFoundComponent],
      providers: [
        {
          provide: DateStore,
          useValue: {
            date: () => undefined,
            setDate: jasmine.createSpy('setDate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataFoundComponent);
    dateStoreMock = TestBed.inject(DateStore) as jasmine.SpyObj<DateStore>;
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default message when date is undefined', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'Nie znaleziono danych'
    );
  });

  it('should call setDate with undefined when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(dateStoreMock.setDate).toHaveBeenCalledWith(undefined);
  });
});
