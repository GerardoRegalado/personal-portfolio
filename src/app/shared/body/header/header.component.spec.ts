import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let viewportScrollerSpy: jasmine.SpyObj<ViewportScroller>;

  beforeEach(async () => {
    viewportScrollerSpy = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', ['scrollToAnchor']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ViewportScroller, useValue: viewportScrollerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to anchor', () => {
    component.scrollTo('contact');

    expect(viewportScrollerSpy.scrollToAnchor).toHaveBeenCalledWith('contact');
  });
});
