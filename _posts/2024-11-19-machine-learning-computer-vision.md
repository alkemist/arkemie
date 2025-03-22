---
title: "Machine Learning - Computer Vision"
layout: post  
post-image: "/assets/images/ia/eye.png"  
description: "Expérimentations d'apprentissage d'un modèle de Computer Vision"  
categories:
  - Fiche
---



## Métriques

### Précision
Proportion de prédictions correctes parmi toutes les prédictions faites
(à augmenter)

`precision = TP / (TP + FP)`

### Rappel 
Proportion d'objets correctement détectés parmi tout les objets présents dans les données
(à augmenter)

`recall = TP / (TP + FN)`

### Average Precision, AP
Mesure la précision moyenne d'un modèle à différents niveaux de rappel, en prenant en compte à la fois la précision et le rappel
Elle est calculé à partir de la courbe précision-rappel (PR Curve)
(à augmenter)

### Intersection over Union, IoU
Mesure le degré de chevauchement entre les boites prédites et les boites de vérité
Un IoU à 0.5 signifie que la prédiction est correcte si elle chevauche au moins 50% la vérité

### Mean Average Precision, mAP
Moyenne des AP sur toutes les classes d'objets

- Variétés
  - mAP50(B)
    - mAP calculé en fixant le seuil d'IoU (Intersection over Union) à 0.5
  - mAP50-95(B)
    - Moyenne des mAP sur plusieurs seuils d'IoU (0.5 à 0.95 par pas de 0.05)
    - Prend en compte les prédictions faciles (0.5) et difficiles (0.95)

(B) Métriques qui concernent les boites englobantes (bounding boxes) qui définissent les contours des objets détectés

### Box Loss
Cette métrique mesure la qualité de la prédiction des coordonnées des boîtes englobantes (bounding boxes).
Elle vérifie dans quelle mesure les boîtes prédites s'alignent avec les boîtes réelles (ground truth).

### Cls Loss
Cette métrique mesure l'erreur de classification des objets détectés.
Elle vérifie si le modèle attribue correctement une classe à chaque boîte englobante prédit.

### Distribution Focal Loss, DFL Loss 
Spécifique à des versions modernes de YOLO, cette perte mesure la qualité de la prédiction de régression discrète des coordonnées des boîtes.
Dans certains modèles (comme YOLOv8), les coordonnées des boîtes ne sont pas directement prédites sous forme continue, mais plutôt comme une distribution discrète ou une approximation par des "bins" (intervalles fixes).

## Durées

| Modèle    | Dataset  Train / Val /Test | Entrainement | Compilation HEF pour Hailo8L |
|:----------|:--------------------------:|-------------:|-----------------------------:|
| yolov8n   |     7000 / 2000 / 1000     |     6.5-7.5h |                         2.5h |
