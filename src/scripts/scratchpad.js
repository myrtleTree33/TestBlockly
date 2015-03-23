/**
 * Created by joel on 2/25/15.
 */

'use strict';

require("./blastFramework");
require("./blastSpritesTerrain");
require("./blastFramework_actions");
require("./blastFrameworkBlocks");
require("./expose");

/** Setup Android app hook if in AI2 mode **/
if (hasAndroid) {
    Android.setGameLoadedFlag();
}

console.log("[ BLAST framework loaded ]");


/** For debug purposes, comment if unneeded **/


api.Echo('hello world!');
api.CreateSky();
api.CreatePlatform(0, 500);
api.CreateRock(50,0,70);
api.CreateTree(100,50);
api.CreateBullet(0,50,10,150,0);
setTimeout(function () {
    console.log ("TRIGGERED==========");
    api.DeleteSprite('rock1');
    //api.SetPosition ('rock1', 50, 50);
}, 3000);

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


