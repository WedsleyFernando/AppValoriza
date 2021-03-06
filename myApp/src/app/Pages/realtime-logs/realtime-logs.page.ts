import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase';
import { AlertController } from '@ionic/angular';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-realtime-logs',
  templateUrl: './realtime-logs.page.html',
  styleUrls: ['./realtime-logs.page.scss'],
})
export class RealtimeLogsPage implements OnInit {
//Variaveis do Codigo  
  queryText : String;
  allPesos: any;
  Pesos: any;
  informacao;
  spinner = true;
  dadosPeso = false;
  lista = true;
  pesos
  resultado = [];
  consultapor
  constructor(
    private firebaseProvider: FirebaseProvider,
    private alertController :AlertController,

    ) {
      this.getPesos();
      this.queryText = '';
    }


//Metodos
//gerar PDF

@ViewChild('content') content: ElementRef;

public downloadPDF(){
  let doc = new jsPDF();

  let specialElementsHandlers = {
    '#editor':function(element, renderer){
      return true;
    }
  };

  let content = this.content.nativeElement;
  
  doc.fromHTML(content.innerHTML, 15, 15,{
      'width': 190,
      'elementHandlers': specialElementsHandlers
  });
  doc.save('Relatorio.pdf',);

}

    // Get nos Pesos no Banco 
    getPesos(){
      this.firebaseProvider.getlogs()
      .then((r) =>{
      this.Pesos  = r;
        this.allPesos = this.Pesos;
      this.pararSpinner();
      })
    }

    //Metodo Para Ver Informacao Do Peso Solicitado
    verInfo(p){
      this.informacao = p;
      this.dadosPeso = true;
      this.lista = false;

      
      var pesos = this.informacao.peso;
      var q = 0
        for (var i in pesos) {
          this.resultado[0] = "Pesos";
          if (pesos.hasOwnProperty(i)) {
            if(pesos[i]!=""){
              q = q + 1;
              this.resultado[q] = i + ": " + pesos[i]+" Kg";
            }
          }
        } 
    }

    //Botao Voltar para os Pesos
    voltarConsulta(){
      this.dadosPeso = false;
      this.lista = true;
    }

    //Barra De Pesquisa

    filterResiduo(event : any){
      const val = event.target.value;
      switch(this.consultapor) { 
        case 'Cliente': {  
            if(val && val.trim() != ''){
              this.Pesos = this.allPesos.filter((Pesos)=>{
                return(Pesos.cliente.toLowerCase().indexOf(val.toLowerCase()) > - 1);
                  })
                }else{
                  this.Pesos = this.allPesos;
            }
         break; 
        } 
        case 'Motorista': {     
              if(val && val.trim() != ''){
                this.Pesos = this.allPesos.filter((Pesos)=>{
                  return(Pesos.nome.toLowerCase().indexOf(val.toLowerCase()) > - 1);
                })
              }else{
                this.Pesos = this.allPesos;
              } 
           break; 
        } 
        
        case 'Placa': { 
            if(val && val.trim() != ''){
              this.Pesos = this.allPesos.filter((Pesos)=>{
                return(Pesos.placa.toLowerCase().indexOf(val.toLowerCase()) > - 1);
              })
            }else{
              this.Pesos = this.allPesos;
            }
          break; 
       } 
       
       case 'Data': {   
            if(val && val.trim() != ''){
              this.Pesos = this.allPesos.filter((Pesos)=>{
                return(Pesos.data.toLowerCase().indexOf(val.toLowerCase()) > - 1);
              })
            }else{
              this.Pesos = this.allPesos;
            }
        break; 
     } 
        default: {      
              if(val && val.trim() != ''){
                this.Pesos = this.allPesos.filter((Pesos)=>{
                  return(Pesos.cliente.toLowerCase().indexOf(val.toLowerCase()) > - 1);
                })
              }else{
                this.Pesos = this.allPesos;
              } 
           break; 
        } 
     } 
    }

    //Escolher Tipo De Consulta
    async presentAlertCheckbox() {
      const alert = await this.alertController.create({
        header: 'Consultar Por ',
        inputs: [
          {
            name: 'Cliente',
            type: 'radio',
            label: 'Cliente',
            value: 'Cliente',
            
          },
  
          {
            name: 'Motorista',
            type: 'radio',
            label: 'Motorista',
            value: 'Motorista'
          },
  
          {
            name: 'Placa',
            type: 'radio',
            label: 'Placa',
            value: 'Placa'
          },
  
          {
            name: 'Data',
            type: 'radio',
            label: 'Data',
            value: 'Data'
          },
  
         
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              
            }
          }, {
            text: 'Ok',
            handler: (value) => {
              this.consultapor = value;
            }
          }
        ]
      });
      await alert.present();
    }

    //Para Loading Da Pagina
    pararSpinner(){
      this.spinner = false;
    }
    ngOnInit() {
    }

  }
