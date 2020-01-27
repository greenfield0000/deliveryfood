#!/bin/bash

echo "deploy gateway and service"

kubectl -f k8s.deployment.gateway.yaml apply && kubectl -f k8s.deployment.gateway-service.yaml apply
