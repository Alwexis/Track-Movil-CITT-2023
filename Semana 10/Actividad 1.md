# Actividad N°1 - Semana 10
Utilizando la API del Track para la actividad de hoy (link abajo), realiza la siguiente actividad:

<p>
  <samp>
    Crea una Aplicación Básica al estilo Twitter, en la cual puedas Postear contenido y ver el de los demás. Intenta agregarle un diseño bonito y amigable. Puedes aplicar todo lo visto en clases y también cualquier componente de IonicFramework (Link Abajo)
    Por favor en caso de utilizar Imágenes para hacer tus posteos de prueba, intenta que no sean tan pesadas, recuerda que la base de datos es limitada!
    Para manejar las imágenes recuerda utilizar un input normal de tipo file.
    <b>Ejemplo</b>: input type="file"
  </samp>
</p>

#### Campos a usar en la Petición HTTP tipo POST. Los marcados con * son obligatorios
- <b>`user*`</b>: Nombre del Usuario
- <b>`icon`</b>: Ícono o Foto de Perfil del Usuario
- <b>`title*`</b>: Título del Post
- <b>`content*`</b>: Contenido del Post
- <b>`attachments`</b>: Array (o lista) de Imágenes en Base64

#### Código para manejar Imágenes a Base64
```typescript
getBase64(file: File) {
  return new Promise((resolve: any, reject: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
```

#### Links útiles
- [Componentes Ionic](https://ionicframework.com/docs/)
- [API del Track](https://citt2023.up.railway.app/twitter)
- [Solución a Actividad](https://github.com/Alwexis/Track-Movil-CITT-2023/tree/main/Semana%2010/Solución%20Actividad)

#### Imagen de Referencia
![image](https://github.com/Alwexis/Track-Movil-CITT-2023/assets/51482182/6524b630-af88-46bf-bbcc-d80ac7dc5e15)
![image](https://github.com/Alwexis/Track-Movil-CITT-2023/assets/51482182/4bc3d969-6572-41ea-a4f7-421dd23d7c47)
