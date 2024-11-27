---
title: Machine Learning - Clustering
layout: post  
post-image: "/assets/images/ia/glasses.jpg"  
description: "Dans un problème de clustering, on veux déterminer les classes pour catégoriser les données"  
categories:
  - Fiche
---

# Clustering

## Quelles sont les classes ?

Quand on veux répondre à cette question, on fait du clustering.
Dans un problème de clustering, on veux déterminer les classes pour catégoriser les données.

## Préparation des données

### Normalisation
Transforme les données sur une même échelle avec en valeur minimum 0 et en valeur maximal 1
``` 
from sklearn.preprocessing import MinMaxScaler

data_scaled = MinMaxScaller().fit_transform(dt)
```

### Réduction de dimensions
Réduire le nombre de features en faisant des features qui regroupent des autres features

Exemples :
- PCA
- t-SNE
- Sammon mapping
- Isomap
- Locally linear embedding

## Algorithmes

### K-Means

Paramètres :
- K : Nombre de clusters

```
from sklearn.cluster import KMeans

kmeans = KMeans(
  n_clusters=2,
  random_state=42,
  init='k-means++',
  n_init=10
).fit(array)
```

### DBSCAN

Paramètres :
- epsilon : rayon de la zone
- min_sample : nombre de points minimum pour définir un cluster

```
from sklearn.cluster import DBSCAN

clusering = DBSCAN(
  eps=3,
  min_samples=2
).fit(array)
```

## Étapes

Pour chaque lignes, la classe attribué : `clustering.labels_`  
(DBSCAN attribue -1 pour les outsiders)