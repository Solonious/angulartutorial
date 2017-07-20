import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Categories } from '../models/categories';
import { Widget } from '../models/widget';
import { Widgets } from '../models/widgets';
import { EnvTitle } from '../models/env-title';
import { WidgetData } from '../models/widget-data';

@Injectable()
export class WidgetService {
    windowObjectReference: any;
    private apiUrl = 'https://www.dukascopy.com/trading-tools/api/';
    private categoriesUrl = `categories/list.json`;
    widgets: Widgets[];
    titles: EnvTitle[] = [
        {title: 'TEST ENV.', url: 'https://freeserv.php-test.site.dukascopy.com', type: 'TEST'},
        {title: 'LIVE ENV.', url: 'https://freeserv.dukascopy.com', type: 'LIVE'}
    ];
    widgetData: Widget;
    env: EnvTitle = this.titles[0];
    data: EnvTitle = this.titles[0];
    dataUrl: string = this.env.url || 'https://freeserv.php-test.site.dukascopy.com';
    constructor(
        private http: Http,
        private sanitizer: DomSanitizer
    ) {}
    getCategories(): Observable<Categories[]> {
        return this.http.get(`${this.apiUrl + this.categoriesUrl}`)
            .map(res => {
               let categoriesList = res.json();
               let categories: Categories[] = [];
               for (let index in categoriesList) {
                   let category = categoriesList[index];
                   categories.push({
                       id: category.id,
                       title: category.title,
                       widgetsCount: category.widgetsCount
                   });
               }
               return categories;
            })
            .catch(this.handleError);
    }
    handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
    getWidgets(limit: number, category?: string): Observable<Widgets[]> {
        var url;
        if (category) {
            url = `${this.apiUrl}widgets/list.json?limit=${limit}&category=${category}&offset=0`;
        } else {
            url = `${this.apiUrl}widgets/list.json?limit=${limit}`;
        }
        return this.http.get(url)
            .map(res => this.widgets = res.json().data);
    }
    getWidget(slug: string): Observable<Widget> {
        return this.http.get(`${this.apiUrl}widget/${slug}`)
            .map(res => res.json() as Widget)
            .catch(this.handleError);
    }
    setData(data: Widget): void {
        this.widgetData = data;
    }
    getData(): Widget {
        return this.widgetData;
    }
    createWidgetData(embedCode: string): WidgetData {
        const params = this.convertEmbedCodeToObject(embedCode);
        const qs = Object.keys(params.params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params.params[k])}`)
            .join('&');
        return {
            dataSrc: this.sanitizer.bypassSecurityTrustResourceUrl(`${this.dataUrl}/?path=${params.type}/index&${qs}`),
            width: params.params.width,
            height: params.params.height
        };
    }
    private convertEmbedCodeToObject(embedCode: string): any {
        if (!embedCode) {
            return;
        }
        try {
            return JSON.parse(embedCode.slice(embedCode.indexOf('{'), embedCode.lastIndexOf(';')));
        } catch (err) {
            console.log('Invalid JSON', err);
        }
    }
    showInEditor(module_name: string): void {
        this.windowOpen(`${this.dataUrl}/?path=widget_editor/${module_name}`);
    }
    openInNewWindow(module_name: string): void {
        this.windowOpen(`${this.dataUrl}/?path=${module_name}/index`);
    }
    private windowOpen(url: string): void {
        if (this.windowObjectReference == null || this.windowObjectReference.closed) {
            this.windowObjectReference = window.open(url,
                'DescriptiveWindowName', 'width=600px,height=450px,resizable,scrollbars=yes,status=1');
        } else {
            this.windowObjectReference.focus();
        }
    }
    setEnvData(title: string): void {
        this.env = this.titles.filter(item => item.title === title)[0];
        this.dataUrl = this.env.url;
    }
    setDataData(title: string): void {
        this.data = this.titles.filter(item => item.title === title)[0];
    }
}
