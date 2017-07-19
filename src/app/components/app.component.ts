import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <section class="fluid-container">
            <app-header></app-header>
            <router-outlet></router-outlet>
        </section>
    `,
    styleUrls: ['./app.component.css']
})

export class AppComponent {}
