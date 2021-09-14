import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}

  async present(message, duration = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: "bottom"
    });
    toast.present();
    return toast;
  }

  async presentTop(message, duration = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: "top"
    });
    toast.present();
  }

  async presentMiddle(message, duration = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: "middle"
    });
    toast.present();
  }
}
