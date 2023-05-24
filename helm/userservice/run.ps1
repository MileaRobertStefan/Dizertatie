minikube docker-env | Invoke-Expression
minikube image load userservice
helm uninstall userservice
helm install userservice . --values values.yaml