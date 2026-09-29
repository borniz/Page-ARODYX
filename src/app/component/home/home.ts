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
  estaEnviando: boolean = false;
  formularioEnviado: boolean = false;
  datosContacto = { tipoNegocio: '', nombre: '', whatsapp: '', mensaje: '' };

  // Control de WhatsApp Flotante
  mostrarMenuWhatsapp: boolean = false;
  numeroTelefono: string = '573134398489';

  // ESTRUCTURA DE PLANES ERP (Extraídos de tus capturas de pantalla)
  planesERP = [
    {
      nombre: 'Básica',
      descripcion: 'Control esencial de inventario y ventas físicas.',
      precioMensual: 49900,
      caracteristicas: ['Productos e Inventario', 'Clientes y Ventas', 'Facturación PDF', 'Envío por correo', 'Dashboard básico', '2 usuarios / 1 bodega']
    },
    {
      nombre: 'Profesional',
      descripcion: 'Gestión comercial avanzada y tesorería en tiempo real.',
      precioMensual: 89900,
      caracteristicas: ['Todo lo anterior +', 'Compras y proveedores', 'Caja y tesorería', 'Cartera y cobranza', 'Punto de Venta (POS)', 'Reportes detallados', '5 usuarios / 3 cajas']
    },
    {
      nombre: 'Avanzado',
      descripcion: 'Contabilidad integrada y automatización multi-sucursal.',
      precioMensual: 149900,
      caracteristicas: ['Todo lo anterior +', 'Contabilidad automatizada', 'Módulo CRM', 'Multi-sede y Multi-bodega', 'Usuarios y roles avanzados', 'Auditoría y Reportes BI', '10 usuarios / API Básica']
    },
    {
      nombre: 'Empresarial',
      descripcion: 'Infraestructura total a la medida para grandes corporaciones.',
      precioMensual: 249900,
      caracteristicas: ['Usuarios ilimitados', 'Bodegas y sedes según necesidad', 'API empresarial completa', 'Integraciones a medida', 'Automatizaciones complejas', 'Soporte prioritario 24/7', 'Personalizaciones de interfaz']
    }
  ];

  // ESTRUCTURA DE SERVICIOS DESARROLLO WEB
  serviciosWeb = [
    { titulo: 'Página Web Básica', precioMensual: 39900, implementacion: '799.000', caracteristicas: ['Diseño responsive', 'Vista Inicio, Nosotros y Servicios', 'Formulario y botón de WhatsApp', 'Google Maps integrado'] },
    { titulo: 'Página Web Profesional', precioMensual: 59900, implementacion: '1.499.000', caracteristicas: ['Todo lo anterior +', 'Diseño 100% personalizado', 'Catálogo de productos', 'Galería y Blog de contenidos', 'SEO Estructurado y Analytics'] },
    { titulo: 'Tienda Online (E-commerce)', precioMensual: 79900, implementacion: '2.499.000', caracteristicas: ['Catálogo autogestionable', 'Carrito de compras y pasarela de pago', 'Gestión de clientes y pedidos', 'Hosting, Dominio y SSL incluidos'] }
  ];

  // SECCIÓN DE PREGUNTAS FRECUENTES (Interactiva)
  faqs = [
    { pregunta: '¿La Página Web Básica incluye algún módulo ERP?', respuesta: 'No. Como se detalla en nuestra estructura comercial, las páginas web son soluciones independientes de marketing. Si deseas controlar inventarios o automatizar gastos, debes adquirir un Plan ERP o solicitar una integración.', abierta: false },
    { pregunta: '¿Cómo funciona el pago por módulo en los sistemas ERP?', respuesta: 'Nuestra arquitectura es modular. Esto significa que no estás amarrado a un paquete inflado. Puedes iniciar con el plan Básico y añadir módulos específicos de contabilidad o CRM en el futuro pagando solo por lo que usas.', abierta: false },
    { origin: '¿La información de mi negocio está segura en la nube?', respuesta: 'Completamente. Tus catálogos de productos, costos e históricos financieros se encriptan con certificados SSL de nivel bancario y se realizan respaldos automáticos diarios.', abierta: false }
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
    this.estaEnviando = true;
    setTimeout(() => {
      this.estaEnviando = false;
      this.formularioEnviado = true;
      this.pasoActual = 3;
    }, 1800);
  }

  abrirWhatsapp(entidad: string) {
    const texto = `Hola ARODYX, me interesa recibir una cotización detallada sobre el servicio: ${entidad}. Quedo atento a la asesoría.`;
    window.open(`https://wa.me/${this.numeroTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
    this.mostrarMenuWhatsapp = false;
  }
}
