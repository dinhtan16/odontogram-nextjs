import { Rect } from "./rect";
import { TextBox } from "./textBox";
import { Settings } from "./settings";
import { Constants } from "./constants";

export class MenuItem {
  public active: boolean = false;
  public id: number = 0;
  public tooth: boolean = true;
  public surfaces: number = 0;
  public highlight: boolean = false;
  public rect: Rect = new Rect();
  public textBox: TextBox = new TextBox();
  public spacer: number = 20;
  public touching: boolean = false;
  public address: number = 0;
  public normalY: number | null = null;
  public highY: number | null = null;
  public blocked: boolean = false;
  public constants: Constants | null = null;

  constructor() {}

  setUp(x: number, y: number, width: number, height: number) {
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

    this.textBox.rect.x = x;
    this.textBox.rect.y = y;
    this.textBox.rect.width = width;
    this.textBox.rect.height = height;
  }

  render(
    context: CanvasRenderingContext2D,
    settings: Settings,
    constants: Constants
  ) {
    if (this.active) {
      this.renderStateActive(context);
    } else {
      this.renderStateNormal(context);
    }

    if (this.highlight) {
      this.renderStateFocus(context);
    }

    this.renderLabel(context);
  }

  renderStateNormal(context: CanvasRenderingContext2D) {
    const portion = this.rect.height / 5;
    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = "#ebf3f5";
    context.fillRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );

    context.fillStyle = "#f9fbfc";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, portion);

    context.fillStyle = "#f9f9f9";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, 1);

    context.fillStyle = "#e5eef1";
    context.fillRect(
      this.rect.x,
      this.rect.y + portion * 4,
      this.rect.width,
      portion
    );

    context.fillStyle = "#e9eef0";
    context.fillRect(
      this.rect.x,
      this.rect.y + (this.rect.height - 1),
      this.rect.width,
      1
    );

    context.globalAlpha = 1;
    this.rect.outline(context, "#35353f");
    context.restore();
  }

  renderStateActive(context: CanvasRenderingContext2D) {
    const portion = this.rect.height / 5;
    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = "#ace8d1";
    context.fillRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );

    context.fillStyle = "#bef7e1";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, portion);

    context.fillStyle = "#dafff1";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, 1);

    context.fillStyle = "#8fd6bb";
    context.fillRect(
      this.rect.x,
      this.rect.y + portion * 4,
      this.rect.width,
      portion
    );

    context.fillStyle = "#6db096";
    context.fillRect(
      this.rect.x,
      this.rect.y + (this.rect.height - 1),
      this.rect.width,
      1
    );

    context.globalAlpha = 1;
    this.rect.outline(context, "#35353f");
    context.restore();
  }

  renderStateFocus(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.globalAlpha = 0.5;
    context.fillStyle = "#b2dee7";
    context.fillRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );
    context.globalAlpha = 1.0;
    this.rect.outline(context, "#35353f");
    context.restore();
  }

  renderLabel(context: CanvasRenderingContext2D) {
    context.globalAlpha = 1;
    context.textAlign = "center";
    context.fillStyle = "#35353f";
    context.font = "13px Arial";

    context.fillText(
      this.textBox.text,
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height - 4
    );
    context.stroke();
    context.restore();
  }
}
