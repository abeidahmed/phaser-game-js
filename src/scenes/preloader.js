import Phaser from 'phaser';
import BirdAsset from '../assets/bird.png';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader-scene');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(590, 250, 320, 50);

    const { width, height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px',
      },
    });

    loadingText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.image('bird', BirdAsset);
    for (let i = 0; i < 500; i += 1) {
      this.load.image(`bird${i}`, BirdAsset);
    }

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(600, 260, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      assetText.destroy();
    });
  }

  create() {
    this.scene.start('playable');
  }
}
