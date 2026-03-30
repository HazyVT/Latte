#!/bin/bash

g++ $(find src -type f -name '*.cpp') -lraylib -Wl,-rpath,'$ORIGIN/.' -o main
