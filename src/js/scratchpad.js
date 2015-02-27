/**
 * Created by joel on 2/25/15.
 */

'use strict';


$blast.appendCode('once', 'log', {
    message: 'hello world!'
});
$blast.appendCode('once', 'CreateSimpleSprite', {
    name: 'testBlock'
});
$blast.appendCode('once', 'DeleteSprite', {
    name: 'testBlock'
});
$blast.appendCode('once', 'CreateSimpleSprite');
$blast.generateGame();


