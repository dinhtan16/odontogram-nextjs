/* eslint-disable no-var */
import { Rect } from "./rect";
import { TextBox } from "./textBox";
import { Damage } from "./damage";
import { Settings } from "./settings";
import { Constants } from "./constants";

export class Tooth {
  public id: number = 0;
  public tooth: boolean = true;
  public surfaces: number = 0;
  public highlight: boolean = false;
  public highlightColor: string = "";
  public damages: Damage[] = [];
  public checkBoxes: Rect[] = [];
  public rect: Rect = new Rect();
  public textBox: TextBox = new TextBox();
  public spacer: number = 20;
  public touching: boolean = false;
  public address: number = 0;
  public normalY: number = 0;
  public highY: number = 0;
  public blocked: boolean = false;
  public constants: Constants | null = null;
  public type: number = 0;
  public y: number = 0;
  public image: HTMLImageElement | undefined;

  constructor() {}

  setDimens(x: number, y: number, width: number, height: number) {
    this.y = y;
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.normalY = y;
    this.textBox.setDimens(x, y, width, 20);
    this.textBox.setLabel(this.id.toString());
  }

  setType(type: number) {
    this.type = type;
    if (type === 0) {
      this.highY = this.rect.y - 10;
      this.textBox.rect.y = this.rect.y - 42;
    } else {
      this.highY = this.rect.y + 10;
      this.textBox.rect.y = this.rect.y + this.rect.height + 22;
    }
  }

  setConstants(constants: Constants) {
    this.constants = constants;
  }

  checkCollision(eX: number, eY: number) {
    return this.rect.checkCollision(eX, eY);
  }

  setSurfaces(surfaces: number) {
    this.surfaces = surfaces;
  }

  toggleSelected(selected: boolean) {
    this.highlight = selected;
  }

  create4Surfaces(settings: Settings) {
    var width = settings.RECT_DIMEN;
    var startX = this.rect.x + 10;

    if (this.type === 0) {
      var rect1 = new Rect();
      rect1.width = width;
      rect1.height = width;
      rect1.x = startX;
      rect1.y = this.rect.y + this.rect.height + width;
      rect1.id = this.id + "_M";
      this.checkBoxes.push(rect1);

      var rect2 = new Rect();
      rect2.width = width;
      rect2.height = width;
      rect2.x = startX + width;
      rect2.y = this.rect.y + this.rect.height + width;
      rect2.id = this.id + "_D";
      this.checkBoxes.push(rect2);

      var rect3 = new Rect();
      rect3.width = width;
      rect3.height = width;
      rect3.x = startX + 5;
      rect3.y = this.rect.y + this.rect.height;
      rect3.id = this.id + "_V";
      this.checkBoxes.push(rect3);

      var rect4 = new Rect();
      rect4.width = width;
      rect4.height = width;
      rect4.x = startX + 5;
      rect4.y = this.rect.y + this.rect.height + width * 2;
      rect4.id = this.id + "_L";
      this.checkBoxes.push(rect4);
    } else {
      var rect1 = new Rect();
      rect1.width = width;
      rect1.height = width;
      rect1.x = startX;
      rect1.y = this.rect.y - width * 2;
      rect1.id = this.id + "_M";
      this.checkBoxes.push(rect1);

      var rect2 = new Rect();
      rect2.width = width;
      rect2.height = width;
      rect2.x = startX + width;
      rect2.y = this.rect.y - width * 2;
      rect2.id = this.id + "_D";
      this.checkBoxes.push(rect2);

      var rect3 = new Rect();
      rect3.width = width;
      rect3.height = width;
      rect3.x = startX + 5;
      rect3.y = this.rect.y - width;
      rect3.id = this.id + "_L";
      this.checkBoxes.push(rect3);

      var rect4 = new Rect();
      rect4.width = width;
      rect4.height = width;
      rect4.x = startX + 5;
      rect4.y = this.rect.y - width * 3;
      rect4.id = this.id + "_V";
      this.checkBoxes.push(rect4);
    }
  }

  create5Surfaces(settings: Settings) {
    var width = settings.RECT_DIMEN;
    var startX = this.rect.x + 5;

    if (this.type === 0) {
      var rect1 = new Rect();
      rect1.width = width;
      rect1.height = width;
      rect1.x = startX;
      rect1.y = this.rect.y + this.rect.height + width;
      rect1.id = this.id + "_M";
      this.checkBoxes.push(rect1);

      var rect2 = new Rect();
      rect2.width = width;
      rect2.height = width;
      rect2.x = startX + width;
      rect2.y = this.rect.y + this.rect.height + width;
      rect2.id = this.id + "_0";
      this.checkBoxes.push(rect2);

      var rect3 = new Rect();
      rect3.width = width;
      rect3.height = width;
      rect3.x = startX + width * 2;
      rect3.y = this.rect.y + this.rect.height + width;
      rect3.id = this.id + "_D";
      this.checkBoxes.push(rect3);

      var rect4 = new Rect();
      rect4.width = width;
      rect4.height = width;
      rect4.x = startX + width;
      rect4.y = this.rect.y + this.rect.height;
      rect4.id = this.id + "_V";
      this.checkBoxes.push(rect4);

      var rect5 = new Rect();
      rect5.width = width;
      rect5.height = width;
      rect5.x = startX + width;
      rect5.y = this.rect.y + this.rect.height + width * 2;
      rect5.id = this.id + "_L";
      this.checkBoxes.push(rect5);
    } else {
      var rect1 = new Rect();
      rect1.width = width;
      rect1.height = width;
      rect1.x = startX;
      rect1.y = this.rect.y - width * 2;
      rect1.id = this.id + "_M";
      this.checkBoxes.push(rect1);

      var rect2 = new Rect();
      rect2.width = width;
      rect2.height = width;
      rect2.x = startX + width;
      rect2.y = this.rect.y - width * 2;
      rect2.id = this.id + "_0";
      this.checkBoxes.push(rect2);

      var rect3 = new Rect();
      rect3.width = width;
      rect3.height = width;
      rect3.x = startX + width * 2;
      rect3.y = this.rect.y - width * 2;
      rect3.id = this.id + "_D";
      this.checkBoxes.push(rect3);

      var rect4 = new Rect();
      rect4.width = width;
      rect4.height = width;
      rect4.x = startX + width;
      rect4.y = this.rect.y - width;
      rect4.id = this.id + "_L";
      this.checkBoxes.push(rect4);

      var rect5 = new Rect();
      rect5.width = width;
      rect5.height = width;
      rect5.x = startX + width;
      rect5.y = this.rect.y - width * 3;
      rect5.id = this.id + "_V";
      this.checkBoxes.push(rect5);
    }
  }

  createSurfaces(settings: Settings) {
    if (this.surfaces === 4) {
      this.create4Surfaces(settings);
    } else {
      this.create5Surfaces(settings);
    }
  }

  drawId(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.textAlign = "center";
    context.fillStyle = "#000000";
    context.font = "15px Arial Bold";

    var space = 40;

    if (this.type === 0) {
      context.fillText(
        "" + this.id,
        this.rect.x + this.rect.width / 2,
        this.y + this.rect.height + space + 10
      );
      context.moveTo(this.rect.x, this.y + this.rect.height + space + 20);
      context.lineTo(
        this.rect.x + this.rect.width,
        this.y + this.rect.height + space + 20
      );
      context.moveTo(
        this.rect.x + this.rect.width,
        this.y + this.rect.height + space + 20
      );
      context.lineTo(
        this.rect.x + this.rect.width,
        this.y + this.rect.height + space
      );
    } else {
      context.fillText(
        "" + this.id,
        this.rect.x + this.rect.width / 2,
        this.y - space - 5
      );
      context.moveTo(this.rect.x, this.y - space - 20);
      context.lineTo(this.rect.x + this.rect.width, this.y - space - 20);
      context.moveTo(this.rect.x + this.rect.width, this.y - space - 20);
      context.lineTo(this.rect.x + this.rect.width, this.y - space);
    }
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.restore();
  }

  drawCheckBoxes(context: CanvasRenderingContext2D, settings: Settings) {
    for (var i = 0; i < this.checkBoxes.length; i++) {
      if (this.checkBoxes[i].state === 1) {
        this.checkBoxes[i].fillColor(context, settings.COLOR_RED);
        this.checkBoxes[i].outline(context, "#000000");
      } else if (this.checkBoxes[i].state === 11) {
        this.checkBoxes[i].fillColor(context, settings.COLOR_BLUE);
        this.checkBoxes[i].outline(context, "#000000");
      } else {
        this.checkBoxes[i].outline(context, "#000000");
      }
    }
  }

  drawTextBox(context: CanvasRenderingContext2D, settings: Settings) {
    this.textBox.render(context, settings.COLOR_BLUE);
    if (this.textBox.touching) {
      this.textBox.rect.highlightWithColor(context, "#36BE1B", 0.6);
    }
  }

  onTouch(touch: boolean) {
    if (this.tooth) {
      if (touch) {
        this.rect.y = this.highY;
      } else {
        this.rect.y = this.normalY;
      }
    }
    this.rect.touching = touch;
  }

  createDamage(damageId: number): Damage | undefined {
    var damage: Damage | undefined;
    if (!this.constants) return undefined;

    if (this.constants.isDiagnostic(damageId)) {
      if (
        damageId === this.constants.DIENTE_EN_CLAVIJA ||
        damageId === this.constants.FUSION ||
        damageId === this.constants.CORONA_DEFINITIVA ||
        damageId === this.constants.CORONA_TEMPORAL
      ) {
        if (this.type === 0) {
          damage = new Damage(
            damageId,
            this.rect.x,
            this.y + this.rect.height,
            this.rect.width,
            60,
            this.type
          );
        } else {
          damage = new Damage(
            damageId,
            this.rect.x,
            this.y - 60,
            this.rect.width,
            60,
            this.type
          );
        }
      } else if (this.constants.isWritable(damageId)) {
        damage = new Damage(
          damageId,
          this.textBox.rect.x,
          this.textBox.rect.y,
          this.textBox.rect.width,
          this.textBox.rect.height,
          this.type
        );
      } else {
        damage = new Damage(
          damageId,
          this.rect.x,
          this.y,
          this.rect.width,
          this.rect.height,
          this.type
        );
      }
    } else {
      if (this.type === 0) {
        damage = new Damage(
          damageId,
          this.rect.x,
          this.y + this.rect.height,
          this.rect.width,
          60,
          this.type
        );
      } else {
        damage = new Damage(
          damageId,
          this.rect.x,
          this.y - 60,
          this.rect.width,
          60,
          this.type
        );
      }
      damage.setDiagnostic();
    }
    return damage;
  }

  toggleDamage(damageId: number) {
    console.log("Toggle damage for " + this.id + ", damage " + damageId);
    if (this.damages.length < 1) {
      var d = this.createDamage(damageId);
      if (d !== undefined) {
        this.damages.push(d);
      }
    } else {
      var exists = false;
      var splicer = -1;
      for (var i = 0; i < this.damages.length; i++) {
        if (this.damages[i].id === damageId) {
          console.log("Splicing array for tooth " + this.id);
          splicer = i;
          exists = true;
          break;
        }
      }
      if (!exists) {
        var d = this.createDamage(damageId);
        if (d !== undefined) {
          this.damages.push(d);
        }
      } else {
        this.damages.splice(splicer, 1);
      }
    }
  }

  render(
    context: CanvasRenderingContext2D,
    settings: Settings,
    constants: Constants
  ) {
    if (this.tooth) {
      this.textBox.drawLabel(context);
      if (this.image !== undefined) {
        var cx = this.rect.x + this.rect.width / 2;
        var dx = cx - this.image.naturalWidth / 2;
        context.drawImage(this.image, dx, this.rect.y);
      }
      this.drawId(context);
      this.drawCheckBoxes(context, settings);
      if (this.highlight) {
        this.rect.highlightWithColor(context, this.highlightColor, 0.3);
      }
    } else {
      if (settings.HIHGLIGHT_SPACES) {
        if (this.rect.touching) {
          this.rect.highlightEllipse(context, "#00AEFF", 0.5, -10);
        } else {
          this.rect.highlightEllipse(context, "#19B900", 0.2, 10);
        }
      }
    }

    for (var i = 0; i < this.damages.length; i++) {
      this.damages[i].render(context, settings, constants);
    }

    for (var i = 0; i < this.checkBoxes.length; i++) {
      if (this.checkBoxes[i].touching) {
        this.checkBoxes[i].highlightWithColor(context, "#36BE1B", 0.6);
      }
    }

    if (this.tooth) {
      this.drawTextBox(context, settings);
    }

    if (settings.DEBUG) {
      if (this.tooth) {
        this.rect.outline(context, "#000000");
      } else {
        this.rect.highlightEllipse(context, "#FFD100", 0.4, 2);
      }
    }
  }

  getSurfaceById(id: string): Rect | undefined {
    var surface: Rect | undefined;
    for (var i = 0; i < this.checkBoxes.length; i++) {
      if (this.checkBoxes[i].id === id) {
        surface = this.checkBoxes[i];
        break;
      }
    }
    return surface;
  }

  moveUpDown(movement: number) {
    this.normalY += movement;
    this.y += movement;
    this.rect.y += movement;
    this.textBox.rect.y += movement;
    for (var i = 0; i < this.checkBoxes.length; i++) {
      this.checkBoxes[i].y += movement;
    }
    for (var i = 0; i < this.damages.length; i++) {
      this.damages[i].rect.y += movement;
    }
  }

  popDamage() {
    const tail = this.damages.length - 1;
    if (tail >= 0) {
      this.damages.splice(tail, 1);
    }
  }

  refresh(constants: Constants) {
    if (!this.constants) return; // Need constants to check writable
    for (var i = 0; i < this.damages.length; i++) {
      if (this.constants.isWritable(this.damages[i].id)) {
        this.damages[i].rect.x = this.textBox.rect.x;
        this.damages[i].rect.y = this.textBox.rect.y;
      }
    }
    this.rect.y = this.normalY;
    this.touching = false;
    this.textBox.touching = false;
    for (var i = 0; i < this.checkBoxes.length; i++) {
      this.checkBoxes[i].touching = false;
    }
  }
}
