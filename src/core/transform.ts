import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class Transform {
  public position : Vector3;
  public scale : Vector3;
  public rotate : Vector3;

  public modelMatrix: Matrix4;

  constructor(position: Vector3 = new Vector3(),
              scale: Vector3 = new Vector3(1, 1, 1),
              rotate: Vector3 = new Vector3(),
  ) {
    this.position = position;
    this.scale = scale;
    this.rotate = rotate;
    this.modelMatrix = Matrix4.create();
  }

  createModelMatrix() {
    const t = Matrix4.create();
    const s = Matrix4.create();

    t.translate(this.position);
    s.scale(this.scale);

    this.modelMatrix = Matrix4.multiply(t, s);
  }

}
