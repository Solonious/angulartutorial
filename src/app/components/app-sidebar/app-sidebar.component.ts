import { Component, OnInit, EventEmitter, Output }    from '@angular/core';

import { WidgetService }    from '../../services/widget.service';

import {Categories}     from '../../models/categories';
import { Widgets }      from '../../models/widgets';
import { Widget }      from '../../models/widget';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app-sidebar.component.html',
    styleUrls: ['./app-sidebar.component.css'],
    providers: [WidgetService]
})

export class AppSidebarComponent implements OnInit {
    @Output() onGetData = new EventEmitter<Widget>();
    isActive: boolean = false;
    selectedCategory: Categories;
    categories: Categories[];
    widgetsList: Widgets[];
    selectedWidget: Widgets;
    constructor(
        private widgetService: WidgetService
    ) {}
    ngOnInit(): void {
        this.getCategories();
    }
    getCategories(): void {
        this.widgetService.getCategories().subscribe(categories => this.categories = categories);
    }
    onSelectCategory(category: Categories): void {
        this.isActive = category !== this.selectedCategory ?
            true : !this.isActive;
        this.widgetService.getWidgets(category.widgetsCount, category.title)
            .subscribe(widgets => this.widgetsList = widgets);
        this.selectedCategory = category;
    }
    onSelectWidget(widget: Widgets): void {
        this.selectedWidget = widget;
        this.widgetService.getWidget(widget.slug).subscribe(data => {
            // this.widgetService.createWidgetData(data.custom_init_code);
            this.sendData(data);
        });
    }
    sendData(data: Widget): void {
        this.onGetData.emit(data);
    }
    // setData(data: Widget): void {
    //     this.widgetService.setData(data);
    // }
}
