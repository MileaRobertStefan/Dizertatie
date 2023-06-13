$currentDirectory = Get-Location

$subdirectories = Get-ChildItem -Directory -Path $currentDirectory -Depth 1

foreach ($subdirectory in $subdirectories) {
    Set-Location $subdirectory.FullName

    if (Test-Path -Path ".\run.ps1") {
        & ".\run.ps1"
    }

    Set-Location $currentDirectory
}
