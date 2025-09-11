---
title: "Python - POO"
layout: post  
post-image: "/assets/images/informatique/definition.png"  
description: "Outils python en POO"  
categories:
  - Fiche
---

## Aide

`help` : Fonction qui permet d'avoir la définition d'un objet ou d'une fonction (type, arguments, documentation, ...)

`type` : Fonction qui permet d'avoir le type d'un objet

## Methodes magiques

`__init__` : Constructeur d'une classe  
`__repr__` : Définit sa représentation textuelle  
`__getattr__` : Appelé si l'attribut n'existe pas  
`__setattr__` : Appelé pour définir un attribut
`__getattribute__(a_attribute)` : Donne la valeur d'un attribut passé en paramètre (équivalent de `object.a_attribute` ou `__dict__[a_attribute]`)  

## Propriétés magiques

`__doc__` : Commentaire de la classe  
`__dict__` : 
- Si class : Dictionnaire avec "nom de la méthode" => "son commentaire"
- Si objet : Dictionnaire avec "nom de l'attribut" => "valeur"