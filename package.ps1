npm create vite@latest 

# find folder containing vite project
$projectName = (Get-ChildItem -Directory | Where-Object { Test-Path "$($_.FullName)\vite.config.*" } | Select-Object -ExpandProperty Name)
cd $projectName

# npm install react-router-dom
npm install react-router-dom
npm i @tanstack/react-query
npm install react-hook-form

# using shadcn/ui: read the instructions at https://ui.shadcn.com/docs/installation/vite

# Configure Tailwind (tailwind.config.js):
npm install tailwindcss @tailwindcss/vite
..\line-insert.ps1 "vite.config.ts" "import tailwindcss from '@tailwindcss/vite'" 2
# Copilot job
# --> add tailwindcss() into plugins array in vite.config.ts

# Add Tailwind to CSS (src/index.css):
Add-Content -Path "src/index.css" -Value "`n@tailwind base;`n@tailwind components;`n@tailwind utilities;`n"