/**
 * Created by joel on 2/18/15.
 */

goog.provide('Blockly.Blocks.phaser');
goog.require('Blockly.Blocks');

Blockly.Blocks['phaser_main'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(230);
        this.appendStatementInput("preload")
            .appendField("on Preload");
        this.appendStatementInput("create")
            .appendField("on Creation");
        this.appendStatementInput("onUpdate")
            .appendField("on UpdateScreen");
        this.setTooltip('');
    },
    ref: 'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tvdwm7'
};

Blockly.Blocks['phaser_game'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(210);
        this.appendDummyInput()
            .appendField("Create new Game");
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.appendDummyInput()
            .appendField("Renderer")
            .appendField(new Blockly.FieldDropdown([["AUTO", "Phaser.AUTO"], ["WEBGL", "Phaser.WEBGL"], ["CANVAS", "Phaser.CANVAS"]]), "renderer");
        this.setOutput(true);
        this.setTooltip('');
    },
    ref: 'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#t7s9t3'
};
