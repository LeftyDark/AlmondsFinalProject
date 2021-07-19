class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {}
    preload() {
        this.load.audio('appear', './assets/SoundEffects/placeholder.wav');
        this.load.audio('flip', './assets/SoundEffects/cardflip.wav');
        this.load.audio('BGMplay', './assets/BGM/tanukichi_loop.wav'); // DOVA-Syndrome たぬきちの冒険
    }
    create() {
        // loop BGM
        playBGM = this.sound.add('BGMplay');
        playBGM.loop = true;
        playBGM.play();
        this.spacebarCounter = 0;
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        // PLAY button UI?

        // If a key is pushed, start game ( the following code runs )
        this.scene.start('playScene');
    }
}

