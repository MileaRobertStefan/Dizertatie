cd .\userservice
mvn compile
mvn clean install
cd ..

docker build -t userservice:latest ./userservice

# kubectl delete -f ./userservice/userservice-deployment.yaml
# kubectl delete -f ./userservice/userservice-service.yaml

# kubectl apply -f ./userservice/userservice-deployment.yaml
# kubectl apply -f ./userservice/userservice-service.yaml