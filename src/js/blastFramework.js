'use strict';

var blastFramework = (function () {
    /** Private vars **/
    var _game = {
        preload: function () {
        },
        create: function () {
        },
        update: function () {
        }
    };

    // store vars
    var _accumulator = {
        game: null
    };

    function sayHello() {
        console.log("hello world!");
    }

    function initTextBox(jsonData) {
        var target = "_accumulator.game"
            , id = jsonData.id || null
            , text = jsonData.text || null
            , params = jsonData.params || '{fontSize: \'32px\', fill: \'#fff\'}';

        var code = target + '.add.text(16,16,' + '\"' + text + '\",' + params + '); '
        return code;

    }

    function createGame() {
        console.debug('Creating game..');
        _accumulator.game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
            preload: _game.preload,
            create: _game.create,
            update: _game.update
        });
    }

    function _generateCodeSnippet(jsonData) {
        var blockName = jsonData.block;
        if (blockName == 'InitTextBox') {
            return initTextBox(jsonData);
        }

        /** No blocks **/
        return '';
    }

    function appendCode(jsonData) {
        var oldFunc = _game[jsonData.handler]; // get the target function to modify
        _game[jsonData.handler] = function () {
            /** <-- insert things to do before here --> **/
            oldFunc.apply(this, arguments);
            /** <-- inpsert things to do after here --> **/
            //TODO: scoping error here
            var codeSnippet = _generateCodeSnippet(jsonData);
            console.debug('@' + jsonData.handler + ' Snippet added: ' + codeSnippet);
            eval(codeSnippet);
        }
    }

    return {
        sayHello: sayHello,
        appendCode: appendCode,
        createGame: createGame
    }


})();

console.log(blastFramework.sayHello());
blastFramework.appendCode({
    handler: 'create',
    block: 'InitTextBox',
    text: 'Hello world'
});
blastFramework.createGame();
