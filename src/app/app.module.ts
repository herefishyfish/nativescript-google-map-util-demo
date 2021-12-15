import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { isIOS } from '@nativescript/core';

import { AppComponent } from './app.component'

declare var GMSServices: any;
if (isIOS) {
  GMSServices.provideAPIKey("PUT_API_KEY_HERE");
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
