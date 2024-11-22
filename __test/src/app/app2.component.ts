import {Component} from '@angular/core';

@Component({
  selector: 'app-root-2',
  template: `
    <h1>In ts transloco</h1>
    <p>{{ 'trans.ints.2' | transloco: {default: "This is a test in ts from html."} }}</p>
  `
})
export class App2Component {
  constructor() {}
}
