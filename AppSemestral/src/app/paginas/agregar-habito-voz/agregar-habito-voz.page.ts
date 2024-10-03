import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { createAnimation, Animation } from '@ionic/core';

@Component({
  selector: 'app-agregar-habito-voz',
  templateUrl: './agregar-habito-voz.page.html',
  styleUrls: ['./agregar-habito-voz.page.scss'],
})
export class AgregarHabitoVozPage implements AfterViewInit {
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

  startListening() {
    console.log('Empezar a transcribir...');
    // Lógica de reconocimiento de voz
  }

}
