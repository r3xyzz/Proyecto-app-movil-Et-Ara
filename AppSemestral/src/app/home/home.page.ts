import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaHabitosPage } from '../paginas/agrega-habitos/agrega-habitos.page';
import { AgregarHabitoVozPage } from '../paginas/agregar-habito-voz/agregar-habito-voz.page';
import { ApiService } from 'src/app/servicios/api.service';
import { QueHaceresService } from '../servicios/que-haceres.service';
import { LocalNotifications } from '@capacitor/local-notifications'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  consejoRetornadoAPI: string = '';
  popupVisible: boolean = true;  // Variable para mostrar/ocultar el popup

  cerrarPopup() {
    this.popupVisible = false;
  }

  // Consumo API externo
  initApi() {
    this.apiservice.solicitud().subscribe(async (data: any) => {
      if (data) {
        this.consejoRetornadoAPI = data.slip.advice;
        await this.apiservice.guardarConsejoLocal(this.consejoRetornadoAPI);
      } else {
        this.consejoRetornadoAPI = await this.apiservice.obtenerConsejoLocal() || "No hay consejos disponibles.";
      }
    });
  }

  listaHaceres: { 
    key: string; 
    value: { 
      nombreItem: string;
      fechaItem: string;
      prioridadItem: string;
      categoriaItem: string;
    } 
  }[] = [];

  constructor(
    public modalControlador: ModalController,
    private apiservice: ApiService,
    public QueHaceresServicio: QueHaceresService
  ) {}

  ngOnInit() {
    this.loadHabitos();
    this.initApi();
    this.verificarPermisosNotificaciones();
    this.crearCanalNotificacion(); // Llama a la creación del canal

    // Listener para notificaciones locales
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notificación recibida:', notification);
      alert(`Notificación recibida: ${notification.title}`);
    });
  }

  // Método para crear el canal de notificación
  async crearCanalNotificacion() {
    await LocalNotifications.createChannel({
      id: 'default', // ID del canal
      name: 'General Notifications', // Nombre visible en Android
      description: 'Canal por defecto para notificaciones.', // Descripción del canal
      importance: 5, // Nivel de importancia (5 es el más alto)
      sound: 'default', // Sonido por defecto
    });

    console.log('Canal de notificaciones creado.');
  }


  // NOTIFICACIONES
  async enviarNotificacion1Segundo(item: any) {
    // Calculamos el tiempo de 5 segundo desde el momento actual
    const tiempo5Segundo = new Date(new Date().getTime() + 5000); // 5 segundos
  
    // Verificamos la hora exacta en consola
    console.log("Hora programada para la notificación 5 segundos después:", tiempo5Segundo);
  
    // El mensaje de recordatorio personalizado con el nombre del hábito
    const titulo = 'Recordatorio';
    const cuerpo = `Usted debe realizar su hábito: ${item.value.nombreItem}`;
  
    // Enviar la notificación programada para 1 segundo después
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000), // Genera un ID único para cada notificación
          title: titulo,
          body: cuerpo,
          schedule: { at: tiempo5Segundo }, // Programa la notificación 1 segundo después
          sound: 'default',
        },
      ],
    });
  
    console.log(`Notificación programada para 5 segundos después sobre el hábito: ${item.value.nombreItem}`);
  }

  
  async enviarNotificacion5Minutos(item: any) {
    // Calculamos el tiempo de 5 minutos desde el momento actual
    const tiempo5Minutos = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutos (300,000 milisegundos)
  
    // Verificamos la hora exacta en consola
    console.log("Hora programada para la notificación 5 minutos después:", tiempo5Minutos);
  
    // El mensaje de recordatorio personalizado con el nombre del hábito
    const titulo = 'Recordatorio';
    const cuerpo = `Usted debe realizar su hábito: ${item.value.nombreItem}`;
  
    // Enviar la notificación programada para 5 minutos después
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000), // Genera un ID único para cada notificación
          title: titulo,
          body: cuerpo,
          schedule: { at: tiempo5Minutos }, // Programa la notificación 5 minutos después
          sound: 'default',
        },
      ],
    });
  
    console.log(`Notificación programada para 5 minutos después sobre el hábito: ${item.value.nombreItem}`);
  }
  
  
  async enviarNotificacion15Minutos(item: any) {
  // Calcula el tiempo para 15 minutos (900000 milisegundos)
  const tiempo15Minutos = new Date(new Date().getTime() + 900000); // 15 minutos
  
  // El mensaje dinámico con el nombre del hábito
  const titulo = 'Recordatorio';
  const cuerpo = `Usted debe realizar su hábito: ${item.value.nombreItem}`;

  // Enviar la notificación programada para 15 minutos después
  await LocalNotifications.schedule({
    notifications: [
      {
        id: Math.floor(Math.random() * 10000), // Genera un ID único para cada notificación
        title: titulo,
        body: cuerpo,
        schedule: { at: tiempo15Minutos }, // Programa la notificación 15 minutos después
        sound: 'default',
      },
    ],
  });

  console.log(`Notificación programada para 15 minutos después sobre el hábito: ${item.value.nombreItem}`);
  }


  async enviarNotificacion30Minutos(item: any) {
    // Calculamos el tiempo de 30 minutos desde el momento actual
    const tiempo30Minutos = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutos (1,800,000 milisegundos)
  
    // Verificamos la hora exacta en consola
    console.log("Hora programada para la notificación 30 minutos después:", tiempo30Minutos);
  
    // El mensaje de recordatorio personalizado con el nombre del hábito
    const titulo = 'Recordatorio';
    const cuerpo = `Usted debe realizar su hábito: ${item.value.nombreItem}`;
  
    // Enviar la notificación programada para 30 minutos después
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000), // Genera un ID único para cada notificación
          title: titulo,
          body: cuerpo,
          schedule: { at: tiempo30Minutos }, // Programa la notificación 30 minutos después
          sound: 'default',
        },
      ],
    });
  
    console.log(`Notificación programada para 30 minutos después sobre el hábito: ${item.value.nombreItem}`);
  }

  async enviarNotificacion1Hora(item: any) {
    // Calculamos el tiempo de 1 hora desde el momento actual
    const tiempo1Hora = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hora (3,600,000 milisegundos)
  
    // Verificamos la hora exacta en consola
    console.log("Hora programada para la notificación 1 hora después:", tiempo1Hora);
  
    // El mensaje de recordatorio personalizado con el nombre del hábito
    const titulo = 'Recordatorio';
    const cuerpo = `Usted debe realizar su hábito: ${item.value.nombreItem}`;
  
    // Enviar la notificación programada para 1 hora después
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000), // Genera un ID único para cada notificación
          title: titulo,
          body: cuerpo,
          schedule: { at: tiempo1Hora }, // Programa la notificación 1 hora después
          sound: 'default',
        },
      ],
    });
  
    console.log(`Notificación programada para 1 hora después sobre el hábito: ${item.value.nombreItem}`);
  }
  
  


  async verificarPermisosNotificaciones() {
    const permission = await LocalNotifications.checkPermissions();
    if (permission.display !== 'granted') {
      console.log('Permisos no concedidos. Solicitando permisos...');
      const solicitud = await LocalNotifications.requestPermissions();
      if (solicitud.display !== 'granted') {
        console.error('Permisos de notificación denegados.');
      }
    }
  }

  // Método para cargar hábitos desde el servicio
  loadHabitos() {
    this.QueHaceresServicio.obtenerHabitosUsuarioActual().then((observableOrArray: any) => {
      if (Array.isArray(observableOrArray)) {
        // Sin conexión: cargando desde el almacenamiento local
        this.listaHaceres = observableOrArray;
        console.log("Hábitos cargados desde el almacenamiento local:", this.listaHaceres);
      } else {
        // Con conexión: usando el observable de Firebase
        observableOrArray.subscribe((snapshot: any) => {
          this.listaHaceres = snapshot.map((doc: any) => ({
            key: doc.payload.doc.id,
            value: doc.payload.doc.data()
          }));
          console.log("Hábitos cargados desde Firebase:", this.listaHaceres);
        });
      }
    }).catch(error => console.error("Error al cargar hábitos:", error));
  }

  // Método para agregar un hábito
  async agregaHabito() {
    const modal = await this.modalControlador.create({
      component: AgregaHabitosPage
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.habito) {
        // Cargar hábitos nuevamente
        this.loadHabitos();

        // Programar notificación para el nuevo hábito
        const nuevoHabito = result.data.habito; // Suponiendo que el hábito nuevo viene en `result.data.habito`
        await this.programarNotificacionHabito(nuevoHabito); // Llamando al método de notificación
      }
    });

    return await modal.present();
  }

  // Método para programar notificaciones para un hábito nuevo
  async programarNotificacionHabito(habito: any) {
    const fecha = new Date(habito.fechaItem); // La fecha en que se debe programar la notificación
    const titulo = `Nuevo hábito: ${habito.nombreItem}`;
    const cuerpo = `Recuerda completar este hábito: ${habito.nombreItem}`;

    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000), // Generando un ID único para cada notificación
          title: titulo,
          body: cuerpo,
          schedule: { at: fecha }, // Programando la notificación para la fecha del hábito
          sound: 'default',
        },
      ],
    });

    console.log('Notificación programada para el nuevo hábito:', titulo, 'Fecha:', fecha);
  }

  // Eliminar hábito directamente (solo por el botón de cancelar)
  eliminar(key: string) {
    this.QueHaceresServicio.eliminarHabito(key).then(() => {
      this.loadHabitos(); // Refresca la lista de hábitos activos
    });
  }

  // Mover al historial (completado o cancelado)
  async moverAHistorial(key: string, value: any, estado: string) {
    await this.QueHaceresServicio.moverAHistorial(key, value, estado);
    this.loadHabitos(); // Refresca la lista de hábitos activos
  }

  // Función para agregar un hábito usando voz
  async agregaHabitoVoz() {
    const modal = await this.modalControlador.create({
      component: AgregarHabitoVozPage
    });
    
    modal.onDidDismiss().then(() => {
      this.loadHabitos(); // Recargar los hábitos después de agregar uno nuevo
    });

    return await modal.present();
  }

}

