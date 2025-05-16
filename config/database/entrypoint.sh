python3 -m venv ./script/project-env
source ./script/project-env/bin/activate 
pip install -r ./script/requirements.txt

python3 ./script/fill_db.py