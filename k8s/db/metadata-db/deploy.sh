#!/bin/bash

#kubectl apply -k ./ && kubectl apply -f metadata-db-pv.yaml && kubectl -f metadata-db.yaml apply 
kubectl apply -f metadata-db-pv.yaml && kubectl apply -f metadata-db-service.yaml && kubectl apply -f metadata-db.yaml
