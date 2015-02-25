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




