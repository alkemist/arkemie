---
title: "Machine Learning - Modélisation"
layout: post  
post-image: "/assets/images/ia/model.jpg"  
description: "Types et étapes d'une modélisation"  
categories:
  - Fiche
---

# Modélisation

## Types de modèle

- Supervisé
  - A une cible à prédire, son objectif est de déterminer le "type"
  - On connait la réponse, les liens entre les données, et on cherche à prédire
  - Exemples 
    - Regression
      - On cherche à prédire l'évolution d'une variable quantitative
    - Classification
      - On cherche à prédire une variable qualitative
- Non supervisé
  - N'a pas de cible à prédire, son objectif est de déterminer les "types"/clusters/familles
  - On ne connait pas les étiquettes de chaque ligne, et on cherche à les determiner
  - Exemples
    - Clustering
      - On cherche à grouper en fonction de caractéristiques
    - Dimensionality reduction
- Renforcement

## Types de données

- Structuré
  - Tableau
- Non structuré
  - Image
  - Audio
  - Language humain

## Étapes

### Dummification
Transformer une colonne ayant des modalités textuelles en entier

#### One-hot encoding
Transformer chaque modalité en colonne booléenne (estFrance, estEspagne, ....)

`encoded_df = pd.get_dummies(df, columns=['Animal'])`

#### Label encoding
Transformer chaque modalité en entier (France = 0, Espagne = 1, 2, ...)

### Normalization
Mettre toutes les features sur une même echelle de valeur

`from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler`  
`StandardScaler().fit_transform(data)`  