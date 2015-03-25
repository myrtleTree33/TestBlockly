/**
 * Created by joel on 2/25/15.
 */

'use strict';

require("./blastFramework");
require("./blastFramework_sprites_terrain");
require("./blastFramework_actions");
require("./blastFramework_blocks");
require("./blastFramework_expose");

/** Setup Android app hook if in AI2 mode **/
if (hasAndroid) {
    Android.setGameLoadedFlag();
}

console.log("[ BLAST framework loaded ]");


/** For debug purposes, comment if unneeded **/

//api.Echo('hello world!');
//api.CreateSky();
//api.CreatePlatform('terrain2', 0, 400);
////api.CreateRock('terrain2', 50,0,70);
//api.CreateTree('terrain1', 50,0, 900);
//api.CreateBullet(250,20,20,0, 90);
//api.GenerateGame();
/*
 api.CreateBullet(150,50,60,-10, 70);
 api.CreateBullet(250,20,20, 0, 90);
 setTimeout(function () {
 console.log ("TRIGGERED==========");
 //api.DeleteSprite('rock1');
 //api.SetPosition ('rock1', 50, 50);
 }, 3000);

*/

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


