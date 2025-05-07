# Installing System for Arc Kiosk Prototype

This document outlines the setup and run instructions for running the ARC Kiosk application locally on your computer.

The dependencies required for this application can be quite large, so make sure that you have at least 5-6 gigabytes of space free on your computer before proceeding.

## All Systems

Download a copy of the project by either downloading the zip file from the "Code" button on Github, or by cloning the project using the following Git command:

`
git clone https://github.com/KyleSchmottlach/arc-kiosk.git
`

If Git is not installed, and you would like to use the clone command, install Git from the following link: https://git-scm.com/

### Dependencies

The build instructions listed below have automated scripts to install the dependencies
for either a Windows 11 system or a Linux system. If these scripts do not work correctly
on the system or you would like to install the dependencies manually, please follow these
steps. These instructions pertain to all systems, including Mac:

1. Git
   1. Install from https://git-scm.com/
   2. Set up with default options
2. Python
   1. Install version 3.13 from https://www.python.org/downloads/ (IMPORTANT, lower versions will not work)
   2. Make sure that `python --version` returns this version number when run in a terminal. If it doesn't, try the
      command, `python3 --version` or `python3.13 --version`. If any of the following work but `python` does not,
      then replace any instance of `python` below with the version that worked
3. Build system:
   1. Windows:
      1. Install Powershell 7: `winget install --id Microsoft.PowerShell --source winget`
      2. Install Microsoft Build Tools: 

          `winget install Microsoft.VisualStudio.2022.BuildTools --force --override "--wait --passive --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows11SDK.26100 --add Microsoft.VisualStudio.Component.VC.CMake.Project"`

   2. MacOS:
      1. Install Homebrew from the instructions here: https://brew.sh/
      2. Run the command `brew install gcc`
   3. Linux:
      1. Update apt database: `sudo apt update`
      2. Install gcc: `sudo apt install gcc`
4. Python Libraries
   1. Open a terminal window to the top level directory for the project.
   2. Run the command `python -m venv .venv` when in that directory.
   3. Then run the following commands to install all dependencies:
      1. Torch
         1. Windows: `python -m pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118`
         2. MacOS: `python -m pip3 install torch torchvision torchaudio`
         3. Linux: `python -m pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118`
      2. `python -m pip3 install opencv-python-headless Flask pillow numpy gunicorn cython flask_cors`
      3. `pip install --no-build-isolation 'git+https://github.com/facebookresearch/detectron2.git'`
5. Node.js
   1. All systems: follow install instructions from https://nodejs.org/en/download
      1. Windows: Select the dropdowns so the sentence reads "Get Node.js v23.11.0 for Windows using fnm with Yarn"
         1. After following all steps, run the command `fnm use 23` and `fnm default 23` 
      2. MacOS: Select the dropdowns so the sentence reads "Get Node.js v23.11.0 for MacOS using nvm with Yarn"
      3. Linux: Select the dropdowns so the sentence reads "Get Node.js v23.11.0 for Linux using nvm with Yarn"
## Windows Build Instructions

To install the dependencies for the project on a Windows system, please run the
[setupWindows.ps1](scripts/setupWindows.ps1) script in PowerShell. This can be 
done by navigating to the [scripts](scripts) folder, right clicking on the 
[setupWindows.ps1](scripts/setupWindows.ps1), and selecting "Run with PowerShell". 
If you would like to run the file from the PowerShell command line, open a new 
PowerShell session, use the `cd` command to navigate to the scripts folder and 
run the command:

`./setupWindows.ps1`.

This script will open multiple different windows as it installs the dependencies.
Do not close out of the windows and accept the installer license agreements when
they appear.

Once the script finishes installing, run the following command from the top level
project directory or double click the script named `startWindows.ps1` to run the code:

`
yarn run dev-windows
`

The setupWindows.ps1 script only needs to be run once on project setup before the program
is run for the first time. It is not necessary to run the script multiple times if
it succeeded.

## Linux Build Instructions

To install the dependencies for the project on a Linux system, please run the
[setupLinux.ps1](scripts/setupLinux.sh) script in the terminal application. This can be 
done by opening a new terminal window, using the `cd` command to navigate to the 
scripts folder and first running the following command: 

`
sudo chmod +x setupLinux.sh && ./setupLinux.sh
`

Once the script finishes installing, run the following command from the top level
project directory or open the script named `startLinux.sh` to run the code:

`
yarn run turbo run dev-linux
`

The setupLinux.sh script only needs to be run once on project setup before the program
is run for the first time. It is not necessary to run the script multiple times if
it succeeded.