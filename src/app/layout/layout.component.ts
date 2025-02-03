import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [MainComponent, HeaderComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
