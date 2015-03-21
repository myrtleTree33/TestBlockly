/**
 * Created by joel on 2/25/15.
 *
 * Actions, including getters / setters, are stored here.
 *
 */

'use strict';


//require("./blastFramework");

__actions.setPosition = function (spriteName, x, y) {
    var target = $blast.getObject(spriteName);
    if (!target) {
        console.log('failed to set position: unknown sprite');
        return;
    }
    // set the new coordinates
    target.obj.x = x;
    target.obj.y = y;
};
