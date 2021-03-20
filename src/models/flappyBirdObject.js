import Phaser from 'phaser';
import {
  MAX_UPWARDS_VELOCITY,
  TERMINAL_VELOCITY,
  TREADMILL_SPEED,
  GRAVITY,
  UPWARDS_ACCELERATION,
} from '../constants';

export default class FlappyBirdObject {
  constructor(scene) {
    this.sprite = scene.add.sprite(50, 100, 'bird');
    this.sprite.setScale(0.05);
    this.velocity = 0;
  }

  destroy() {
    this.sprite.destroy();
  }

  update(timeElapsed, keyboard) {
    this.applyGravity(timeElapsed);
    this.handleInput(timeElapsed, keyboard);
    this.velocity = Math.min(
      Math.max(this.velocity, MAX_UPWARDS_VELOCITY),
      TERMINAL_VELOCITY,
    );

    this.sprite.y += this.velocity * timeElapsed;

    const v = new Phaser.Math.Vector2(-1 * TREADMILL_SPEED * timeElapsed, 0);
    v.add(new Phaser.Math.Vector2(0, this.velocity));
    v.normalize();

    const rad = Math.atan2(v.y, v.x);
    const deg = (180.0 / Math.PI) * rad;

    this.sprite.angle = deg * 0.3;
  }

  get bounds() {
    return this.sprite.getBounds();
  }

  applyGravity(timeElapsed) {
    this.velocity += GRAVITY * timeElapsed;
  }

  handleInput(timeElapsed, keys) {
    if (!Phaser.Input.Keyboard.JustDown(keys.up)) {
      return;
    }

    this.velocity += UPWARDS_ACCELERATION;
  }
}
