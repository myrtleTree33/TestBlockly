/**
 * Created by joel on 2/16/15.
 *
 * following tutorial from http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
 */


var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('sky', 'img/assets/sky.png');
    game.load.image('ground', 'img/assets/platform.png');
    game.load.image('star', 'img/assets/star.png');
    game.load.spritesheet('dude', 'img/assets/dude.png', 32, 48);
}
/** Globals **/
var score = 0
    , scoreText;

function create() {
    game.physics.startSystem(Phaser.Physics.arcade);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    scoreText = game.add.text(16, 16, 'score: 0',
        {fontSize: '32px', fill: '#000'});

    // create ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //create ledge
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

}

function update() {

    function collectStar (player, star) {
        star.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        // move left
        player.body.velocity.x = -150;
        player.animations.play('left');

    } else if (cursors.right.isDown) {
        // move right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}
