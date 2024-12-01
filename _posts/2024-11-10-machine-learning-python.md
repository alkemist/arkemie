---
title: Machine Learning - Python
layout: post  
post-image: "/assets/images/ia/snake.jpg"  
description: "Origine de ses fiches, outils utilisés et notes de python"  
categories:   
- Fiche
---

# Fiches
Après ma formation de Python et Machine Learning, j'ai décidé d'utiliser ce site pour y noter quelques fiches résumés.

## Outils

Tout d'abord les différents outils utilisés

- Jupyter : Permet facilement d'éxecuter du code python et d'afficher les graphiques via une interface web
- Pandas : Permet de manipuler les données
- Plotly / Ipywidgets : Permet d'afficher les graphs
- Scikit-Learn : Permet de créer les modèles de ML
- Pycaret : Permet de tester et de trouver le meilleur modèle

## Rappels de python

### Date

`from datetime import datetime`  

Formatage de date : `datetime.now().strftime("%m/%d/%Y %H:%M:%S")`  
Intervale en secondes : `interval_seconds = interval.total_seconds()`

### Lambda

Map : `array = [r for r in tab]`   
Filtrer: 
```
tab_filtered = list(
        filter(
            lambda c: c not in ['value'], 
            tab
        )
    ) 
```  

### Manipulation de fichiers

```
import os

if os.path.exists(file_path):
  file.write('')
  
df.to_csv('data.csv', index=False)
```

### Requètes d'API

```
import requests

response = requests.get(
    '', 
    params={}, 
    headers={
        'Authorization': '', 
        'Content-Type': 'application/json'
        }
)

if response.status_code == 200:
  json = response.json()
  binary = response.text
```

## Jupyter

### Virtual environment

Créer un env dans une version spécifique de python :   
`python3.10 -m venv .venv-3-10`    
Activer un environnement :  
`. .venv-3-10/bin/activate`


### Kernel 

Créer un kernel :  
```
.venv-3-10/bin/activate

pip install ipykernel
python -m ipykernel install --name 3-10 --display-name "Python 3.10" --user
```

L

### Packages

```
.venv-3-10/bin/activate

pip install jupyterlab ipympl pandas scikit-learn plotly ipywidgets seaborn pycaret
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install jupyter-matplotlib
```
``    