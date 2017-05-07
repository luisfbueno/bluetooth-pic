import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  public vermelho: boolean;
  public verde: boolean;
  public amarelo: boolean;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public bluetoothSerial: BluetoothSerial) {
    this.vermelho = false;
    this.verde = false;
    this.amarelo = false;

    this.connect();
  }

  public connect(){
    this.bluetoothSerial.enable().then((status)=> {
        this.showAlert();
    });
  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bluetooth',
      subTitle: 'Bluetooth enabled',
      buttons: ['OK']
    });
    alert.present();
  }

  public mudaVermelho() {
    console.log("Vermelho: "+ this.vermelho);
    this.showAlert();
  }

  public mudaVerde() {
    console.log("Verde: "+ this.verde);
  }

  public mudaAmarelo() {
    console.log("Amarelo: "+ this.amarelo);
  }


}
