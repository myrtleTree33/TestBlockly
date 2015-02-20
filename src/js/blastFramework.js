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

    /******************** Start of AI2 Blocks ********************/

    function initTextBox(jsonData) {
        var target = "_accumulator.game"
            , id = jsonData.id || null
            , text = jsonData.text || null
            , params = jsonData.params || '{fontSize: \'32px\', fill: \'#fff\'}';

        var code = target + '.add.text(16,16,' + '\"' + text + '\",' + params + '); '
        return code;

    }

    function loadResource(jsonData) {
        var target = "_accumulator.game"
            , id = jsonData.id || null
            , filepath = jsonData.filepath || null
            , loaderType = jsonData.loaderType || null
            , params = jsonData.params || null;
        //TODO: Debug this
        var code = target + '.load.' + loaderType + '(\'' + id + '\',' + '\'' + filepath + '\'';
        if (params) {
            code += ',' + params.toString();
        }
        code += '); ';
        return code;
    }

    function addSprite(jsonData) {
        var target = "_accumulator.game"
            , resource = jsonData.resource || null
            , text = jsonData.text || null
            , x = jsonData.x || 0
            , y = jsonData.y || 0
            , params = jsonData.params || '';

        var code = target + '.add.sprite(' + x + ',' + y + ',\'' + resource + '\');';
        return code;

    }



    /******************** End of AI2 Blocks ********************/

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
        } else if (blockName == 'LoadResource') {
            return loadResource(jsonData);
        } else if (blockName == 'AddSprite') {
            return addSprite(jsonData);
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
    id: 'sky',
    handler: 'preload',
    block: 'LoadResource',
    loaderType: 'image',
    filepath : 'img/assets/sky.png'
});
blastFramework.appendCode({
    id: 'dude',
    handler: 'preload',
    block: 'LoadResource',
    loaderType: 'spritesheet',
    filepath : 'img/assets/dude.png'
});
blastFramework.appendCode({
    resource: 'sky',
    handler: 'create',
    block: 'AddSprite',
    x: 0,
    y: 0
});
blastFramework.appendCode({
    handler: 'create',
    block: 'InitTextBox',
    text: 'Hello world'
});
blastFramework.createGame();
