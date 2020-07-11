/*
    class to make button making less messy and repeat less code
    *****************
    adapted William Clarkson's example for a Button class at 
    https://phasergames.com/how-to-make-buttons-in-phaser-3/
*/

'use strict';

class ButtonTemplate extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.setInteractive();
        this.setOrigin(0, 0);
        scene.add.existing(this);
    }
}