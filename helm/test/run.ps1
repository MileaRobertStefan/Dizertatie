minikube image load angular-app-image --overwrite
docker tag angular-app-image angular-app-image:blue


helm delete yourreleasename  
helm install yourreleasename . --set blue.enabled=true --set productionSlot=blue
