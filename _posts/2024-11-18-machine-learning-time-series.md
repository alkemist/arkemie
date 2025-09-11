---
title: "Machine Learning - Time series"
layout: post  
post-image: "/assets/images/ia/time.jpg"  
description: "Dans un problème de time series, on veux prédire en fonction des tendances saisonnières"  
categories:
  - Fiche
---

# Time series

Pour prédire sur un cycle (annuel par exemple), il faut au moins 3 cycles, 2 pour du test et 1 pour de la validation

## Analyse

``` 
from statsmodels.tsa.seasonal import seasonal_decompose

r = seasonal_decompose(df_train.set_index('ds'), period=period)

fig = r.plot()
fig.set_figwidth(12)
fig.set_figheight(8)
plt.tight_layout()

for ax in fig.get_axes():
    ax.set_xticks([])
```

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
# seasonal : tendance sur un cycle (12 mois / 52 semaines / 365 jours / ...)
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

## Prophet

```
from prophet import Prophet

forecast = Prophet(
    **params
)
```

### Entrainement et prédiction

``` 
forecaster.fit(df_train)

df_test_pred = forecaster.make_future_dataframe(
    periods=365, # 52, 12, ...
    freq='D', # 'W', 'M', 'Y'
    include_history=False
)

df_test_pred = forecaster.predict(df_test_pred)

y_test_pred = df_test_pred['yhat']
```

### Métriques

Forecast VS Actual
`result.backtest.plot()`

`SMAPE = result.backtest.test_evaluation['sMAPE']`

### Hyperparametres

``` 
from mango.tuner import Tuner
from scipy.stats import uniform

param_space = dict(
    yearly_seasonality = [True, False],
    weekly_seasonality = [True, False],
    daily_seasonality = [True, False],
    growth = ['linear', 'flat'], # , 'logistic' (nécessite un paramètre en plus)
    seasonality_mode = ['additive', 'multiplicative'],
    n_changepoints  = range(0, 55, 5),
    changepoint_range  = uniform(0.5, 0.5),
    seasonality_prior_scale=uniform(5.0, 15.0),
    changepoint_prior_scale=uniform(0.0, 0.1),
    interval_width = uniform(0.2, 0.8),
    uncertainty_samples = [500, 1000, 1500, 2000]
)

def objective_function(args_list):
    params_evaluated = []
    results = []

    for params in args_list:
        try:
            model = Prophet(**params)

            model.fit(df_train)

            prophet_future = model.make_future_dataframe(periods=period, freq=freq)

            for X_pred in X_preds:
                prophet_future[X_pred] = df_prophet[X_pred][-period:]

            forecast = model.predict(prophet_future)
            predictions_tuned = forecast.tail(period)
            error = mape(df_test['y'], predictions_tuned['yhat'])

            params_evaluated.append(params)
            results.append(error)
        except:
            #print(f"Exception raised for {params}")
            #pass
            params_evaluated.append(params)
            results.append(25.0)# Giving high loss for exceptions regions of spaces

        #print(params_evaluated, mse)
    return params_evaluated, results 
    
conf_Dict = dict()
conf_Dict['initial_random'] = 10
conf_Dict['num_iteration'] = 50

tuner = Tuner(param_space, objective_function, conf_Dict)
results = tuner.minimize()

print('best loss:', results['best_objective'])

print('best parameters:')
print('')

for parameter, value in results['best_params'].items():
    print(f"{parameter}= ",f"'{value}'" if isinstance(value,str) else value, ",")
    #print(f"'{parameter}': ",f"'{value}'" if isinstance(value,str) else value, ",")
```