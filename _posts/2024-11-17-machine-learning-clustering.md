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

Ce code permet de réduire le nombre de colonne à 2 (d1 et d2)
```
from sklearn.manifold import TSNE

X_emb = TSNE(n_components=2).fit_transform(X)
X_emb = pd.DataFrame(X_emb, columns=['d1', 'd2'], index=X.index)
X_emb
```

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
- eps : rayon de la zone
- min_sample : nombre de points minimum pour définir un cluster
- metric : métrique pour les distances
  - 'euclidean' par défaut
  - Autres :
    - ‘haversine’

```
from sklearn.cluster import DBSCAN

clusering = DBSCAN(
  eps=3,
  min_samples=2
).fit(array)
```

### Gaussian mixture

``` 
from sklearn.mixture import GaussianMixture
```

### OPTICS

- max_eps : rayon de la zone
- min_sample : nombre de points minimum pour définir un cluster
- metric : métrique pour les distances
    - 'minkowski' par défaut
    - Autres :
        - ‘cityblock’, ‘cosine’, ‘euclidean’, ‘l1’, ‘l2’, ‘manhattan’

```
from sklearn.cluster import OPTICS
```

## Étapes

Pour chaque lignes, la classe attribué : `clustering.labels_`  
(DBSCAN attribue -1 pour les outsiders)