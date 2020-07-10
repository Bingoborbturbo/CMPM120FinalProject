'use strict';
class PlanetSelection extends Phaser.Scene {
    
    constructor() {

        super('planetselection');
        this.ship = ship;
        this.maxTravelDistance;
    }

    preload() {

        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('fuelbutton', './assets/fuel_button.png');
    }

    create() {
        
        // calculating the current max travel distance possible:
        // for now, let's just make the ship travel 8 units of distance per one unit of fuel
        // to keep things simple
        

        /* 
            here we manually create the two planets for testing reasons, but
            ideally in the future we would be randomly given to us a bunch of planets
            to choose from and they would all be represented in the UI
         */

        this.maxTravelDistance = this.ship.maxTravelDistance;

        this.planet = new Planet('earth');
        this.planet2 = new Planet('moocury');
        // and then we hard code the values for now 
        this.planet.planetDistance = 360;
        this.planet2.planetDistance = 1050;
        
        // later we might automatically generate them somehow
        // probably using a factory class of some kind

        this.loadUI();
        this.inputSetup();        
    }

    update() {

    }
    

    loadUI() {

        /*
            probably should find some way to remove hard coded UI sprite/text position values later. 
            if there are variable number of planets to choose from later, it would be difficult 
            to get coordinates for each button position. 

            probably set up a different scene altogether overlayed on top for UI
         */
        this.add.text(400, 10, 'Day ' + (this.ship.totalDaysTravelled + 1) + ': ' + this.ship.currentPlanet.name);
        this.add.text(10, 70, 'You may only travel to a planet if you have');
        this.add.text(10, 90, 'enough fuel!');
        this.add.text(10, 130, 'Ship engine efficiency (distance per fuel): ' + this.ship.engine.engineEfficiency);
        this.fuelAmountText = this.add.text(10, 170, 'Ship fuel amount: ' + this.ship.fuelAmount  + ', max fuel: ' + this.ship.maxFuelAmount);

        // temporary button for giving free fuel (for prototype testing)
        // we dont want to give free fuel in end version
        this.freeFuelButton = this.add.sprite(636, 395, 'fuelbutton');
        this.freeFuelButton
            .setInteractive()
            .on('pointerdown', this.giveFreeFuel, this);

        /*
            i made a separate class for a button object, so that we can apply graphical
            changes to the button depending on the attributes of the planet
            (we pass in the planet the button is representing as the planet objects we made in create())
        */
        this.planetButton = new PlanetButtonObject(this, 295, 395, 'planetbutton', 0, this.planet);
        // hard code in the second planet for now:
        this.planetButton2 = new PlanetButtonObject(this, 465, 395, 'planetbutton', 0, this.planet2);
    }

    loadPlanetMenu(planet) {
        // the callback function for the 'pointerdown' listener on the planet button
        // later on, the UI would know the info about the planet, and display it accordingly
        
        /* 
            set the game to "remember" current state of the planet
         */
        this.registry.set('tempPlanet', planet);

        // start next scene (we can add the intermediary scene between this one and planetmenu later)
        this.scene.start('planetmenu');

        this.ship.travel(planet);
    }

    giveFreeFuel() {
        this.ship.fuelAmount += 50;
        this.maxTravelDistance = this.ship.maxTravelDistance; 
        this.fuelAmountText.text = 'Ship fuel amount: ' + this.ship.fuelAmount + ', max fuel: ' + this.ship.maxFuelAmount;
    }

    inputSetup() {

    }
}