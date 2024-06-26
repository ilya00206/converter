import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CONTENT_SKIP_LINK } from '@ui/skip-link/skip-links';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct contentSkipLinkId', () => {
    const contentSkipLinkId = component.contentSkipLinkId;
    expect(contentSkipLinkId).toBe(CONTENT_SKIP_LINK.id);
  });

  it('should render a div with the contentSkipLinkId', () => {
    const divElement = fixture.debugElement.query(By.css(`div#${component.contentSkipLinkId}`));
    expect(divElement).toBeTruthy();
  });

  it('should render a main element with class container and main-content', () => {
    const mainElement = fixture.debugElement.query(By.css('main.container.main-content'));
    expect(mainElement).toBeTruthy();
  });
});
