minikube image rm productservice
minikube image load productservice --overwrite
helm uninstall productservice
helm install productservice . --values values.yaml