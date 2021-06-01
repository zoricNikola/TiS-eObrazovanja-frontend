import { Component, Input, OnInit } from '@angular/core';

export interface ConfirmationDialogOptions {
  title: string;
  message: string;
  decline: () => void;
  confirm: () => void;
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: ConfirmationDialogOptions;

  constructor() {}

  ngOnInit(): void {}
}
