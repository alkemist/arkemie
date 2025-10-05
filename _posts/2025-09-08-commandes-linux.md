---
title: "Linux - Commandes utiles"
layout: post  
post-image: "/assets/images/informatique/commands.png"  
description: "Liste de commandes utiles sous Linux"  
categories:
  - Fiche
---

### Extraction de Colonnes d'un Fichier

La commande cut est utilisée pour extraire des sections de chaque ligne d'un fichier texte.

`cut OPTION... [FILE]...`  

Options Communes :

    -d : Spécifie le délimiteur.
    -f : Spécifie les champs à extraire.

### Suppression de Lignes Vides

sed (Stream Editor) est un outil puissant pour manipuler les fichiers texte, comme supprimer ou insérer des lignes, remplacer du texte, etc.

`sed [OPTION]... {script-only-if-no-other-script} [input-file]...`  

Options Communes :

    -i : Modifie le fichier en place.
    -e : Ajoute le script à exécuter.

### Recherche de Fichiers

find est utilisé pour rechercher des fichiers dans un système de fichiers selon divers critères comme le nom, la date de modification, la taille, etc.

`find [chemin] [option] [action]`  

Options Communes :

    -name : Recherche par nom de fichier.
    -mtime : Recherche basée sur la dernière modification.
    -size : Recherche par taille de fichier.

### Compression de Fichiers

Linux offre plusieurs outils de compression, dont les plus courants sont tar, gzip, et bzip2. tar est souvent utilisé pour regrouper plusieurs fichiers en un seul, tandis que gzip et bzip2 sont utilisés pour la compression.

`tar [OPTION]... [ARCHIVE] [FICHIERS]...`  

Options de Compression :

    -z : Utilise gzip pour la compression.
    -j : Utilise bzip2 pour la compression.
    -c : Crée une archive.
    -x : Extrait une archive.

### Affichage de Contenu de Fichier

head et tail sont utilisés pour afficher le début et la fin d'un fichier, respectivement. sed peut être utilisé pour une manipulation plus complexe de texte.

`head [OPTION]... [FICHIER]... tail [OPTION]... [FICHIER]...`  

Options Communes :

    -n : Nombre de lignes à afficher.

### Recherche dans un Fichier 

grep est utilisé pour rechercher des motifs dans des fichiers texte.

`grep [OPTION]... MOTIF [FICHIER]...`  

Options Communes :

    -c : Compte le nombre de lignes contenant le motif.
    -i : Recherche insensible à la casse.
    -v : Inverse la recherche (affiche les lignes ne contenant pas le motif).

### Redirection de Sortie

La redirection est une fonctionnalité des shells Unix qui permet de rediriger la sortie standard (stdout) et l'erreur standard (stderr) vers des fichiers ou d'autres commandes.

Syntaxe :

    > : Redirige stdout vers un fichier.
    2> : Redirige stderr vers un fichier.
    &> : Redirige à la fois stdout et stderr.