class Card extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, cardType, charge, combined) {
        super(scene, x, y, texture, frame);

        //add to Scene
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
        this.cardType = cardType;
        this.combinedTypeList = [];
        this.charge = charge;
        this.combined = combined;
        this.running = false;

        // load sfx here
        this.sfxFlip = scene.sound.add('flip');
    }

    create() {
        this.sfxFlip.play(); // play flip sfx when spawned
    }
    update() {}
    reset() {}
}