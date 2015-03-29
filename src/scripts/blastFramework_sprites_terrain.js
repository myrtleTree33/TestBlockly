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
        var sky = $blast._groups.background.create(0, 0, 'desert');
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


__generators.platform = function (group, x,y) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var ledge = $blast._groups[group].create(x, y, 'ground');

        ledge.group = group;
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


__generators.tilePlatform = function (group, x,y, width, height) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        console.log($blast);
        var target = $blast._game.add.tileSprite(x, y, width, height, 'textureSand', 2);
        target = $blast._groups[group].add(target);

        target.group = group;
        target.body.immovable = true;
        this.obj = target; // add to object
        nativeObject._init(this);
        console.debug("Init tiled platform at x=" + x + ',' + y);
    };

    var kill = function () {
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.rock = function (group, x,y, gravity) {
    var nativeObject = __generators.SimpleSprite('rock1');
    //var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var rock = $blast._groups[group].create(x, y, 'rock1');
        rock.group = group;
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
        __generators.explosion(this.obj.x,this.obj.y);
        this.obj.destroy();
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.explosion = function(x,y) {
    var explosion = $blast._game.add.sprite(x, y,'explosion');
    explosion.anchor.setTo(0.5,0.5);
    var anim = explosion.animations.add('explode', null, 60, false);
    anim.killOnComplete = true;
    anim.play('explode');
    anim.onComplete.add(function() {
        console.log('Explosion at (' + x + ',' + y + ')');
        explosion.kill();
    });
};


//TODO Refactor _init to include the created object sprite, and reference
// _init($scope, sprite)
// sprite.group and sprite.id should be defined
// these should be included in the collision manager


__generators.tree = function (group, x,y, gravity) {
    var nativeObject = __generators.SimpleSprite();

    var init = function () {
        var rock = $blast._groups[group].create(x, y, 'tree35');
        rock.group = group;
        //rock.body.immovable = true;
        rock.body.gravity.y = gravity;
        rock.body.bounce.y = 0.1 + Math.random() * 0.1;
        rock.body.mass = 9999;
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
        var bullet = $blast._groups.bullet.create(x, y, 'bullet1');
        bullet.group = "bullet";
        bullet.body.velocity.x = xVel;
        bullet.body.velocity.y = yVel;
        bullet.body.gravity.y = gravity;
        bullet.body.bounce.y = 0.7 + Math.random() * 0.2;
        bullet.outOfBoundsKill = true;
        bullet.anchor.setTo(0.5,0);
        bullet.checkWorldBounds = true;
        bullet.update = function() {
            var vel = bullet.body.velocity;
            bullet.angle = - Math.atan2(vel.x,vel.y)/(Math.PI/180) + 180;
        };
        this.obj = bullet; // add to object
        nativeObject._init(this);
        console.debug('Init bullet at (' + x + ',' + y + '),' + 'vel=(' + xVel + ',' + yVel + ')' );
        bullet.events.onOutOfBounds.add(function() {
            console.log(bullet.name);
            $blast.deregisterObject(bullet.name);
            console.log ("OUT OF SCREEN");
        }, bullet);

    };

    var kill = function () {
        console.log("=KILL= I got called");
        __generators.explosion(this.obj.x,this.obj.y);
        this.obj.destroy();
        nativeObject._kill();
    };

    return _.extend({}, nativeObject, {
        init: init,
        kill: kill
    });
};


__generators.player = function (group, name, x, y, gravity) {
    var nativeObject = __generators.SimpleSprite(name);
    //var nativeObject = __generators.SimpleSprite();

    var player = {};

    var init = function () {
        player = $blast._groups[group].create(x, y, 'dude');
        player.group = group;
        player.body.gravity.y = gravity;
        player.body.bounce.y = 0.2;
        player.outOfBoundsKill = true;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0,1,2,3], 10, true);
        player.animations.add('right', [5,6,7,8], 10, true);
        this.obj = player; // add to object
        nativeObject._init(this);
        console.debug("Init player at x=" + x + ',' + y);
    };

    var kill = function () {
        console.log("John got removed??");
        __generators.explosion(this.obj.x,this.obj.y);
        this.obj.destroy();
        nativeObject._kill();
    };


    var moveLeft = function() {
        player.body.velocity.x = -150;
        player.animations.play('left');
    };


    var moveRight = function() {
        player.body.velocity.x = 150;
        player.animations.play('right');
    };


    var stop = function() {
        player.body.velocity.x = 0;
      player.animations.stop();
    };


    var jump = function() {
        player.body.velocity.y = -350;
    };

    return _.extend({}, nativeObject, {
        init: init,
        moveLeft: moveLeft,
        moveRight: moveRight,
        stop: stop,
        jump: jump,
        kill: kill
    });
};


__generators.a = function () {
    console.log('extended!!');
};





