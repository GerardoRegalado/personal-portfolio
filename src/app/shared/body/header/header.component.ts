import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'port-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  public isMenuOpen = false;
  public activeSection = 'home';

  constructor(private viewPortScroller: ViewportScroller){}

  public scrollTo(targetId: string):void {
    this.viewPortScroller.scrollToAnchor(targetId);
    this.activeSection = targetId;
    this.isMenuOpen = false;
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
