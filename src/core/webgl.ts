import { CustomWindow } from '../interfaces';

export default class WebGL {
  private canvas: any;
  private readonly attributes: string[];
  private readonly canvasId: string;
  public context: any;

  constructor(canvasId: string = 'ge-canvas', attributes: string[] = []) {
    this.canvasId = canvasId;
    this.attributes = attributes;
    this.context = null;
  }

  public init() {
    this.canvas = document.getElementById(this.canvasId);
    this.setup();
  }

  private setup() {
    if (!(window as CustomWindow).WebGLRenderingContext) {
      this.context = null;
    }
    this.create3DContext();
    if (!this.context) {
      this.context = null;
    }
  }

  private create3DContext() {
    const names: string[] = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    for (const name of names) {
      try {
        this.context = this.canvas.getContext(name, this.attributes);
      } catch (e) {}
      if (this.context) {
        break;
      }
    }
  }

}
