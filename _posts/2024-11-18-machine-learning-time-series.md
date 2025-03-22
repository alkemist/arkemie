---
title: Machine Learning - Time series
layout: post  
post-image: "/assets/images/ia/time.jpg"  
description: "Dans un problème de time series, on veux prédire en fonction des tendances saisonnières"  
categories:
  - Fiche
---

# Time series

Pour prédire sur un cycle (annuel par exemple), il faut au moins 3 cycles, 2 pour du test et 1 pour de la validation

## Classique

```
from sktime.forecasting.model_selection import temporal_train_test_split

df['date'] = pd.to_datetime(df['date'])
df.index = df['date'].values
df.index = df.index.to_period('M') # D / M / W / W-MON

# test_size = dernière nombre de step, ex: derniers 12 mois / dernières 52 semaines, ...
df_train, df_test = temporal_train_test_split(df, test_size=12) 
```

### Modèle saisonnier naif

Modèle le plus simple, répercute la dernière période pour prédire le futur

```
from sktime.forecasting.naive import NaiveForecaster

forecaster = NaiveForecaster(sp=12) # saisonnalité : 12 mois dans un an ou 52 si en semaine
```

### Holt-Winters / Lissage exponentiel

Prend en compte :
- Le niveau de base (la valeur moyenne à l'issue d'une période)
- La tendance (la dynamique de progression)
- La saisonnalité (le motif se répercutant période après période)

Ne prend pas en compte les jours fériés

```
from sktime.forecasting.exp_smoothing import ExponentialSmoothing

forecaster = ExponentialSmoothing(trend="add", seasonal="add")
# trend : tendance sur toutes les données
# seasonal : tendance sur un cycle (12 mois / 52 semaines / ...)
```

### ARIMA

Ne prend pas en compte les jours fériés

```
from sktime.forecasting.arima import AutoARIMA

forecaster = AutoARIMA()
```

### Entrainement et prédiction

```
y_train = df_train['col']
y_true = df_test['col']

forecaster.fit(y_train)

horizon = np.arange(1, 12+1)
y_pred = forecaster.predict(fh=horizon)
```

### Métriques

```
from sktime.performance_metrics.forecasting import mean_absolute_error, mean_absolute_percentage_error, mean_absolute_scaled_error

MAE = mean_absolute_error(y_true=y_true, y_pred=y_pred)
MAPE = mean_absolute_percentage_error(y_true=y_true, y_pred=y_pred, symmetric=False)
sMAPE = mean_absolute_percentage_error(y_true=y_true, y_pred=y_pred, symmetric=True)
MASE = mean_absolute_scaled_error(y_true=y_true, y_pred=y_pred, y_train=y_train)
```

- Mean absolute error, MAE (à réduire)
  - Equivalent à l'erreur de prédiction de **y**
- Mean absolute percentage error, MAPE (à réduire)
  - Equivalent à l'erreur de prédiction de **y** en pourcentage
  - Avantages
    - Permet de detecter des outliers
  - Inconvénient
    - Ne marche pas avec des valeurs proche de zero
- Symmetric mean percentage error, sMAPE-
  - Equivalent à l'erreur de prédiction de **y** en pourcentage
  - Avantages
    - Moins sensible aux valeurs proches de zéro, car il utilise la moyenne des valeurs réelles et prédites dans le dénominateur.
    - Pénalise de manière équilibrée les sous-estimations et les surestimations.
  - Inconvénient
    - Peut être difficile à interpréter directement si les prédictions sont parfois très éloignées des valeurs réelles.
- Mean absolute scaled error, MASE
  - MASE = 1 : même chose qu'un modèle naif
  - 0 < MASE < 1 : meilleur qu'un modèle naif
  - MASE > 1 : moins performant qu'un modèle naif

## Prophet / Silverkite / Greykite

```
from greykite.framework.templates.autogen.forecast_config
import ForecastConfig, MetadataParam

forecast_config = ForecastConfig(
    model_template = "SILVERKITE", # ou PROPHET
    forecast_horizon = 365,
    coverage = 0.95,
    metadata_param = MetadataParam(
        time_col = "date",
        value_col = "y",
        freq = "D" # Pour une fréquence journalière
    )
)

forecaster = Forecaster()

result = forecaster.run_forecast_config(
    df=df,
    config=forecast_config
)
```

### Métriques

Forecast VS Actual
`result.backtest.plot()`

`SMAPE = result.backtest.test_evaluation['sMAPE']`

### Prédiction

`pred = result.model.predict()`