import { Component, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { createAnimation, Animation } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { QueHaceresService } from 'src/app/servicios/que-haceres.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-habito-voz',
  templateUrl: './agregar-habito-voz.page.html',
  styleUrls: ['./agregar-habito-voz.page.scss'],
})
export class AgregarHabitoVozPage implements AfterViewInit {
  grabando = false;

  nombreHabito: string = "";

  fechaHabito: string = "";
  textoFechaDisplay: string = ""; // Nueva variable para mostrar el texto de la fecha

  prioridadHabito: string = "";
  categoriaHabito: string = "";
  campoActivo: number = 0; // 0: Nombre, 1: Prioridad, 2: Categoría, 3: Fecha

  objetoHabito: { nombreItem: string, fechaItem: string, prioridadItem: string, categoriaItem: string } = {
    nombreItem: '', 
    fechaItem: '', 
    prioridadItem: '', 
    categoriaItem: ''
  };

  async MensajeError(mensajeHeader: string, mensajeSubHeader: string, mensajeError: string) {
    const alert = await this.alerta.create({
      header: mensajeHeader,
      subHeader: mensajeSubHeader,
      message: mensajeError,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  constructor(
    public modalControlador: ModalController, 
    private changeDetectorRef: ChangeDetectorRef, 
    private queHaceresService: QueHaceresService,
    public alerta: AlertController
  ) {
    SpeechRecognition.requestPermissions();
  }

  async empezarReconocimiento() {
    const { available } = await SpeechRecognition.available();

    if (available) {
      console.log("++VALOR CAMPO ACTIVO++: ", this.campoActivo);
      this.grabando = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: "es-ES",
      });
    }
  }

  async pararReconocimiento() {
    this.grabando = false;
    console.log("**VALOR CAMPO ACTIVO antes DE PARAR SP-REC**: ", this.campoActivo);

    // Cambia al siguiente campo cuando se detiene el reconocimiento
    this.campoActivo++;

    // Valida si se completaron todos los campos
    if (this.campoActivo > 3) {
      this.validarYGuardar();
    }
    await SpeechRecognition.stop();
  }

  // Actualiza el campo activo basado en el resultado de reconocimiento de voz
  actualizarCampoActivo(result: string) {
    switch (this.campoActivo) {
      case 0:
        this.nombreHabito = result;
        break;
      case 1:
        this.prioridadHabito = result;
        break;
      case 2:
        this.categoriaHabito = result;
        break;
      case 3:
        console.log("CASE 3 RESULTADO VOZ: ",result);
        this.convertirTextoAFecha(result);
        break;
    }
    this.changeDetectorRef.detectChanges(); // Actualiza la vista
  }

  // Texto a fecha
  convertirTextoAFecha(textoFecha: string) {
    this.textoFechaDisplay = textoFecha; // Guardar el texto de la fecha
    const meses: { [key: string]: number } = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    const regexFecha = /(\d{1,2}) de (\w+)(?: a las )?(\d{1,2}):(\d{2})/i;
    const match = textoFecha.match(regexFecha);

    if (match) {
      const dia = parseInt(match[1]);
      const mes = meses[match[2].toLowerCase() as keyof typeof meses];
      const hora = parseInt(match[3]);
      const minuto = parseInt(match[4]);

      const fecha = new Date();
      fecha.setMonth(mes);
      fecha.setDate(dia);
      fecha.setHours(hora);
      fecha.setMinutes(minuto);

      this.fechaHabito = fecha.toISOString();
      console.log("Fecha convertida y guardada: ", this.fechaHabito);
    }
}


  // Validar y guardar al completar todos los campos
  validarYGuardar() {
    // Verificar que cada campo esté lleno
    if (!this.nombreHabito) {
        this.MensajeError("ERROR","Nombre de Hábito vacío.","Por favor, ingresa el Nombre del Hábito nuevamente.");
        this.campoActivo = 0;
        return;
    }
    
    if (!this.prioridadHabito) {
        this.MensajeError("ERROR","Prioridad de Hábito vacío.","Por favor, ingresa la Prioridad del Hábito nuevamente.");
        this.campoActivo = 1;
        return;
    }
    
    if (!this.categoriaHabito) {
        this.MensajeError("ERROR","Categoría de Hábito vacío.","Por favor, ingresa la Categoría del Hábito nuevamente.");
        this.campoActivo = 2;
        return;
    }
    
    if (!this.textoFechaDisplay) {
        this.MensajeError("ERROR","Fecha de Vencimiento vacío.","Por favor, ingresa la Fecha de Vencimiento del Hábito nuevamente.");
        this.campoActivo = 3;
        if(this.textoFechaDisplay.length > 0){
          const regexFecha = /(\d{1,2}) de (\w+)(?: a las )?(\d{1,2}):(\d{2})/i;
          const match = this.textoFechaDisplay.match(regexFecha);
          if(match===null){
            this.MensajeError("ERROR","Error de formato fecha","Por favor, introduce la fecha en el formato 'DD de mes a las HH:MM'.\nEjemplo: '10 de octubre a las 22:30'. ");
          }
        }
        return;
    }

    // Validar valores específicos de Prioridad y Categoría
    const prioridadValida = ['alta', 'medio', 'bajo', 'alto', 'media', 'baja'].includes(this.prioridadHabito.toLowerCase());
    const categoriaValida = ['trabajo', 'personal', 'casa'].includes(this.categoriaHabito.toLowerCase());

    if (prioridadValida && categoriaValida) {
        this.objetoHabito = {
            nombreItem: this.nombreHabito,
            fechaItem: this.fechaHabito,
            prioridadItem: this.prioridadHabito,
            categoriaItem: this.categoriaHabito,
        };

        const uid = `habito_${this.nombreHabito}_${this.fechaHabito}`;
        console.log("UID: ", uid);
        console.log("*PRIORIDAD HABITO:* ", this.prioridadHabito);
        this.queHaceresService.agregarHabito(uid, this.objetoHabito);

        this.quitar();  // Cierra el modal
    } else {
        // Mensaje y campo activo para valores inválidos en Prioridad o Categoría
        if (!prioridadValida) {
            this.MensajeError("ERROR","Prioridad Inválida","Por favor, ingresa una Prioridad válida (Alta, Media, Baja).");
            this.campoActivo = 1;
        } else if (!categoriaValida) {
            this.MensajeError("ERROR","Categoría Inválida","Por favor, ingresa una Categoría válida (Trabajo, Personal, Casa).");
            this.campoActivo = 2;
        }
    }
}


  async quitar() {
    await this.modalControlador.dismiss(this.objetoHabito);
  }

  // ANIMACIÓN DE WAVES
  @ViewChildren('line') waveLines!: QueryList<any>; // Acceder a las líneas de la wave
  waveLinesArray: Animation[] = [];
  waveLinesData: number[] = Array.from({ length: 33 }, (_, i) => i + 1);

  ngAfterViewInit() {
    this.animateWave();

    // Crear el listener una vez
    SpeechRecognition.addListener("partialResults", (data: any) => {
      if (data.matches && data.matches.length > 0) {
        this.actualizarCampoActivo(data.matches[0]);
      }
      if (data.value && data.value.length > 0) {
        this.actualizarCampoActivo(data.value[0]);
      }
    }); 
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
