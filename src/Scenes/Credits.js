class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    init() {}
    preload() {}
    create() { 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width-700, game.config.height-600, 'Mixing Mayhem Credits');
        this.add.text(game.config.width-700, game.config.height-550, 'Art by Nathaneal Fonken');
        this.add.text(game.config.width-700, game.config.height-520, 'Programming and Level Design by Ryan McCarty');
        this.add.text(game.config.width-700, game.config.height-490, 'More programming and sound by Masateru Nakajima');
        this.add.text(game.config.width-700, game.config.height-460, 'Shattering sound from \nhttps://freesound.org/people/spookymodem/sounds/202093/')
        this.add.text(game.config.width-700, game.config.height-400, 'Pop sound effect from \nhttps://soundeffect-lab.info/')
        this.add.text(game.config.width-700, game.config.height-340, 'BGM (Telos by exurbia) from \nhttps://soundcloud.com/exurbia-1/telos')
        
        this.menuText = this.add.text(game.config.width-700, game.config.height/2+250, 'Press Spacebar to return to the menu').setOrigin(0);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}