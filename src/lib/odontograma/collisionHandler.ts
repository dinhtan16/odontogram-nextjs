/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constants } from "./constants";
import { Tooth } from "./tooth";
import { Rect } from "./rect";

export class CollisionHandler {
  public constants: Constants | null = null;

  constructor() {}

  setConstants(constants: Constants) {
    this.constants = constants;
  }

  handleCollision(tooth: Tooth, argument: any) {
    let newArg: number | undefined;
    try {
      newArg = Number(argument);
    } catch (e) {
      console.log("Handle Collision Exception: " + e);
    }

    if (
      this.constants &&
      newArg !== 0 &&
      newArg !== undefined &&
      !isNaN(newArg)
    ) {
      if (
        newArg !== this.constants.CARIES &&
        newArg !== this.constants.CURACION
      ) {
        tooth.toggleDamage(newArg);
      }
    }
  }

  handleCollisionCheckBox(checkBox: Rect, argument: any) {
    let newArg: number | undefined;
    try {
      newArg = Number(argument);
    } catch (e) {
      console.log("Handle Collision Exception: " + e);
    }

    if (!this.constants) return;

    if (newArg === this.constants.CARIES) {
      if (checkBox.state === 1) {
        checkBox.state = 0;
      } else {
        checkBox.state = 1;
      }
    } else if (newArg === this.constants.CURACION) {
      if (checkBox.state === 11) {
        checkBox.state = 0;
      } else {
        checkBox.state = 11;
      }
    }
  }
}
