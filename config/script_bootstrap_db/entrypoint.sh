#!/bin/bash

python3 -m venv ./script/project-env
source ./script/project-env/bin/activate
pip install --upgrade pip 
pip install -r ./script/requirements.txt

python3 ./script/bootstrap_db.py