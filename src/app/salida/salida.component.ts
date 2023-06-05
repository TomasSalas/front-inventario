import { Component } from '@angular/core';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})

export class SalidaComponent {
  title = 'front-inventario';
  fecha = ""
  select_usuario : any = ""
  showAlert: boolean = false;
  messageAlert: string = "";
  oneStep: boolean = true
  secondStep: boolean = false
  select_producto: any = ""
  arrayProducto: any = []
  arrayProductoView: any = []
  nameProducto: any = 0;
  cantidad: number = 0;
  filteredProductos: any[] = [];
  porce:number = 50;

  productos = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' }
  ];
  
  usuarios = [
    { id: 1, name: 'Tomas Salas' },
    { id: 2, name: 'Maximiliano Vera' },
    { id: 3, name: 'Ricardo Valenzuela' }
  ];

  checkValidity() {
    if (this.fecha.trim() === '') {
      this.showAlert = true;
      this.messageAlert = "Debe seleccionar una fecha";
      setTimeout(() => {
        this.showAlert = false;
      }, 2000)
      return
    }

    if (this.select_usuario === '' || this.select_usuario === null) {
      this.showAlert = true;
      this.messageAlert = "Debe seleccionar un usuario";
      setTimeout(() => {
        this.showAlert = false;
      }, 2000)
      return
    } 
    
    return true;
  }
  
  nextStep(){
    this.checkValidity()
    if(!this.checkValidity()){
      return
    }
    this.oneStep = false
    this.secondStep = true
    this.porce = 100
  }

  addProducto(){
    const nameProducto = this.productos.find(producto => producto.id == this.select_producto)
    this.nameProducto = nameProducto?.name

    let products = {
      "id": this.select_producto,
      "cantidad":this.cantidad
    }

    let productsView = {
      "nombre": this.nameProducto,
      "cantidad":this.cantidad
    }

    this.arrayProductoView.push(productsView)
    this.arrayProducto.push(products)

    this.select_producto = ''
    this.cantidad = 0
  }
}
