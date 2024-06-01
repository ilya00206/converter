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
    hostFixture.detectChanges();
  });

  it('should create the ConversionResultComponent', () => {
    expect(hostFixture.componentInstance).toBeTruthy();
  });

  it('should display the conversion result correctly', () => {
    const compiled = hostFixture.nativeElement as HTMLElement;
    const conversionResultElement = compiled.querySelector('.conversion-result');
    expect(conversionResultElement).toBeTruthy();
  });

  it('should display the header correctly', () => {
    const compiled = hostFixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('h2[card-header]');
    expect(headerElement).toBeTruthy();
  });
});
