#!/bin/sh

#kubectl -f ./backend/*.yaml apply
kubectl -f $(find  -printf "%f\n" | grep .yaml) apply

