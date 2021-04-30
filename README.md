# webpack-stopwatch
Track the time you spend waiting for webpack!

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

## Motivation

You ever get the feeling that you spend HOURS each week waiting for builds? Well, if you are using webpack, this is just the little util for you to turn your suspicion into a depressing reality!

## Planned features
- webpack-stopwatch-report
- granular tracking
