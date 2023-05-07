kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
kubectl expose deployment hello-minikube --type=NodePort --port=8080

kubectl apply -f dizertatie/SPA-Deployment.yaml

kubectl get services hello-minikube
kubectl get services angular

minikube service hello-minikube
minikube service angular

@REM Alternatively, use kubectl to forward the port:

@REM kubectl port-forward service/hello-minikube 7080:8080