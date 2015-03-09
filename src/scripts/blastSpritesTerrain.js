/**
 * Created by joel on 2/25/15.
 */

'use strict';


require("./blastFramework");

var uuid = require("./vendor/node-uuid")
    , _ = require("./vendor/lodash/lodash.min");

//var Blast = Blast || {}; // blast library
//var $blast = $blast || new Blast(); // instance of blast
//var __generators = Blast.prototype.sprite.generators; // extending sprite generators
//var __groups = $blast._groups;


__generators.SimpleSprite = function (name) {
    var _scope = undefined;

    var _kill = function () {
        console.debug('Kill routine for name=' + _scope.name + ' called.');
        delete this;
    }

    var _init = function (scope) {
        _scope = scope;
        if (!name) {
            _scope.name = uuid.v4();
            console.debug('No name found.  Generating unique name=' + _scope.name);
        } else {
            _scope.name = name;
        }
        $blast.registerObject(_scope.name, _scope);
        console.debug('SimpleSprite=' + _scope.name + ' created');
    }

    /**
     * Override this implementation.
     */
    var init = function () {
        /** Insert code here **/
        /** End insert code here **/
        _init(this);
    };

    /**
     * Override this implementation.
     */
    var kill = function () {
        /** Insert code here **/
        /** End insert code here **/
        _kill();
    };

    return {
        _init: _init,
        _kill: _kill,
        init: init,
        kill: kill
    }
};


/**
 * This is an example of an extended object
 * @param name
 * @returns {*}
 */
__generators.b = function (name) {
    var nativeObject = __generators.SimpleSprite(name);

    var init = function () {
        nativeObject._init(this);
        console.log("I got extended!!");
    };

    var kill = function () {
        nativeObject._kill();
    };

    var hello = function () {
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill,
        hello: hello
    });
};


/**
 * This is an example of an extended object
 * @param name
 * @returns {*}
 */
__generators.sky = function (name) {
    var nativeObject = __generators.SimpleSprite(name);

    var init = function () {
        nativeObject._init(this);
        $blast._game.add.sprite(0,0,'sky');
        console.log($blast._game);
        console.log("Init sky.");
    };

    var kill = function () {
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.a = function () {
    console.log('extended!!');
};





