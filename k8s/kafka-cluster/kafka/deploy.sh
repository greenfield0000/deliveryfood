#!/bin/bash

echo "deploy kafka !"

kubectl -f k8s.kafka.yaml apply && kubectl -f k8s.kafka.service.yaml apply 
