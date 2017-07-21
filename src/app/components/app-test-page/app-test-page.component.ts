import { Component } from '@angular/core';

import { WidgetService } from '../../services/widget.service';

import { Widget } from '../../models/widget';

@Component({
    selector: 'app-test-page',
    templateUrl: './app-test-page.component.html',
    styleUrls: ['./app-test-page.component.css']
})

export class AppTestPageComponent {
    widgetData: Widget;
    constructor(public widgetService: WidgetService) {}
    setData(data: Widget): void {
        this.widgetService.setData(data);
    }
    setEnvUrl(url: string): void {
        this.widgetService.setUrl(url);
    }
}
