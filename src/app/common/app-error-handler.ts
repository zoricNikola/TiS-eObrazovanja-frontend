import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error);
    alert('An unexpected error occured.');
  }
}
