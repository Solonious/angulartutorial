import { Component } from '@angular/core';

import { WidgetService } from '../../services/widget.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent {
    constructor(public widgetService: WidgetService) {}
}
