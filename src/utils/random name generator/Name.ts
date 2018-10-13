import * as fs from 'fs-extra'
import * as path from 'path';

export const NameTypes = {
  HERBIVORE: "HERBIVORE",
  CARNIVORE:"CARNIVORE"
}

/**
 * Generates random postHandles,fingerprints etc.
 * */
class  Name {
  _adjectives: Array<String>;
  _colors: Array<String>;
  _carnivores: Array<String>;
  _herbivores: Array<String>;
  async getAdjectives(): Promise<Array<String>>{
    if (!this._adjectives) {
      let text: string = await fs.readFile(path.resolve(__dirname,"content", "Adjectives.txt"), { encoding: "utf8" });
      this._adjectives = text.split("\n");
    }
    return this._adjectives;
  }
  async getColors(): Promise<Array<String>> {
    if (!this._colors) {
      let text: string = await fs.readFile(path.resolve(__dirname, "content", "Colors.txt"), { encoding: "utf8" });
      this._colors = text.split("\n");
    }
    return this._colors;
  }

  async getCarnivores(): Promise<Array<String>> {
    if (!this._carnivores) {
      let text: string = await fs.readFile(path.resolve(__dirname, "content", "Carnivores.txt"), { encoding: "utf8" });
      this._carnivores = text.split("\n");
    }
    return this._carnivores;
  }

  async getHerbivores(): Promise<Array<String>> {
    if (!this._herbivores) {
      let text: string = await fs.readFile(path.resolve(__dirname, "content", "Herbivores.txt"), { encoding: "utf8" });
      this._herbivores = text.split("\n");
    }
    return this._herbivores;
  }

  async getRandomNames(type: string) {
    let newRandom: string = "";
    newRandom += (await this.getAdjectives())[Math.floor(Math.random() * ((await this.getAdjectives()).length ))];
    newRandom += (await this.getAdjectives())[Math.floor(Math.random() * ((await this.getAdjectives()).length ))];
    newRandom += (await this.getColors())[Math.floor(Math.random() * ((await this.getColors()).length ))];
    switch (type) {
      case NameTypes.CARNIVORE:
        newRandom += (await this.getCarnivores())[Math.floor(Math.random() * ((await this.getCarnivores()).length ))];
        break;
      case NameTypes.HERBIVORE:
        newRandom += (await this.getHerbivores())[Math.floor(Math.random() * ((await this.getHerbivores()).length ))];
        break;
      default:
        throw new Error("Wrong type");
    }
    return newRandom.replace(" ", "").replace("\n", "").replace("\r", "");
  }
}

export default new Name();