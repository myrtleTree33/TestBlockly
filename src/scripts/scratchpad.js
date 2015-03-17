/**
 * Created by joel on 2/25/15.
 */

'use strict';

require("./blastFramework");
require("./blastSpritesTerrain");
require("./blastFrameworkBlocks");
require("./expose");

api.Echo('hello world!');
api.CreateSky();
api.CreatePlatform(0, 150);
api.CreateRock(50,0,70);
api.GenerateGame();

//$blast.appendCode('once', 'log', {
//    message: 'hello world!'
//});
//$blast.appendCode('once', 'createSimpleSprite', {
//    name: 'testBlock'
//});
//$blast.appendCode('once', 'createExtendedSprite', {
//    name: 'coolSprite'
//});
//$blast.appendCode('onCreate', 'createSky', {
//    name: 'sky'
//});
//$blast.appendCode('onCreate', 'createRock', {
//    x: 50,
//    y:0,
//    gravity: 70
//});
//$blast.appendCode('onCreate', 'createRock', {
//    x: 420,
//    y:0
//});
//$blast.appendCode('onCreate', 'createPlatform', {
//    x: 400,
//    y:400
//});
//$blast.appendCode('onCreate', 'createPlatform', {
//    x: 200,
//    y:300
//});
//$blast.appendCode('onCreate', 'createPlatform', {
//    x: 0,
//    y:150,
//    gravity: 70
//});
//$blast.appendCode('once', 'deleteSprite', {
//    name: 'testBlock'
//});
//$blast.appendCode('once', 'createSimpleSprite');
//$blast.generateGame();


