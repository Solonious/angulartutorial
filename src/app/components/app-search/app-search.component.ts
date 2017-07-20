import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable }        from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { WidgetService } from '../../services/widget.service';
import { Widgets } from '../../models/widgets';
import { Widget } from '../../models/widget';

@Component({
    selector: 'app-search',
    templateUrl: './app-search.component.html',
    styleUrls: [ './app-search.component.css' ],
    providers: [WidgetService]
})
export class AppSearchComponent implements OnInit {
    @Output() onGetData = new EventEmitter<Widget>();
    widgets: Widgets[];

    constructor(private widgetService: WidgetService) {}

    ngOnInit(): void {
        this.getWidgets().subscribe(data => this.widgets = data);
    }
    getWidgets(): Observable<Widgets[]> {
        return this.widgetService.getWidgets(100);
    }
    selectWidget(widget: Widgets) {
        this.widgetService.getWidget(widget.slug).subscribe(data => {
            this.widgetService.createWidgetData(data.custom_init_code);
            this.sendData(data);
        });
    }
    sendData(data: Widget): void {
        this.onGetData.emit(data);
    }
    setData(data: Widget): void {
        this.widgetService.setData(data);
    }
}
