# & ./build_angular.ps1
& ./build_userservice.ps1
& ./build_productservice.ps1

# kubectl apply -f ingress.yaml


minikube tunnel
