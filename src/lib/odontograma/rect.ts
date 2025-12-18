import { Settings } from "./settings";

export class Rect {
  public id: string = "";
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public state: number = 0;
  public touching: boolean = false;

  constructor() {}

  cavity() {
    this.state = 1;
  }

  restoration() {
    this.state = 11;
  }

  uncheck() {
    this.state = 0;
  }

  checkCollision(cursX: number, cursY: number): boolean {
    let collision = false;
    if (cursX > this.x) {
      if (cursY > this.y) {
        if (cursX < this.x + this.width) {
          if (cursY < this.y + this.height) {
            collision = true;
          }
        }
      }
    }
    return collision;
  }

  highlight(context: CanvasRenderingContext2D, settings: Settings) {
    context.beginPath();
    context.globalAlpha = 0.4;
    context.fillStyle = settings.COLOR_ON_TOUCH;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.globalAlpha = 1;
    // context.restore(); // Original had restore, keeping commented or active? I'll keep active if original had it.
    context.restore();
  }

  highlightWithColor(
    context: CanvasRenderingContext2D,
    color: string,
    alpha: number
  ) {
    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.globalAlpha = 1;
    context.restore();
  }

  outline(context: CanvasRenderingContext2D, color: string) {
    context.beginPath();
    context.lineWidth = 1;
    context.globalAlpha = 1;
    context.strokeStyle = color;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.restore();
  }

  highlightEllipse(
    context: CanvasRenderingContext2D,
    color: string,
    alpha: number,
    padding: number = 0
  ) {
    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.ellipse(
      this.x + this.width / 2,
      this.y + this.height / 2,
      (this.width - padding) / 2,
      (this.height - padding) / 2,
      0,
      0,
      2 * Math.PI
    );
    context.fill();
    context.globalAlpha = 1;
    context.restore();
  }

  fillColor(context: CanvasRenderingContext2D, color: string) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
    context.stroke();
    context.restore();
  }
}
