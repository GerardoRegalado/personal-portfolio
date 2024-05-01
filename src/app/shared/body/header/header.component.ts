import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'port-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private viewPortScroller: ViewportScroller){}

  public scrollTo(targetId: string):void {
    this.viewPortScroller.scrollToAnchor(targetId)
  }
}
