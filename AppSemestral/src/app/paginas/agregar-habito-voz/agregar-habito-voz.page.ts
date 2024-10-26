import { Component, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { createAnimation, Animation } from '@ionic/core';
import { ModalController } from '@ionic/angular';



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

  objetoHabito : { nombreItem: string, fechaItem: string, prioridadItem: string, categoriaItem: string } = {
    nombreItem: '', 
    fechaItem: '', 
    prioridadItem: '', 
    categoriaItem: ''
  };

  constructor(public modalControlador:ModalController, private changeDetectorRef: ChangeDetectorRef) {
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
          this.nombreHabito = data.matches[0];
          this.changeDetectorRef.detectChanges();
        }

        //Para android
        if(data.value && data.value.length > 0){
          this.nombreHabito = data.value[0];
          this.changeDetectorRef.detectChanges();
        }
      });
    }

  }

  async pararReconocimiento(){
    this.grabando = false;
    await SpeechRecognition.stop();
    
  }



  // LÓGICA DE ALMACENAMIENTO DE OBJETO EN VARIABLE
  async quitar(){
    await this.modalControlador.dismiss(this.objetoHabito)
  }

  agregaHabitoVoz(){
    if(this.objetoHabito){

    }else{

    }

    this.quitar()

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
