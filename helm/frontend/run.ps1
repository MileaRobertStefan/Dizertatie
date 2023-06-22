minikube image load angular-app-image --overwrite
minikube image tag angular-app-image angular-app-image:blue

helm delete frontend  
helm install frontend . --set blue.enabled=true --set productionSlot=blue
