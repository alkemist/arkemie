---
title: Machine Learning - Python
layout: post  
post-image: "/assets/images/ia/network.jpg"  
description: "Fiche "  
categories:   
- Recherche
---

Après ma formation de Python et Machine Learning, j'ai décidé d'utiliser ce site pour y noter quelques fiches résumés.

# Outils

Tout d'abord les différents outils utilisés

- Jupyter : Permet facilement d'éxecuter du code python et d'afficher les graphiques via une interface web
- Pandas : Permet de manipuler les données
- Plotly / Ipywidgets : Permet d'afficher les graphs
- Scikit-Learn : Permet de créer les modèles de ML
- Pycaret : Permet de tester et de trouver le meilleur modèle

# Rappels de python

## Date

```
from datetime import datetime
datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S")

interval_seconds = interval.total_seconds()
```

## Tableau

Filtrer: `tab_filtered = list(filter(lambda c: c not in ['value'], tab)) `
