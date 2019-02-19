import WebGL from './webgl';
import Camera from './camera';

export default class Scene {
  public gl: WebGL;
  public camera: Camera;

  constructor(gl: WebGL = new WebGL(), camera = new Camera()) {
    this.gl = gl;
    this.camera = camera;
  }

  init() {
    this.gl.init();
    this.camera.calculatePV();
  }

  run(cb: any) {
    this.requestFrame()(cb);
  }

  private requestFrame() {
    const w = (window as any);
    return w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.oRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        function (cb: any) { window.setTimeout(cb, 1000 / 60); };
  }

}
