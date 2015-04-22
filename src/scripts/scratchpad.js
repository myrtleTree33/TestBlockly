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

/*
 api.CreateBullet(150,50,60,-10, 70);
 api.CreateBullet(250,20,20, 0, 90);
 */
//
//api.Echo('hello world!');
api.CreateSky();
//api.CreateTiledBackground('rock', 2000,2000);
//api.SetGameSize(2000, 2000);
////api.CreatePlatform('terrain2', 0, 500);
//api.CreateTilePlatform('terrain2', 50, 200, 200, 50);
//api.CreateTilePlatform('terrain1', 0, 500, 400, 50);
//api.CreateRock('terrain2', 'rock1', 900,0,70);
//api.CreateRock('terrain2', 'rock2', 50,0,70);
//api.SetCameraFollow('rock1');
//api.CreateTree('terrain1', 'myTree', 50, 0, 900);
//api.CreateBullet(250, 20, 20, 0, 90);
//api.CreatePlayer('player1', 'john', 70, 0, 200);
//api.SetState('john', 'moveRight');
//
//
//setInterval(function () {
//    //api.CreateBullet(Math.random() * 250, 20, 20, 100 + Math.random() * 100, 100 + Math.random() * 100);
//    //api.GetGameWidth();
//    api.GetGameHeight();
//    api.GetSpriteX('','john');
//    api.GetSpriteY('','john');
//    api.GetSpriteVelX('', 'john');
//    api.GetSpriteVelY('', 'john');
//}, 1000);
//
//
//setInterval(function () {
//    api.SetSpriteX('john', 300);
//    api.SetSpriteVelX('john', - 200 + 400 * Math.random());
//    api.SetSpriteVelY('john', -50 - 500 * Math.random());
//}, 2000);
//
//
api.GenerateGame();
/*
setTimeout(function () {
//    console.log("TRIGGERED==========");
    api.GetSpriteY('','myTree');
    api.GetGameWidth();
//    api.SetState('john', 'moveLeft');
//    api.SetState('john', 'jump');
//    api.SetPosition('john', 50, 50);
}, 3000);
//
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

