import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipLinkComponent } from './skip-link.component';
import { By } from '@angular/platform-browser';

describe('SkipLinkComponent', () => {
  let component: SkipLinkComponent;
  let fixture: ComponentFixture<SkipLinkComponent>;
  let document: Document;

  const mockId = 'test-id';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkipLinkComponent);
    component = fixture.componentInstance;
    document = TestBed.inject(DOCUMENT);

    fixture.componentRef.setInput('skipLink', { id: mockId, label: 'Skip to main content' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call scrollAuto on click', () => {
    spyOn(component, 'scrollAuto');

    const link = fixture.debugElement.query(By.css('.skip-link'));
    link.triggerEventHandler('click', new Event('click'));

    expect(component.scrollAuto).toHaveBeenCalled();
  });

  it('should focus the target element on scrollAuto call', () => {
    const targetElement = document.createElement('div');
    targetElement.id = mockId;
    document.body.appendChild(targetElement);

    const event = new Event('click');
    spyOn(event, 'preventDefault');
    component.scrollAuto(event, mockId);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(targetElement.getAttribute('tabindex')).toBe('-1');
    expect(document.activeElement).toBe(targetElement);

    document.body.removeChild(targetElement);
  });

  it('should not focus the target element if it does not exist', () => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');
    spyOn(document, 'querySelector').and.returnValue(null);

    component.scrollAuto(event, 'non-existent-id');

    expect(event.preventDefault).toHaveBeenCalled();
    expect(document.querySelector).toHaveBeenCalledWith('#non-existent-id');
  });
});
