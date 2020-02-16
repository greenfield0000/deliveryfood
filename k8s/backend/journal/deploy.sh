#!/bin/bash

echo "deploy gateway and service"

kubectl -f $(pwd)/k8s.deployment.gateway.yaml apply && kubectl -f $(pwd)/k8s.deployment.gateway-service.yaml apply
