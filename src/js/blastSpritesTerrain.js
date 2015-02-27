/**
 * Created by joel on 2/25/15.
 */

'use strict';

var Blast = Blast || {}; // blast library
var $blast = $blast || new Blast(); // instance of blast
var __generators = Blast.prototype.sprite.generators; // extending sprite generators


__generators.SimpleSprite = function(name) {
    var _scope = undefined;

    var _kill = function() {
        console.debug('Kill routine for name=' + name + ' called.');
        delete this;
    }

    var _init = function(scope) {
        _scope = scope;
        _scope.name = name;
        $blast.registerObject(name, _scope);
        console.debug('SimpleSprite=' + name + ' created');
    }

    /**
     * Override this implementation.
     */
    var init = function() {
        /** Insert code here **/
        /** End insert code here **/
        _init(this);
    }

    /**
     * Override this implementation.
     */
    var kill = function() {
        /** Insert code here **/
        /** End insert code here **/
        _kill();
    }

    return {
        _init: _init,
        _kill: _kill,
        init: init,
        kill: kill
    }
}


__generators.a = function () {
    console.log('extended!!');
};





