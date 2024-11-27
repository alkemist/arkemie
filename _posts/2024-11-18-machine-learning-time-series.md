---
title: Machine Learning - Time series
layout: post  
post-image: "/assets/images/ia/time.jpg"  
description: ""  
categories:
  - Fiche
---

# Time series

## Classique

```
from sktime.forecasting.model_selection import temporal_train_split

df['date'] = pd.to_datetime(df['date'])
df.index = df['date'].values
df.index = df.index.to_period()

df_train, df_test = temporal_train_test_split(df, test_size=12)
```

### Modèle saisonnier naif

Répercute la dernière période pour prédire le futur
```
from sktime.forecasting.naive import NativeForecaster

forecaster = NaiveForecaster(sp=12) # saisonnalité : 12 mois dans un an
```

### Holt-Winters / Lissage exponentiel

Prend en compte :
- Le niveau de base (la valeur moyenne à l'issue d'une période)
- La tendance (la dynamique de progression)
- La saisonnalité (le motif se répercutant période après période)

Ne prend pas en compte les jours fériés

```
from sktime.forecasting.naive import ExponentialSmoothing

forecaster = ExponentialSmoothing(trend="add", seasonal="add")
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
from sktime.perforemance_metrics.forecasting import mean_absolute_error, mean_absolute_percentage_error, mean_absolute_scaled_error

MSE = mean_absolute_error(y_true=y_true, y_pred=y_pred)
MAPE = mean_absolute_percentage_error(y_true=y_true, y_pred=y_pred, symetric=False)
SMAPE = mean_absolute_percentage_error(y_true=y_true, y_pred=y_pred, symetric=True)
MASE = mean_absolute_scaled_error(y_true=y_true, y_pred=y_pred, y_train=y_train)
```

Mean absolute error, MAE

- Symmetric mean percentage error, SMAPE
- Mean absolute scaled error, MASE

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