import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input('modal') modal: boolean = false;
  @Input('mask') mask: boolean = true;
  @Input('maskPointerEvents') maskPointerEvents: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
