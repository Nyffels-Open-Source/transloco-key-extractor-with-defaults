import { Component } from '@angular/core';
import {translate, TranslocoService} from '@jsverse/transloco';
import { defaultMarker } from '@nyffels/transloco-extractor-defaults/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trans-test';

  constructor(private translocoService: TranslocoService){
    translate("test.0")
    translate(["test", "1"]);
    translate(defaultMarker("test.1"));
    translate(defaultMarker('test.2', 'This is a test!'));
    translate(defaultMarker(["test", "1"], "This is an array test!"));
    this.translocoService.translate(defaultMarker("test.3", "This is an injection test!"));
  }
}
