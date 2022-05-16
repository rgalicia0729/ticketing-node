# Ticketing NodeJS

Microservices architecture sample project

Start dev

    $ skaffold dev --no-prune=false --cache-artifacts=false

Create tsconfig.json

    $ tsc --init

Creating a secret k8s

    $ kubectl create secret generic jwt-secret --from-literal=JWT_SECRET_KEY=value

    $ kubectl get secrets

Get namespaces services

    $ kubectl get namespaces

    $ kubectl get services -n 'namespaces'