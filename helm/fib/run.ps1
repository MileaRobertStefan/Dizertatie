minikube docker-env | Invoke-Expression
# minikube image load fibserver
helm uninstall fibserver
helm install fibserver . --values values.yaml