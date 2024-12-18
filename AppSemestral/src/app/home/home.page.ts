import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaHabitosPage } from '../paginas/agrega-habitos/agrega-habitos.page';
import { AgregarHabitoVozPage } from '../paginas/agregar-habito-voz/agregar-habito-voz.page';
import { ApiService } from 'src/app/servicios/api.service';
import { QueHaceresService } from '../servicios/que-haceres.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  consejoRetornadoAPI: string = '';
  popupVisible: boolean = true; // Variable para mostrar/ocultar el popup

  cerrarPopup() {
    this.popupVisible = false;
  }


  // Consumo API externo (para tu funcionalidad adicional)
  initApi() {
    this.apiservice.solicitud().subscribe(async (data: any) => {
      if (data) {
        // Si la solicitud es exitosa, muestra el consejo y guárdalo localmente
        this.consejoRetornadoAPI = data.slip.advice;
        await this.apiservice.guardarConsejoLocal(this.consejoRetornadoAPI);
      } else {
        // Si falla, recupera el último consejo almacenado
        this.consejoRetornadoAPI = await this.apiservice.obtenerConsejoLocal() || "No hay consejos disponibles actualmente.";
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
  }

  // Función para cargar hábitos, preferentemente desde Firebase si hay conexión
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

  async agregaHabito() {
    const modal = await this.modalControlador.create({
      component: AgregaHabitosPage
    });

    modal.onDidDismiss().then(() => {
      this.loadHabitos(); // Recargar los hábitos después de agregar uno nuevo
    });

    return await modal.present();
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
    console.log("-----------------------------------------------");
    console.log("key:", key);
    console.log("value:", value);
    console.log("estado:", estado);
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
