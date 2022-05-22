const cachedUrls = new Map();

function loadRemote(url) {
  if (cachedUrls.has(url)) {
    return cachedUrls.get(url);
  }

  const p$ = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      resolve()
    }
    document.head.appendChild(script);
  });

  cachedUrls.set(url, p$);
  return p$;
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
