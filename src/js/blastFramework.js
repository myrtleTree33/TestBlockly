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
    var _callbacks = {
        onPreload: function () {
        },
        onCreate: function () {
        },
        onUpdate: function () {
            // dequeue if there are items
            while(_pq.length != 0) {
                var code = _pq.shift();
                console.debug('@once' + ' Snippet>>>' + code);
                eval(code);
            }
        }
    };

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
        _game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
            preload: _callbacks.preload,
            create: _callbacks.onCreate,
            update: _callbacks.onUpdate
        });
    }

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
        _callbacks: _callbacks,

        generateGame: generateGame,
        appendCode: appendCode
    };
    return Blast;
})();

var blast = new Blast();
