@echo off

:: Path to impact.js and your game's main .js
SET IMPACT_LIBRARY=lib/impact/impact.js
SET GAME=lib/main.js

:: Output file
SET OUTPUT_FILE=tools/temp.js


:: Change CWD to Impact's base dir
cd ../


:: Bake!
php tools/bake.php %IMPACT_LIBRARY% %GAME% %OUTPUT_FILE%

:: Closure Compiler
java -jar tools/compiler.jar --js tools/temp.js --js_output_file game.min.js --language_in=ECMASCRIPT5_STRICT

cd tools
del temp.js

pause