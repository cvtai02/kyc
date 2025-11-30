$projectName = (Get-ChildItem -Directory | Where-Object { Test-Path "$($_.FullName)\vite.config.*" } | Select-Object -ExpandProperty Name)
cd $projectName

# utils/
# ------string.ts
# ------date.ts
# ------validation.ts
# store/
# ----user-store.ts
# ----index.ts
# hooks/
# ----use-auth.ts
# ----use-fetch.ts
# features/
# -----/user-profile
# --------/components
# -------------/user-card
# -------------/user-detail
# components/
# ---button/
# -------index.tsx
# -------button.scss
# -------button.spec.tsx


# Create directory structure
New-Item -ItemType Directory -Force -Path "src/utils" | Out-Null
New-Item -ItemType Directory -Force -Path "src/store" | Out-Null
New-Item -ItemType Directory -Force -Path "src/hooks" | Out-Null
New-Item -ItemType Directory -Force -Path "src/features/user-profile/components/user-card" | Out-Null
New-Item -ItemType Directory -Force -Path "src/features/user-profile/components/user-detail" | Out-Null
New-Item -ItemType Directory -Force -Path "src/components/button" | Out-Null

# Create utils files
New-Item -ItemType File -Force -Path "src/utils/string.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/utils/date.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/utils/validation.ts" | Out-Null

# Create store files
New-Item -ItemType File -Force -Path "src/store/user-store.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/store/index.ts" | Out-Null

# Create hooks files
New-Item -ItemType File -Force -Path "src/hooks/use-auth.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/hooks/use-fetch.ts" | Out-Null

# Create component files
New-Item -ItemType File -Force -Path "src/components/button/index.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/button/button.scss" | Out-Null
New-Item -ItemType File -Force -Path "src/components/button/button.spec.tsx" | Out-Null

Write-Host "Folder structure and files created successfully!" -ForegroundColor Green

cd ..