$currentSlot = (helm get values --all frontend | Select-String -Pattern 'productionSlot:' | Select-Object -First 1).Line.Split(": ")[2].Trim()

if ($currentSlot -eq "blue") {
    $newSlot = "green"
} else {
    $newSlot = "blue"
}

$deploymentOption = "$newSlot.enabled=true"
$imagine = "angular-app-image:$newSlot"

helm upgrade frontend . --set "$newSlot.enabled=false" --reuse-values

minikube image load angular-app-image --overwrite
minikube image tag angular-app-image $imagine

helm upgrade frontend . --set $deploymentOption --reuse-values


echo "$deploymentOption $imagine"
