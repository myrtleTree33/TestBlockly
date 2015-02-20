'use strict';

/**
 * BLAST Framework for AI2
 *
 * @author TONG Haowen Joel
 *
 */

var blastFramework = (function () {
    /** Private vars **/
    /**
     * Hooks will be decorated dynamically as function is called from AI2 Java interface
     *
     * @type {{preload: Function, create: Function, update: Function}}
     * @private
     */
    var _game = {
        preload: function () {
        },
        create: function () {
        },
        update: function () {
        }
    };

    /**
     * Accumulator object where variables will be stored.
     * @type {{game: null}}
     * @private
     */
    var _accumulator = {
        game: null
    };

    /**
     * Prints the version
     */
    function version() {
        console.log("BLAST v0.0.1");
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

    function initGroup(jsonData) {
        var target = "_accumulator.game"
            , id = jsonData.id || null;

        var code = '_accumulator[\"' + id + '\"]' + '=' + target + '.add.group();';
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
        } else if (blockName == 'InitGroup') {
            return initGroup(jsonData);
        }

        /** No blocks **/
        return '';
    }

    /**
     * Function used to generate code blocks and insert in right function.  Uses eval (!!)
     *
     * @param jsonData The jsonData should contain both handler and block information.
     */
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
        version: version,
        appendCode: appendCode,
        createGame: createGame
    }


})();

/** Test blocks **/

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
    id: 'ground',
    handler: 'preload',
    block: 'LoadResource',
    loaderType: 'image',
    filepath : 'img/assets/platform.png'
});
blastFramework.appendCode({
    resource: 'sky',
    handler: 'create',
    block: 'AddSprite',
    x: 0,
    y: 0
});
//TODO: implement
blastFramework.appendCode({
    id: 'platforms',
    handler: 'create',
    block: 'InitGroup'
});
blastFramework.appendCode({
    handler: 'create',
    block: 'InitTextBox',
    text: 'Hello world'
});
blastFramework.createGame();
