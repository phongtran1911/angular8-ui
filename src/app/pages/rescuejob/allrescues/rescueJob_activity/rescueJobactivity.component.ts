import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-rescuejob-activity',
    templateUrl: 'rescueJobactivity.component.html',
    styleUrls: ['rescueJobactivity.component.scss'],
  })
  export class RescueJobActivityComponent {

    constructor(protected ref: NbDialogRef<RescueJobActivityComponent>) {}
  
    cancel() {
      this.ref.close();
    }
  
    submit(name) {
      this.ref.close(name);
    }
  }