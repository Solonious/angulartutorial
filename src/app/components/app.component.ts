import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <section class="container-fluid">
                <!--<app-header></app-header>-->
                <!--<nav>-->
                <!--<a routerLink="/test" routerLinkActive="active">test</a>-->
                <!--</nav>-->
                <router-outlet></router-outlet>
        </section>
    `,
    styleUrls: ['./app.component.css']
})

export class AppComponent {}
