import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.page.html',
  styleUrls: ['./cadastro-empresa.page.scss'],
})

export class CadastroEmpresaPage implements OnInit {
 //Imagem Que Vai Aparecer nos Resultados
  image = 'https://www.visaopontocom.com/wp-content/uploads/2017/02/icone-empresa.png'
  cadastro = true;
  campos = false;
  spinner = false;
  camposocultar = true;
  empresas;
  

//Decreta Campos Nos Formularios
cadastroEmpresaForm = {
  nome:'',
  cnpj:'',
  estado:'',
  municipio:'',
  endereco:'',
  numero:'',
  bairro:'',
  cep:'',
  telefone:'',
  contato:'',
  email:'',
  ramo:'',
  bandeira:'',
  potencial:'',
  prestador:'',
  representante:'',
  plano:'',
  datainicio:'',
  datatermino:''
}


  // Construtor
  constructor(   
    private firebaseProvider: FirebaseProvider,
    public alertController: AlertController,
    
    ) {
      this.getIdEmpresas();
   
   }

//puxa Empresas
   getIdEmpresas(){
    this.firebaseProvider.getIdEmpresas()
    .then((array) =>{
    this.empresas = array;
    for(let i in this.empresas){
      this.empresas[i] = this.empresas[i].cnpj;
      console.log(this.empresas[i]);
    }})
  }

// Verifica Se Empresa Ja Esta Cadastarda(Falta Terminar)
verifica(){
for(let i in this.empresas){
  if(this.empresas[i] == this.cadastroEmpresaForm.cnpj){
    console.log("Nao Pode Ser Cadastrada");
  }else{
    console.log("Pode Ser Cadastrada");
    this.criarNovaEmpresa();
  }}
}

 //criaNovaEmpresa 
 criarNovaEmpresa(){
  this.rodarSpinner();
   
  // Coloca Campos No DB
   let data = {
      image:this.image,
      name:this.cadastroEmpresaForm.nome,
      cnpj:this.cadastroEmpresaForm.cnpj,
      estado:this.cadastroEmpresaForm.estado,
      municipio:this.cadastroEmpresaForm.municipio,
      endereco:this.cadastroEmpresaForm.endereco,
      numero:this.cadastroEmpresaForm.numero,
      bairro:this.cadastroEmpresaForm.bairro,
      cep:this.cadastroEmpresaForm.cep,
      telefone:this.cadastroEmpresaForm.telefone,
      contato:this.cadastroEmpresaForm.contato,
      email:this.cadastroEmpresaForm.email,
      ramo:this.cadastroEmpresaForm.email,
      bandeira:this.cadastroEmpresaForm.bandeira,
      potencial:this.cadastroEmpresaForm.potencial,
      prestador:this.cadastroEmpresaForm.prestador,
      representante:this.cadastroEmpresaForm.representante,
      plano:this.cadastroEmpresaForm.plano,
      datainicio:this.cadastroEmpresaForm.datainicio,
      datatermino:this.cadastroEmpresaForm.datatermino
  };

  
    //Manda Dados Para O servidor
     this.firebaseProvider.postEmpresa(data)
     .then(() =>{
       var alerta;
       alerta = 2;
       this.presentAlert(alerta); 
       this.paraSpinner();
        })   
    
    .catch ((err) =>{
      var alerta;
      alerta = 3;
      this.presentAlert(alerta);  
      this.paraSpinner();  
  }) 
 }



  // Loading 
  rodarSpinner(){
    this.cadastro = false;
    this.campos = false;
    this.spinner = true;
  }
    //Parar Loading
  paraSpinner(){
    this.cadastro = true;
    this.campos = true;
    this.spinner = false;
    }
  
  //Mostrar Demais Campos Do Formulario  
  mostrarCampos(){
    this.campos = true;
    this.camposocultar = false;
  }
  ocultarCampos(){
    this.campos = false;
    this.camposocultar = true;

  }
  





  //Alerta De Sucesso ou Nao
  async presentAlert(alerta) {
    switch(alerta){
      case 2:{
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message:'Empresa Adicionada Com Sucesso',
          buttons: ['OK']
        });
        await alert.present();
        break;
      }
      case 3:{
        const alert = await this.alertController.create({
          header: 'Ops',
          message:'Essa Empresa Ja Existe',
          buttons: ['OK']
        });
        await alert.present();
        break;
      }
      default:{
        const alert = await this.alertController.create({
          header: 'Ops',
          message:'Alguma Coisa Deu Errada',
          buttons: ['OK']
        });
        await alert.present();
        break;
      }
      }
    }
  ngOnInit() {
  }

}
