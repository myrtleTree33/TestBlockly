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
        // create or assign new name
        if (name === "" || !name) {
            _scope.name = uuid.v4();
        } else {
            _scope.name = name;
        }
        console.log(_scope);
        _scope.obj.name = _scope.name;
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


__generators.sky = function (name) {
    var nativeObject = __generators.SimpleSprite(name);

    var init = function () {
        var sky = $blast._groups.background.create(0, 0, 'sky');
        sky.group = "background";
        console.debug("Init sky.");
        this.obj = sky; // add to object
        nativeObject._init(this);
    };

    var kill = function () {
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.platform = function (x,y) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var ledge = $blast._groups.terrain.create(x, y, 'ground');

        ledge.group = "terrain";
        ledge.body.immovable = true;
        console.debug(ledge);
        this.obj = ledge; // add to object
        nativeObject._init(this);
        console.debug("Init platform at x=" + x + ',' + y);
    };

    var kill = function () {
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.rock = function (x,y, gravity) {
    var nativeObject = __generators.SimpleSprite('rock1');
    //var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var rock = $blast._groups.destructibles.create(x, y, 'firstaid');
        rock.group = "destructibles";
        rock.body.gravity.y = gravity;
        rock.body.bounce.y = 0.7 + Math.random() * 0.2;
        rock.outOfBoundsKill = true;
        rock.body.collideWorldBounds = true;
        this.obj = rock; // add to object
        nativeObject._init(this);
        console.debug("Init rock at x=" + x + ',' + y);
    };

    var kill = function () {
        console.log("=KILL= I got called");
        var explosion = $blast._game.add.sprite(this.obj.x, this.obj.y,'explosion');
        explosion.anchor.setTo(0.5,0.5);
        var anim = explosion.animations.add('explode', null, 60, false);
        anim.killOnComplete = true;
        anim.play('explode');
        anim.onComplete.add(function() {
            console.log('Explosion played.');
            explosion.kill();
        });
        this.obj.destroy();
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};

//TODO Refactor _init to include the created object sprite, and reference
// _init($scope, sprite)
// sprite.group and sprite.id should be defined
// these should be included in the collision manager


__generators.tree = function (x,y, gravity) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var rock = $blast._groups.terrain.create(x, y, 'tree35');
        rock.group = "terrain";
        //rock.body.immovable = true;
        rock.body.gravity.y = gravity;
        rock.body.bounce.y = 0.1 + Math.random() * 0.1;
        rock.outOfBoundsKill = true;
        rock.body.collideWorldBounds = true;
        this.obj = rock; // add to object
        nativeObject._init(this);
        console.debug("Init tree at x=" + x + ',' + y);
    };

    var kill = function () {
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.bullet = function (x,y, gravity, xVel, yVel) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var bullet = $blast._groups.destructibles.create(x, y, 'diamond');
        bullet.group = "terrain";
        bullet.body.velocity.x = xVel;
        bullet.body.velocity.y = yVel;
        bullet.body.gravity.y = gravity;
        bullet.body.bounce.y = 0.7 + Math.random() * 0.2;
        bullet.outOfBoundsKill = true;
        bullet.body.collideWorldBounds = true;
        this.obj = bullet; // add to object
        nativeObject._init(this);
        console.debug('Init bullet at (' + x + ',' + y + '),' + 'vel=(' + xVel + ',' + yVel + ')' );

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





