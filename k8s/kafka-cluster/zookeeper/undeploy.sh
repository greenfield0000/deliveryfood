#!/bin/bash

echo "undeploy zookeeper! \\n"

kubectl -f k8s.zookeeper.service.yaml delete && kubectl -f k8s.zookeeper.yaml delete
