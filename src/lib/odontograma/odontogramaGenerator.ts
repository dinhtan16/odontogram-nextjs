import { Tooth } from "./tooth";
import { Settings } from "./settings";
import { Constants } from "./constants";

export interface IEngine {
  start(): void;
}

export class OdontogramaGenerator {
  public currentLoad: number = 0;
  public expectedImages: number = 0;
  public arrayCount: number = 0;
  public seperator: number = 210;
  public imgWidth: number = 40;
  public imgHeight: number = 90;
  public engine: IEngine | null = null;
  public settings: Settings | null = null;
  public constants: Constants | null = null;

  constructor() {}

  setEngine(engine: IEngine) {
    this.engine = engine;
  }

  setSettings(settings: Settings) {
    this.settings = settings;
  }

  setConstants(constants: Constants) {
    this.constants = constants;
  }

  updateLoad() {
    this.currentLoad++;
    // notify when all images have been loaded
    if (this.currentLoad >= this.expectedImages && this.expectedImages > 0) {
      if (this.engine) this.engine.start();
    }
  }

  prepareOdontogramaAdult(
    odontograma: Tooth[],
    spaces: Tooth[],
    canvas: HTMLCanvasElement
  ) {
    if (!this.constants || !this.settings) return;
    this.arrayCount = 0;

    // center the ondotograma horizontal
    const width = canvas.width;
    const odontWidth = 16 * this.imgWidth;
    const start = (width - odontWidth) / 2;

    // start of first tooth
    let x = start;
    const height = canvas.height;
    const odontHeight = 2 * 150;
    const base = (height - odontHeight) / 2;

    // 1st group upper
    for (let i = 18; i > 10; i--) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i > 13) tooth.setSurfaces(5);
      else tooth.setSurfaces(4);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-sup-" + i + ".png";
      this.expectedImages++; // Increment expected images
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base, this.imgWidth, this.imgHeight);
      tooth.setType(0);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      const space = new Tooth();
      space.setConstants(this.constants);
      space.setSurfaces(5);
      if (i !== 11) space.id = Number(i + "" + (i - 1));
      else space.id = Number(i + "" + 21);
      space.setDimens(
        tooth.rect.x + tooth.rect.width / 2,
        tooth.rect.y,
        tooth.rect.width,
        tooth.rect.height
      );
      space.type = tooth.type;
      space.tooth = false;
      spaces.push(space);
    }

    // 2nd group upper
    for (let i = 21; i < 29; i++) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 24) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-sup-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base, this.imgWidth, this.imgHeight);
      tooth.setType(0);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      if (i < 28) {
        const space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);
        space.id = Number(i + "" + (i + 1));
        space.setDimens(
          tooth.rect.x + tooth.rect.width / 2,
          tooth.rect.y,
          tooth.rect.width,
          tooth.rect.height
        );
        space.type = tooth.type;
        space.tooth = false;
        spaces.push(space);
      }
    }

    // 1st group lower
    x = start;
    for (let i = 48; i > 40; i--) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 44) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-inf-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base + this.seperator, this.imgWidth, this.imgHeight);
      tooth.setType(1);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      const space = new Tooth();
      space.setConstants(this.constants);
      space.setSurfaces(5);
      if (i !== 41) space.id = Number(i + "" + (i - 1));
      else space.id = Number(i + "" + 31);
      space.setDimens(
        tooth.rect.x + tooth.rect.width / 2,
        tooth.rect.y,
        tooth.rect.width,
        tooth.rect.height
      );
      space.type = tooth.type;
      space.tooth = false;
      spaces.push(space);
    }

    // 2nd group lower
    for (let i = 31; i < 39; i++) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 34) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-inf-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base + this.seperator, this.imgWidth, this.imgHeight);
      tooth.setType(1);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      if (i < 38) {
        const space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);
        space.id = Number(i + "" + (i + 1));
        space.setDimens(
          tooth.rect.x + tooth.rect.width / 2,
          tooth.rect.y,
          tooth.rect.width,
          tooth.rect.height
        );
        space.type = tooth.type;
        space.tooth = false;
        spaces.push(space);
      }
    }
  }

  prepareOdontogramaChild(
    odontograma: Tooth[],
    spaces: Tooth[],
    canvas: HTMLCanvasElement
  ) {
    if (!this.constants || !this.settings) return;
    this.arrayCount = 0;
    const width = canvas.width;
    const odontWidth = 10 * this.imgWidth;
    const start = (width - odontWidth) / 2;
    let x = start;
    const height = canvas.height;
    const odontHeight = 2 * 150;
    const base = (height - odontHeight) / 2;

    for (let i = 55; i > 50; i--) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i > 53) tooth.setSurfaces(5);
      else tooth.setSurfaces(4);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-sup-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base, this.imgWidth, this.imgHeight);
      tooth.setType(0);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      const space = new Tooth();
      space.setConstants(this.constants);
      space.setSurfaces(5);
      if (i !== 51) space.id = Number(i + "" + (i - 1));
      else space.id = Number(i + "" + 61);
      space.setDimens(
        tooth.rect.x + tooth.rect.width / 2,
        tooth.rect.y,
        tooth.rect.width,
        tooth.rect.height
      );
      space.type = tooth.type;
      space.tooth = false;
      spaces.push(space);
    }

    for (let i = 61; i < 66; i++) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 64) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-sup-" + i + ".png";
      this.expectedImages++; // Increment here too
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base, this.imgWidth, this.imgHeight);
      tooth.setType(0);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      if (i < 65) {
        const space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);
        space.id = Number(i + "" + (i + 1));
        space.setDimens(
          tooth.rect.x + tooth.rect.width / 2,
          tooth.rect.y,
          tooth.rect.width,
          tooth.rect.height
        );
        space.type = tooth.type;
        space.tooth = false;
        spaces.push(space);
      }
    }

    x = start;
    for (let i = 85; i > 80; i--) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 84) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-inf-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base + this.seperator, this.imgWidth, this.imgHeight);
      tooth.setType(1);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      const space = new Tooth();
      space.setConstants(this.constants);
      space.setSurfaces(5);
      if (i !== 81) space.id = Number(i + "" + (i - 1));
      else space.id = Number(i + "" + 71);
      space.setDimens(
        tooth.rect.x + tooth.rect.width / 2,
        tooth.rect.y,
        tooth.rect.width,
        tooth.rect.height
      );
      space.type = tooth.type;
      space.tooth = false;
      spaces.push(space);
    }

    for (let i = 71; i < 76; i++) {
      const tooth = new Tooth();
      tooth.setConstants(this.constants);
      if (i < 74) tooth.setSurfaces(4);
      else tooth.setSurfaces(5);
      const image = new Image();
      image.onload = () => {
        this.updateLoad();
      };
      image.src = "/images/dentadura-inf-" + i + ".png";
      this.expectedImages++;
      tooth.id = i;
      tooth.image = image;
      tooth.setDimens(x, base + this.seperator, this.imgWidth, this.imgHeight);
      tooth.setType(1);
      x += tooth.rect.width + this.settings.TOOTH_PADDING;
      odontograma[this.arrayCount] = tooth;
      tooth.address = this.arrayCount;
      this.arrayCount++;
      tooth.createSurfaces(this.settings);

      if (i < 75) {
        const space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);
        space.id = Number(i + "" + (i + 1));
        space.setDimens(
          tooth.rect.x + tooth.rect.width / 2,
          tooth.rect.y,
          tooth.rect.width,
          tooth.rect.height
        );
        space.type = tooth.type;
        space.tooth = false;
        spaces.push(space);
      }
    }
  }
}
