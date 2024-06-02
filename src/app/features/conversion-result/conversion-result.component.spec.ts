import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversionResultComponent } from './conversion-result.component';

describe('ConversionResultComponent', () => {
  let hostFixture: ComponentFixture<ConversionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionResultComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(ConversionResultComponent);
    hostFixture.componentRef.setInput('result', {});
  });

  it('should create the ConversionResultComponent', () => {
    expect(hostFixture.componentInstance).toBeTruthy();
  });

  it('should display the conversion result correctly', () => {
    const conversionResultElement = hostFixture.nativeElement.querySelector('.conversion-result');
    expect(conversionResultElement).toBeTruthy();
  });

  it('should display the header correctly', () => {
    const headerElement = hostFixture.nativeElement.querySelector('h2[card-header]');
    expect(headerElement).toBeTruthy();
  });
});
