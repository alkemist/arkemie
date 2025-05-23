---
title: "Machine Learning - Python"
layout: post  
post-image: "/assets/images/ia/snake.jpg"  
description: "Origine de ces fiches, outils utilisés et notes de python"  
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
- Pycaret : Permet de tester et de trouver le meilleur modèle (s'utilise en classification mais aussi regression ou time series)
- Poetry : Gestionnaire de paquets et de versions

## Jupyter

Jupyter sans navigateur `jupyter lab --no-browser`

## Poetry

Ajout d'un package : `poetry add package_name`  
Execution d'un script : `poetry run script.py`


### Virtual environment

Installer une version de python `pyenv install <python-version>`  
Créer un env dans une version spécifique de python : `pyenv virtualenv <python-version> <env-name>`    
Activer un environnement : `pyenv activate <env-name>`  
Mettre un environnement par défaut : `pyenv global <env-name>`   

Lister les environnements `pyenv virtualenvs`  
Supprimer un environnement `pyenv uninstall <env-name>`  

### Packages

Forcer l'installation en ignorant les conflits de version `pip install --no-deps -r requirements.txt`  

```
pyenv activate 3.10

pip install jupyterlab ipykernel ipympl pandas scikit-learn plotly ipywidgets seaborn pycaret
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install jupyter-matplotlib
```

### Kernel 

Créer un kernel :  
```
pyenv activate 3.10

pip install ipykernel
python -m ipykernel install --name 3.10 --display-name "Python 3.10" --user
```
Lister les kernels : `jupyter kernelspec list`  
Supprimer un kernel : `jupyter kernelspec remove 3.10`  


