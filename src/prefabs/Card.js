class Card extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, cardType, charge, combined) {
        super(scene, x, y, texture, frame);

        //add to Scene
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
        this.cardType = cardType;
        this.charge = charge;
        this.combined = combined;
        this.running = false;
        }
    create() {
        cardDeck.append(this);
    }
    update() {}
    reset() {}
}