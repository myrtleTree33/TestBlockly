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
        return;
    }

    spriteObj = $blast.getObject(name);
    if (!spriteObj) {
        return;
    }

    if (property === 'x' || property === 'y') {
        return spriteObj.obj[property];

    } else if (property === 'velX') {
        return spriteObj.obj.body.velocity.x;

    } else if (property === 'velY') {
        return spriteObj.obj.body.velocity.y;

    }
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

