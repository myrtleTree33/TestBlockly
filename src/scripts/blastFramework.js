'use strict';

/**
 * BLAST Framework for AI2
 *
 * @author TONG Haowen Joel
 *
 */

require('./blastFramework_bootstrap');


var Blast = (function () {
    /** Private variables **/

    /** Used to store sprite behavior / easy object creation **/
    var sprite = {
        generators: {},
        actions: {}
    };
    /** Used to store code blocks **/
    var _blocks = {};

    /** Used to store variables **/
    var _accumulator = {};
    /** Used to inject and execute code **/
    var _pq = [];
    var _game = null;
    var _groups = {};
    var _callbacks = {
        onPreload: function () {

            var __ = $blast;

            ///** Use http://joeltong.org/phaser to load images **/
            //__._game.load.baseURL = "http://joeltong.org/phaser/";

            /** For testing **/
            __._game.load.image('sky', 'images/assets/backgrounds/sky.png');
            __._game.load.image('desert', 'images/assets/backgrounds/colored_desert.png');
            __._game.load.image('rock1', 'images/assets/terrain/meteorBrown_small2.png');
            __._game.load.image('ground', 'images/assets/terrain/platform.png');
            __._game.load.image('bullet1', 'images/assets/laserBlue01.png');
            __._game.load.image('star', 'images/assets/star.png');
            __._game.load.image('diamond', 'images/assets/diamond.png');
            __._game.load.image('firstaid', 'images/assets/firstaid.png');
            __._game.load.image('textureRock', 'images/assets/textures/stoneCenter.png');
            __._game.load.image('textureSand', 'images/assets/textures/sandCenter.png');
            __._game.load.spritesheet('textureMapBrick', 'images/assets/textures/brick_tiles_1.png', 32, 32);
            __._game.load.spritesheet('dude', 'images/assets/dude.png', 32, 48);
            __._game.load.spritesheet('explosion', 'images/assets/explosions/explosion1.png', 128, 128);

            /** From Kenny images **/
            __._game.load.image('tree35', 'images/assets/tree35.png');

        },
        onCreate: function () {
            var __ = $blast;
            __._game.physics.startSystem(Phaser.Physics.arcade);

            /** Create groups **/
            __._groups.background = __._game.add.group();
            __._groups.terrain1 = __._game.add.group();
            __._groups.terrain2 = __._game.add.group();
            __._groups.powerups = __._game.add.group();
            __._groups.destructibles = __._game.add.group();
            __._groups.player1 = __._game.add.group();
            __._groups.player2 = __._game.add.group();
            __._groups.enemy1 = __._game.add.group();
            __._groups.enemy2 = __._game.add.group();
            __._groups.enemy3 = __._game.add.group();
            __._groups.bullet = __._game.add.group();

            /** Which has physics **/
            __._groups.terrain1.enableBody = true;
            __._groups.terrain2.enableBody = true;
            __._groups.player1.enableBody = true;
            __._groups.destructibles.enableBody = true;
            __._groups.bullet.enableBody = true;

            // send state reporting every 0.1 sec
            setInterval(function () {
                var statesStr = JSON.stringify($blast.dumpState());
                if (hasAndroid) {
                    Android.makeSpriteStates(statesStr);
                }
            }, 200);

            console.log("-----------------------");
            _bindHammer();


            // tap events
            __._game.input.onTap.add(_inputManager.onTap);
            __._game.input.onDown.add(_inputManager.onDown);
            __._game.input.onUp.add(_inputManager.onUp);
            __._game.input.onHold.add(_inputManager.onHold);


        },
        onUpdate: function () {
            var __ = $blast;

            // dequeue if there are items
            while (_pq.length != 0) {
                var code = _pq.shift();
                console.debug('@once' + ' Snippet>>>' + code);
                eval(code);
            }

            // collision detection
            /** terrain 1 **/
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.terrain1);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.terrain2);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.powerups);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.destructibles);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.player1);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.player2);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.enemy1);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.enemy2);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.enemy3);

            /** Terrain 2 **/
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.terrain2);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.terrain1);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.powerups);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.destructibles);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.player1);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.player2);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.enemy1);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.enemy2);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.enemy3);

            /** Bullet **/
                //__._game.physics.arcade.collide(__._groups.bullet, __._groups.destructibles);
                //__._game.physics.arcade.collide(__._groups.bullet, __._groups.terrain1);
                //__._game.physics.arcade.collide(__._groups.bullet, __._groups.terrain2);
            __._game.physics.arcade.collide(__._groups.destructibles, __._groups.bullet, _collisionManager, null, this);
            __._game.physics.arcade.collide(__._groups.terrain1, __._groups.bullet, _collisionManager, null, this);
            __._game.physics.arcade.collide(__._groups.terrain2, __._groups.bullet, _collisionManager, null, this);

        }
    };

    // for swiping features
    var _bindHammer = function () {
        var ele = document.getElementsByTagName('body')[0];
        var hammertime = Hammer(ele);

        hammertime.on('swipeup', function (event) {
            _inputManager.onSwipe('up');
        });

        hammertime.on('swipedown', function (event) {
            _inputManager.onSwipe('down');
        });

        hammertime.on('swipeleft', function (event) {
            _inputManager.onSwipe('left');
        });

        hammertime.on('swiperight', function (event) {
            _inputManager.onSwipe('right');
        });

        hammertime.on('swipe', function (event) {
            _inputManager.onSwipe('swipe');
        });
        console.log('--- Attached Hammer.JS ---');
    };


    // Central input manager, sends input events to browser
    var _inputManager = {
        onTap: function (pointer) {
            console.log('Tapped: ' + pointer.x + ',' + pointer.y);
            if (hasAndroid) {
                Android.onTouch("tap", pointer.x, pointer.y);
            }
        },

        onDown: function (pointer) {
            console.log('onDown: ' + pointer.x + ',' + pointer.y);
            if (hasAndroid) {
                Android.onTouch("down", pointer.x, pointer.y);
            }
        },

        onUp: function (pointer) {
            console.log('onUp: ' + pointer.x + ',' + pointer.y);
            if (hasAndroid) {
                Android.onTouch("up", pointer.x, pointer.y);
            }
        },

        onDrag: function (pointer) {
            console.log('Dragged: ' + pointer.x + ',' + pointer.y);
            if (hasAndroid) {
                Android.onTouch("drag", pointer.x, pointer.y);
            }
        },

        onSwipe: function(direction) {
            console.log(direction);
            if (hasAndroid) {
                Android.onSwipe(direction);
            }
        }
    };


    var _collisionManager = function (nativePhaserSpriteA, nativePhaserSpriteB) {
        console.log('Received collision!');
        var spriteA = _accumulator[nativePhaserSpriteA.name]
            , spriteB = _accumulator[nativePhaserSpriteB.name];
        console.log('Detected collision=(' + spriteA.name + ',' + spriteA.obj.group + ') ('
        + spriteB.name + ',' + spriteB.obj.group + ')');

        if (hasAndroid) {
            Android.onCollision(spriteA.name, spriteA.obj.group, spriteB.name, spriteB.obj.group);
        }

        /** Warning: Deleting SpriteA will cause game to crash **/
        if (spriteB.obj.group === 'bullet') {
            console.log("BULLET");
            $blast.deregisterObject(spriteB.obj.name);
            //return;
        }

        console.log('sending android collision event!');
    }


    var dumpState = function () {
        var retVal = [];
        if (!_accumulator) {
            return retVal;
        }
        for (var key in _accumulator) {
            var obj = _accumulator[key].obj;
            if (obj) { // exists
                var state = {
                    name: key,
                    x: obj.x,
                    y: obj.y,
                    velX: obj.body ? obj.body.velocity.x : 0, // if no physics, ignore
                    velY: obj.body ? obj.body.velocity.y : 0
                }
                retVal.push(state);
            }
        }
        return retVal;
    };


    var registerObject = function (name, obj) {
        var _name = name || '';
        var _obj = obj;
        if (_name == '') {
            console.error('Error when registering object.  No name=' + name);
            return false;
        }
        if (_name in _accumulator) {
            console.error('Error when registering object.  Duplicate name=' + _name);
            return false;
        }
        if (!_obj) {
            console.error('Oops.  Error when registering object.  No data.');
            return false;
        }
        console.debug('Registering object=' + _name);

        console.log(_obj);

        _accumulator[_name] = _obj;
        return true;
    }

    var deregisterObject = function (name) {
        var _name = name || '';
        if (_name == '') {
            console.error('Error when deregistering object.  No name specified');
            return false;
        }
        if (!(_name in _accumulator)) {
            console.error('Error when deregistering object.  No name exists=' + _name);
            return false;
        }

        var obj = _accumulator[_name];
        if ('kill' in obj) {
            console.debug('Activating kill() routine found in name=' + _name);
            obj.kill();
        }
        // deregister objects and tell garbage collector
        delete _accumulator[_name];
        obj = _accumulator[_name] = null;
        console.debug('Deregistered object name=' + _name);

    }

    var getObject = function (name) {
        var _name = name || '';
        console.log('i am here');
        var target = _accumulator[_name];
        if (target) {
            console.log('Sprite retrieved: ' + _name);
        } else {
            console.log('Sprite retrieved: undefined');
        }
        return target;
    }

    /**
     * Generates a code snippet, based on blocks.
     * @returns {string}
     * @private
     */
    var _generateCodeSnippet = function (command, opts) {
        if (!(command in _blocks)) {
            console.error('No such block=' + command);
            return '';
        }
        var code = _blocks[command](opts);
        return code;
    };

    /************** Helper Functions *********************/
    /**
     * Helper function to inject code.  Does not verify callback exists.
     * @param target
     * @param command
     * @param data
     * @private
     */
    var _injectCode = function (target, command, opts) {
        var oldFunc = _callbacks[target];
        _callbacks[target] = function () {
            /** <-- insert things to do before here --> **/
            oldFunc.apply(this, arguments);
            /** <-- insert things to do after here --> **/
            var codeSnippet = _generateCodeSnippet(command, opts);
            console.debug('@' + target + ' Snippet>>>' + codeSnippet);
            eval(codeSnippet);
        };
    };

    var _injectCodeOnce = function (command, opts) {
        var codeSnippet = _generateCodeSnippet(command, opts);
        _pq.push(codeSnippet);
    };

    /************** Public Variables *********************/

    /**
     * Blast constructor
     * @constructor
     */
    var Blast = function () {
        console.log('Blast instantiated:' + this._version);
    };

    /**
     * Generates a new game.
     */
    var generateGame = function () {
        console.debug('Creating game..');
        var __ = this;
        this._game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', {
            preload: __._callbacks.onPreload,
            create: __._callbacks.onCreate,
            update: __._callbacks.onUpdate
        });
        console.log(this._game);
        //__._game.scale.startFullScreen();
    };

    /**
     * Public API to append a custom code block.
     * @param target
     * @param command
     * @param opts
     */
    var appendCode = function (target, command, opts) {
        if (target == 'once') {
            _injectCodeOnce(command, opts);
        } else if (!(target in this._callbacks)) {
            console.error('Invalid code block: ' + 'Target=' + target + ' Command=' + command);
        } else {
            _injectCode(target, command, opts);
        }
    }

    Blast.prototype = {
        constructor: Blast,
        _version: 'v0.0.1',
        _pq: _pq,
        _accumulator: _accumulator,
        _blocks: _blocks,
        sprite: sprite,
        _game: _game,
        _groups: _groups,
        _callbacks: _callbacks,
        _collisionManager: _collisionManager,
        dumpState: dumpState,
        registerObject: registerObject,
        deregisterObject: deregisterObject,
        getObject: getObject,
        generateGame: generateGame,
        appendCode: appendCode
    };
    return Blast;
})();

module.exports = Blast;

window.$blast = new Blast();
window.__generators = Blast.prototype.sprite.generators; // extending sprite generators
window.__actions = Blast.prototype.sprite.actions; // extending sprite generators
window.__blocks = Blast.prototype._blocks;
window.__groups = $blast._groups;
window.__game = $blast._game;
