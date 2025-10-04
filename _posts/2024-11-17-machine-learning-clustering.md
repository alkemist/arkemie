---
title: "Machine Learning - Clustering"
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

{% include image.html img="ia/cluster_comparison.png" alt="Comparaison des méthodes de clustering" %}

| Type         | Algo                     |  K  | Rapidité | Abérrations | Densité | Utilisation                                         |
|:-------------|:-------------------------|:---:|:--------:|:-----------:|:-------:|:----------------------------------------------------|
| Centroid     | K-Means                  | Oui |    ++    |      -      |         | Grappes convexes, sphériques et de taille similaire |
| Graph        | Affinity Propagation     | Non |    -     |      +      |         | Grappes convexes                                    |
| Centroid     | MeanShift                | Non |    -     |      +      |         | Grappes                                             |
| Graph        | Spectral Clustering      | Oui |    -     |             |         | Anneaux, Demi-cercle, Grappes, Lignes               |
| Graph        | Ward                     | Non |          |      +      |         | Grappes                                             |
| Connectiviy  | Agglomerative Clustering | Non |          |             |    -    |                                                     |
| Density      | DBSCAN                   | Non |          |             |    -    | Anneaux, Demi-cercle, Lignes                        |
| Density      | HDBSCAN                  | Non |          |             |    +    | Anneaux, Demi-cercle, Lignes                        |
| Density      | OPTICS                   | Non |    --    |             |    +    | Anneaux, Demi-cercle, Lignes                        |
| Compression  | BIRCH                    | Non |    +     |             |         | Grappes                                             |
| Distribution | Gaussian mixture         | Oui |          |      -      |         | Lignes, Grappes                                     |

### K-Means

Utilisation : 
- Grappes convexes, sphériques et de taille similaire

Avantages :
- Rapide

Inconvénients :
- Nécessite le nombre de clusters
- Sensible aux valeurs aberrantes

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

### Affinity Propagation

Utilisation :
- Grappes convexes

Avantages :
- Pas de nombre de clusters requis
- Moins sensible aux valeurs abérrantes

Inconvénients :
- Sensibles aux formes non convexes
- Plus lent

Paramètres :

### MeanShift

Utilisation :
- Grappes

Avantages :
- Pas de nombre de clusters requis
- Moins sensible aux valeurs abérrantes
- Detection de formes arbitraires

Inconvénients :
- Assez lent

Paramètres :

### Spectral Clustering

Utilisation :
- Anneaux
- Boomerang
- Grappes
- Linéaires

Avantages :
- Detection de formes complexes

Inconvénients :
- Nécessite le nombre de clusters
- Lent

Paramètres :
- K : Nombre de clusters

### Ward

Utilisation :
- Grappes

Avantages :
- Pas de nombre de clusters requis
- Moins sensible aux valeurs abérrantes

Inconvénients :
- Sensibles aux formes non convexes

Paramètres :

### Agglomerative Clustering

Utilisation :

Avantages :
- Pas de nombre de clusters requis

Inconvénients :
- Difficulté avec les densités variables

Paramètres :

### DBSCAN

Utilisation :
- Anneaux
- Boomerang
- Lignes

Avantages :
- Pas de nombre de clusters requis

Inconvénients :
- Sensible aux paramètres
- Difficultés avec les densités variables
- Moins performant sur les hautes dimensions

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


### HDBSCAN

Utilisation :
- Anneaux
- Boomerang
- Lignes

Avantages :
- Moins de paramètres
- Moins sensibles aux densités variables

Inconvénients :
- Moins performant sur les hautes dimensions

Paramètres :

### OPTICS

Utilisation :
- Anneaux
- Boomerang
- Lignes

Avantages :
- Moins sensibles aux densités variables

Inconvénients :
- Très lent

Paramètres :
- max_eps : rayon de la zone
- min_sample : nombre de points minimum pour définir un cluster
- metric : métrique pour les distances
    - 'minkowski' par défaut
    - Autres :
        - ‘cityblock’, ‘cosine’, ‘euclidean’, ‘l1’, ‘l2’, ‘manhattan’

```
from sklearn.cluster import OPTICS
```

### BIRCH

Utilisation :
- Grappes

Avantages :
- Rapide

Inconvénients :
- Sensible aux paramètres

Paramètres :

### Gaussian mixture

Utilisation :
- Lignes
- Grappes

Avantages :
- Peut gérer le chevauchement

Inconvénients :
- Nécessite le nombre de clusters
- Sensible aux valeurs aberrantes

Paramètres :

``` 
from sklearn.mixture import GaussianMixture
```

## Étapes

Pour chaque lignes, la classe attribué : `clustering.labels_`  
(DBSCAN attribue -1 pour les outsiders)