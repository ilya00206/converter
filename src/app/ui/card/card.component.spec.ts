import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

@Component({
  template: `
    <app-card>
      <div card-header>Test Header</div>
      <div card-body>Test Body</div>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
  });

  it('should create the host component', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should project the card-header content', () => {
    const headerEl = fixture.debugElement.nativeElement;
    expect(headerEl.textContent.trim()).toContain('Test Header');
  });

  it('should project the card-body content', () => {
    const bodyEl = fixture.debugElement.nativeElement;
    expect(bodyEl.textContent.trim()).toContain('Test Body');
  });
});
