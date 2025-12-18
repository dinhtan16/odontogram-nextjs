/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from "./settings";
import { Constants } from "./constants";

export interface Renderable {
  render(
    context: CanvasRenderingContext2D,
    settings: Settings,
    constants: Constants
  ): void;
}

export class Renderer {
  public context: CanvasRenderingContext2D | null = null;
  public width: number = 0;
  public height: number = 0;
  public settings: Settings | null = null;

  constructor() {}

  drawSplash() {
    if (!this.context) return;
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.textAlign = "center";
    this.context.fillStyle = "#000000";
    this.context.font = "32px Arial Bold";
    this.context.fillText("OdontoGraph", this.width / 2, this.height / 2 - 16);
    this.context.font = "24px Arial Bold";
    this.context.fillStyle = "#000000";
    const year = new Date().getFullYear();
    this.context.fillText(
      "Bardur Thomsen - " + year,
      this.width / 2,
      this.height / 2 + 40
    );
  }

  init(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.drawSplash();
  }

  clear(settings: Settings) {
    if (!this.context) return;
    if (settings.DEBUG) {
      this.context.fillStyle = "#e6fff3";
    } else {
      this.context.fillStyle = "#ffffff";
    }
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.context.restore();
  }

  render(data: Renderable[], settings: Settings, constants: Constants) {
    if (!this.context) return;
    for (let i = 0; i < data.length; i++) {
      data[i].render(this.context, settings, constants);
    }
  }

  renderText(text: string, x: number, y: number, color: string = "#000000") {
    if (!this.context) return;
    this.context.textAlign = "left";
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  renderText14(text: string, x: number, y: number, color: string = "#000000") {
    if (!this.context) return;
    this.context.font = "14px Arial";
    this.context.textAlign = "left";
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  renderNameValueTabbed(
    name: string,
    value: string,
    tab: number,
    x: number,
    y: number,
    color: string = "#000000"
  ) {
    if (!this.context) return;
    this.context.font = "14px Arial";
    let text = name;
    for (let i = 0; i < tab; i++) {
      text += "\t";
    }
    text += value;
    this.context.textAlign = "left";
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  renderTextCenter(
    text: string,
    x: number,
    y: number,
    color: string = "#000000"
  ) {
    if (!this.context) return;
    this.context.textAlign = "center";
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  renderTextCenter16(
    text: string,
    x: number,
    y: number,
    color: string = "#000000"
  ) {
    if (!this.context) return;
    this.context.font = "16px Arial Bold";
    this.context.textAlign = "center";
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  setSettings(settings: Settings) {
    this.settings = settings;
  }

  setCanvasSize(width: number, height: number) {
    if (this.context) {
      this.context.canvas.width = width;
      this.context.canvas.height = height;
    }
  }

  wrapText(
    text: any,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number
  ) {
    // ... (copy implementation)
    if (!this.context) return;
    const input = text.toString();
    const words = input.split(" ");
    let line = "";
    let lineNumber = 1;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = this.context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.renderText(line, x, y, "#000000");
        line = words[n] + " ";
        y += lineHeight;
        lineNumber++;
      } else {
        line = testLine;
      }
      if (lineNumber > maxLines) {
        break;
      }
    }
    this.renderText(line, x, y, "#000000");
  }

  drawImage(
    src: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    if (!this.context) return;
    this.context.drawImage(src, x, y, width, height);
  }
}
