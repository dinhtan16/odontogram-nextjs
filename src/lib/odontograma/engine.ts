/* eslint-disable @typescript-eslint/no-explicit-any */
import { Renderer } from "./renderer";
import { OdontogramaGenerator, IEngine } from "./odontogramaGenerator";
import { CollisionHandler } from "./collisionHandler";
import { Settings } from "./settings";
import { Constants } from "./constants";
import { Tooth } from "./tooth";
import { MenuItem } from "./menuItem";
import { Rect } from "./rect";
import { TextBox } from "./textBox";

interface TreatmentData {
  office?: string;
  patient?: string;
  number?: string;
  treatmentNumber?: string;
  treatmentDate?: string;
  dentist?: string;
  observations?: string;
  specs?: string;
}

export class Engine implements IEngine {
  public canvas: HTMLCanvasElement | null = null;
  public adultShowing: boolean = true;
  public mouth: Tooth[] = [];
  public spaces: Tooth[] = [];
  public odontAdult: Tooth[] = [];
  public odontSpacesAdult: Tooth[] = [];
  public odontChild: Tooth[] = [];
  public odontSpacesChild: Tooth[] = [];
  public renderer: Renderer;
  public odontogramaGenerator: OdontogramaGenerator;
  public collisionHandler: CollisionHandler;
  public settings: Settings;
  public constants: Constants;
  public selectedDamage: number | string = 0;
  public cursorX: number = 0;
  public cursorY: number = 0;
  public multiSelect: boolean = false;
  public multiSelection: Tooth[] = [];
  public currentType: number = 0;
  public preview: boolean = false;
  public printPreviewPositionChange: number = 190;
  public observations: string = "";
  public specifications: string = "";
  public patient: string = "";
  public treatmentNumber: string = "";
  public treatmentData: TreatmentData = {};
  public menuItems: MenuItem[] = [];
  public buttons: MenuItem[] = [];
  public adult: MenuItem = new MenuItem();
  public child: MenuItem = new MenuItem();
  public clear: MenuItem = new MenuItem();

  constructor() {
    this.renderer = new Renderer();
    this.odontogramaGenerator = new OdontogramaGenerator();
    this.collisionHandler = new CollisionHandler();
    this.settings = new Settings();
    this.constants = new Constants();
    this.renderer.setSettings(this.settings);
    this.odontogramaGenerator.setEngine(this);
    this.odontogramaGenerator.setSettings(this.settings);
    this.odontogramaGenerator.setConstants(this.constants);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer.init(canvas);
  }

  getXpos(event: MouseEvent): number {
    if (!this.canvas) return 0;
    const boundingRect = this.canvas.getBoundingClientRect();
    return Math.round(event.clientX - boundingRect.left);
  }

  getYpos(event: MouseEvent): number {
    if (!this.canvas) return 0;
    const boundingRect = this.canvas.getBoundingClientRect();
    return Math.round(event.clientY - boundingRect.top);
  }

  init() {
    if (!this.canvas) return;
    this.collisionHandler.setConstants(this.constants);
    this.odontogramaGenerator.prepareOdontogramaAdult(
      this.odontAdult,
      this.odontSpacesAdult,
      this.canvas
    );
    this.odontogramaGenerator.prepareOdontogramaChild(
      this.odontChild,
      this.odontSpacesChild,
      this.canvas
    );
    this.mouth = this.odontAdult;
    this.spaces = this.odontSpacesAdult;
    this.createMenu();

    this.adult.setUp(10, 150, 75, 20);
    this.adult.textBox.text = "Adult";
    this.adult.active = true;
    this.buttons.push(this.adult);

    this.child.setUp(90, 150, 75, 20);
    this.child.textBox.text = "Child";
    this.child.active = false;
    this.buttons.push(this.child);

    this.clear.setUp(this.canvas.width - 10 - 76, 150, 75, 20);
    this.clear.textBox.text = "Reset";
    this.clear.active = false;
    this.buttons.push(this.clear);
  }

  update() {
    if (!this.canvas) return;
    this.renderer.clear(this.settings);
    if (!this.preview) {
      this.renderer.render(this.mouth, this.settings, this.constants);
      this.renderer.render(this.spaces, this.settings, this.constants);
      this.renderer.render(this.menuItems, this.settings, this.constants);
      this.renderer.render(this.buttons, this.settings, this.constants);
      if (this.settings.DEBUG) {
        this.renderer.renderText(
          "DEBUG MODE",
          2,
          this.canvas.height,
          "#000000"
        );
        this.renderer.renderText(
          "X: " + this.cursorX + ", Y: " + this.cursorY,
          128,
          this.canvas.height,
          "#000000"
        );
        this.renderer.renderText(
          "Selected Damage : " + this.selectedDamage,
          220,
          this.canvas.height,
          "#000000"
        );
      }
    } else {
      this.printPreview();
    }
  }

  resetMultiSelect() {
    this.selectedDamage = "0";
    this.multiSelect = false;
    this.multiSelection = [];
    this.removeHighlight();
    this.update();
  }

  removeHighlight() {
    for (let i = 0; i < this.mouth.length; i++) {
      this.mouth[i].highlight = false;
    }
  }

  getIndexForTooth(tooth: Tooth): number {
    for (let i = 0; i < this.mouth.length; i++) {
      if (this.mouth[i].id === tooth.id) return i;
    }
    return -1;
  }

  addToMultiSelection(tooth: Tooth) {
    this.multiSelection.push(tooth);
    if (this.multiSelection.length === 2) {
      this.handleMultiSelection();
    }
  }

  handleMultiSelection() {
    if (this.multiSelection.length === 2) {
      const tooth1 = this.multiSelection[0];
      const tooth2 = this.multiSelection[1];
      const index1 = this.getIndexForTooth(tooth1);
      const index2 = this.getIndexForTooth(tooth2);
      let valid = true;

      if (index1 === index2) valid = false;
      if (tooth1.type !== tooth2.type) valid = false;

      if (valid) {
        const start = Math.min(index1, index2);
        const end = Math.max(index1, index2);

        if (this.selectedDamage === this.constants.ORTODONTICO_FIJO_END) {
          this.mouth[start].toggleDamage(this.constants.ORTODONTICO_FIJO_END);
          this.mouth[end].toggleDamage(this.constants.ORTODONTICO_FIJO_END);
          for (let i = start + 1; i <= end - 1; i++) {
            this.mouth[i].toggleDamage(this.constants.ORTODONTICO_FIJO_CENTER);
          }
        } else if (this.selectedDamage === this.constants.PROTESIS_FIJA_LEFT) {
          this.mouth[start].toggleDamage(this.constants.PROTESIS_FIJA_RIGHT);
          this.mouth[end].toggleDamage(this.constants.PROTESIS_FIJA_LEFT);
          for (let i = start + 1; i <= end - 1; i++) {
            this.mouth[i].toggleDamage(this.constants.PROTESIS_FIJA_CENTER);
          }
        } else if (this.selectedDamage === this.constants.TRANSPOSICION_LEFT) {
          if (end - start === 1) {
            this.mouth[start].toggleDamage(this.constants.TRANSPOSICION_LEFT);
            this.mouth[end].toggleDamage(this.constants.TRANSPOSICION_RIGHT);
          }
        }
      }
      this.multiSelection = [];
      this.removeHighlight();
      this.update();
    }
  }

  highlightMultiSelection(tooth: Tooth) {
    try {
      if (this.multiSelection.length > 0) {
        for (let i = 0; i < this.mouth.length; i++) {
          this.mouth[i].highlight = false;
          this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT;
        }
        const tooth1 = this.multiSelection[0];
        if (tooth1.type === tooth.type) {
          const index1 = this.getIndexForTooth(tooth1);
          const index2 = this.getIndexForTooth(tooth);
          const begin = Math.min(index1, index2);
          const end = Math.max(index1, index2);
          for (let i = begin; i <= end; i++) {
            this.mouth[i].highlight = true;
          }
          if (this.selectedDamage === this.constants.TRANSPOSICION_LEFT) {
            if (end - begin > 1) {
              for (let i = begin; i <= end; i++) {
                this.mouth[i].highlightColor =
                  this.settings.COLOR_HIGHLIGHT_BAD;
              }
            }
          }
        }
        this.update();
      }
    } catch (e) {}
  }

  isAlphanumeric(input: string): boolean {
    const letters = /^[0-9a-zA-Z]+$/;
    return !!input.match(letters);
  }

  setTextToTextBox(textBox: TextBox, text: string) {
    if (text !== null) {
      if (text.length < 4) {
        if (this.isAlphanumeric(text)) {
          textBox.setNote(text);
        } else if (text === "") {
          textBox.setNote(text);
        }
      }
    }
    this.update();
  }

  onTextBoxClicked(textBox: TextBox) {
    const message = "Add 3 letter dental code.";
    const text = prompt(message, "");
    if (text) this.setTextToTextBox(textBox, text);
  }

  onMouseClick(event: MouseEvent) {
    if (!this.preview) {
      if (event.button === 0) {
        if (this.settings.HIHGLIGHT_SPACES) {
          // typo from original 'HIHGLIGHT'
          this.mouseClickSpace(event);
        } else {
          this.mouseClickTooth(event);
        }
        this.mouseClickMenu(event);
        this.mouseClickControls(event);
      } else if (event.button === 2) {
        if (this.settings.HIHGLIGHT_SPACES) {
          this.mouseRightClickSpace(event);
        } else {
          this.mouseRightClickTooth(event);
        }
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.preview) {
      if (this.settings.HIHGLIGHT_SPACES) {
        this.mouseMoveSpaces(event);
      } else {
        this.mouseMoveTeeth(event);
      }
      this.mouseMoveMenuItems(event);
    }
    this.followMouse(event);
  }

  followMouse(event: MouseEvent) {
    this.cursorX = this.getXpos(event);
    this.cursorY = this.getYpos(event);
    this.update();
  }

  mouseClickTooth(event: MouseEvent) {
    let shouldUpdate = false;
    for (let i = 0; i < this.mouth.length; i++) {
      if (
        this.mouth[i].textBox.rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        if (this.currentType === 0)
          this.onTextBoxClicked(this.mouth[i].textBox);
      }

      if (
        this.mouth[i].rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        if (this.multiSelect) {
          this.addToMultiSelection(this.mouth[i]);
        } else {
          if (this.currentType === 0) {
            this.collisionHandler.handleCollision(
              this.mouth[i],
              this.selectedDamage
            );
            shouldUpdate = true;
          } else {
            this.createDiagnostico({
              tooth: this.mouth[i].id,
              diagnostic: this.selectedDamage,
            });
          }
        }
      }

      for (let j = 0; j < this.mouth[i].checkBoxes.length; j++) {
        if (
          this.mouth[i].checkBoxes[j].checkCollision(
            this.getXpos(event),
            this.getYpos(event)
          )
        ) {
          if (this.currentType === 0) {
            this.collisionHandler.handleCollisionCheckBox(
              this.mouth[i].checkBoxes[j],
              this.selectedDamage
            );
            shouldUpdate = true;
          } else {
            this.createDiagnostico({
              tooth: 0,
              surface: this.mouth[i].checkBoxes[j].id,
              diagnostic: this.selectedDamage,
            });
          }
        }
      }
    }
    if (shouldUpdate) this.update();
  }

  mouseRightClickTooth(event: MouseEvent) {
    let shouldUpdate = false;
    for (let i = 0; i < this.mouth.length; i++) {
      if (
        this.mouth[i].textBox.rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        this.mouth[i].textBox.text = "";
      }
      if (
        this.mouth[i].rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        this.mouth[i].popDamage();
        shouldUpdate = true;
      }
      for (let j = 0; j < this.mouth[i].checkBoxes.length; j++) {
        if (
          this.mouth[i].checkBoxes[j].checkCollision(
            this.getXpos(event),
            this.getYpos(event)
          )
        ) {
          this.mouth[i].checkBoxes[j].state = 0;
          shouldUpdate = true;
        }
      }
    }
    if (shouldUpdate) this.update();
  }

  mouseClickSpace(event: MouseEvent) {
    let shouldUpdate = false;
    for (let i = 0; i < this.spaces.length; i++) {
      if (
        this.spaces[i].checkCollision(this.getXpos(event), this.getYpos(event))
      ) {
        this.collisionHandler.handleCollision(
          this.spaces[i],
          this.selectedDamage
        );
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) this.update();
  }

  mouseRightClickSpace(event: MouseEvent) {
    let shouldUpdate = false;
    for (let i = 0; i < this.spaces.length; i++) {
      if (
        this.spaces[i].rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        this.spaces[i].popDamage();
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) this.update();
  }

  mouseClickMenu(event: MouseEvent) {
    let shouldUpdate = false;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (
        this.menuItems[i].rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        if (this.menuItems[i].active) {
          this.menuItems.forEach((m) => (m.active = false));
          this.selectedDamage = 0;
        } else {
          this.menuItems.forEach((m) => (m.active = false));
          this.menuItems[i].active = true;
          this.selectedDamage = this.menuItems[i].id;
        }
        this.setDamage(this.selectedDamage);
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) this.update();
  }

  mouseClickControls(event: MouseEvent) {
    let shouldUpdate = false;
    if (
      this.adult.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.adult.active = true;
      this.child.active = false;
      this.changeView("0");
      shouldUpdate = true;
    }
    if (
      this.child.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.adult.active = false;
      this.child.active = true;
      this.changeView("1");
      shouldUpdate = true;
    }
    if (
      this.clear.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.reset();
    }
    if (shouldUpdate) this.update();
  }

  mouseMoveSpaces(event: MouseEvent) {
    let update = false;
    for (let i = 0; i < this.spaces.length; i++) {
      if (
        this.spaces[i].checkCollision(this.getXpos(event), this.getYpos(event))
      ) {
        this.spaces[i].onTouch(true);
        update = true;
      } else {
        this.spaces[i].onTouch(false);
      }
    }
    if (update) this.update();
  }

  mouseMoveTeeth(event: MouseEvent) {
    for (let i = 0; i < this.mouth.length; i++) {
      if (
        this.mouth[i].textBox.rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        this.mouth[i].textBox.touching = true;
      } else {
        this.mouth[i].textBox.touching = false;
      }
      if (
        this.mouth[i].checkCollision(this.getXpos(event), this.getYpos(event))
      ) {
        this.mouth[i].onTouch(true);
        if (this.multiSelect && this.multiSelection.length > 0) {
          this.highlightMultiSelection(this.mouth[i]);
        }
      } else {
        this.mouth[i].onTouch(false);
      }
      for (let j = 0; j < this.mouth[i].checkBoxes.length; j++) {
        if (
          this.mouth[i].checkBoxes[j].checkCollision(
            this.getXpos(event),
            this.getYpos(event)
          )
        ) {
          this.mouth[i].checkBoxes[j].touching = true;
        } else {
          this.mouth[i].checkBoxes[j].touching = false;
        }
      }
    }
  }

  mouseMoveMenuItems(event: MouseEvent) {
    let update = false;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (
        this.menuItems[i].rect.checkCollision(
          this.getXpos(event),
          this.getYpos(event)
        )
      ) {
        this.menuItems[i].highlight = true;
        update = true;
      } else {
        this.menuItems[i].highlight = false;
      }
    }
    if (
      this.child.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.child.highlight = true;
      update = true;
    } else {
      this.child.highlight = false;
    }
    if (
      this.adult.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.adult.highlight = true;
      update = true;
    } else {
      this.adult.highlight = false;
    }
    if (
      this.clear.rect.checkCollision(this.getXpos(event), this.getYpos(event))
    ) {
      this.clear.highlight = true;
      update = true;
    } else {
      this.clear.highlight = false;
    }
    if (update) this.update();
  }

  // Core Logic
  reset() {
    for (let i = 0; i < this.mouth.length; i++) {
      this.mouth[i].damages.length = 0;
      this.mouth[i].textBox.text = "";
      for (let j = 0; j < this.mouth[i].checkBoxes.length; j++) {
        this.mouth[i].checkBoxes[j].state = 0;
      }
    }
    for (let i = 0; i < this.spaces.length; i++) {
      this.spaces[i].damages.length = 0;
    }
    this.update();
  }

  save() {
    if (!this.canvas) return;
    const link = document.createElement("a");
    const name = Date.now() + ".png";
    link.download = name;
    link.href = this.canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  }

  createDiagnostico(d: any) {
    console.log("Diagnostico: " + JSON.stringify(d));
  }

  setDamage(damage: number | string) {
    this.multiSelect = false;
    this.multiSelection = [];
    console.log("Engine setting damage: " + damage);

    const d = parseInt(damage as string, 10) || 0;
    if (
      d === this.constants.TRANSPOSICION_LEFT ||
      d === this.constants.ORTODONTICO_FIJO_END ||
      d === this.constants.PROTESIS_FIJA_LEFT
    ) {
      this.multiSelect = true;
    }

    if (d === this.constants.SUPER_NUMERARIO || d === this.constants.DIASTEMA) {
      this.settings.HIHGLIGHT_SPACES = true;
    } else {
      this.settings.HIHGLIGHT_SPACES = false;
    }
    this.selectedDamage = damage;
    this.update();
  }

  changeView(which: string) {
    if (which === "1") {
      this.adultShowing = false;
      this.mouth = this.odontChild;
      this.spaces = this.odontSpacesChild;
    } else {
      this.adultShowing = true;
      this.mouth = this.odontAdult;
      this.spaces = this.odontSpacesAdult;
    }
    this.update();
  }

  start() {
    this.update();
  }

  // Helpers
  createMenu() {
    if (!this.canvas) return;
    const buttonWidth = 100;
    const buttonHeight = 20;
    const startX = this.canvas.width / 2 - (buttonWidth * 6) / 2;
    let posY = 10;
    const ySeparator = 0;
    let posX = startX;
    const xSeparator = buttonWidth;

    // Row 1
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Caries", 1);
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Crown", 2);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Crown (Tmp)",
      3
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Missing", 4);
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Fracture", 5);
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Diastema", 8);

    // Row 2
    posY += buttonHeight + ySeparator;
    posX = startX;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Filling", 11);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Rem Prost",
      12
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Drifting",
      13
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Rotation",
      14
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Fusion", 15);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Root Remnant",
      16
    );

    // Row 3
    posY += buttonHeight + ySeparator;
    posX = startX;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Eruption",
      24
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Transpositon",
      25
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Supernumerary",
      27
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Pulp", 20);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Prosthesis",
      29
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Bolt", 30);

    // Row 4
    posY += buttonHeight + ySeparator;
    posX = startX;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Fixed Ortho",
      32
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Fixed Prosth",
      34
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Implant", 6);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Macrodontia",
      17
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Microdontia",
      10
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Dyschromic",
      22
    );

    // Row 5
    posY += buttonHeight + ySeparator;
    posX = startX;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Worn", 37);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Impacted Semi",
      30
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Intrusion",
      20
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Edentulism",
      31
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Ectopic", 21);
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Impacted",
      19
    );

    // Row 6
    posY += buttonHeight + ySeparator;
    posX = startX;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Rem Orthodo",
      23
    );
    posX += xSeparator;
    this.createMenuButton(
      posX,
      posY,
      buttonWidth,
      buttonHeight,
      "Extrusion",
      9
    );
    posX += xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, "Post", 10);
  }

  createMenuButton(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    id: number
  ) {
    const menuitem = new MenuItem();
    menuitem.setUp(x, y, width, height);
    menuitem.textBox.text = text;
    menuitem.id = id;
    this.menuItems.push(menuitem);
  }

  // Simplifed getToothById and other helpers
  getToothById(id: number): Tooth | undefined {
    for (let i = 0; i < this.mouth.length; i++) {
      if (this.mouth[i].id === id) return this.mouth[i];
    }
    return undefined;
  }

  printPreview() {
    if (!this.canvas) return;
    this.renderer.clear(this.settings);
    this.createHeader();
    this.renderer.render(this.odontAdult, this.settings, this.constants);
    this.renderer.render(this.odontSpacesAdult, this.settings, this.constants);
    this.renderer.render(this.odontChild, this.settings, this.constants);
    this.renderer.render(this.odontSpacesChild, this.settings, this.constants);
    // Add more print logic if needed
  }

  createHeader() {
    if (!this.canvas) return;
    const seperation = 18;
    this.renderer.renderTextCenter16(
      "Odontogram",
      this.renderer.width / 2,
      seperation,
      "#000000"
    );
  }

  loadPatientData(
    office: string,
    patient: string,
    number: string,
    treatmentNumber: string,
    treatmentDate: string,
    dentist: string,
    observations: string,
    specs: string
  ) {
    this.treatmentData = {
      office,
      patient,
      number,
      treatmentNumber,
      treatmentDate,
      dentist,
      observations,
      specs,
    };
  }
}
