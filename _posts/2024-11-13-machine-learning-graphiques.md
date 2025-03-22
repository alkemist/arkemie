---
title: Machine Learning - Graphiques
layout: post  
post-image: "/assets/images/ia/graphiques.jpg"  
description: "Affichage des graphiques"  
categories:
  - Fiche
---

# Affichage des graphiques

## Graphique multi lignes
``` 
fig = px.line(rows_by_region, x='date_day', y='annonces', color='region',
              title="Nombre d'annonces par jour",
              labels={'date_day': 'Date', 'annonces': "Nombre d'annonces", 'region': 'Région'},
              markers=True) 
fig.update_xaxes(tickangle=45) 
fig.update_layout(height=600)
fig.show()
```