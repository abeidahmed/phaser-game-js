import Phaser from 'phaser';
import { CONFIG_HEIGHT, PIPE_SPACING_Y, TREADMILL_SPEED } from '../constants';

export default class PipePairObject {
  constructor(scene, x) {
    const height = CONFIG_HEIGHT * (0.25 + 0.5 * Math.random());
    this.sprite1 = scene.add.sprite(x, height + PIPE_SPACING_Y * 0.5, 'pipe');
    this.sprite1.displayOriginX = 0;
    this.sprite1.displayOriginY = 0;

    this.sprite2 = scene.add.sprite(x, height - PIPE_SPACING_Y * 0.5, 'pipe');
    this.sprite2.displayOriginX = 0;
    this.sprite2.displayOriginY = 0;
    this.sprite2.displayHeight = -1 * this.sprite2.height;
  }

  destroy() {
    this.sprite1.destroy();
    this.sprite2.destroy();
  }

  update(timeElapsed) {
    this.sprite1.x += timeElapsed * TREADMILL_SPEED;
    this.sprite2.x += timeElapsed * TREADMILL_SPEED;
  }

  intersects(aabb) {
    const b1 = this.sprite1.getBounds();
    const b2 = this.sprite2.getBounds();
    b2.y -= this.sprite2.height;
    return (
      Phaser.Geom.Intersects.RectangleToRectangle(b1, aabb)
      || Phaser.Geom.Intersects.RectangleToRectangle(b2, aabb)
    );
  }

  reset(x) {
    const height = CONFIG_HEIGHT * (0.25 + 0.5 * Math.random());
    this.sprite1.x = x;
    this.sprite1.y = height + PIPE_SPACING_Y * 0.5;
    this.sprite2.x = x;
    this.sprite2.y = height - PIPE_SPACING_Y * 0.5;
  }

  get x() {
    return this.sprite1.x;
  }

  get width() {
    return this.sprite1.width;
  }
}
