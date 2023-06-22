$currentSlot = (helm get values --all frontend | Select-String -Pattern 'productionSlot:' | Select-Object -First 1).Line.Split(": ")[2].Trim()

if ($currentSlot -eq "blue") {
    $newSlot = "green"
} else {
    $newSlot = "blue"
}

$deploymentOption = "productionSlot=$newSlot"

helm upgrade frontend . --set $deploymentOption --reuse-values

echo "$deploymentOption"