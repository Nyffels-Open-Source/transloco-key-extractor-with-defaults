import { Component } from '@angular/core';
import { translate } from '@jsverse/transloco';
import { defaultMarker } from '@nyffels/transloco-extractor-defaults/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trans-test';

  constructor(){
    translate("test.0")
    translate(defaultMarker("test.1"));
    translate(defaultMarker('test.2', 'This is a test!'));
  }
}
