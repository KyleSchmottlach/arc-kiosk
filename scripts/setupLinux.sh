#!/bin/bash

set -e

#Install OS dependencies
sudo apt update
sudo apt install python3.13 python3.13-venv python3.13-dev git gcc g++ curl

cd ..

#Setup backend
if [ ! -d "./.venv" ]; then
  python3.13 -m venv .venv
fi

source ./.venv/bin/activate

pip install --upgrade pip

pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install opencv-python-headless Flask pillow numpy gunicorn cython flask_cors
pip install --no-build-isolation 'git+https://github.com/facebookresearch/detectron2.git'

#Setup frontend

if [ $(which node &> /dev/null; echo $?) -eq 1 ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  \. "$HOME/.nvm/nvm.sh"
  nvm install 23
  nvm alias default 23
else
  if [ ! $(node --version | cut -c 2-3) -eq "23" ]; then
    echo "Please install major node version 23"
    exit 1
  fi
fi

corepack enable yarn
yarn set version stable
yarn install