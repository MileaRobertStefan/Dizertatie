cd .\productservice
mvn compile
mvn clean install
cd ..

docker build -t productservice:latest ./productservice

# kubectl delete -f ./productservice/productservice-deployment.yaml
# kubectl delete -f ./productservice/productservice-service.yaml

# kubectl apply -f ./productservice/productservice-deployment.yaml
# kubectl apply -f ./productservice/productservice-service.yaml