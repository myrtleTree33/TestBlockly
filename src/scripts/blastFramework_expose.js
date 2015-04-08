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
    $blast.appendCode('once', 'createPlatform', {
        group: group,
        x: x,
        y: y
    });
};


api.prototype.CreateTilePlatform = function (group, x, y, width, height) {
    $blast.appendCode('onCreate', 'createTilePlatform', {
        group: group,
        x: x,
        y: y,
        width: width,
        height: height
    });
};

api.prototype.CreateRock = function (group, name, x, y, gravity) {
    $blast.appendCode('once', 'createRock', {
        group: group,
        name: name,
        x: x,
        y: y,
        gravity: gravity
    });
};


api.prototype.CreateTree = function (group, name, x, y, gravity) {
    $blast.appendCode('once', 'createTree', {
        group: group,
        name: name,
        x: x,
        y: y,
        gravity: gravity
    });
};


api.prototype.CreateBullet = function (x, y, gravity, xVel, yVel) {
    $blast.appendCode('once', 'createBullet', {
        x: x,
        y: y,
        gravity: gravity,
        xVel: xVel,
        yVel: yVel
    });
};


api.prototype.CreatePlayer = function (group, name, x, y, gravity) {
    $blast.appendCode('once', 'createPlayer', {
        group: group,
        name: name,
        x: x,
        y: y,
        gravity: gravity,
    });
};


api.prototype.DeleteSprite = function(name) {
    $blast.appendCode('once', 'deleteSprite', {
        name: name
    });
};


api.prototype.SetPosition = function(name,x,y) {
    $blast.appendCode('once', 'setPosition', {
        name: name,
        x: x,
        y: y
    });
};


api.prototype.SetState = function(name,state) {
    $blast.appendCode('once', 'setState', {
        name: name,
        state: state
    });
}


api.prototype.GenerateGame = function () {
    $blast.generateGame();
};


api.prototype.GetGameWidth = function(uuidStr) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, __actions.getGameWidth().toString());
    }
    console.log("WIDTH:" + __actions.getGameWidth().toString());
};


api.prototype.GetGameHeight = function(uuidStr) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, __actions.getGameHeight().toString());
    }
    console.log("HEIGHT:" + __actions.getGameHeight());
};


api.prototype.GetSpriteX = function(uuidStr, name) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, Number(__actions.getSpriteProp(name, 'x')).toString());
        //Android.sendMessage(uuidStr, "46");
        //Android.sendMessage(uuidStr, __actions.getGameHeight().toString());
    }
    console.log("X:" + String(__actions.getSpriteProp(name, 'x')));
};


api.prototype.SetSpriteX = function(name, x) {
    __actions.setSpriteProp(name, 'x', x || 0);
};


api.prototype.GetSpriteY = function(uuidStr, name) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, __actions.getSpriteProp(name, 'y'));
        //Android.sendMessage(uuidStr, "20");
    }
    console.log("Vel Y:" + __actions.getSpriteProp(name, 'y'));
};


api.prototype.SetSpriteY = function(name, y) {
    __actions.setSpriteProp(name, 'y', y || 0);
};


api.prototype.GetSpriteVelY = function(uuidStr, name) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, __actions.getSpriteProp(name, 'velY'));
    }
    console.log("Y:" + __actions.getSpriteProp(name, 'velY'));
};


api.prototype.SetSpriteVelY = function(name, velY) {
    __actions.setSpriteProp(name, 'velY', velY || 0);
};


api.prototype.GetSpriteVelX = function(uuidStr, name) {
    if (hasAndroid) {
        Android.sendMessage(uuidStr, __actions.getSpriteProp(name, 'velX'));
    }
    console.log("Vel X:" + __actions.getSpriteProp(name, 'velX'));
};


api.prototype.SetSpriteVelX = function(name, velX) {
    __actions.setSpriteProp(name, 'velX', velX || 0);
};



if (typeof window !== 'undefined') {
    window.api = new api();
}


