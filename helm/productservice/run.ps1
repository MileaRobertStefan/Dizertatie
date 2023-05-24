minikube docker-env | Invoke-Expression
minikube image load productservice
helm uninstall productservice
helm install productservice . --values values.yaml