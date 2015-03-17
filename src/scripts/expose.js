'use strict';

require("./blastFramework");
require("./blastSpritesTerrain");
require("./blastFrameworkBlocks");

var api = function () {
};


api.prototype.Echo = function (message) {
    $blast.appendCode('once', 'log', {
        message: message
    });

    console.log("Called");
};


api.prototype.CreateSky = function () {
    $blast.appendCode('onCreate', 'createSky', {
        name: 'sky'
    });
};


api.prototype.CreatePlatform = function (x, y) {
    $blast.appendCode('onCreate', 'createPlatform', {
        x: x,
        y: y
    });
};


api.prototype.CreateRock = function (x, y, gravity) {
    $blast.appendCode('onCreate', 'createRock', {
        x: x,
        y: y,
        gravity: gravity
    });
};


api.prototype.GenerateGame = function () {
    $blast.generateGame();
}


if (typeof window !== 'undefined') {
    window.api = new api();
}


