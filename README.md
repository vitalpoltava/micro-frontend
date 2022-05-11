## Micro Frontends
### Implementing change of the manifest URL in a runtime

There is a problem that appears when implementing frontends for large scale projects -- we want the host app to utilize updates of remote components without rebuilding the host (in a runtime).

Here you can see an example of implementing a solution with injecting a `Promise` template into `webpack` config.
