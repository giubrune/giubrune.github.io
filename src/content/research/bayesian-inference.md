---
# TODO: review — draft written from the CV and publication list. Please check and rewrite freely.
title: Bayesian inference and model complexity
order: 3
summary: Using data to calibrate hydrological models honestly, so that their predictions come with a realistic measure of uncertainty.
tags: [bayesian]
keyQuestions:
  - How much information about soil hydraulic properties do our measurements actually contain?
  - Which Markov chain Monte Carlo samplers work best for inverse vadose zone modeling?
  - When is a more complex model justified by the data, and when is a simpler one better?
  - How can global and local optimization be combined to calibrate models efficiently?
---

Models of soil water and solute movement depend on parameters that are hard or impossible to measure directly. They have to be inferred from observations such as soil moisture, outflow or tracer concentrations. Bayesian inference does this in a principled way: instead of a single “best” set of parameters, it gives a range of plausible values and tells us how confident we can be in the model’s predictions.

## In more detail

This work studies the performance of Markov chain Monte Carlo ensemble samplers for inverse vadose zone modeling, and the information content of different data types, including soil water measurements and cosmic-ray neutron data, for estimating soil hydraulic properties.

Model complexity is a recurring theme: Bayesian model selection is used to decide how much process detail the data can support, for example in green roof hydrology and in nitrogen turnover in a controlled aquifer model. Related tools include hybrid global–local optimization strategies, global sensitivity analysis and surrogate-based modeling.

The Rita Levi Montalcini project develops a data-informed Bayesian probabilistic platform for the dynamic calibration of vadose zone hydrological models.
