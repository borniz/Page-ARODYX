import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule,FormsModule],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { 
  categoriaActiva: string = 'ferreteria';
  menuMovilAbierto: boolean = false;
  
  // CONTROL DE PRECIOS: false = Mensual, true = Anual
  facturacionAnual: boolean = false;

  // Lógica del Formulario por Pasos
  pasoActual: number = 1;
  datosContacto = { tipoNegocio: '', nombre: '', whatsapp: '', mensaje: '' };

  // Control de WhatsApp Flotante
  mostrarMenuWhatsapp: boolean = false;
  numeroTelefono: string = '573134398489';

  // En lanzamiento, todos los planes incluyen los mismos módulos; solo cambia el límite de roles.
  planesERP = [
    {
      nombre: 'Básico',
      descripcion: 'Para comenzar a organizar la operación de tu negocio.',
      roles: '2 roles'
    },
    {
      nombre: 'Profesional',
      descripcion: 'Para equipos que necesitan trabajar de forma coordinada.',
      roles: '5 roles'
    },
    {
      nombre: 'Avanzado',
      descripcion: 'Para negocios con más personal y una operación activa.',
      roles: '10 roles'
    },
    {
      nombre: 'Empresarial',
      descripcion: 'Para operaciones con equipos de más de diez personas.',
      roles: '11+ roles'
    }
  ];

  negociosERP = [
    { nombre: 'Taller', detalle: 'Autos, motos o servicio mixto', icono: '🔧', precios: [59900, 99900, 159900, 239900] },
    { nombre: 'Ferretería', detalle: 'Inventario y venta de mostrador', icono: '🧰', precios: [69900, 119900, 189900, 279900] },
    { nombre: 'Autolavado', detalle: 'Servicios, turnos y operación diaria', icono: '🚘', precios: [49900, 79900, 129900, 199900] },
    { nombre: 'Supermercado', detalle: 'Alto movimiento de productos y ventas', icono: '🛒', precios: [89900, 149900, 239900, 349900] },
    { nombre: 'Panadería', detalle: 'Producción, productos y ventas', icono: '🥖', precios: [59900, 99900, 159900, 239900] },
    { nombre: 'Restaurante', detalle: 'Atención, pedidos y control del negocio', icono: '🍽️', precios: [69900, 119900, 189900, 279900] }
  ];
  negocioSeleccionado = this.negociosERP[0];

  // ESTRUCTURA DE SERVICIOS DESARROLLO WEB
  serviciosWeb = [
    { titulo: 'Página Web Básica', precioMensual: 39900, implementacion: '799.000', caracteristicas: ['Diseño responsive', 'Vista Inicio, Nosotros y Servicios', 'Formulario y botón de WhatsApp', 'Google Maps integrado'] },
    { titulo: 'Página Web Profesional', precioMensual: 59900, implementacion: '1.499.000', caracteristicas: ['Todo lo anterior +', 'Diseño 100% personalizado', 'Catálogo de productos', 'Galería y Blog de contenidos', 'SEO Estructurado y Analytics'] },
    { titulo: 'Tienda Online (E-commerce)', precioMensual: 79900, implementacion: '2.499.000', caracteristicas: ['Catálogo autogestionable', 'Carrito de compras y pasarela de pago', 'Gestión de clientes y pedidos', 'Hosting, Dominio y SSL incluidos'] }
  ];

  // SECCIÓN DE PREGUNTAS FRECUENTES (Interactiva)
  faqs = [
    { pregunta: '¿La Página Web Básica incluye algún módulo ERP?', respuesta: 'No. Como se detalla en nuestra estructura comercial, las páginas web son soluciones independientes de marketing. Si deseas controlar inventarios o automatizar gastos, debes adquirir un Plan ERP o solicitar una integración.', abierta: false },
    { pregunta: '¿Qué incluyen los planes ERP?', respuesta: 'Durante el lanzamiento, todos los planes incluyen las mismas funcionalidades y módulos. El precio cambia según el tipo de negocio y el plan seleccionado determina cuántos roles puedes crear: 2, 5, 10 o más de 10.', abierta: false },
    { pregunta: '¿La información de mi negocio está segura en la nube?', respuesta: 'Completamente. Tus catálogos de productos, costos e históricos financieros se encriptan con certificados SSL de nivel bancario y se realizan respaldos automáticos diarios.', abierta: false }
  ];

  // Métodos de control
  cambiarCategoria(categoria: string) { this.categoriaActiva = categoria; }
  toggleMenuMovil() { this.menuMovilAbierto = !this.menuMovilAbierto; }
  toggleFaq(index: number) { this.faqs[index].abierta = !this.faqs[index].abierta; }
  toggleMenuWhatsapp() { this.mostrarMenuWhatsapp = !this.mostrarMenuWhatsapp; }

  seleccionarNegocio(tipo: string) {
    this.datosContacto.tipoNegocio = tipo;
    this.pasoActual = 2;
  }

  cambiarPaso(paso: number) { this.pasoActual = paso; }

  // Calcular precio con descuento del 15% si es anual
  obtenerPrecioFormateado(precioMensual: number, esPlanERP: boolean): string {
    if (this.facturacionAnual) {
      const anualConDescuento = (precioMensual * 12) * 0.85;
      return Math.round(anualConDescuento).toLocaleString('es-CO');
    }
    return precioMensual.toLocaleString('es-CO');
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    const texto = [
      'Hola ARODYX, quiero agendar una demo personalizada.',
      `Negocio: ${this.datosContacto.tipoNegocio || 'No especificado'}`,
      `Nombre o empresa: ${this.datosContacto.nombre}`,
      `WhatsApp de contacto: ${this.datosContacto.whatsapp}`
    ].join('\n');
    window.open(`https://wa.me/${this.numeroTelefono}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
    this.pasoActual = 3;
  }

  abrirWhatsapp(entidad: string) {
    const texto = `Hola ARODYX, me interesa recibir una cotización detallada sobre el servicio: ${entidad}. Quedo atento a la asesoría.`;
    window.open(`https://wa.me/${this.numeroTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
    this.mostrarMenuWhatsapp = false;
  }
}
