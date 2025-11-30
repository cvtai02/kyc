# ex: .\line-insert.ps1 "path\to\file.cs" "new line content" 10

param(
    [Parameter(Position=0)]
    [string]$FilePath = "test.txt",
    
    [Parameter(Position=1)]
    [string]$NewLine = "`n",
    
    [Parameter(Position=2)]
    [int]$Position = 1
)

if (-Not (Test-Path $FilePath)) {
    Write-Host "File not found: $FilePath"
    exit
}

# Read file
$content = Get-Content $FilePath

# Insert line at given position
if ($Position -lt 1 -or $Position -gt $content.Count + 1) {
    Write-Host "Invalid position: $Position"
    exit
}

$content = $content[0..($Position-2)] + $NewLine + $content[($Position-1)..($content.Count-1)]

# Save back
Set-Content -Path $FilePath -Value $content

Write-Host "Inserted line at position $Position in $FilePath"
