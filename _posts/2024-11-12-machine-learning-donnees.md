---
title: "Machine Learning - Données"
layout: post  
post-image: "/assets/images/ia/binaries.jpg"  
description: "Manipulation des données"  
categories:
  - Fiche
---

# Manipulation des données

## Fichiers

Les données peuvent être récupéré par json `df = pd.read_csv('data.csv')`

Et enregistrer avec : `df.to_csv('data.csv', index=False, header=True)`  

Pour les gros fichiers :   
Par chunk : `for df_commande in pd.read_csv('commandes.csv', chunksize=100000):`  
Ou un chunk `pd.read_csv('commandes.csv', chunksize=100000).get_chunk()`  

## Typage des données

Pandas ne détectent pas forcément bien automatiquement les types des colonnes.

```
df['date'] = pd.to_datetime(df['date'], format='%Y%m%d%H', errors='coerce') # coerce remplace les erreurs par NaT

df['datetime'] = pd.to_datetime(df['datetime'])
df['duration'] = pd.to_timedelta(df['duration'])
df['hour'] = pd.to_numeric(df['hour'])
df['zone'] = df['zone'].astype(str)
```

## Manipulation des types

```
df['date'].dt
df['str'].str
```

## Parcourir les données

```
for i in df.index:
    value = df['column'][i]
```

Valeurs : `df['column'].values`  

Colonnes : `df.columns`  

## Filtrage des données

Projections (filtre sur colonnes) : `df_filterd = df[ ['col1', 'col2'] ]`  
Restrictions (filtre sur lignes) : `df_filtered = df[ df['col1'] == value ]`  

Les 2 en même temps :  
`df_filterd = df.loc[0:n, ['col1', 'col2']]`  
`df_filterd = df.iloc[1:n, ['col1', 'col2']]`  

Valeur null : `df_filtered = df['col1'].isnull()`  
Valeur non null : `df_filtered = df['col1'].notnull()`  
Valeur non NA : `pd.notna(value)`  

Vérifier si la valeur est présent dans un tableau : `df['col1'].isin(['value1', 'value2'])`  

Suppression des duplicats `df.drop_duplicates(subset=['col1', 'col2'], keep='last')`  

Valeurs unique : `df['col1'].unique()`  

Tri des colonnes : `df_sorted = df[sorted(df.columns)]`  

Selection aléatoire d'un nombre de lignes : `df_sample = df.sample(100)`  

Selection aléatoire d'une portion :  
- En pourcentage : `df_sample = df.sample(frac=0.1)`  
- En nombre : `df_sample = df.sample(n=100)`  

Suppression des nulls : `df['col1'].dropna()`  
Valeurs uniques : `df['col1'].unique()`

## Transformations par colonnes

Applique une fonction à une colonne : `df['col2'] = df['col1'].apply(my_function)`  
Ou `df['col2'] = df['col1'].apply(lambda x: my_function(x))`

Remplissage des données null `df['column'].fillna(df['other_column'])`  

Ajouter / Supprimer du temps : `df['col_date'] + pd.Timedelta(hours=1)`  

Verifier si une colonne contient une regex : `df['col2'] = df['col1'].str.contains('hello') == True`  
Même chose pour un ensemble de regex :
``` 
import re

df['col2'] = df['col1'].apply(
    lambda x: 
        True if any(
            re.search(regex, x) for regex in [
                'test 1',
                'test 2',
            ]
        ) 
        else False
)
```

Remplissage conditionnel :
```
df['result'] = np.where(
    df['condition'], 
    df['true'], 
    df['false']
)
```  

Modifier une partie des données :  
`df.loc[condition, 'col1'] = ...`

## Calculs

Calculer une moyenne flottante : `df['col1'].rolling(window=3).mean()`  
Calcule la différence par rapport à la ligne précédente : `df['col1'].diff()`  
Calcule la valeur absolue : `df['col1'].abs()`  

Calcul d'un centile (0.1 => 10e centile => 10%) : `df['col'].quantile(0.1)`

Décompte groupé (pour chaque article, la 1er ligne aura 1, puis 2...) :
`df['number'] = df.groupby('article_id').cumcount()`  

Calcul groupé (pour chaque ligne, le calcul se fait sur le group by) :
`df['amount_max'] = df.groupby('article_id')['amount'].transform('max')`  
Même chose avec une fonction
`df['amount_max'] = df.groupby('article_id')['amount'].transform(lambda x: x.quantile(0.1))`

## Changer l'affichage des données

Trier par l'index : `df.sort_index()`  
Trier par des colonnes : `df.sort_values(by=['col1', 'col2'], ascending=[True, False])`

Changer l'index : `df.index = df['date'].values`

## Transformations globales

Grouper par une partie d'une date : 
```
df_grouped = df\
    .set_index('datetime')\ # Change l'index
    
    .groupby(['col1', 'col2])\ # Groupe par colonne
    .resample('D')\ # Groupe par jour
    
    .median()\ # pour calculer la médiane par groupe
    .size()\ # pour calculer le nombre d'élements par groupe
    
    .reset_index(name='annonces') # Renomme la colonne calculé
```

Appliquer plusieurs fonctions d'agrégations :  
``` 
df = df.loc[:, ['id', 'amount', 'weight']]\
    .groupby(['year'])\
    .agg({
        'id': ['size'],
        'amount': ['sum', 'median'],
        'weight': ['sum', 'median'],
    })

df.columns = ['_'.join(col).strip() for col in df.columns.values]
df = df.reset_index()
```

Suppression de colonnes : `df_filtered = df.drop(columns=['col2'])`

Merge : 
```
df_mergd = pd.merge(
    df1, 
    df2, 
    left_on="id", 
    right_on="id", 
    how="left"
)
```

Concat : 
`df_concat = pd.concat([df1, df2], ignore_index=True)`

Pivot (permet d'applatir un tableau avec une ligne par "type" en une colonne par "type") :  
```
df_pivot = df.pivot(
    index='id', 
    columns='lib', 
    values='value'
)
```
  
Pivot table (regroupe un tableau par une caractéristique et applique une fonction sur les valeurs) :  
```
df_pivot = pd.pivot_table(
    df, 
    values=['col2', 'col3'], 
    index = ['col1'], 
    aggfunc="mean"
)
```

Melt (aplati un tableau, et donne une ligne pour chaque index/colonne avec l'index, la colonne et la valeur) :
```
df_melt = pd.melt(
    df, 
    id_vars=['date'], 
    value_vars=['T'],
    value_name="mean_temp"
   )
```

## Création de dataframe

A partir de colonnes
```
df = pd.DataFrame({
  'col1': [value11, value12],
  'col2': [value21, value22],
  'col3': [value31, value32]
})
```
Ou  
```
df = pd.DataFrame([{
  'col1': value11,
  'col2': value21,
  'col3': value31
}], [{
  'col1': value12,
  'col2': value22,
  'col3': value32
}])
```
Ou 
`df = pd.DataFrame(X, columns=['d1', 'd2'], index=X.index)`  

### A partir d'un dictionnaire

Méthode 1
```
a_dict = {
  'val1': {
    'cal2': {
      'val3': {
        'val4': 'val5'
      }
    }
  }
}

df_dict = pd.DataFrame([
      {'col1': level0_key, 'col2': level1_key, 'col3': level2_key, 'col4': level3_key, 'col5': level3_value}
      for level0_key, level0_values in a_dict.items()
      for level1_key, level1_values in level0_values.items()
      for level2_key, level2_values in level1_values.items()
      for level3_key, level3_value in level2_values.items()
  ])
```

Méthode 2
```
a_dict = {
  'val1': {
    'val2': 'val3',
  }
}

df_dict = pd.concat(
  { 
    k: pd.DataFrame.from_dict(v, orient='index') \
      for k, v in a_dict.items() 
  },
        axis=0,
  ).reset_index()\
  .rename(columns={'level_0': 'col1', 'level_1': 'col2', 0: 'col3'})
 
```