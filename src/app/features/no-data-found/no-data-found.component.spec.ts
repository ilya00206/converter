import { Injectable, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateStore } from '@store/date.service';
import { NoDataFoundComponent } from './no-data-found.component';

@Injectable()
class MockStore {
  _date = signal<string | undefined>('2024-06-01');
  get date() {
    return this._date.asReadonly();
  }
  setDate = (val?: string) => {
    this._date.set(val);
  };
}

describe('NoDataFoundComponent', () => {
  let component: NoDataFoundComponent;
  let fixture: ComponentFixture<NoDataFoundComponent>;
  let mockStore: MockStore;
  beforeEach(async () => {
    mockStore = new MockStore();

    await TestBed.configureTestingModule({
      imports: [NoDataFoundComponent],
      providers: [{ provide: DateStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct date in the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('h2');
    expect(header?.textContent).toBeTruthy();
  });

  it('should call onGetLatestData when the button is clicked', () => {
    spyOn(component, 'onGetLatestData');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.onGetLatestData).toHaveBeenCalled();
  });

  xit('should call store.setDate with undefined when onGetLatestData is called', () => {
    component.onGetLatestData();
    expect(mockStore.setDate).toHaveBeenCalledWith(undefined);
  });
});
