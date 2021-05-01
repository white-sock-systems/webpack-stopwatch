# webpack-stopwatch
Track the time you spend waiting for webpack!

![GitHub](https://img.shields.io/github/license/white-sock-systems/webpack-stopwatch?style=flat-square)
![npm](https://img.shields.io/npm/dy/webpack-stopwatch?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/webpack-stopwatch?style=flat-square)
![npm](https://img.shields.io/npm/v/webpack-stopwatch?style=flat-square)

## Motivation

You ever get the feeling that you spend HOURS each week waiting for builds? Well, if you are using webpack, this is just the little util for you to turn your suspicion into a depressing reality!

## Getting Started

### Install

`yarn add -D webpack-stopwatch`

### Configure
```
// webpack.config.js
plugins: [new SimpleStopwatchPlugin()],
```

### Options
| option | description | default
--- | --- | ---
| statsFolder |  where to keep the build time log | .stats
| quiet | if true silence console output | false
