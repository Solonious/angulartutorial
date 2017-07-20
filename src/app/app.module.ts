import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }         from './components/app.component';
import { AppHeaderComponent }   from './components/app-header/app-header.component';
import { AppSidebarComponent }  from './components/app-sidebar/app-sidebar.component';
import { AppMainComponent }     from './components/app-main/app-main.component';

import { AppSearchComponent }   from './components/app-search/app-search.component';
import { AppTestPageComponent}  from './components/app-test-page/app-test-page.component';
import { WidgetService }        from './services/widget.service';
import { FilterPipe }           from './pipes/filter-pipe';

import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      NgbModule.forRoot(),
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      AppHeaderComponent,
      AppTestPageComponent,
      AppSidebarComponent,
      AppMainComponent,
      AppSearchComponent,
      FilterPipe
  ],
    providers: [ WidgetService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
