function RefreshEnv {
    $userpath = [System.Environment]::GetEnvironmentVariable("Path","User")
    $machinePath = [System.Environment]::GetEnvironmentVariable("Path","Machine")
    $env:Path = $userpath + ";" + $machinePath
}

function Install-Node {
    $fnmInstalled = Get-Command fnm -ErrorAction SilentlyContinue
    if(!$fnmInstalled) {
        winget install Schniz.fnm
        if (-not (Test-Path $profile)) { New-Item $profile -Force }

        Add-Content --Path "$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1" --Value "fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression"
    }

    RefreshEnv

    fnm install 23
    fnm default 23
}

Set-Location ..

#Install Python
$targetVersion = "3.13"
$pythonInstalled = Get-Command python -ErrorAction SilentlyContinue

if (!$pythonInstalled) {
    Write-Output "Python not installed. Installing using winget..."
    winget install Python.Python.3.13
} else {
    $output = python --version 2>&1

    if ($output -match "Python \d+\.\d+") {
        $installedVersion = ($Matches[0] -split " ")[1]
        if ($installedVersion -ne $targetVersion) {
            Write-Output "Python version incompatible, installing Python 3.13 using winget"
            winget install Python.Python.3.13
        }
    }
}

winget install Microsoft.VisualStudio.2022.BuildTools --force --override "--wait --passive --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows11SDK.26100 --add Microsoft.VisualStudio.Component.VC.CMake.Project"

if(!(Test-Path "./.venv")) {
    Remove-Item "./.venv"
}

python -m venv .venv

. .\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip

pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install opencv-python-headless Flask pillow numpy gunicorn cython flask_cors
pip install --no-build-isolation 'git+https://github.com/facebookresearch/detectron2.git'

$targetNodeVersion = "23"

$nodeInstalled = Get-Command node -ErrorAction SilentlyContinue

if(!$nodeInstalled) {
    Write-Output "Node not installed. Installing using FNM..."

    Install-Node
} else {
    $output = node --version 2>&1

    if($output -match "v\d+\") {
        $installedVersion = $Matches[0].Substring(1)
        if($installedVersion -ne $targetNodeVersion) {
            Write-Output "Node version incompatible. Installing Node version 23 using fnm..."
            Install-Node
        }
    }
}

corepack enable yarn
yarn set version stable
yarn install