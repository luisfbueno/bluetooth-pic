import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  //Vermelho = 0.Verde = 1, Amarelo = 2
  private ledControl: number[];
  private macAddress: string; //Mac Adress obtido após uma execução de list e acessando .address do vetor de objetos retornado

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public bluetoothSerial: BluetoothSerial) {
    this.ledControl = [0,0,0];
    this.macAddress = "00:21:13:00:4F:0D"; 
    this.bluetoothSerial.enable();
    
  }

  public sendByte() {
    var byte = new Uint8Array(1); //Cria estrutura de byte
    byte[0] = this.ledControl[0] * 1 + this.ledControl[1] * 2 + this.ledControl[2] * 4; //Converte valores do vetor para número decimal
    this.bluetoothSerial.write(byte).then((sucess)=>{ //envia dado
    },
    (err)=>{
    });
  }

  public showError(msg:string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  public connectModule(){
    this.bluetoothSerial.list().then((con)=>{
      this.bluetoothSerial.connect(this.macAddress).subscribe();
    });
  }

  public mudaEstadoLed(arrayPos:number) {
    if(this.ledControl[arrayPos] == 0){
      this.ledControl[arrayPos] = 1;
    }

    else{
      this.ledControl[arrayPos] = 0;
    }
    this.sendByte();
  }


  
}
