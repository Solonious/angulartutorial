import { Component, Input } from '@angular/core';

import { WidgetService }    from '../../services/widget.service';
import { Widget } from '../../models/widget';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.css'],
    providers: [WidgetService]
})

export class AppMainComponent {
    @Input() widgetData: Widget;
    @Input() envUrl: string;
    widgetFrameParams: any;
    message: string = `Please select widget`;
    constructor(
        private widgetService: WidgetService
    ) {}
    openInWindow(widget: string, url: string) {
        this.widgetService.openInNewWindow(widget, url);
    }
    openInEditor(widget: string, url: string) {
        this.widgetService.showInEditor(widget, url);
    }
    createWidget(embedCode: string, envurl: string) {
            this.widgetFrameParams = this.widgetService.createWidgetData(embedCode, envurl);
    }

}


