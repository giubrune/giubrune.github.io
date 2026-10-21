---
# TODO: review — purpose and description drafted from the related paper’s title.
name: COSMIC module for HYDRUS
shortName: COSMIC
order: 4
kind: hydrus-module
purpose: Simulates cosmic-ray neutron counts with HYDRUS-1D, so that neutron data can be used to estimate soil hydraulic properties.
paper: brunetti2019cosmic
links:
  - label: Module page at PC-Progress
    url: https://www.pc-progress.com/en/Default.aspx?h1d-lib-Cosmic
themes: [bayesian-inference, vadose-zone]
---

Cosmic-ray neutron sensors measure soil moisture non-invasively over an area of several hectares. The COSMIC module computes the neutron counts that a HYDRUS-1D simulation implies, so the measurements can be used directly in inverse modeling to estimate soil hydraulic properties.
