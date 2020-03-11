import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import {
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
  } from '@nebular/theme';

@Injectable()
export class FunctionAllService {
    config: ToasterConfig;
    destroyByClick = true;
    duration = 3000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    preventDuplicates = false;
  constructor(private toastrService: NbToastrService) {
  }
  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
