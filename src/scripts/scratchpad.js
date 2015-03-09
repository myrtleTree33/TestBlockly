/**
 * Created by joel on 2/25/15.
 */

'use strict';

require("./blastFramework");
require("./blastSpritesTerrain");
require("./blastFrameworkBlocks");

$blast.appendCode('once', 'log', {
    message: 'hello world!'
});
$blast.appendCode('once', 'CreateSimpleSprite', {
    name: 'testBlock'
});
$blast.appendCode('once', 'CreateExtendedSprite', {
    name: 'coolSprite'
});
$blast.appendCode('onCreate', 'CreateSky', {
    name: 'sky'
});
$blast.appendCode('onCreate', 'CreatePlatform', {
    x: 400,
    y:400
});
$blast.appendCode('onCreate', 'CreatePlatform', {
    x: 0,
    y:150
});
$blast.appendCode('once', 'DeleteSprite', {
    name: 'testBlock'
});
$blast.appendCode('once', 'CreateSimpleSprite');
$blast.generateGame();


