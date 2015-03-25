'use strict';

require("./blastFramework");
require("./blastFramework_sprites_terrain");
require("./blastFramework_blocks");

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


api.prototype.CreatePlatform = function (group, x, y) {
    $blast.appendCode('onCreate', 'createPlatform', {
        group: group,
        x: x,
        y: y
    });
};


api.prototype.CreateRock = function (group, x, y, gravity) {
    $blast.appendCode('onCreate', 'createRock', {
        group: group,
        x: x,
        y: y,
        gravity: gravity
    });
};


api.prototype.CreateTree = function (group, x, y, gravity) {
    $blast.appendCode('onCreate', 'createTree', {
        group: group,
        x: x,
        y: y,
        gravity: gravity
    });
};


api.prototype.CreateBullet = function (x, y, gravity, xVel, yVel, angle) {
    $blast.appendCode('once', 'createBullet', {
        x: x,
        y: y,
        gravity: gravity,
        xVel: xVel,
        yVel: yVel,
        angle: angle
    });
};


api.prototype.DeleteSprite = function(name) {
    $blast.appendCode('once', 'deleteSprite', {
        name: name
    });
}


api.prototype.SetPosition = function(name,x,y) {
    $blast.appendCode('once', 'setPosition', {
        name: name,
        x: x,
        y: y
    });
}


api.prototype.GenerateGame = function () {
    $blast.generateGame();
}


if (typeof window !== 'undefined') {
    window.api = new api();
}


