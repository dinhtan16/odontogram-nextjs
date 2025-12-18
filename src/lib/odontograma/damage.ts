import { Rect } from "./rect";
import { Settings } from "./settings";
import { Constants } from "./constants";

export class Damage {
  public id: number;
  public rect: Rect;
  public direction: number = -1;
  public type: number;
  public origin: string = "0";

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    type: number
  ) {
    this.id = id;
    this.rect = new Rect();
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.type = type;
  }

  setDiagnostic() {
    this.origin = "1";
  }

  drawFractura(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height / 2
      );
    } else {
      context.moveTo(this.rect.x, this.rect.y);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height / 2
      );
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_RED;
    context.stroke();
    context.restore();
  }

  drawDienteAusente(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height * 0.25
      );
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.stroke();
      context.restore();

      context.moveTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height
      );
      context.lineTo(this.rect.x, this.rect.y + this.rect.height * 0.25);
      context.strokeStyle = settings.COLOR_BLUE;
      context.stroke();
    } else {
      context.moveTo(this.rect.x, this.rect.y);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height * 0.75
      );
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.stroke();
      context.restore();

      context.moveTo(this.rect.x + this.rect.width, this.rect.y);
      context.lineTo(this.rect.x, this.rect.y + this.rect.height * 0.75);
      context.strokeStyle = settings.COLOR_BLUE;
      context.stroke();
    }
    context.restore();
  }

  drawPulpar(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    if (this.type === 0) {
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - 10
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2
      );
    } else {
      context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + 10);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2
      );
    }
    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawMigracion(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    const spacer = 5;

    if (this.type === 0) {
      // draw line
      context.moveTo(this.rect.x + spacer, this.rect.y - 5);
      context.lineTo(this.rect.x + this.rect.width - spacer, this.rect.y - 5);
      // upper point
      context.moveTo(this.rect.x + spacer, this.rect.y - 5);
      context.lineTo(this.rect.x + spacer + 4, this.rect.y - 10);
      // lower point
      context.moveTo(this.rect.x + spacer, this.rect.y - 5);
      context.lineTo(this.rect.x + spacer + 4, this.rect.y);
    } else {
      // draw line
      context.moveTo(this.rect.x + spacer, this.rect.y + this.rect.height + 5);
      context.lineTo(
        this.rect.x + this.rect.width - spacer,
        this.rect.y + this.rect.height + 5
      );
      // upper point
      context.moveTo(
        this.rect.x + this.rect.width - spacer,
        this.rect.y + this.rect.height + 5
      );
      context.lineTo(
        this.rect.x + this.rect.width - spacer - 4,
        this.rect.y + this.rect.height + 10
      );
      // upper point
      context.moveTo(
        this.rect.x + this.rect.width - spacer,
        this.rect.y + this.rect.height + 5
      );
      context.lineTo(
        this.rect.x + this.rect.width - spacer - 4,
        this.rect.y + this.rect.height
      );
    }
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawOrtondicoRemovible(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();
    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 10);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y);
    } else {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + 10
      );
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height
      );
    }
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawDienteExtruido(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x + 10, this.rect.y - 5);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y - 5);
      context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y - 15);
    } else {
      context.moveTo(this.rect.x + 10, this.rect.y + this.rect.height + 5);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width - 10,
        this.rect.y + this.rect.height + 5
      );
      context.moveTo(
        this.rect.x + this.rect.width / 2 - 1,
        this.rect.y + this.rect.height + 5
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2 - 1,
        this.rect.y + this.rect.height + 15
      );
    }

    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;
    context.stroke();
    context.fill();
    context.restore();
  }

  drawDienteIntruido(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x + 10, this.rect.y - 10);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 15);
      context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y - 10);
      context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y - 15);
      context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y);
    } else {
      context.moveTo(this.rect.x + 10, this.rect.y + this.rect.height + 10);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + 15
      );
      context.lineTo(
        this.rect.x + this.rect.width - 10,
        this.rect.y + this.rect.height + 10
      );
      context.moveTo(
        this.rect.x + this.rect.width / 2 - 1,
        this.rect.y + this.rect.height + 10
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2 - 1,
        this.rect.y + this.rect.height
      );
    }

    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;
    context.stroke();
    context.fill();
    context.restore();
  }

  drawProtesisRemovible(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y);
      context.moveTo(this.rect.x, this.rect.y - 10);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y - 10);
    } else {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height
      );
      context.moveTo(this.rect.x, this.rect.y + this.rect.height + 10);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height + 10
      );
    }

    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;
    context.stroke();
    context.fill();
    context.restore();
  }

  drawRemanenteRadicular(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();
    context.fillStyle = settings.COLOR_RED;
    context.textAlign = "center";
    context.font = "20px Arial Bold";

    if (this.type === 0) {
      context.fillText(
        "RR",
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2
      );
    } else {
      context.fillText(
        "RR",
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height / 2
      );
    }
    context.font = "10px sans-serif";
    context.restore();
  }

  drawGiroversion(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    const cx = this.rect.x + this.rect.width / 2;
    let cy = this.rect.y;
    const radius = (this.rect.width - 10) / 2;

    if (this.type === 0) {
      context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, false);
      context.moveTo(this.rect.x + this.rect.width - 3, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width - 11, this.rect.y);
      context.moveTo(this.rect.x + this.rect.width - 3, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width - 3, this.rect.y - 8);
    } else {
      cy = this.rect.y + this.rect.height;
      context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, true);
      context.moveTo(this.rect.x + 3, this.rect.y + this.rect.height);
      context.lineTo(this.rect.x + 11, this.rect.y + this.rect.height);
      context.moveTo(this.rect.x + 3, this.rect.y + this.rect.height);
      context.lineTo(this.rect.x + 3, this.rect.y + this.rect.height + 8);
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawPernoMunon(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    const diff = 26;
    const size = this.rect.width - diff;

    if (this.type === 0) {
      context.rect(
        this.rect.x + diff / 2,
        this.rect.y + this.rect.height - size / 2 - size,
        size,
        size
      );
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - size / 2 - size
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - size / 2 - 50
      );
    } else {
      context.rect(this.rect.x + diff / 2, this.rect.y + size / 2, size, size);
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + size / 2 + size
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + size / 2 + 50
      );
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawDienteEnErupcion(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    const pad = 2;

    if (this.type === 0) {
      context.moveTo(this.rect.x + pad, this.rect.y + this.rect.height - 6);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width - pad,
        this.rect.y + this.rect.height - 6
      );
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - 6
      );
      context.lineTo(
        this.rect.x + pad * 3,
        this.rect.y + this.rect.height - 12
      );
      context.lineTo(
        this.rect.x + this.rect.width - pad * 3,
        this.rect.y + this.rect.height - 24
      );
      context.lineTo(
        this.rect.x + pad * 3,
        this.rect.y + this.rect.height - 36
      );
      context.lineTo(
        this.rect.x + this.rect.width - pad * 3,
        this.rect.y + this.rect.height - 48
      );
      context.lineTo(
        this.rect.x + pad * 3,
        this.rect.y + this.rect.height - 60
      );
    } else {
      context.moveTo(this.rect.x + pad, this.rect.y + 6);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width - pad, this.rect.y + 6);
      context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + 6);
      context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 12);
      context.lineTo(this.rect.x + pad * 3, this.rect.y + 24);
      context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 36);
      context.lineTo(this.rect.x + pad * 3, this.rect.y + 48);
      context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 60);
    }

    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawProtesisTotal(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height - 10);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height - 10
      );
      context.moveTo(this.rect.x, this.rect.y + this.rect.height - 15);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height - 15
      );
    } else {
      context.moveTo(this.rect.x, this.rect.y + 10);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y + 10);
      context.moveTo(this.rect.x, this.rect.y + 15);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y + 15);
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawEdentuloTotal(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height - 20);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height - 20
      );
    } else {
      context.moveTo(this.rect.x, this.rect.y + 20);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y + 20);
    }

    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawDienteEnClavija(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    // var space = 40; // Unused
    context.lineWidth = 3;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height);
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - 30
      );
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height
      );
      context.closePath();
    } else {
      context.moveTo(this.rect.x, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + 30);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y);
      context.closePath();
    }

    context.stroke();
    context.restore();
  }

  drawFusion(context: CanvasRenderingContext2D, settings: Settings) {
    const cx = this.rect.x + this.rect.width / 2;
    const radius = (this.rect.width + 5) / 2;

    context.beginPath();
    let cy = 0;
    if (this.type === 0) {
      cy = this.rect.y + (this.rect.height * 3) / 4;
    } else {
      cy = this.rect.y + 10;
    }

    context.ellipse(cx, cy, radius, radius - 15, 0, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawCoronaDefinitiva(context: CanvasRenderingContext2D, settings: Settings) {
    const cx = this.rect.x + this.rect.width / 2;
    let cy = 0;
    const radius = (settings.RECT_DIMEN * 3) / 2;

    context.beginPath();
    if (this.type === 0) {
      cy = this.rect.y + 16;
    } else {
      cy = this.rect.y + this.rect.height - 16;
    }

    context.ellipse(cx, cy, radius, radius, 0, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawCoronaTemporal(context: CanvasRenderingContext2D, settings: Settings) {
    const cx = this.rect.x + this.rect.width / 2;
    let cy = 0;
    const radius = (settings.RECT_DIMEN * 3) / 2;

    context.beginPath();

    if (this.type === 0) {
      cy = this.rect.y + 16;
    } else {
      cy = this.rect.y + this.rect.height - 16;
    }

    context.ellipse(cx, cy, radius, radius, 0, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_RED;
    context.stroke();
    context.restore();
  }

  drawDiastema(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2 + 15,
        this.rect.y + this.rect.height / 2 + this.rect.height / 4,
        13,
        Math.PI * 0.5,
        Math.PI * 1.5,
        false
      );
      context.stroke();

      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2 - 15,
        this.rect.y + this.rect.height / 2 + this.rect.height / 4,
        13,
        Math.PI * 0.5,
        Math.PI * 1.5,
        true
      );
      context.stroke();
    } else {
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2 + 15,
        this.rect.y + this.rect.height / 4,
        13,
        Math.PI * 0.5,
        Math.PI * 1.5,
        false
      );
      context.stroke();

      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2 - 15,
        this.rect.y + this.rect.height / 4,
        13,
        Math.PI * 0.5,
        Math.PI * 1.5,
        true
      );
      context.stroke();
    }

    context.restore();
  }

  drawSuperNumerario(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    if (this.type === 0) {
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2,
        this.rect.y + 20,
        10,
        0,
        Math.PI * 2,
        false
      );
      context.stroke();
      context.textAlign = "center";
      context.fillStyle = settings.COLOR_BLUE;
      context.font = "16px Arial Bold";
      context.fillText(
        "S",
        this.rect.x + this.rect.width / 2,
        this.rect.y + 25
      );
      context.restore();
    } else {
      context.lineWidth = 2;
      context.strokeStyle = settings.COLOR_BLUE;
      context.beginPath();
      context.arc(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - 20,
        10,
        0,
        Math.PI * 2,
        false
      );
      context.stroke();
      context.textAlign = "center";
      context.fillStyle = settings.COLOR_BLUE;
      context.font = "16px Arial Bold";
      context.fillText(
        "S",
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height - 15
      );
      context.restore();
    }
    context.restore();
  }

  drawOrtodonticoFijoEnd(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.rect(
        this.rect.x + 10,
        this.rect.y - this.rect.width + 20,
        this.rect.width - 20,
        this.rect.width - 20
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y - this.rect.width + 25
      );
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 5);
      context.stroke();
      context.moveTo(
        this.rect.x + 15,
        this.rect.y - (this.rect.width - 20) / 2
      );
      context.lineTo(
        this.rect.x + this.rect.width - 15,
        this.rect.y - (this.rect.width - 20) / 2
      );
      context.stroke();
    } else {
      context.rect(
        this.rect.x + 10,
        this.rect.y + this.rect.height,
        this.rect.width - 20,
        this.rect.width - 20
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + 5
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + this.rect.width - 25
      );
      context.stroke();
      context.moveTo(
        this.rect.x + 15,
        this.rect.y + this.rect.height + (this.rect.width - 20) / 2
      );
      context.lineTo(
        this.rect.x + this.rect.width - 15,
        this.rect.y + this.rect.height + (this.rect.width - 20) / 2
      );
      context.stroke();
    }

    context.restore();
  }

  drawOrtodonticoFijoCenter(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.beginPath();
      context.moveTo(
        this.rect.x - 10,
        this.rect.y - (this.rect.width - 20) / 2
      );
      context.lineTo(
        this.rect.x + this.rect.width + 10,
        this.rect.y - (this.rect.width - 20) / 2
      );
      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(
        this.rect.x - 10,
        this.rect.y + this.rect.height + (this.rect.width - 20) / 2
      );
      context.lineTo(
        this.rect.x + this.rect.width + 10,
        this.rect.y + this.rect.height + (this.rect.width - 20) / 2
      );
      context.stroke();
    }

    context.restore();
  }

  drawProtesisFijaRight(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 15);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y - 15);
    } else {
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + 15
      );
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height + 15
      );
    }

    context.stroke();
    context.restore();
  }

  drawProtesisFijaCenter(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.moveTo(this.rect.x, this.rect.y - 15);
      context.lineTo(this.rect.x + this.rect.width, this.rect.y - 15);
    } else {
      context.moveTo(this.rect.x, this.rect.y + this.rect.height + 15);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.rect.y + this.rect.height + 15
      );
    }

    context.stroke();
    context.restore();
  }

  drawProtesisFijaLeft(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === 0) {
      context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y);
      context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 15);
      context.lineTo(this.rect.x, this.rect.y - 15);
    } else {
      context.moveTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width / 2,
        this.rect.y + this.rect.height + 15
      );
      context.lineTo(this.rect.x, this.rect.y + this.rect.height + 15);
    }

    context.stroke();
    context.restore();
  }

  drawTransposicionLeft(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();

    const cx = this.rect.x + this.rect.width * 0.75;
    let cy = this.rect.y;
    const radiusX = this.rect.width / 2;
    const radiusY = 10;

    if (this.type === 0) {
      context.ellipse(cx, cy, radiusX, radiusY, 0, Math.PI, 2 * Math.PI, false);
      context.moveTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y - 8
      );
      context.moveTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2 - 8,
        this.rect.y
      );
    } else {
      cy = this.rect.y + this.rect.height;
      context.ellipse(cx, cy, radiusX, radiusY, 0, Math.PI, 2 * Math.PI, true);
      context.moveTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y + this.rect.height + 8
      );
      context.moveTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.75 + this.rect.width / 2 - 8,
        this.rect.y + this.rect.height
      );
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawTransposicionRight(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    context.beginPath();

    const cx = this.rect.x + this.rect.width * 0.25;
    let cy = this.rect.y;
    const radiusX = this.rect.width / 2;
    const radiusY = 10;

    if (this.type === 0) {
      context.ellipse(cx, cy, radiusX, radiusY, 0, Math.PI, 2 * Math.PI, false);
      context.moveTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y - 8
      );
      context.moveTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2 + 8,
        this.rect.y
      );
    } else {
      cy = this.rect.y + this.rect.height;
      context.ellipse(cx, cy, radiusX, radiusY, 0, Math.PI, 2 * Math.PI, true);
      context.moveTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y + this.rect.height + 8
      );
      context.moveTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2,
        this.rect.y + this.rect.height
      );
      context.lineTo(
        this.rect.x + this.rect.width * 0.25 - this.rect.width / 2 + 8,
        this.rect.y + this.rect.height
      );
    }

    context.lineWidth = 2;
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();
  }

  drawDienteDiscomico(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "DIS",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawDienteEctopico(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "E",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawImpactacion(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "I",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawImplante(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "IMP",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawMacrodoncia(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "MAC",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawMicrodonica(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "MIC",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawSemiImpactaion(context: CanvasRenderingContext2D, settings: Settings) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "SI",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  drawSuperficieDesgastada(
    context: CanvasRenderingContext2D,
    settings: Settings
  ) {
    this.rect.highlightWithColor(context, "#ffffff", 1);
    context.textAlign = "center";
    context.fillStyle = settings.COLOR_BLUE;
    context.fillText(
      "DES",
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.restore();
  }

  render(
    context: CanvasRenderingContext2D,
    settings: Settings,
    constants: Constants
  ) {
    if (this.origin === "0") {
      if (this.id === constants.FRACTURA) {
        this.drawFractura(context, settings);
      }
      if (this.id === constants.DIENTE_AUSENTE) {
        this.drawDienteAusente(context, settings);
      }
      if (this.id === constants.PULPAR) {
        this.drawPulpar(context, settings);
      }
      if (this.id === constants.MIGRACION) {
        this.drawMigracion(context, settings);
      }
      if (this.id === constants.ORTONDICO_REMOVIBLE) {
        this.drawOrtondicoRemovible(context, settings);
      }
      if (this.id === constants.DIENTE_EXTRUIDO) {
        this.drawDienteExtruido(context, settings);
      }
      if (this.id === constants.DIENTE_INTRUIDO) {
        this.drawDienteIntruido(context, settings);
      }
      if (this.id === constants.PROTESIS_REMOVIBLE) {
        this.drawProtesisRemovible(context, settings);
      }
      if (this.id === constants.REMANENTE_RADICULAR) {
        this.drawRemanenteRadicular(context, settings);
      }
      if (this.id === constants.GIROVERSION) {
        this.drawGiroversion(context, settings);
      }
      if (this.id === constants.PERNO_MUNON) {
        this.drawPernoMunon(context, settings);
      }
      if (this.id === constants.DIENTE_EN_ERUPCION) {
        this.drawDienteEnErupcion(context, settings);
      }
      if (this.id === constants.PROTESIS_TOTAL) {
        this.drawProtesisTotal(context, settings);
      }
      if (this.id === constants.EDENTULOA_TOTAL) {
        this.drawEdentuloTotal(context, settings);
      }
      if (this.id === constants.DIENTE_EN_CLAVIJA) {
        this.drawDienteEnClavija(context, settings);
      }
      if (this.id === constants.FUSION) {
        this.drawFusion(context, settings);
      }
      if (this.id === constants.CORONA_DEFINITIVA) {
        this.drawCoronaDefinitiva(context, settings);
      }
      if (this.id === constants.CORONA_TEMPORAL) {
        this.drawCoronaTemporal(context, settings);
      }
      if (this.id === constants.DIASTEMA) {
        this.drawDiastema(context, settings);
      }
      if (this.id === constants.SUPER_NUMERARIO) {
        this.drawSuperNumerario(context, settings);
      }
      if (this.id === constants.ORTODONTICO_FIJO_END) {
        this.drawOrtodonticoFijoEnd(context, settings);
      }
      if (this.id === constants.ORTODONTICO_FIJO_CENTER) {
        this.drawOrtodonticoFijoCenter(context, settings);
      }
      if (this.id === constants.PROTESIS_FIJA_RIGHT) {
        this.drawProtesisFijaRight(context, settings);
      }
      if (this.id === constants.PROTESIS_FIJA_CENTER) {
        this.drawProtesisFijaCenter(context, settings);
      }
      if (this.id === constants.PROTESIS_FIJA_LEFT) {
        this.drawProtesisFijaLeft(context, settings);
      }
      if (this.id === constants.TRANSPOSICION_LEFT) {
        this.drawTransposicionLeft(context, settings);
      }
      if (this.id === constants.TRANSPOSICION_RIGHT) {
        this.drawTransposicionRight(context, settings);
      }
      if (this.id === constants.DIENTE_DISCR0MICO) {
        this.drawDienteDiscomico(context, settings);
      }
      if (this.id === constants.IMPACTACION) {
        this.drawImpactacion(context, settings);
      }
      if (this.id === constants.DIENTE_ECTOPICO) {
        this.drawDienteEctopico(context, settings);
      }
      if (this.id === constants.IMPLANTE) {
        this.drawImplante(context, settings);
      }
      if (this.id === constants.MACRODONCIA) {
        this.drawMacrodoncia(context, settings);
      }
      if (this.id === constants.MICRODONCIA) {
        this.drawMicrodonica(context, settings);
      }
      if (this.id === constants.SEMI_IMPACTACI0N) {
        this.drawSemiImpactaion(context, settings);
      }
      if (this.id === constants.SUPERFICIE_DESGASTADA) {
        this.drawSuperficieDesgastada(context, settings);
      }
    } else {
      console.log("Will render diagnostic");
    }

    if (settings.DEBUG) {
      this.rect.highlight(context, settings);
    }
  }
}
