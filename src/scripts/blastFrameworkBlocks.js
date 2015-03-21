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


__blocks.createPlatform = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var code = 'var sprite = $blast.sprite.generators.platform(' + x + ',' + y + ').init();\n';
    return code;
};


__blocks.createRock = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 30;
    var code = 'var sprite = $blast.sprite.generators.rock(' + x + ','
        + y + ',' + gravity + ').init();\n';
    return code;
};


__blocks.createTree = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 900;
    var code = 'var sprite = $blast.sprite.generators.tree(' + x + ','
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


__blocks.deleteSprite = function (opts) {
    var name = opts.name || '';
    var code = '$blast.deregisterObject(\'' + name + '\');';
    return code;
};


__blocks.setPosition = function (opts) {
    //TODO there is a problem with this
    var opts = opts || {};
    var name = opts.name || '';
    var x = opts.x || 0;
    var y = opts.y || 0;
    var code = '$blast.sprite.actions.setPosition(' + '\'' + name + '\'' + ','
        + x + ',' + y + ');\n';
    return code;

};
