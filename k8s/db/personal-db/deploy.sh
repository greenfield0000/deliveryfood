#!/bin/bash

#kubectl apply -k ./ && kubectl apply -f personal-db-pv.yaml && kubectl -f personal-db.yaml apply 
kubectl apply -f personal-db-pv.yaml && kubectl apply -f personal-db-service.yaml &&  kubectl apply \-k ./ 
