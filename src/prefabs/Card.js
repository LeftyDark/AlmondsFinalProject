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
        this.selected = false;

        // load sfx here
        this.sfxFlip = scene.sound.add('flip');
    }

    create() {
        this.sfxFlip.play(); // play flip sfx when spawned
    }
    update() {}
    reset() {}

    runSingleType (type) {
        //The function that is use to run one single card, or one part of a combined card
        if (type == 'move1L') {
            //place move function here running to move 1L
            console.log('moving 1 to the left');
            player.leftOne();
        }
        if (type == 'move3L') {
            //place move function here running to move 3L
            console.log('moving 3 to the left');
            player.leftThree();
        }
        if (type == 'move1R') {
            //place move function here running to move 1R
            console.log('moving 1 to the right');
            player.rightOne();
        }
        if (type == 'move3R') {
            //place move function here running to move 3R
            console.log('moving 3 to the right');
            player.rightThree();
        }
        if (type == 'jump') {
            //place jump function here
            console.log('jumping');
            player.jump();
        }
        if (type == 'enemy') {
            //place enemy creation function here
            console.log('new enemy created');
        }
        if (type == 'attack') {
            //place attack function here
            console.log('attack launched');
        }
        if (type == 'split') {
            //place split function here
            console.log('cardSplit');
        }
    }
    runCombinedType() {
        for (let type of this.combinedTypeList) {this.runSingleType(type)};
    }
}