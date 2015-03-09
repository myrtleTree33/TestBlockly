'use strict';

/**
 * BLAST Framework for AI2
 *
 * @author TONG Haowen Joel
 *
 */

'use strict';

var Blast = (function () {
    /** Private variables **/

    /** Used to store sprite behavior / easy object creation **/
    var sprite = {
        generators: {}
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

            __._game.load.image('sky', 'images/assets/sky.png');
            __._game.load.image('ground', 'images/assets/platform.png');
            __._game.load.image('star', 'images/assets/star.png');
            __._game.load.image('firstaid', 'images/assets/firstaid.png');
            __._game.load.spritesheet('dude', 'images/assets/dude.png', 32, 48);

            /** Create groups **/
            __._groups.background = __._game.add.group();
            __._groups.terrain = __._game.add.group();
            __._groups.terrain.enableBody = true;
            __._groups.powerups = __._game.add.group();
            __._groups.destructibles = __._game.add.group();
            __._groups.player = __._game.add.group();
            __._groups.enemy1 = __._game.add.group();
            __._groups.enemy2 = __._game.add.group();
            __._groups.enemy3 = __._game.add.group();

        },
        onCreate: function () {
            var __ = $blast;
            __._game.physics.startSystem(Phaser.Physics.arcade);
        },
        onUpdate: function () {
            // dequeue if there are items
            while (_pq.length != 0) {
                var code = _pq.shift();
                console.debug('@once' + ' Snippet>>>' + code);
                eval(code);
            }
        }
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
        this._game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
            preload: __._callbacks.onPreload,
            create: __._callbacks.onCreate,
            update: __._callbacks.onUpdate
        });
        console.log(this._game);
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
        registerObject: registerObject,
        deregisterObject: deregisterObject,
        generateGame: generateGame,
        appendCode: appendCode
    };
    return Blast;
})();

module.exports = Blast;

window.$blast = new Blast();
window.__generators = Blast.prototype.sprite.generators; // extending sprite generators
window.__blocks = Blast.prototype._blocks;
window.__groups = $blast._groups;
window.__game = $blast._game;
