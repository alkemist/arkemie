---
title: Machine Learning - Statistiques
layout: post  
post-image: "/assets/images/ia/statistiques.jpg"  
description: "Fiche"  
categories:
  - Fiche
---

# Statistiques

## Types de variables

- Quantitative / Quantités
  - Continue : float  
  - Discrète : int 
- Qualitative / Modalités  
  - Ordinal : ordonnée
    - Continue : nombre illimité de valeur
    - Discrète : nombre limité de valeur
  - Nominal : non ordonnée
- Autres 
  - Boléenne 
  - Date 
  - Coordonnées

## Types de statistiques

### Descriptives univariées (sur une seule variable) 

- Quantitative 
  - Moyenne : Valeur d'un individu pour que le total soit inchangé 
    - (total / count)
  - Variance : Mesure de la dispersion des valeurs d'un échantillon. 
    - Exprime la moyenne des carrés des écarts à la moyenne. 
    - Plus elle est élevé, plus le jeu de donnée est hétérogène. 
  - Écart type : Racine carré de la variance. 
    - A l'avantage d'être dans la même unité de mesure que la variable calculée. 
  - Quantiles : Valeurs qui divisent un jeu de données en intervalles contenant le même nombre de données 
    - (Ex: Médiane, Quartile, Décile, Centile). 
  - Médiane : Point milieu d'un jeu de données.
    - 50 % des unités ont une valeur inférieure ou égale à la médiane
    - 50 % des unités ont une valeur supérieure ou égale
    - Elle n'est pas influencé par les extrèmes
  - Extremum : Les valeurs extrêmes d'une variable (minimum ou maximum)
- Qualitative 
  - Fréquence absolue : Effectif d'une modalité
    - (groupby + count)
  - Fréquence relative : Effectif d'une modalité rapportée à la taille de la population 
    - (groupby + count / total)
  - Mode : Modalité ou valeur la plus fréquente pour une variable donnée 
    - (groupby + max count)

### Statistiques descriptives bi-variées (lien/corrélation entre 2 variables)

- 2 variables quantitatives 
  - Coéfficient de corrélation linéaire : Mesure de la relation linéaire entre deux variables
    - Corrélation : lien, rapport réciproque entre 2 variables 
    - Valeur : -1 < 1
      - 1 : relation linéaire positive forte entre les variables  
        Plus la valeur d'une variable augmente + la valeur de l'autre variable AUGMENTE
      - -1 : relation linéaire négative forte entre les variables  
        Plus la valeur d'une variable augmente + la valeur de l'autre variable DIMINUE 
      - 0 : relation linéaire faible entre les variables
- 1 variable quantitative et 1 variable qualitative 
  - Rapport de corrélation / Eta squared
    - Valeur : 0 < 1 
      - 1 : relation entre les variables 
      - 0 : pas de relation entre les variables
- 2 variables qualitatives
  - Test d'indépendance de khi-deux
