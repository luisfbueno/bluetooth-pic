import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
//import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  //Vermelho = 0.Verde = 1, Amarelo = 2
  private ledControl: number[];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController/*,public bluetoothSerial: BluetoothSerial*/) {
    this.ledControl = [0,0,0]; 
    this.connect();
  }

  public connect(){
    //this.bluetoothSerial.enable().then((status)=> {
      //  this.showAlert();
    //});
  }

  public sendByte() {
    var byte = new Uint8Array(1); //Cria estrutura de byte
    var aux = this.ledControl;
    byte[0] = aux[0] * 1 + aux[1] * 2 + aux[2] * 4;
    console.log(byte[0]);
    console.log("Byte Lenght = ",byte.byteLength);

  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bluetooth',
      subTitle: 'Bluetooth enabled',
      buttons: ['OK']
    });
    alert.present();
  }

  public mudaEstadoLed(arrayPos:number) {
    if(this.ledControl[arrayPos] == 0){
      this.ledControl[arrayPos] = 1;
    }

    else{
      this.ledControl[arrayPos] = 0;
    }
    //console.log(this.ledControl);
    this.sendByte();
  }


  
}
