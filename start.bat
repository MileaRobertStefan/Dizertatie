@REM https://minikube.sigs.k8s.io/docs/start/


minikube start --driver=docker
minikube docker-env
@echo off
for /f "tokens=*" %%i in ('minikube docker-env') do (
    set "cmd=%%i"
    setlocal enabledelayedexpansion
    !cmd:~22!
    endlocal
)

kubectl get services
kubectl get deployments
kubectl get pods

minikube addon enable metrics-server

@REM kubectl get deployment metrics-server -n kube-system
@REM kubectl rollout status deployment metrics-server -n kube-system