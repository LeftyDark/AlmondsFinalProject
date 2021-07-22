class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    init() {}
    preload() {}
    create() { 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width-700, game.config.height-100, 'Mixing Mayhem Credits');
        this.add.text(game.config.width-700, game.config.height-150, 'Art by Nathaneal Fonken');
        this.menuText = this.add.text(game.config.width-700, game.config.height/2+250, 'Press Spacebar to return to the menu').setOrigin(0);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}