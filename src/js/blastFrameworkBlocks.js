/**
 * Created by joel on 2/25/15.
 */

'use strict';

var Blast = Blast || {};
var __blocks = Blast.prototype._blocks;

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


__blocks.DeleteSprite = function (opts) {
    var name = opts.name || '';
    var code = '$blast.deregisterObject(\'' + name + '\');';
    return code;

};
