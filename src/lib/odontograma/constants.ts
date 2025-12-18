export class Constants {
  // Damages for drawing
  public readonly CARIES = 1;
  public readonly CORONA_DEFINITIVA = 2;
  public readonly CORONA_TEMPORAL = 3;
  public readonly DIENTE_AUSENTE = 4;
  public readonly FRACTURA = 5;
  public readonly DIASTEMA = 8;
  public readonly DIENTE_EXTRUIDO = 9;
  public readonly DIENTE_EN_CLAVIJA = 10;
  public readonly CURACION = 11;
  public readonly PROTESIS_REMOVIBLE = 12;
  public readonly MIGRACION = 13;
  public readonly GIROVERSION = 14;
  public readonly FUSION = 15;
  public readonly REMANENTE_RADICULAR = 16;
  public readonly DIENTE_INTRUIDO = 20;
  public readonly ORTONDICO_REMOVIBLE = 23;
  public readonly DIENTE_EN_ERUPCION = 24;
  public readonly TRANSPOSICION_LEFT = 25;
  public readonly TRANSPOSICION_RIGHT = 26;
  public readonly SUPER_NUMERARIO = 27;
  public readonly PULPAR = 28;
  public readonly PROTESIS_TOTAL = 29;
  public readonly PERNO_MUNON = 30;
  public readonly EDENTULOA_TOTAL = 31;
  public readonly ORTODONTICO_FIJO_END = 32;
  public readonly ORTODONTICO_FIJO_CENTER = 33;
  public readonly PROTESIS_FIJA_LEFT = 34;
  public readonly PROTESIS_FIJA_CENTER = 35;
  public readonly PROTESIS_FIJA_RIGHT = 36;

  // Damages for writing
  public readonly IMPLANTE = 6;
  public readonly MACRODONCIA = 17;
  public readonly MICRODONCIA = 18;
  public readonly IMPACTACION = 19;
  public readonly DIENTE_ECTOPICO = 21;
  public readonly DIENTE_DISCR0MICO = 22;
  public readonly SUPERFICIE_DESGASTADA = 37;
  public readonly SEMI_IMPACTACI0N = 38;

  public readonly all: number[] = [
    this.CARIES,
    this.CORONA_DEFINITIVA,
    this.CORONA_TEMPORAL,
    this.DIENTE_AUSENTE,
    this.FRACTURA,
    this.DIASTEMA,
    this.DIENTE_EXTRUIDO,
    this.DIENTE_EN_CLAVIJA,
    this.CURACION,
    this.PROTESIS_REMOVIBLE,
    this.MIGRACION,
    this.GIROVERSION,
    this.FUSION,
    this.REMANENTE_RADICULAR,
    this.DIENTE_INTRUIDO,
    this.ORTONDICO_REMOVIBLE,
    this.DIENTE_EN_ERUPCION,
    this.TRANSPOSICION_LEFT,
    this.TRANSPOSICION_RIGHT,
    this.SUPER_NUMERARIO,
    this.PULPAR,
    this.PROTESIS_TOTAL,
    this.PERNO_MUNON,
    this.EDENTULOA_TOTAL,
    this.ORTODONTICO_FIJO_END,
    this.ORTODONTICO_FIJO_CENTER,
    this.PROTESIS_FIJA_LEFT,
    this.PROTESIS_FIJA_CENTER,
    this.PROTESIS_FIJA_RIGHT,
    this.IMPLANTE,
    this.MACRODONCIA,
    this.MICRODONCIA,
    this.IMPACTACION,
    this.DIENTE_ECTOPICO,
    this.DIENTE_DISCR0MICO,
    this.SUPERFICIE_DESGASTADA,
    this.SEMI_IMPACTACI0N,
  ];

  /**
   * Method to check if a damage is writable, is text only
   * @param {number} arg id of the damage
   * @returns {boolean} true if this damage is only text, else false
   */
  public isWritable(arg: number): boolean {
    let match = false;

    if (arg === this.DIENTE_DISCR0MICO) {
      match = true;
    } else if (arg === this.DIENTE_ECTOPICO) {
      match = true;
    } else if (arg === this.IMPACTACION) {
      match = true;
    } else if (arg === this.IMPLANTE) {
      match = true;
    } else if (arg === this.MACRODONCIA) {
      match = true;
    } else if (arg === this.MICRODONCIA) {
      match = true;
    } else if (arg === this.SEMI_IMPACTACI0N) {
      match = true;
    } else if (arg === this.SUPERFICIE_DESGASTADA) {
      match = true;
    }

    return match;
  }

  public isDiagnostic(arg: number): boolean {
    return this.all.includes(arg);
  }
}
