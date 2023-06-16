import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  modalPublicacion: boolean = false;
  postData: any = {
    user: '',
    icon: undefined,
    title: '',
    content: '',
    attachments: []
  }
  publicaciones: any = [];

  constructor(private _http: HttpClient) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    const publicaciones: any = await firstValueFrom(this._http.get('https://citt2023.up.railway.app/twitter'));
    for (let publcacion of publicaciones) {
      const fecha = new Date(publcacion.date);
      const diaNumero = fecha.getUTCDate();
      const dia = diaNumero < 10 ? `0${diaNumero}` : diaNumero.toString();
      const mesNumero = fecha.getUTCMonth() + 1;
      const mes = mesNumero < 10 ? `0${mesNumero}` : mesNumero.toString();
      const año = fecha.getUTCFullYear();
      publcacion.formattedDate = `${dia}/${mes}/${año}`;
    }
    let now: any = new Date();
    this.publicaciones = publicaciones;
    this.publicaciones.sort((fecha1: any, fecha2: any) => {
      const diferenciaFecha1 = Math.abs(new Date(fecha1.date) as any - now);
      const diferenciaFecha2 = Math.abs(new Date(fecha2.date) as any - now);
      return diferenciaFecha1 - diferenciaFecha2;
    });
    console.log(this.publicaciones);
  }

  async crearPost() {
    const response = await firstValueFrom(this._http.post('https://citt2023.up.railway.app/twitter', this.postData));
    console.log(response);
    this.postData = { user: '', icon: undefined, title: '', content: '', attachments: [] }
    this.modalPublicacion = false;
  }

  async onImageChange(e: any, type: string) {
    if (type === 'icon') {
      let image = e.target.files[0];
      let b64 = await this.getBase64(image);
      this.postData.icon = b64;
    } else if (type === 'attachments') {
      let images = e.target.files;
      for await (let image of images) {
        let b64 = await this.getBase64(image);
        this.postData.attachments.push(b64);
      }
    }
  }

  getBase64(file: File) {
    return new Promise((resolve: any, reject: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
