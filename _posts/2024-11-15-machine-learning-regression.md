---
title: "Machine Learning - Regression"
layout: post  
post-image: "/assets/images/ia/numbers.jpg"  
description: "Dans un problème de régression, on prédit la variable à expliquer en fonction d'une ou plusieurs variables explicatives"  
categories:
  - Fiche
---

# Regression

## Combien ?

Quand on veux répondre à cette question, on fait de la régression.
Dans un problème de régression, on prédit la variable à expliquer en fonction d'une ou plusieurs variables explicatives

## Métriques

**X** : Variables explicatives  
**y** : Variable cible  

**Intercept** : On s'attend à avoir environ "**intercept**" fois **y** pour 0 **X**  
**Coef** : Chaque **X** supplémentaire ajoute "**coef**" fois **y**  

- L'erreur moyenne quadratique, MSE (à réduire)
  - C'est cette métrique qui est minimisée pour trouver les paramètres du modèle optimal
- L'erreur moyenne absolue, MAE (à réduire)
  - Equivalent à l'erreur de prédiction de **y**

- Le coefficient de détermination, **R²** (à augmenter)
  - Version normalisé de la MSE
  - Le modèle explique une proportion de **R²** de la variance
  - Valeur : -1 < 1
    - **R²** = 1 :  
        - Le modèle explique 100 % de la variance de la variable dépendante.
        - Toutes les prédictions correspondent parfaitement aux valeurs observées.
    - **R²** = 0 :
        - Le modèle n'explique aucune variance de la variable dépendante.
        - Cela signifie que le modèle n'apporte aucune amélioration par rapport à un modèle trivial qui prédirait simplement la moyenne de la variable dépendante.
    - 0 < **R²** < 1 :
        - Le modèle explique une certaine proportion de la variance 
        - (par exemple, **R²**=0.75 signifie que 75 % de la variance est expliquée).
    - **R²** < 0 :
        - Cela peut arriver si le modèle est mal ajusté ou si vous utilisez une régression non linéaire. 
        - Cela signifie que le modèle est pire que de simplement prédire la moyenne.

## Étapes

```
from sklearn.model_selection import train_test_split, learning_curve
from sklearn.linear_model import LinearRegression
```

### Création des jeux de données
```
X = df_cleaned[X_columns]  # Les colonnes explicatives
y = df_cleaned[y_column]  # La colonne cible

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
```

### Création et entrainement du modèle  
`model = LinearRegression().fit(X_train, y_train)`

### Récupération des métriques d'entrainement
```
model_intercept = model.intercept_
model_coef = model.coef_[0]

r2_train = model.score(X_train, y_train)
    
train_pred_model = model.predict(X_train)
    
mse_train = mean_squared_error(y_true=y_train, y_pred=train_pred_model)
mae_train = mean_absolute_error(y_true=y_train, y_pred=train_pred_model)
```

### Calculer les erreurs moyennes pour chaque taille d'échantillon d'entraînement
```
train_sizes, train_scores, test_scores = learning_curve(
        model, X_train, y_train, train_sizes=np.linspace(0.1, 1.0, 10), cv=5, scoring="neg_mean_squared_error", n_jobs=-1
    )
    
# (négatif car l'erreur est retournée négative)
train_errors = -train_scores.mean(axis=1)
test_errors = -test_scores.mean(axis=1)

learning_curve_df = pd.DataFrame({
        'train_size': train_sizes,
        'train_error': train_errors,
        'test_error': test_errors
})

fig = px.line(
    learning_curve_df, 
    x='train_size', 
    y=['train_error', 'test_error'],
    labels={'train_size': 'Taille de l\'échantillon d\'entrainement', 'value': 'Erreur MSE'},
    title='Learning Curve pour une régression linéaire'
)

fig.show()
```

### Prédiction sur le jeu de test
`test_pred_model = model.predict(X_test)`

### Création d'un jeu de donnée de comparaison
```
sample_count_min = min(X_test.shape[0], y_test.shape[0], len(test_pred_model_1))

X_test_sample = X_test.sample(n=sample_count, random_state=sample_count_min)
y_test_sample = y_test.loc[X_test_sample.index]
pred_sample = test_pred_model_1[X_test_sample.index - 1] # Les index commencent à 1
```

### Affichage des différences entre train et test
``` 
for X_column in X_columns:
    y_column_true = y_column + '_true'
    y_column_pred = y_column + '_pred'

    df_column = pd.DataFrame({
      X_column:       X_test_sample[X_column],
      y_column_true : y_test_sample,
      y_column_pred:  pred_sample,
    }) 

    fig = px.scatter(
        df_column, 
        x=X_column, 
        y=[y_column_true, y_column_pred], 
        title=f"Prédiction {y_column} / {X_column}",
        labels={'value': y_column},
        trendline='lowess'
    )
    
    fig.update_layout(autosize=True, height=400)
    fig.show()
```

### Comparaison des métriques 
```
r2_test = model.score(X_test, y_test)

mse_test = mean_squared_error(y_true=y_test, y_pred=test_pred_model)
mae_test = mean_absolute_error(y_true=y_test, y_pred=test_pred_model)
```
Un sur-apprentissage se détecte si les métriques sont trop différentes entre train et test