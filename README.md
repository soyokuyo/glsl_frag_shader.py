glsl_frag_shader.py is to reproduce the glsl fragment shader samples in "The Book of Shaders (https://thebookofshaders.com/)".   

"The Book of Shaders" is very good a teaching book for glsl fragment shader.  
In "The Book of Shaders", in order to execute sample of glsl fragment shaders web application that called "glslEditor" is prepared.  
It's easy to try.  
Reason why I wrote glsl_frag_shader.py, I wanted to generate an image of any size using python script.

In here, some fragment shader sample is included.  

## dependency
glsl_frag_shader.py depends on python3 modules argparse, numpy, time, pillow and OpenGL related modules.

## how to use
Usage is below:

`python3 glsl_frag_shader.py [-s WIDTH HEIGHT] FILE`

Easily, execute as follows.

`python3 glsl_frag_shader.py FILE`

FILE means glsl fragment shader programs that like introduced in "The Book of Shaders".  
When executing glsl_frag_shader.py, FILE is reproduced as OpenGL window image. you can get both 24bit rgb color PNG image and 16bit grayscale PNG image into same directory at that timing if you hit 'p' key. And you can stop this script if you hit 'q' key.

## for examples

`python3 glsl_frag_shader.py checker_plate.frag`

 ![checker_plate](24bit_rgb_checker_plate.png "checker_plate")

 `python3 glsl_frag_shader.py cross_pattern.frag`

 ![cross_pattern](24bit_rgb_cross_pattern.png "cross_pattern")

 `python3 glsl_frag_shader.py diamondtiles.frag`

 ![diamondtiles](24bit_rgb_diamondtiles.png "diamondtiles")

 `python3 glsl_frag_shader.py dragon_scales.frag`

 ![dragon_scales](24bit_rgb_dragon_scales.png "dragon_scales")

 `python3 glsl_frag_shader.py heart.frag`

 ![heart](24bit_rgb_heart.png "heart")

 `python3 glsl_frag_shader.py hexagon.frag`

 ![hexagon](24bit_rgb_hexagon.png "hexagon")

 `python3 glsl_frag_shader.py ichimatsu.frag`

 ![ichimatsu](24bit_rgb_ichimatsu.png "ichimatsu")

 `python3 glsl_frag_shader.py ichimatsu2.frag`

 ![ichimatsu2](24bit_rgb_ichimatsu2.png "ichimatsu2")

 `python3 glsl_frag_shader.py kagome.frag`

 ![kagome](24bit_rgb_kagome.png "kagome")

 `python3 glsl_frag_shader.py kanoko.frag`

 ![kanoko](24bit_rgb_kanoko.png "kanoko")

 `python3 glsl_frag_shader.py shippo.frag`

 ![shippo](24bit_rgb_shippo.png "shippo")

 `python3 glsl_frag_shader.py uroko.frag`

 ![uroko](24bit_rgb_uroko.png "uroko")
