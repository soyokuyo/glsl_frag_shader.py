#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import numpy as np
import time
from PIL import Image
from OpenGL import GL
from OpenGL import GLUT
from OpenGL.GL.shaders import compileShader
from OpenGL.GL.shaders import compileProgram
from OpenGL.arrays import vbo

VERTEX_SHADER = """
attribute vec3 position;

void main()
{
    gl_Position = vec4(position, 1.0);
} """

class glslShader():
    # Constructor
    def __init__(self, size=(512,512)):
        self.ts_r = time.time()
        self.ts_n = self.ts_r
        self.size = size
        self.cursor = (0.0, 0.0)
        self.u_resolution = (float(self.size[0]), float(self.size[1]))
        GLUT.glutInit([])
        GLUT.glutInitDisplayMode(  GLUT.GLUT_DOUBLE\
                                 | GLUT.GLUT_RGB\
                                 | GLUT.GLUT_DEPTH)
        GLUT.glutInitWindowSize(*size)
        GLUT.glutInitWindowPosition(0, 0)
        GLUT.glutCreateWindow("GLSL Fragment Shader")
        self.vertShader = compileShader(VERTEX_SHADER, GL.GL_VERTEX_SHADER)
        self.fragShader = compileShader(FRAGMENT_SHADER, GL.GL_FRAGMENT_SHADER)

    def __enter__(self):
        vertices = np.array([[ 1,  1,  0,    1,  1],
                             [ 1, -1,  0,    1, -1],
                             [-1, -1,  0,   -1, -1],
                             [-1,  1,  0,   -1,  1]], dtype='f')
        self.vertexPositions = vbo.VBO(vertices)
        indices = np.array([[0, 1, 2], [0, 2, 3]], dtype=np.int32)
        self.indexPositions\
            = vbo.VBO(indices, target=GL.GL_ELEMENT_ARRAY_BUFFER)
        self.shader = compileProgram(self.vertShader, self.fragShader)
        GL.glUseProgram(self.shader)
        self.indexPositions.bind()
        self.vertexPositions.bind()
        GL.glEnableVertexAttribArray(0)
        GL.glVertexAttribPointer(0, 3, GL.GL_FLOAT, False, 20, None)

        # uniform vec2 u_resolution
        self.uResolutionLoc\
            = GL.glGetUniformLocation(self.shader, 'u_resolution')
        GL.glUniform2fv(self.uResolutionLoc, 1, self.u_resolution)

        # uniform vec2 u_mouse
        self.uMouseLoc = GL.glGetUniformLocation(self.shader, 'u_mouse')
        GL.glUniform2fv(self.uMouseLoc, 1, (self.cursor[0], self.cursor[1]))

        # uniform float u_time
        self.uTimeLoc = GL.glGetUniformLocation(self.shader, 'u_time')
        GL.glUniform1f(self.uTimeLoc, self.ts_r)

        return self

    def __exit__(self, type, value, traceback):
        self.vertexPositions.delete()
        self.indexPositions.delete()

    def renderer(self):
        self.ts_n = time.time()

        # uniform float u_time
        GL.glUniform1f(self.uTimeLoc, self.ts_n - self.ts_r)

        # uniform vec2 u_mouse
        GL.glUniform2fv(self.uMouseLoc, 1, self.cursor)

        # renderer execution
        GL.glDrawElements(GL.GL_TRIANGLES, 6, GL.GL_UNSIGNED_INT, None)
        GL.glFlush()
        GLUT.glutSwapBuffers()

    def keyboard(self, key, x, y):
        ts = int(self.ts_n*100)
        if key == b'q':
            # exit this script if 'q' key is pressed
            exit()

        elif key == b'p':
            # get result pixel data as RGB image
            buff_rgb = GL.glReadPixels(0, 0, self.size[0], self.size[1], 
                                       GL.GL_RGB, GL.GL_UNSIGNED_BYTE)
            image_array_rgb = np.fromstring(buff_rgb, np.uint8)
            image_rgb = image_array_rgb.reshape(self.size[1], self.size[0], 3)
            img_rgb = np.flipud(image_rgb)

            # save current image as rgb 24 bit color image
            img_rgb = Image.fromarray(img_rgb.astype(np.uint8))
            img_rgb.save("24bit_rgb_{}.png".format(ts))

            # get result pixel data as gray scale image
            #  magic numbers are from ITU-R Rec BT.601
            GL.glPixelTransferf(GL.GL_RED_SCALE,   0.299)
            GL.glPixelTransferf(GL.GL_GREEN_SCALE, 0.587)
            GL.glPixelTransferf(GL.GL_BLUE_SCALE,  0.114)
            buff_gray = GL.glReadPixels(0, 0, self.size[0], self.size[1], 
                                        GL.GL_LUMINANCE, GL.GL_UNSIGNED_SHORT)
            GL.glPixelTransferf(GL.GL_RED_SCALE,   1.0)
            GL.glPixelTransferf(GL.GL_GREEN_SCALE, 1.0)
            GL.glPixelTransferf(GL.GL_BLUE_SCALE,  1.0)
            image_array_gray = np.fromstring(buff_gray, np.uint16)
            image_gray = image_array_gray.reshape(self.size[1], self.size[0])
            img_gray = np.flipud(image_gray)

            # save current image as gray-scale 16 bit monochrome image 
            img_gray = Image.fromarray(img_gray.astype(np.uint16))
            img_gray.save("16bit_gray_{}.png".format(ts))

    def mouse(self, button, state, x, y):
        self.cursor = (float(x), float(y))

    def timer(self,value):
        self.renderer()
        GLUT.glutTimerFunc(10, self.timer, 5)

    def run(self):
        GLUT.glutDisplayFunc(self.renderer)
        GLUT.glutMouseFunc(self.mouse)
        GLUT.glutKeyboardFunc(self.keyboard)
        GLUT.glutTimerFunc(10, self.timer, 5)
        GLUT.glutMainLoop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description= 'GLSM Fragment shader.')
    parser.add_argument('infile', type=str, metavar='FILE',
                        help='input fragment shader file.')
    parser.add_argument('-s', '--size', type=int, default=[512, 512],
                        nargs=2, metavar=('WIDTH', 'HEIGHT'), dest='size',
                        help='Image size.')
    args = parser.parse_args()
    output_size = args.size
    frag_shader = args.infile

    with open(frag_shader) as f:
        FRAGMENT_SHADER = f.read()

    if FRAGMENT_SHADER == "":
        print("invalid fragment shader file")
        exit()

    with glslShader(output_size) as renderer:
        renderer.run()

