# CDK Drag & Drop vs Virtual Scroll (wrong indices?)

See this behavior:
![preview.gif](preview.gif)


The code is minimal and I expect the Drag & Drop to work properly with CDK Scroll (virtual scroll container).

```
<cdk-virtual-scroll-viewport
  maxBufferPx="0" minBufferPx="0"
  itemSize="20" class="list" cdkDropList  (cdkDropListDropped)="dropRule($event)">
  <div *cdkVirtualFor="let id of items; let index = index"
  		class="item" cdkDrag>
    works id: {{id}}
  </div>
</cdk-virtual-scroll-viewport>

```

In the component you can see the dropped handler:

```
dropRule(event: CdkDragDrop<any>) {
    const range = this.viewport.getRenderedRange();
    const currentIndex = event.currentIndex;
    const normalizedCurrentIndex = range.start + event.currentIndex;
    console.log('indices', {normalizedCurrentIndex, currentIndex});
    this.debugIndices = {normalizedCurrentIndex, currentIndex}
  }
```

It will correctly output an index of 0 for the first element if you drag and release immediately.
Now scroll down to the last element, scroll back up and repeat. The drag & drop engine will calculate a wrong index for the physical list of elements. This index could theoretically be combined with the range value of the virtual list to create a "normalized" value. But it fails with the initial value: CDk Drag & Drop doesn't properly calculate the currentIndex value in virtual lists and it only happens after your used the scroll functionality. It seems that the drop container gets confused by the virtual items.


```
Angular CLI: 11.2.0
Node: 14.15.4
OS: darwin x64

Angular: 11.2.0
... animations, cdk, cli, common, compiler, compiler-cli, core
... forms, platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1102.0
@angular-devkit/build-angular   0.1102.0
@angular-devkit/core            11.2.0
@angular-devkit/schematics      11.2.0
@schematics/angular             11.2.0
@schematics/update              0.1102.0
rxjs                            6.6.3
typescript                      4.1.5
```
