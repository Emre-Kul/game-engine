import Shader from './shader';
import Mesh from './mesh';
import Matrix4 from '../math/matrix4';

export default class MeshRenderer {

  public shader: Shader;
  public mesh: Mesh;
  public viewMtr: Matrix4;
  public projectionMtr: Matrix4;

  private locationModelMtr: any;
  private locationViewMtr: any;
  private locationProjectionMtr: any;

  constructor(mesh: Mesh, shader: Shader, viewMtr: Matrix4, projectionMtr: Matrix4) {
    this.mesh = mesh;
    this.shader = shader;
    this.viewMtr = viewMtr;
    this.projectionMtr = projectionMtr;
  }

  init() {
    this.mesh.transform.createModelMatrix();
    this.shader.load();

    this.shader.bindBufferData('ARRAY_BUFFER', new Float32Array(this.mesh.vertices));
    this.shader.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(this.mesh.indices));

    const vPos = this.shader.context.getAttribLocation(this.shader.program, 'vPosition');
    this.shader.context.vertexAttribPointer(vPos, 3, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(vPos);

    this.locationModelMtr  = this.shader.getUniformLocation('uModel');
    this.locationViewMtr  = this.shader.getUniformLocation('uView');
    this.locationProjectionMtr  = this.shader.getUniformLocation('uProjection');

    this.shader.context.clearColor(1.0, 1.0, 1.0, 1.0);
    this.shader.context.clearDepth(1.0);
    this.shader.context.enable(this.shader.context.DEPTH_TEST);
    this.shader.context.depthFunc(this.shader.context.LEQUAL);
  }

  render() {
    this.shader.context.useProgram(this.shader.program);

    this.shader.context.uniformMatrix4fv(this.locationModelMtr,
                                         false,
                                         Matrix4.flatten(Matrix4.transpose(this.mesh.transform.modelMatrix)),
    );

    this.shader.context.uniformMatrix4fv(this.locationViewMtr,
                                         false,
                                         Matrix4.flatten(this.viewMtr),
    );

    this.shader.context.uniformMatrix4fv(this.locationProjectionMtr,
                                         false,
                                         Matrix4.flatten(this.projectionMtr),
    );


    this.shader.context.clear(this.shader.context.COLOR_BUFFER_BIT | this.shader.context.DEPTH_BUFFER_BIT);

    this.shader.context.drawElements(this.shader.context.TRIANGLES,
                                     this.mesh.indices.length,
                                     this.shader.context.UNSIGNED_SHORT,
                                     0);
  }
}
