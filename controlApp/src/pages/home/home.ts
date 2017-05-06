import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public vermelho: boolean;
  public verde: boolean;
  public amarelo: boolean;

  
  constructor(public navCtrl: NavController) {
    this.vermelho = false;
    this.verde = false;
    this.amarelo = false;

  } 

  public mudaVermelho() {
    console.log("Vermelho: "+ this.vermelho); 
  }

  public mudaVerde() {
    console.log("Verde: "+ this.verde); 
  }

  public mudaAmarelo() {
    console.log("Amarelo: "+ this.amarelo); 
  }


}
