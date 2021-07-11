class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {}
    preload() {
        this.load.audio('appear', './assets/SoundEffects/pop.wav');
        this.load.audio('flip', './assets/SoundEffects/cardflip.wav');
        this.load.audio('BGMplay', './assets/BGM/tanukichi_loop.wav'); // DOVA-Syndrome たぬきちの冒険
    }
    create() {
        //menuBGM = this.sound.add('BGMplay');
        //menuBGM.loop = true;
        //menuBGM.play();
    }
    update() {
        // PLAY button UI?

        // If a key is pushed, start game ( the following code runs )
        this.sound.stopAll();
        this.scene.start('playScene');
    }
}

