# Installing System for Arc Kiosk Prototype

This document outlines the setup and run instructions for running the ARC Kiosk application locally on your computer.

The dependencies required for this application can be quite large, so make sure that you have at least 5-6 gigabytes of space free on your computer before proceeding.

## All Systems

Download a copy of the project by either downloading the zip file from the "Code" button on Github, or by cloning the project using the following Git command:

`
git clone https://github.com/KyleSchmottlach/arc-kiosk.git
`

If Git is not installed, and you would like to use the clone command, install Git from the following link: https://git-scm.com/

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

## Linux/MacOS Build Instructions

To install the dependencies for the project on a Linux/MacOS system, please run the
[setupLinux.ps1](scripts/setupLinux.sh) script in the terminal application. This can be 
done by opening a new terminal window, using the `cd` command to navigate to the 
scripts folder and first running the following command: 

`
sudo chmod +x setupLinux.sh && ./setupLinux.sh
`

Once the script finishes installing, run the following command from the top level
project directory or open the script named `startLinuxMax.sh` to run the code:

`
yarn run turbo run dev-linux
`

The setupLinux.sh script only needs to be run once on project setup before the program
is run for the first time. It is not necessary to run the script multiple times if
it succeeded.