/**
 * Created by joel on 2/18/15.
 */

'use strict';

goog.provide('Blockly.JavaScript.phaser');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['phaser_main'] = function (block) {

    var lintFuncStack = function (_code, _id) {
        if (Blockly.JavaScript.STATEMENT_PREFIX) {
            _code = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
                    '\'' + _id + '\''), Blockly.JavaScript.INDENT) + _code;
        }
        if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
            _code = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + block._id + '\'') + _code;
        }

        console.log('called');
        return _code;
    };

    var statements_preload = lintFuncStack(Blockly.JavaScript.statementToCode(block, 'preload'));
    var statements_create = lintFuncStack(Blockly.JavaScript.statementToCode(block, 'create'));
    var statements_onUpdate = lintFuncStack(Blockly.JavaScript.statementToCode(block, 'onUpdate'));
    var code = 'function preload() {\n' + statements_preload + '\n}\n'
        + 'function create() {\n' + statements_create + '\n}\n'
        + 'function update() {\n' + statements_onUpdate + '\n}\n';
    return code;
};

Blockly.JavaScript['phaser_game'] = function (block) {
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_renderer = block.getFieldValue('renderer');
    var code = 'new Game(' + value_width + ',' + value_height + ',' + dropdown_renderer + ',' + '{preload: preload, create: create, update: update }' + ')';
    return [code, Blockly.JavaScript.ORDER_ASSIGNMENT];
};


