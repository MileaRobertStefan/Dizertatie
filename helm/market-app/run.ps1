minikube docker-env | Invoke-Expression
minikube image load angular-app-image
helm uninstall frontend
helm install frontend . --values values.yaml