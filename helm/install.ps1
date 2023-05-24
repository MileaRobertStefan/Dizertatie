# Get the current directory
$currentDirectory = Get-Location

# Get the subdirectories (depth 1) in the current directory
$subdirectories = Get-ChildItem -Directory -Path $currentDirectory -Depth 1

# Loop through each subdirectory
foreach ($subdirectory in $subdirectories) {
    # Change the current location to the subdirectory
    Set-Location $subdirectory.FullName

    # Check if 'run.ps1' exists in the subdirectory
    if (Test-Path -Path ".\run.ps1") {
        # Execute 'run.ps1' script
        & ".\run.ps1"
    }

    # Change the current location back to the original directory
    Set-Location $currentDirectory
}
