/**
 * Created by joel on 2/25/15.
 */

'use strict';

var Blast = Blast || {};
var __generators = Blast.prototype.sprite.generators;


__generators.SimpleSprite = function(name) {
    var _scope = undefined;

    var kill = function() {
        console.debug('Kill routine for name=' + name + ' called.');
        delete this;
    }

    var init = function() {
        _scope = this;
        _scope.name = name;
        $blast.registerObject(name, _scope);
        console.debug('SimpleSprite=' + name + ' created');
    }

    return {
        init: init,
        kill: kill
    }
}


__generators.a = function () {
    console.log('extended!!');
};





