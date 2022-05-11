## Micro Frontends
### Implementing change of the manifest URL in a runtime

There is a problem that appears when implementing frontends for large scale projects -- we want the host app to utilize updates of remote components without rebuilding the host (in a runtime).

Here you can see an example of implementing a solution with injecting a `Promise` template into `webpack` config.

1) Do `yarn install` in `./hostapp`, `./remoteapp` and `./remoteapp1`,
2) Do `yarn build` in `./remoteapp` and `./remoteapp1`,
3) Do `yarn start` for `./hostapp`, `./remoteapp` and `./remoteapp1`,
4) In `hostapp/src/index.html` change the port (either "3001" or "3002") to have different versions of the `<Header />` component to be appeared on the `host`. Simple reload of the page will make the webpack to use the component from the different source (no extra deploy from host is needed).
