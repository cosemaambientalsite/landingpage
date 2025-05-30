#!/usr/bin/env bash
# build.sh

# Instala dependências
pip install -r requirements.txt

# Aplica migrações e coleta os estáticos
python manage.py migrate
python manage.py collectstatic --noinput
