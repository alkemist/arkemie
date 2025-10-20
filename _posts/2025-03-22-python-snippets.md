---
title: "Python - Snippets"
layout: post  
post-image: "/assets/images/autre/tools.jpg"  
description: "Liste de bouts de code utiles"  
categories:
  - Fiche
---


# Liste de bouts de code utiles

## Nombres

Partie entière de la division : `a // b`  

## Date

`from datetime import datetime`

Date => chaîne : `datetime.now().strftime(format)`  
Chaîne => date : `datetime.strptime(date_str, format)`  

Intervale en secondes : `interval_seconds = interval.total_seconds()`  

Exemples de formats de date :
- `%m/%d/%Y %H:%M:%S` : 01/02/2025 10:05:06   
- `%Y%m%d%H` : 20250102  
- `%d %B %Y %H:%M` : 2 January 2025 10:05  

Codes :
- `%a` :	Weekday as Sun, Mon
- `%A` :	Weekday as full name as Sunday, Monday
- `%w` :	Weekday as decimal no as 0,1,2...
- `%d` :	Day of month as 01,02
- `%b` :	Months as Jan, Feb
- `%B` :	Months as January, February
- `%m` :	Months as 01,02
- `%y` :	Year without century as 11,12,13
- `%Y` :	Year with century 2011,2012
- `%H` :	24 Hours clock from 00 to 23
- `%I` :	12 Hours clock from 01 to 12
- `%p` :	AM, PM
- `%M` :	Minutes from 00 to 59
- `%S` :	Seconds from 00 to 59
- `%f` :	Microseconds 6 decimal numbers

Corriger les problèmes de timezone : `date.tz_convert(None)`  

## Chaînes

Génération de slug :   
``` 
from slugify import slugify
filename = slugify(title)
```

Remplissage par le début avec des 0 : `cp.zfill(5)`  
Suppression des espaces avant/après : `text.strip()`  
Minuscule : `text.lower()`  
Commence par : `text.startswith('is')`

Décodage UTF8 : 
``` 
if "\\u" in text:
    text = text.encode().decode('unicode-escape')
```

Supprimer les accents :
``` 
import unicodedata

def remove_accents(texte):
    texte_normalise = unicodedata.normalize('NFD', texte)
    texte_without_accents = ''.join(c for c in texte_normalise if unicodedata.category(c) != 'Mn')
    return texte_without_accents.replace('\s+', ' ').lower()
```

## Regex

- `\b` permet de délimiter un ensemble de `\w`
- `.*?` permet de s'arrêter dès que possible
- le groupe `0` est l'ensemble de la capture, ensuite c'est les groupes capturés par des `()`

Extraire une portion :
``` 
def extract_numbers(text):
    regex = r'\b\d+\b'
    results = re.search(regex, text)
    if results:
        return results.group(0)
    else:
        return None
```

Extraction avec variable (`rf`) :
`match = re.search(rf'list_id":{uid}.+?,"user_id":"(.*?)"', source)`

Remplacement avec un dictionnaire :
``` 
import re

replaces = {'key': 'value'}
regex = re.compile("|".join(re.escape(k) for k in replaces))
text = regex.sub(lambda x: replaces[x.group(0)], text)
```

Detection du charset :   
```
import chardet
chardet.detect(raw_data)
```

## Tableau

Map : `array = [r for r in tab]`   
Filtrer:
```
tab_filtered = list(
        filter(
            lambda c: c not in ['value'], 
            tab
        )
    ) 
```  

All : `all(x > 0 for x in array)`  
All numpy : `(np.array([1, 2, 3, 4, 5]) > 0).all()`

Any : `any(x > 0 for x in array)`  
Any numpy : `(np.array([1, 2, 3, 4, 5]) > 0).any()`

Parcourir un dictionnaire : `for key, value in dictionnaire.items():`

### Itertools

Methodes pour avoir une liste de combinaisons ([itertools](https://docs.python.org/3/library/itertools.html)) :  

| Fonction                               | Répétition | Ordre  | Exemple                                  | Résultat                                        |
|:---------------------------------------|:----------:|:------:|------------------------------------------|:------------------------------------------------|
| product(x1, x2, ...)                   |    Oui     |  Oui   | product('ABCD', repeat=2)                | AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD |
| permutations(x[, r])	                  |    Non     |  Oui   | permutations('ABCD', 2)                  | AB AC AD BA BC BD CA CB CD DA DB DC             |
| combinations(x, r)                     |    Non     |  Non   | combinations('ABCD', 2)                  | AB AC AD BC BD CD                               |
| combinations_with_replacement(x, r)    |    Oui     |  Non   | combinations_with_replacement('ABCD', 2) | AA AB AC AD BB BC BD CC CD DD                   |


## Manipulation de fichiers

```
import os

if os.path.exists(file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        file.write('')
  
```

Téléchargement d'un fichier distant :   
``` 
import urllib.request

urllib.request.urlretrieve(url, path)
```

## Requêtes d'API

```
import requests

response = requests.get(
    '', 
    params={}, 
    headers={
        'Authorization': '', 
        'Content-Type': 'application/json'
        }
)

# Lance une exception si status_code != 200
response.raise_for_status()

if response.status_code == 200:
  json = response.json()
  binary = response.text

```

## Informations locales

### Récupération du nom de la région à partir du code postal
```
import pgeocode
geo = pgeocode.Nominatim('fr')

infos = geo.query_postal_code(code_postal)
return infos['state_name']
```

## Manipulation XML 

``` 
import xml.etree.ElementTree as Xet 

xmlparse = Xet.parse('data.xml') 
root = xmlparse.getroot() 

nodes = root[2]
nodes = node.find("tag_name")
text = node.text
```