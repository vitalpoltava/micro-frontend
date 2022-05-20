const cachedUrls = new Map();

function loadRemote(url) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      resolve()
    }
    const el = document.head.appendChild(script);

    if (cachedUrls.has(url)) {
      document.head.removeChild(cachedUrls.get(url))
      cachedUrls.delete(url)
    }

    cachedUrls.set(url, el);
  });
}

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    return factory();
  };
}

export const loadFederatedModule = (url, scope, module) => {
  return () => loadRemote(url).then(loadComponent(scope, module))
}
