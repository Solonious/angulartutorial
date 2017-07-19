import { Component } from '@angular/core';

import { Widget } from '../../models/widget';

@Component({
    selector: 'app-test-page',
    templateUrl: './app-test-page.component.html',
    styleUrls: ['./app-test-page.component.css']
})

export class AppTestPageComponent {
    widgetData: Widget;
    getData(data: Widget): void {
        this.widgetData = data;
    }
}
