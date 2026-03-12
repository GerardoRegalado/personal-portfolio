import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

type VantaEffect = {
  destroy: () => void;
};

declare global {
  interface Window {
    VANTA?: {
      DOTS: (options: Record<string, unknown>) => VantaEffect;
    };
  }
}

@Component({
    selector: 'port-three-canvas',
    templateUrl: './three-canvas.component.html',
    styleUrl: './three-canvas.component.scss',
    standalone: false
})
export class ThreeCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('elementCanvas', { static: true })
  private elementCanvas!: ElementRef<HTMLElement>;

  private vantaEffect: VantaEffect | null = null;
  private retryTimer: number | null = null;
  private retries = 0;
  private readonly maxRetries = 20;

  ngAfterViewInit(): void {
    this.initVantaDots();
  }

  ngOnDestroy(): void {
    if (this.retryTimer !== null) {
      window.clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }

    this.vantaEffect?.destroy();
    this.vantaEffect = null;
  }

  private initVantaDots(): void {
    if (this.vantaEffect) {
      return;
    }

    const dotsFactory = window.VANTA?.DOTS;

    if (!dotsFactory) {
      if (this.retries < this.maxRetries) {
        this.retries += 1;
        this.retryTimer = window.setTimeout(() => this.initVantaDots(), 120);
      }
      return;
    }

    this.vantaEffect = dotsFactory({
      el: this.elementCanvas.nativeElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: '#B7AA98',
      color2: '#B7AA98',
      backgroundColor: '#212121'
    });
  }
}
