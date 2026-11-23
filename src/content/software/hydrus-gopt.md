---
title: "Global Optimization (GOpt) module for HYDRUS"
summary: "Global optimization for the inverse estimation of HYDRUS model parameters."
kind: "HYDRUS module"
order: 1
tags: ["HYDRUS", "Inverse modeling", "Optimization"]
homepage: "https://www.pc-progress.com/en/Default.aspx?hydrus-module-GOpt"
papers: ["Brunetti2022"]
---

The GOpt module brings global optimization to parameter estimation in HYDRUS. Local gradient-based methods can get stuck in local minima when the objective function is multimodal or the parameters are strongly correlated. GOpt explores the whole parameter space to find a better calibration.

The method builds on the hybrid global–local strategy described in *Balancing exploitation and exploration* (Environmental Modelling & Software, 2022). That strategy combines a global search with local refinement to calibrate hydrological models efficiently.
