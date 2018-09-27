import { Component, ViewChild, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild('appTitle')
  appTitle: ElementRef;

  ngAfterViewInit() {
    this.appTitle.nativeElement.innerHTML = 'Hello';
  }
}
