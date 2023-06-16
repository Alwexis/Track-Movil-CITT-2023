import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalPosteo: boolean = false;
  postData: any = {
    user: '',
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
    for (let publicacion of publicaciones) {
      const fecha = new Date(publicacion.date);
      const dia = fecha.getUTCDate();
      const mesNumero = fecha.getUTCMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
      const mes = mesNumero < 10 ? `0${mesNumero}` : mesNumero.toString();
      const año = fecha.getUTCFullYear();
      publicacion.formattedDate = `${dia}/${mes}/${año}`;
    }
    let now: any = new Date();
    this.publicaciones = publicaciones;
    this.publicaciones.sort((a: any, b: any) => {
      const diferenciaA = Math.abs(new Date(a.date) as any - now);
      const diferenciaB = Math.abs(new Date(b.date) as any - now);
      return diferenciaA - diferenciaB;
    });
  }

  async post() {
    if (this.postData.attachments) {
      for await (let file of this.postData.attachments) {
        let b64 = await this.getBase64(file);
        this.postData.attachments.push(b64);
      }
    }
    const response = await firstValueFrom(this._http.post('https://citt2023.up.railway.app/twitter', this.postData));
    this.postData = { user: '', title: '', content: '', attachments: [] }
    this.modalPosteo = false;
    console.log(response)
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
