export class Simulation {
    constructor(idSimulacion, titulo, monto, terminoPagoId, fechaInicio, fechaFin, tasa ,usuarioId) {
      this.idSimulacion = idSimulacion;
      this.titulo = titulo;
      this.monto = monto;
      this.terminoPagoId = terminoPagoId;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.tasa = tasa;
      this.usuarioId = usuarioId;
    }
}