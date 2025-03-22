---
title: "FollowChon"
layout: post  
post-image: "/assets/images/projets/followchon.png"  
description: "Deep Learning - Modèle vision de détection de cochon d'inde"  
categories:
  - Projet
---

# FollowChon

## Objectifs

Ce projet a plusieurs objectifs :
- Créer et entrainer un modèle de detection de cochon d'inde (qui n'existe pas à l'heure actuelle)  
- Produire un large dataset d'image annotées (93 000 à l'heure actuelle, entre 600 et 800 captures par jours)
- Suivi des comportements de mes cochons d'inde pour détecter les comportements anormaux

## Architecture

Ils tournent sur un raspberry pi 5 équipé d'une puce HAILO 8L (pour améliorer ses performances en détection d'objets).

Le projet est composé de 4 sous projets :
- Vision (python) : 
  - Analyse des images récupéré par le flux vidéo de la caméra ip
  - Sauvegarde des résultats sous la forme de fichiers et de lignes dans une base de donnée

- Backoffice (django) :
  - Permet de fournir une api pour accéder aux captures, detections, paramètres, logs et familles
  - Permet de visualiser / trier / filtrer les données par une interface d'administration

{% include image.html img="projets/followchon_backoffice.png" alt="Backoffice Django" %}

- Correction & Validation (angular) :
  - Application qui permet de récupérer les captures, détections et familles pour :
    - Visualiser les résultats
    - Ajouter ou corriger la position des boites des detections
    - Corriger la classe associé à chaque detection
    - Faire un circuit de validation (brouillon / vérifié / archivé / supprimé)
  - Permet d'afficher quelques tendances, statistiques ou autres visualisations
  - Avec des raccourcis clavier et une ergonomie pour traiter des centaines de captures en quelques dizaines de minutes

{% include image.html img="projets/followchon_angular.png" alt="Application Angular" %}

- Dataset & Train & Convert (python) :
  - Pour chaque modèle (detection et classification)
    - Permet de produire des datasets d'entrainement avec des contraintes de qualité
      - Récupération des captures qui n'ont pas été utilisé par les précédents entrainements
      - Pourcentage pour les sous ensemble train / test / validation
      - Avec pour chaque sous ensemble :
        - Pourcentage de données corrigées / sans besoin de correction
        - Pourcentage de donnée hétérogène (issue d'autre source)
    - Entrainement du modèle basé sur le modèle précédent et le nouveau dataset
    - Le modèle de detection est converti en ONNX => HAR => HEF (via le Docker Hailo SDK)
  
## Vision

Ensemble de scripts pythons qui s'occupent de plusieurs choses :

- Récupérer un ensemble de paramètres par l'api du backoffice, dont notamment
  - Version des modèles
  - Heure de début et de fin de l'analyse

- Charger les modèles :
    - Au format HEF pour le modèle de detection (pour être utilisé par la puce HAILO)
    - Au format PyTorch pour le modèle de classification

- Lancer une commande ffmpeg pour récupérer le flux RTSP de ma caméra IP pour la stocker dans des fichiers mp4 découpé par minutes d'enregistrement
- Le script va lire chaque fichier vidéo et récupérer les images

- Il va ensuite faire l'inférence sur le modèle de detection
- Puis récupérer la portion d'image et l'envoyer au modèle de classification
- Enregistrer les fichiers et les lignes dans la base de donnée

# Autres informations

Outils utilisé :
- ultralytics
- docker
- hailo sdk
- hailo drivers
- angular