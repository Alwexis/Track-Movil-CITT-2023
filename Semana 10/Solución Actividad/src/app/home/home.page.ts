import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalPostear: boolean = false;
  postData: any = {
    user: '',
    title: '',
    content: '',
    attachments: undefined
  }
  publicaciones: any = [];

  constructor(private _http: HttpClient) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    const publicaciones: any = await firstValueFrom(this._http.get('https://citt2023.up.railway.app/twitter'));
    for (let publicacion of publicaciones) {
      const fecha = new Date(publicacion.date);
      const dia = fecha.getUTCDate();
      const mesNumero = fecha.getUTCMonth();
      const mes = mesNumero < 10 ? `0${mesNumero}` : mesNumero.toString();
      const año = fecha.getUTCFullYear();
      publicacion.formattedDate = `${dia}/${mes}/${año}`;
    }
    let now: any = new Date();
    this.publicaciones = publicaciones;
    this.publicaciones.sort((valor1: any, valor2: any) => {
      const diferenciaValor1 = Math.abs(new Date(valor1.date) as any - now);
      const diferenciaValor2 = Math.abs(new Date(valor2.date) as any - now);
      return diferenciaValor1 - diferenciaValor2;
    });
    console.log(this.publicaciones)
  }

  async crearPost() {
    const response = await firstValueFrom(this._http.post('https://citt2023.up.railway.app/twitter', this.postData))
    console.log(response);
    this.postData = { user: '', title: '', content: '', attachments: undefined };
    this.modalPostear = false;
  }

  async fileChange(e: any) {
    const b64Images = [];
    for await (let file of e.target.files) {
      let b64 = await this.getBase64(file);
      b64Images.push(b64);
    }
    this.postData.attachments = b64Images;
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
