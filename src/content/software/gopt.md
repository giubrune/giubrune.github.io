---
# TODO: review — purpose and description drafted from the related paper’s title.
name: Global Optimization module for HYDRUS
shortName: GOpt
order: 1
kind: hydrus-module
purpose: Calibrates HYDRUS models with a hybrid global–local optimization strategy.
paper: brunetti2022optimization
links:
  - label: Module page at PC-Progress
    url: https://www.pc-progress.com/en/Default.aspx?hydrus-module-GOpt
themes: [bayesian-inference]
---

Calibrating a vadose zone model means finding the parameter values that best reproduce the observations. Local, gradient-based methods are fast but can get stuck in a local optimum; global methods explore the whole parameter space but need many model runs. The GOpt module balances the two: it explores globally and then refines locally, making calibration of HYDRUS models more robust.
