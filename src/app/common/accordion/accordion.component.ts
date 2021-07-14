import { AfterContentChecked } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: '[accordion]',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit, AfterContentChecked {
  @Input('opened') opened: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
}
