#!/bin/bash

echo "deploy zookeeper!"

kubectl -f k8s.zookeeper.yaml apply && kubectl -f k8s.zookeeper.service.yaml apply 
