'use strict';

/**
 * This file boostraps the environment and exposes important vars
 * necessary for preload.
 *
 */

var hasAndroid = function() {
    return (typeof Android !== 'undefined');
}();

window.hasAndroid = hasAndroid;

