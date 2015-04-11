/**
 * Created by joel on 2/25/15.
 *
 * Actions, including getters / setters, are stored here.
 *
 */

'use strict';

//require("./blastFramework");

require('./blastFramework');

__actions.getGameWidth = function () {
    if ($blast._game) {
        return $blast._game.width;
    }
};


__actions.getGameHeight = function () {
    if ($blast._game) {
        return $blast._game.height;
    }
};


__actions.getSpriteProp = function (name, property) {
    var spriteObj;
    if (!$blast._game) {
        return -2;
    }

    spriteObj = $blast.getObject(name);
    if (!spriteObj) {
        return -4;
    }

    if (property === 'x') {
        return spriteObj.obj.x;

    } else if (property === 'y') {
        return spriteObj.obj.y;

    } else if (property === 'velX') {
        return spriteObj.obj.body.velocity.x;

    } else if (property === 'velY') {
        return spriteObj.obj.body.velocity.y;

    } else {
        return 23;
    }

    return 46;

};


__actions.setSpriteProp = function (name, property, value) {
    var spriteObj;
    if (!$blast._game) {
        return;
    }

    spriteObj = $blast.getObject(name);
    if (!spriteObj) {
        return;
    }

    if (property === 'x' || property === 'y') {
        spriteObj.obj[property] = value;

    } else if (property === 'velX') {
        spriteObj.obj.body.velocity.x = value;

    } else if (property === 'velY') {
        spriteObj.obj.body.velocity.y = value;

    }
};


__actions.setGameScale = function (width, height) {
    var width = width || 0
        , height = height || 0;
    $blast._game.world.setBounds(0, 0, width, height);
    console.log('Game size changed=' + width + ',' + height);
};


__actions.setCameraPos = function (x, y) {
    var x = x || 0
        , y = y || 0;

    $blast._game.camera.x = x;
    $blast._game.camera.y = y;
};

