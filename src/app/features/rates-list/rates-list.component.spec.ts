import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NBPTableResponse } from '@models/index';
import { CardComponent } from '@ui/card/card.component';
import { RatesListComponent } from './rates-list.component';

describe('RatesListComponent', () => {
  let component: RatesListComponent;
  let fixture: ComponentFixture<RatesListComponent>;

  const mockResponse: NBPTableResponse = {
    table: 'A',
    no: '123/A/NBP/2024',
    effectiveDate: '2024-01-01',
    rates: [
      { currency: 'Dollar', code: 'USD', mid: 3.9 },
      { currency: 'Euro', code: 'EUR', mid: 4.5 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatesListComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatesListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('response', mockResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have caption', () => {
    const captionElement = fixture.debugElement.query(By.css('caption')).nativeElement;
    expect(captionElement.textContent).toBeTruthy();
  });

  it('should render the exchange rates correctly', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockResponse.rates.length);

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toBe(mockResponse.rates[0].currency);
    expect(firstRowCells[1].nativeElement.textContent).toBe(mockResponse.rates[0].code);
    expect(firstRowCells[2].nativeElement.textContent).toBe('3.9000');

    const secondRowCells = rows[1].queryAll(By.css('td'));
    expect(secondRowCells[0].nativeElement.textContent).toBe(mockResponse.rates[1].currency);
    expect(secondRowCells[1].nativeElement.textContent).toBe(mockResponse.rates[1].code);
    expect(secondRowCells[2].nativeElement.textContent).toBe('4.5000');
  });
});
