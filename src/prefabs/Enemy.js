class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
        //States the player can be in
        
        // add sfx here this.sfx<name> = scene.sound.add('sfx_<soundname>');
        this.sfxESpawn = scene.sound.add('appear');
        // make sure the file is already loaded in menu.js
    }
    create() {
        // define key values 

        this.sfxESpawn.play(); // play pop sfx when spawned
    }

    update() {
        
    }
        
    reset() {}
}