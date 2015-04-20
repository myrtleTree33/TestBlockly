Scratchpad for AppInventor integration of game development using PhaserIO
============================================================================

This is a scratchpad to testbed PhaserIO integration into AI2 using Blockly and webview.

## Installation

Ensure that `nodejs` and `bower` is installed.  Then run 

    $ bower install
    

## Development

SimplePhaser uses GulpJS, which requires NodeJS and Gulp.

    $ npm install -g gulp
    $ gulp serve

    
## Deployment

SimplePhaser is hosted on AppEngine.  To deploy, ensure you have 
the AppEngine Python SDK.  Then run:

    $ <Path to App Engine SDK>/appcfg.py update .
