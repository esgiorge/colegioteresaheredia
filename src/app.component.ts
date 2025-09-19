import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
  // Optional: You can add styleUrls or styles here if needed
})
export class App {
  name = 'Angular';
}
