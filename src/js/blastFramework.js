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
    var sprite = {
        generators: {}
    }

    var _pq = [];
    var _accumulator = {};
    var _game = null;
    var _callbacks = {
        onPreload: function () {
        },
        onCreate: function () {
        },
        onUpdate: function () {
        }
    };

    /************** Public Variables *********************/

    /** constructor **/
    var Blast = function () {
        console.log('Blast instantiated:' + this._version);
    };

    /** Create new game **/
    var generateGame = function () {
        console.debug('Creating game..');
        _game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
            preload: _callbacks.preload,
            create: _callbacks.onCreate,
            update: _callbacks.update
        });
    }


    Blast.prototype = {
        constructor: Blast,
        _version: 'v0.0.1',
        _pq: _pq,
        _accumulator: _accumulator,
        sprite: sprite,
        _game: _game,

        generateGame: generateGame
    };
    return Blast;
})();

var blast = new Blast();
