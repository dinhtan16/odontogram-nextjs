import { Rect } from "./rect";

export class TextBox {
  public text: string = "";
  public label: string = "";
  public rect: Rect;
  public touching: boolean = false;

  constructor() {
    this.rect = new Rect();
  }

  setDimens(x: number, y: number, width: number, height: number) {
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.text = "";
    this.label = "";
  }

  setText(text: string) {
    this.text = text;
  }

  setLabel(label: string) {
    this.label = label;
  }

  drawLabel(context: CanvasRenderingContext2D) {
    this.rect.outline(context, "#000000");
    context.beginPath();
    context.textAlign = "center";
    context.fillStyle = "#9a9a9a";
    context.font = "11px Arial";
    context.fillText(
      this.label,
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.stroke();
    context.restore();
  }

  drawText(context: CanvasRenderingContext2D, color: string) {
    context.beginPath();
    // if there is text, create a white background
    if (this.text !== "") {
      context.fillStyle = "#ffffff";
      context.fillRect(
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height
      );
    }
    this.rect.outline(context, "#000000");
    context.textAlign = "center";
    context.fillStyle = color;
    context.font = "13px Arial";
    context.fillText(
      this.text,
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.stroke();
    context.restore();
  }

  render(context: CanvasRenderingContext2D, color: string) {
    this.drawText(context, color);
  }

  setNote(note: string) {
    this.text = note.toUpperCase();
  }
}
