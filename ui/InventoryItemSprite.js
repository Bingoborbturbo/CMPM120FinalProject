'use strict';

class InventoryItemSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, item, inventory, index) {
        super(scene, x, y, item.name);

        this.scene = scene;
        this.item = item;
        this.inventory = inventory;
        this.index = index;

        this.setScale(8, 8);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.itemClick);
    }

    // method to run for when this sprite representing the item gets clicked
    itemClick() {

        // these if statements feel a little dirty but i will use them lol

        console.log('clicked');
        if (this.scene.scene.isActive('inventoryscene')) {
            // if clicked in inventory menu:
            this.item.onUse(this.inventory, this.index);
        }
    }
}