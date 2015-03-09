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


__blocks.CreateSimpleSprite = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.SimpleSprite(\'' + name + '\').init();\n';
    return code;

};


__blocks.CreateExtendedSprite = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.b(\'' + name + '\').init();\n';
    return code;
};


__blocks.CreateSky = function (opts) {
    var opts = opts || {};
    var name = opts.name || '';
    var code = 'var sprite = $blast.sprite.generators.sky(\'' + name + '\').init();\n';
    return code;
};


__blocks.CreatePlatform = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var code = 'var sprite = $blast.sprite.generators.platform(' + x + ',' + y + ').init();\n';
    return code;
};


__blocks.CreateRock = function (opts) {
    var opts = opts || {};
    var x = opts.x || 0;
    var y = opts.y || 0;
    var gravity = opts.gravity || 30;
    var code = 'var sprite = $blast.sprite.generators.rock(' + x + ','
        + y + ',' + gravity + ').init();\n';
    return code;
};

__blocks.DeleteSprite = function (opts) {
    var name = opts.name || '';
    var code = '$blast.deregisterObject(\'' + name + '\');';
    return code;

};