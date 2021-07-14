class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
        this.facing = 'right';
        //States the player can be in
        
        // add sfx here this.sfx<name> = scene.sound.add('sfx_<soundname>');
        // this.sfxappear = scene.sound.add('appear');  // optional because Player.js
        // make sure the file is already loaded in menu.js
    }
    create() {
        // define key values 
    }

    update() {
        
    }
        
    reset() {}

    jump() {
        this.body.velocity.y -= 2000;
        if (this.facing == 'right')
        {player.anims.play('playerJumpR', 8, true);}
        else {player.anims.play('playerJumpL', 8, true)}
    }
    left() {
        this.body.velocity.x -= 100;
        if (this.body.velocity.x <0) {
            this.facing = 'left';
        }
        player.anims.play('playerDashL', 8, true);
        setTimeout(() => {  player.body.velocity.x = 0 }, 1000);
    }
    right() {
        this.body.velocity.x += 100;
        if (this.body.velocity.x >0) {
            this.facing = 'right';
        }
        player.anims.play('playerDashR', 8, true);
        setTimeout(() => {  player.body.velocity.x = 0 }, 1000);
    }
}