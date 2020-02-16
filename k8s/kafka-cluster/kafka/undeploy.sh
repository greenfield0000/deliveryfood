#!/bin/bash

echo "undeploy kafka !"

kubectl -f k8s.kafka.service.yaml delete && kubectl -f k8s.kafka.yaml delete 
