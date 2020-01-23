#!/bin/sh

#kubectl -f ./backend/*.yaml apply
kubectl -f ./backend/$(find ./backend  -printf "%f\n" | grep .yaml) apply

