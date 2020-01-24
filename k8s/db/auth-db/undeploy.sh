#!/bin/bash

#kubectl -f auth-db.yaml delete && kubectl delete -f auth-db-pv.yaml 
kubectl delete \-k ./ && kubectl delete -f auth-db-service.yaml &&  kubectl delete -f auth-db-pv.yaml
