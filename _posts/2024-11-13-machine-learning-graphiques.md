---
title: "Machine Learning - Graphiques"
layout: post  
post-image: "/assets/images/ia/graphiques.jpg"  
description: "Affichage des graphiques"  
categories:
  - Fiche
---

# Outils

Plotly express : `import plotly.express as px`  

# Données

Affiche le nombre de ligne par valeurs de "col" : `df['col'].value_counts()`  

## Evolutions

Graphes possibles :
- line (ligne)
- histogram (barre)

### Multiline
2 axes :
``` 
fig = px.line(df, 
    x='date', 
    y=['sum', 'median'], 
    markers=True # Affichage des points
 ) 
```

3 axes :  
``` 
fig = px.line(df, 
    x='date', 
    y='annonces', 
    color='region',
 ) 
```

Manuel :
``` 
fig = go.Figure()

for i, column_value in enumerate(df[column_line].unique()):
    df_subset = df[df[column_line] == column_value]
    fig.add_trace(
        go.Scatter(
            x=df_subset[column_x], 
            y=df_subset[column_y], 
            mode='lines', 
            name=str(column_value),
            fillcolor=colors[i]
        )
    )
    
for i, row in df.groupby(column_line).first().reset_index().iterrows():
    fig.add_annotation(
        x=row[column_x], 
        y=row[column_y], 
        text=row[column_line],
        showarrow=False, 
        yshift=10,
        xshift=10,
        font=dict(family="Arial", size=14, weight='bold', color=colors[i])
    )
```

## Corrélations

Graphes possibles :
- scatter_matrix (matrice de corrélation)
- imshow (heatmap)

### N-N

``` 
fig = px.scatter_matrix(df,
    dimensions=columns,
    color='year',
)

fig.update_traces(diagonal_visible=False)
```

```  
fig = px.imshow(
    df_graph.loc[:, columns].corr(),
    zmin=-1,
    zmax=1,
    text_auto=".2f",
    color_continuous_scale="rdbu", # -1 : Rouge, 0 : Blanc, 1 : Bleu
)
```

### X-Y

``` 
df_corrs = pd.DataFrame({
    "Feature": columns_x,
})

for target in columns_y:
    df_corrs[target] = df[[target, *columns_x]].corr().loc[target, columns_x].values

fig = px.imshow(
    df_corrs.set_index("Feature").T,
    text_auto="0.2f",
    color_continuous_scale="rdbu",
    zmin=-1,
    zmax=1,
)
```

## Outliers

``` 
fig = px.box(
    df, 
    x=x, 
    y=y,
)
```

## Dispersion

```
fig = px.scatter(df, 
    x='col1', 
    y='col2',
    color='col3',
    size='col3', 
    hover_data=['col1', 'col2', 'col3', 'col4'],
)
```

# Affichage

## Lignes

Couleurs : 
``` 
fig = px.line(df,
    color_discrete_sequence=color,
)
```

Annoter les lignes :
``` 
for i, serie_name in enumerate([trace.name for trace in fig.data]):
    subset = df.loc[df[color].astype(str) == serie_name].reset_index()
    fig.add_annotation(
        x=subset[x][0],  
        y=subset[y][0],  
        text=serie_name,
        showarrow=False,
        yshift=0,
        xshift=-20,
        textangle=0,
        font=dict(
            family="Arial", 
            size=14, 
            color=colors[i]
        )
    )
```

Modification des tracès :
``` 
fig.for_each_trace(
    lambda t: t.update(
        name = names[t.name],
        legendgroup = names[t.name],
        hovertemplate = t.hovertemplate.replace(t.name, names[t.name])
    )
)
```

## Axes

Nom des axes :  
``` 
fig = px.line(df,
    labels={ # Renomage des axes
        'date_day': 'Date', 
        'annonces': "Nombre d'annonces", 
        'region': 'Région'
    }, 
 ) 
```

Orientation de la légende sur X : `fig.update_xaxes(tickangle=45)`

## Layout

``` 
fig.update_layout(
    title="Nombre d'annonces par jour",
    height=600,
    width=1000,
    showlegend=True,
)
```

# Export

Image : `fig.write_image(f"../graphs/{filename}.jpg", width=1920, height=1080, scale=2)`  
Html : `fig.write_html(f"../graphs/{filename}.html")`  

# Notes

Exemple de schéma de couleurs de plotly express : `px.colors.qualitative.Dark24`  

``` 
colors_32 = [
    "#CC00FF", # Violet clair
    "#9933FF", # Violet foncé
    "#6633FF", # Violet
    "#0066FF", # Bleu foncé
    "#3399FF", # Bleu moyen
    "#00FFFF", # Cyan
    "#33CCFF", # Bleu clair
    "#33CCCC", # Turquoise
    "#33CC99", # Vert bleuâtre
    "#33CC33", # Vert émeraude
    "#66CC00", # Vert foncé
    "#99CC00", # Vert moyen
    "#FFCC00", # Orange clair
    "#FF9933", # Orange
    "#FF6347", # Orange vif
    "#FF0000", # Rouge vif
    "#CC00FF", # Violet clair
    "#9933FF", # Violet foncé
    "#6633FF", # Violet
    "#0066FF", # Bleu foncé
    "#3399FF", # Bleu moyen
    "#00FFFF", # Cyan
    "#33CCFF", # Bleu clair
    "#33CCCC", # Turquoise
    "#33CC99", # Vert bleuâtre
    "#33CC33", # Vert émeraude
    "#66CC00", # Vert foncé
    "#99CC00", # Vert moyen
    "#FFCC00", # Orange clair
    "#FF9933", # Orange
    "#FF6347", # Orange vif
    "#FF0000"  # Rouge vif
]
```