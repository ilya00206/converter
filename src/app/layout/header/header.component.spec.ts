import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SkipLinkComponent } from '@ui/skip-link/skip-link.component';
import { SKIP_LINKS } from '@ui/skip-link/skip-links';
import { HeaderComponent } from './header.component';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl);
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SkipLinkComponent, HeaderComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render skip links', () => {
    fixture.detectChanges();
    const skipLinkElements = fixture.debugElement.queryAll(By.directive(SkipLinkComponent));
    expect(skipLinkElements.length).toBe(SKIP_LINKS.length);
  });

  it('should render the app name', () => {
    const titleElement = fixture.debugElement.query(By.css('.app-name'));
    expect(titleElement.nativeElement.textContent).toBeTruthy();
  });

  it('should render the date input element', () => {
    const inputElement = fixture.debugElement.query(By.css('input[type="date"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should render the confirm date button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button.primary'));
    expect(buttonElement.nativeElement.textContent).toBe('Zatwierdź datę');
  });
});
