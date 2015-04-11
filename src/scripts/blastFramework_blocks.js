/**
 * Created by joel on 2/25/15.
 */

'use strict';

require("./blastFramework");

//var Blast = Blast || {};
//var __blocks = Blast.prototype._blocks;

__blocks.log = function (opts) {
    var msg = opts.message || '';
    return 'console.log(\'' + msg + '\');';

};

var dumpStr = function (rawString) {
    return '\'' + rawString + '\'';
};


__blocks.setGameSize = function (opts) {
    var opts = opts || {}
        , width = opts.width || 0
        , height = opts.height || 0
        , code = '__actions.setGameScale('
            + width + ',' + height
            + ');' + '\n';
    return code;
};


__blocks.setCameraPos = function (opts) {
    var opts = opts || {}
        , x = opts.x || 0
        , y = opts.y || 0
        , code = '__actions.setCameraPos('
            + x + ',' + y
            + ');' + '\n';
    return code;
};


__blocks.setCameraFollow = function (opts) {
    var opts = opts || {}
        , name = opts.name || ''
        , code = '__actions.setCameraFollow('
            + dumpStr(name)
            + ');' + '\n';
    return code;
};


__blocks.createSimpleSprite = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.SimpleSprite(\'' + name + '\').init();\n';
    return code;

};


__blocks.createExtendedSprite = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.b(\'' + name + '\').init();\n';
    return code;
};


__blocks.createSky = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.sky(\'' + name + '\').init();\n';
    return code;
};


__blocks.createTiledBackground = function (opts) {
    var opts = opts || {};
    var width = opts.width || 200;
    var height = opts.height || 200;
    var type = opts.type || 'textureSand';
    var code = 'var sprite = $blast.sprite.generators.tiledBackground('
        + dumpStr(type) + ','
        + width + ',' + height
        + ').init();\n';
    return code;
};


__blocks.createPlatform = function (opts) {
    var opts = opts || {};
    var group = opts.group || 'terrain1';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var code = 'var sprite = $blast.sprite.generators.platform(\'' + group + '\',' + x + ',' + y + ').init();\n';
    return code;
};


__blocks.createTilePlatform = function (opts) {
    var opts = opts || {};
    var group = opts.group || 'terrain1';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var width = opts.width || 20;
    var height = opts.height || 20;
    var code = 'var sprite = $blast.sprite.generators.tilePlatform(\'' + group
        + '\',' + x + ',' + y
        + ',' + width + ',' + height
        + ').init();\n';
    return code;
};

__blocks.createRock = function (opts) {
    var opts = opts || {};
    var group = opts.group || 'terrain1';
    var name = opts.name || '';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 30;
    var code = 'var sprite = $blast.sprite.generators.rock(\'' + group + '\',' + '\'' + name + '\',' + x + ','
        + y + ',' + gravity + ').init();\n';
    return code;
};


__blocks.createTree = function (opts) {
    var opts = opts || {};
    var group = opts.group || 'terrain1';
    var name = opts.name || '';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 900;
    var code = 'var sprite = $blast.sprite.generators.tree(\'' + group + '\',' + '\'' + name + '\',' + x + ','
        + y + ',' + gravity + ').init();\n';
    return code;
};


__blocks.createBullet = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 30;
    var xVel = opts.xVel || 0;
    var yVel = opts.yVel || 0;
    var code = 'var sprite = $blast.sprite.generators.bullet(' + x + ','
        + y + ',' + gravity + ',' + xVel + ',' + yVel + ').init();\n';
    return code;
};


__blocks.createPlayer = function (opts) {
    var opts = opts || {};
    var group = opts.group || 'player1';
    var name = opts.name || '';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 30;
    var code = 'var sprite = $blast.sprite.generators.player('
        + '\'' + group + '\','
        + '\'' + name + '\','
        + x + ','
        + y + ',' + gravity + ').init();\n';
    return code;
};


__blocks.deleteSprite = function (opts) {
    var name = opts.name || '';
    var code = '$blast.deregisterObject(\'' + name + '\');';
    return code;
};


__blocks.setPosition = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var x = opts.x || 0;
    var y = opts.y || 0;

    var code = '$blast.getObject(' + '\'' + name + '\').obj.x = ' + x + ';'
        + '$blast.getObject(' + '\'' + name + '\').obj.y = ' + y + ';'
    return code;
};


__blocks.setState = function (opts) {
    //TODO there is a problem with this
    var opts = opts || {};
    var name = opts.name || '';
    var state = opts.state || 0;
    var code = '$blast.getObject(' + '\'' + name + '\').' + state + '();';
    return code;
};




