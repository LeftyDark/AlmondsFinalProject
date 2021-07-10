class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {}
    preload() {
        this.load.audio('SE_placeholder', './assets/SoundEffects/placeholder.wav');
        this.load.audio('BGM_placeholder', './assets/BGM/placeholder.wav');
    }
    create() {}
    update() {
        this.scene.start("playScene");
    }
}

