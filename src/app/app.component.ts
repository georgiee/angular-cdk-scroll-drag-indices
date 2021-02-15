import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'example';
  items = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  debugIndices = {
    normalizedCurrentIndex: -1, currentIndex: -1
  }

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private viewport: CdkVirtualScrollViewport;

  dragStart({ source }: CdkDragStart) {
    
  }

  dropRule(event: CdkDragDrop<any>) {
    const range = this.viewport.getRenderedRange();
    const currentIndex = event.currentIndex;
    const normalizedCurrentIndex = range.start + event.currentIndex;
    console.log('indices', {normalizedCurrentIndex, currentIndex});
    this.debugIndices = {normalizedCurrentIndex, currentIndex}
  }
}
