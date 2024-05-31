import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';

import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MainComponent, LayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create the layout component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a header component', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerComponent).not.toBeNull();
  });

  it('should contain a main component', () => {
    const mainComponent = fixture.debugElement.query(By.directive(MainComponent));
    expect(mainComponent).not.toBeNull();
  });

  it('should contain a router-outlet inside the main component', () => {
    const mainComponent = fixture.debugElement.query(By.directive(MainComponent));
    const routerOutlet = mainComponent.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});
