export class NewSimulation {
    constructor(titulo, monto, terminoPagoId, fechaInicio, fechaFin, tasa ,usuarioId) {
      this.titulo = titulo;
      this.monto = monto;
      this.terminoPagoId = terminoPagoId;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.tasa = tasa;
      this.usuarioId = usuarioId;
    }
}