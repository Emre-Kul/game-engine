export default class Shader {
  public context: any;
  public vertexShaderId: string;
  public fragmentShaderId: string;
  public program: any;

  constructor(context: any, vertexShaderId: string, fragmentShaderId: string) {
    this.context = context;
    this.vertexShaderId = vertexShaderId;
    this.fragmentShaderId = fragmentShaderId;
  }

  load() {
    const vertexShader = this.loadShader(this.vertexShaderId, this.context.VERTEX_SHADER);
    const fragmentShader = this.loadShader(this.fragmentShaderId, this.context.FRAGMENT_SHADER);
    const program = this.context.createProgram();

    this.context.attachShader(program, vertexShader);
    this.context.attachShader(program, fragmentShader);
    this.context.linkProgram(program);

    if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
      const msg = `Shader program failed to link.  The error log is:<pre>${this.context.getProgramInfoLog(program)}</pre>`;
      alert(msg);
      return -1;
    }

    this.program = program;
  }

  bindBufferData(bufferType: string, data: any) {
    const bufferId = this.context.createBuffer();
    this.context.bindBuffer(this.context[bufferType], bufferId);
    this.context.bufferData(
        this.context[bufferType],
        data,
        this.context.STATIC_DRAW,
    );
    return bufferId;
  }

  getUniformLocation(name: string) {
    return this.context.getUniformLocation(this.program, name);
  }

  private loadShader(id: string, type: any) {
    const elem: any = document.getElementById(id);
    if (!elem) {
      alert(`Unable to load ${id}`);
      return -1;
    }

    const shader = this.context.createShader(type);
    this.context.shaderSource(shader, elem.text);
    this.context.compileShader(shader);
    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      const msg = `Fragment shader failed to compile.  The error log is:<pre>${this.context.getShaderInfoLog(shader)}</pre>`;
      alert(msg);
      return -1;
    }
    return shader;
  }

}
