#!/bin/bash

#kubectl -f metadata-db.yaml delete && kubectl delete -f metadata-db-pv.yaml 
kubectl -f metadata-db.yaml delete && kubectl delete -f metadata-db-service.yaml && kubectl delete -f metadata-db-pv.yaml
