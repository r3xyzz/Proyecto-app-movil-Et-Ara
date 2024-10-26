import { Component, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { createAnimation, Animation } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { QueHaceresService } from 'src/app/servicios/que-haceres.service';



@Component({
  selector: 'app-agregar-habito-voz',
  templateUrl: './agregar-habito-voz.page.html',
  styleUrls: ['./agregar-habito-voz.page.scss'],
})
export class AgregarHabitoVozPage implements AfterViewInit {
  grabando = false;

  nombreHabito : string = ""
  fechaHabito : string = new Date().toISOString();
  prioridadHabito : string = ""
  categoriaHabito : string = ""
  campoActivo: number = 0; // 0: Nombre, 1: Prioridad, 2: Fecha, 3: Categoría

  objetoHabito : { nombreItem: string, fechaItem: string, prioridadItem: string, categoriaItem: string } = {
    nombreItem: '', 
    fechaItem: '', 
    prioridadItem: '', 
    categoriaItem: ''
  };

  constructor(public modalControlador:ModalController, private changeDetectorRef: ChangeDetectorRef, private queHaceresService: QueHaceresService) {
    SpeechRecognition.requestPermissions();
   }

  


  async empezarReconocimiento(){
    const { available } = await SpeechRecognition.available();

    if (available){
      this.grabando = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: "es-ES",

      });



      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired", data.matches);
        //Si es que se obtienen resultados... (más de 0)
        if(data.matches && data.matches.length > 0){

          // Asigna el valor en función del campo activo
          switch (this.campoActivo) {
            case 0:
              this.nombreHabito = data.matches[0];
              break;
            case 1:
              this.prioridadHabito = data.matches[0];
              break;
            case 2:
              this.fechaHabito = data.matches[0];
              break;
            case 3:
              this.categoriaHabito = data.matches[0];
              break;
          }
          this.changeDetectorRef.detectChanges();
        }

        //Para android
        if(data.value && data.value.length > 0){
          // Asigna el valor en función del campo activo
          switch (this.campoActivo) {
            case 0:
              this.nombreHabito = data.value[0];
              break;
            case 1:
              this.prioridadHabito = data.value[0];
              break;
            case 2:
              this.fechaHabito = data.value[0];
              break;
            case 3:
              this.categoriaHabito = data.value[0];
              break;
          }
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  async pararReconocimiento(){
    this.grabando = false;
    await SpeechRecognition.stop();

    // Cambia al siguiente campo cuando se detiene el reconocimiento
    this.campoActivo++;
    console.log("**VALOR CAMPO ACTIVO**: ",this.campoActivo);

    // Valida si se completaron todos los campos
    if (this.campoActivo > 3) {
      this.validarYGuardar();
    }
  }

   // Validar y guardar al completar todos los campos
   validarYGuardar() {
    const prioridadValida = ['Alta', 'Media', 'Baja'].includes(this.prioridadHabito);
    const categoriaValida = ['Trabajo', 'Personal', 'Casa'].includes(this.categoriaHabito);

    if (prioridadValida && categoriaValida) {
      this.objetoHabito = {
        nombreItem: this.nombreHabito,
        fechaItem: this.fechaHabito,
        prioridadItem: this.prioridadHabito,
        categoriaItem: this.categoriaHabito,
      };

      const uid = `habito_${this.nombreHabito}_${this.fechaHabito}`;
      this.queHaceresService.agregarHabito(uid, this.objetoHabito);
      this.quitar();  // Cierra el modal
    } else {
      alert("Por favor, ingresa valores válidos para Prioridad y Categoría.");
      this.campoActivo = 0;  // Reinicia al primer campo
    }
  }

  async quitar(){
    await this.modalControlador.dismiss(this.objetoHabito);
  }




  //ANIMACIÓN DE WAVES
  @ViewChildren('line') waveLines!: QueryList<any>; // Acceder a las líneas de la wave
  waveLinesArray: Animation[] = [];
  waveLinesData: number[] = Array.from({ length: 33 }, (_, i) => i + 1);

  ngAfterViewInit() {
    this.animateWave();
  }

  animateWave() {
    const durations = [800, 600, 900, 700, 800]; // Duraciones variables para cada línea
    let i = 0;

    // Iterar sobre cada línea
    this.waveLines.forEach((line) => {
      const animation = createAnimation()
        .addElement(line.nativeElement)
        .duration(durations[i % durations.length]) // Duración de la animación
        .iterations(Infinity) // Animación infinita
        .fromTo('transform', 'scaleY(0.3)', 'scaleY(1)') // Deformación de la línea en Y
        .fromTo('opacity', '0.5', '1'); // Cambiar la opacidad ligeramente

      this.waveLinesArray.push(animation);
      i++;
    });

    // Reproducir todas las animaciones al mismo tiempo
    this.waveLinesArray.forEach((anim) => anim.play());
  }

}
