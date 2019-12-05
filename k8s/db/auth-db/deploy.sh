#!/bin/bash

#kubectl apply -k ./ && kubectl apply -f auth-db-pv.yaml && kubectl -f auth-db.yaml apply 
kubectl apply -f auth-db-pv.yaml &&  kubectl apply \-k ./
