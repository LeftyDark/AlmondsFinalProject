class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {}
    preload() {
        this.load.image('enemy', './assets/birthday girl static.png');
        this.load.image('player', './assets/idleR.png');
        this.load.image('playerL', './assets/idleL.png');
        this.load.image('title', './assets/Title.png');
        this.load.audio('appear', './assets/SoundEffects/placeholder.wav');
        this.load.audio('flip', './assets/SoundEffects/cardflip.wav');
        this.load.audio('break', './assets/SoundEffects/202093__spookymodem__bottle-shattering.wav')
        this.load.audio('BGMplay', './assets/BGM/tanukichi_loop.wav'); // DOVA-Syndrome たぬきちの冒険
    }
    create() {
        textConfig = {
            backgroundColor: '#487CA5'
        }
        splitTextConfig = {
            backgroundColor: '#E50707'
        }
        // loop BGM
        playBGM = this.sound.add('BGMplay');
        playBGM.loop = true;
        playBGM.play();
        this.spacebarCounter = 0;
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.image(game.config.width-930, game.config.height-600, 'enemy',);
        this.add.image(game.config.width-830, game.config.height-560, 'playerL');
        this.add.image(game.config.width-450, game.config.height-560, 'playerL');
        this.add.image(game.config.width-350, game.config.height-600, 'enemy');
        this.add.image(game.config.width-250, game.config.height-600, 'enemy');
        this.add.image(game.config.width-150, game.config.height-600, 'enemy');
        this.add.image(game.config.width-50, game.config.height-600, 'enemy');
        this.nameImage = this.add.image(game.config.width-780,game.config.height-650, 'title').setOrigin(0);
        this.startText = this.add.text(game.config.width-700, game.config.height/2+200, 'Press Spacebar to view controls', textConfig).setOrigin(0);
        this.creditsText = this.add.text(game.config.width-700, game.config.height/2+250, 'Press R to view Credits', splitTextConfig).setOrigin(0);
        this.controlText = this.add.text(game.config.width-5000, game.config.height/2-100, 'A great alchemist accidentally sealed away all their powers and strength within their potions! \n Now they must use and mix their potions to move, jump, and more! \n Click on 2 potion cards in a row to unleash their powers! \n If their charges are not both positive or negative, they\'ll also combine into a new potion! \n Use these potions to reach the star and help the alchemist regain their powers. \n But be wary, hitting an enemy or running out of potion cards in deck will end the game. \n They\'ll never regain their lost powers then...', textConfig).setOrigin(0);
        this.moveText = this.add.text(game.config.width-4000, game.config.height/2-160, 'There are 4 variations of the move card. \n Move1L and Move1R move the alchemist slightly to the left or right respectively. \n Meanwhile Move3L and Move3R have the alchemist dash farther in their corresponding direction', textConfig).setOrigin(0);
        this.jumpText = this.add.text(game.config.width-4000, game.config.height/2-110, 'The jump card lets the alchemist unleash a powerful jump to help him reach higher platforms.', splitTextConfig).setOrigin(0);
        this.monsterText = this.add.text(game.config.width-4000, game.config.height/2-90, 'The monster card summons a dangerous monster onto the stage the alchemist must avoid. \n However, defeating a monster will let the alchemist add another potion to their deck!', textConfig).setOrigin(0);
        this.attackText = this.add.text(game.config.width-4000, game.config.height/2-50, 'The attack card is a destructive potion that will destroy all nearby monsters. \n This can be helpful to both help clear the path to the goal and get more cards! \n Using enemy and attack cards together cancel each other out, \n this does not give you the card you would get for defeating the enemy.', splitTextConfig).setOrigin(0);
        this.splitText = this.add.text(game.config.width-4000, game.config.height/2+20, 'After activating a split card, the alchemist freezes to split one of their potions. \n Pick a potion to split by typing 1,2,3,4, or 5. \n That will select the potion in that position in the hand (from left to right). \n Spliting a potion card that has not been combined with another potion will destroy it. \n Splitting a combined potion will create 2 cards in the deck, \n one uncombined card that was the last action of the selected potion, \n and the combined potion without the action that was split from it. \n After the split is complete, a new card will be drawn from the deck.', textConfig).setOrigin(0);
    }
    update() {
        // PLAY button UI?

        // If a key is pushed, start game ( the following code runs )
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.spacebarCounter +=1;
        }
        if (this.spacebarCounter ==1) {
            this.startText.destroy();
            this.controlText.x = game.config.width-950;
            this.startText = this.add.text(game.config.width-700, game.config.height/2+200, 'Press Spacebar to learn about the cards', textConfig).setOrigin(0);
        }
        if (this.spacebarCounter ==2) {
            this.startText.destroy();
            this.controlText.destroy();
            this.moveText.x = game.config.width-950;
            this.jumpText.x = game.config.width-950;
            this.monsterText.x = game.config.width-950;
            this.attackText.x = game.config.width-950;
            this.splitText.x = game.config.width-950;
            this.startText = this.add.text(game.config.width-700, game.config.height/2+200, 'Press Spacebar to start game', textConfig).setOrigin(0);
            
        }
        if (this.spacebarCounter ==3) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('creditsScene');
            this.sound.stopAll();
        }
    }
}

