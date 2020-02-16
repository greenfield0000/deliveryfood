#!/bin/bash

echo "undeploy gateway and service"

kubectl -f k8s.deployment.gateway-service.yaml delete && kubectl -f k8s.deployment.gateway.yaml delete
