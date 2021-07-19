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
        this.move = 0;
        this.jump = 0;
        this.enemy = 0;
        this.attack = 0;
        this.split = 0;
        this.handPosition = 0;
        this.cardText = 'no text yet';
        
        // load sfx here
        this.sfxFlip = scene.sound.add('flip');
        this.appear = scene.sound.add('appear');
    }

    create() {
        this.sfxFlip.play(); // play flip sfx when spawned
    }
    update() {}
    reset() {}

    runSingleType (type) {
        this.appear.play();
        //The function that is use to run one single card, or one part of a combined card
        if (type == 'move1L') {
            //place move function here running to move 1L
            console.log('moving 1 to the left');
            player.left();
        }
        if (type == 'move3L') {
            //place move function here running to move 3L
            console.log('moving 3 to the left');
            player.left();
            player.left();
            player.left();
        }
        if (type == 'move1R') {
            //place move function here running to move 1R
            console.log('moving 1 to the right');
            player.right();
        }
        if (type == 'move3R') {
            //place move function here running to move 3R
            console.log('moving 3 to the right');
            player.right();
            player.right();
            player.right();
        }
        if (type == 'jump') {
            //place jump function here
            console.log('jumping');
            player.jump();
        }
        if (type == 'enemy') {
            //place enemy creation function here
            console.log('new enemy created');
            game.settings = {
                enemyspawncommand: true
            };
        }
        if (type == 'attack') {
            //place attack function here
            console.log('attack launched');
            game.settings = {
                enemyexterminatecommand: true
            };
        }
        if (type == 'split') {
            splitNum +=1;
            this.splitFunc();
            console.log('cardSplit');
        }
    }
    runCombinedType() {
        this.appear.play();
        if (this.move < 0) {
            let runLeft = Math.abs(this.move)
            for (let i = 0; i < runLeft; i++) {player.left();}
        }
        if (this.move > 0) {
            for (let i = 0; i < this.move; i++) {player.right();}
        }
        if (this.jump > 0) {
            for (let i = 0; i < this.jump; i++) {player.jump();}
        }
        if (this.enemy > 0) {
            for (let i = 0; i < this.enemy; i++) {//put enemy function here
                console.log('new enemy created');
                game.settings = {
                    enemyspawncommand: true
                };}
        }
        if (this.attack > 0) {
            for (let i = 0; i < this.attack; i++) {game.settings = {
                enemyexterminatecommand: true
            };
            }
        }
        if (this.split > 0) {
            for (let i = 0; i < this.split; i++) {
                splitNum+=1;
                this.splitFunc();
            }
        }
    }
    splitFunc() {
        //This function actually just changes isSplitting to true, so within play.js and update the actual function that does the splitting will run.
        isSplitting = true;
    }
}
