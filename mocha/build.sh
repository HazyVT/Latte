#!/bin/bash

g++ mocha.cpp -o mocha -I /usr/include -L /usr/lib64/libSDL2main.a -lSDL2main -lSDL2 -static-libgcc