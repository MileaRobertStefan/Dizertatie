minikube docker-env | Invoke-Expression
minikube image load userservice --overwrite
helm uninstall userservice
helm install userservice . --values values.yaml