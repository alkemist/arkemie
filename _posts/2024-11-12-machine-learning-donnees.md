---
title: Machine Learning - Données
layout: post  
post-image: "/assets/images/ia/binaries.jpg"  
description: "Manipulation des données"  
categories:
  - Fiche
---

# Manipulation des données

## Récupération des données

Les données peuvent être récupéré par json `df = pd.read_csv('data.csv')`

## Typage des données

Pandas ne détectent pas forcément bien automatiquement les types des colonnes.

```
df['date'] = pd.to_datetime(df['date'], format='%Y%m%d%H')
df['datetime'] = pd.to_datetime(df['datetime'])
df['duration'] = pd.to_timedelta(df['duration'])
df['hour'] = pd.to_numeric(df['hour'])
df['zone'] = df['zone'].astype(str)
```

## Manipulation des types

```
df['date'].dt
df['str'].str
df['cat'].cat
df['plot'].plot
df['sparse'].sparse
df['struct'].struct
df['list'].list
```

## Parcourir les données

```
for i in df.index:
    value = df['column'][i]
    
    df['date'][i] + pd.Timedelta(hours=1)
```

Valeurs : `df['column'].values`  

## Filtrage des données

Projections (filtre sur colonnes) : `df_filterd = df[ ['col1', 'col2'] ]`  
Restrictions (filtre sur lignes) : `df_filtered = df[ df['col1'] == value ]`

Les 2 en même temps :  
`df_filterd = df.loc[0:n, ['col1', 'col2']]`  
`df_filterd = df.iloc[1:n, ['col1', 'col2']]`

Tri des colonnes : `df_sorted = df[sorted(df.columns)]`

Selection aléatoire d'un nombre de lignes : `df_sample = df.sample(100)`  
Selection aléatoire d'une portion: `f_sample = df.sample(frac=0.1)`  

Valeur null : `df_filtered = df['col1'].isnull()`  
Valeur non null : `df_filtered = df['col1'].notnull()`

Where : 
```
df['result'] = np.where(
    df['condition'], 
    df['true'], 
    df['false']
)
```  

Suppression des duplicats `df.drop_duplicates(subset=['col1', 'col2'], keep='last')`  

## Transformation des données 

Remplissage des données null `df['column'].fillna(df['other_column'])`  

Ajouter / Supprimer du temps : `df['col_date'] + pd.Timedelta(hours=1)`  

Group by : `df_grouped = df.groupby(['col1', 'col2]).mean()`  

Grouper par une partie d'une date : 
```
df_grouped = df.set_index('datetime')\
    .resample('D')\
    .median()\
    .reset_index()
```

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
  
Pivot (regroupe un tableau par une caractéristique et applique une fonction sur les valeurs) : 
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

## Changer l'affichage des données

Trier par l'index : `df.sort_index()`  
Trier par des colonnes : `df.sort_values(by=['col1', 'col2'])`  

Changer l'index : `df.index = df['date'].values`  

## Création de dataframe

A partir de colonnes
```
dt = pd.DataFrame({
  'col1': values1,
  'col2': values2,
  'col3': values3
})
```

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