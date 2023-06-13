$currentDirectory = Get-Location
./build_angular.ps1
./build_userservice.ps1
./build_productservice.ps1

./helm/install.ps1

Set-Location $currentDirectory
minikube tunnel
