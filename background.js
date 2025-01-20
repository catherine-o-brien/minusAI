chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    const url = new URL(details.url);

    // Check for search engines
    const searchEngines = [
      { host: "www.google.com", queryParam: "q" },
      { host: "www.bing.com", queryParam: "q" },
      { host: "search.yahoo.com", queryParam: "p" },
      { host: "duckduckgo.com", queryParam: "q" },
      { host: "www.baidu.com", queryParam: "wd" },
      { host: "www.ecosia.org", queryParam: "q" },
    ];

    const engine = searchEngines.find((e) => e.host === url.hostname);
    if (engine) {
      const params = url.searchParams;
      const query = params.get(engine.queryParam);

      if (query && !query.includes("-ai")) {
        params.set(engine.queryParam, `${query} -ai`);
        const newUrl = url.origin + url.pathname + "?" + params.toString();

        // Increment the counter
        chrome.storage.local.get("aiRemovalCount", (data) => {
          const count = data.aiRemovalCount || 0;
          chrome.storage.local.set({ aiRemovalCount: count + 1 }); // Increment and store the new count
        });

        chrome.tabs.update(details.tabId, { url: newUrl });
      }
    }
  },
  {
    url: [
      { hostEquals: "www.google.com" },
      { hostEquals: "www.bing.com" },
      { hostEquals: "search.yahoo.com" },
      { hostEquals: "duckduckgo.com" },
      { hostEquals: "www.baidu.com" },
      { hostEquals: "www.ecosia.org" },
    ],
  }
);
