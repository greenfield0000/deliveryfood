#!/bin/bash

#kubectl -f personal-db.yaml delete && kubectl delete -f personal-db-pv.yaml 
kubectl delete \-k ./ && kubectl delete -f personal-db-service.yaml && kubectl delete -f personal-db-pv.yaml
