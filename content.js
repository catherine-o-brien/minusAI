let aiRemovalCount = 0;

function setupToggleButton() {
  const toggleButton = document.getElementById('toggle-button');
  const counterContainer = document.getElementById('counter-container');

  toggleButton.addEventListener('click', () => {
    counterContainer.classList.toggle('minimized');
    toggleButton.textContent = counterContainer.classList.contains('minimized') ? 'Maximize' : 'Minimize';
  });
}

function injectHTMLAndCSS() {
  // Create a container for the injected content
  const container = document.createElement("div");

  // Fetch and load the HTML content from the `index.html` file
  fetch(chrome.runtime.getURL('index.html'))
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
      document.body.appendChild(container);
      console.log('HTML injected');
      setupToggleButton(); // Set up the toggle button after HTML is injected
      updateCounterBox(); // Update the counters after HTML is injected
    })
    .catch(error => console.error('Failed to load HTML:', error));

  // Fetch and apply the CSS from `style.css`
  fetch(chrome.runtime.getURL('style.css'))
    .then(response => response.text())
    .then(data => {
      const style = document.createElement("style");
      style.textContent = data;
      document.head.appendChild(style);
    })
    .catch(error => console.error('Failed to load CSS:', error));
}

function updateCounterBox() {
  const aiRemovalCountBox = document.getElementById("ai-removal-counter");
  const carbonEmissionsCountBox = document.getElementById("carbon-emissions-counter");

  if (aiRemovalCountBox && carbonEmissionsCountBox) {
    chrome.storage.local.get("aiRemovalCount", (data) => {
      aiRemovalCount = data.aiRemovalCount || 0; // Use stored value or 0 if not found
      aiRemovalCountBox.textContent = `AI results removed: ${aiRemovalCount}`;

      const carbonEmissionsCount = aiRemovalCount * 0.5 / 1000 || 0; // in kg
      carbonEmissionsCountBox.textContent = `Carbon emissions saved: ${carbonEmissionsCount.toFixed(3)} kg`;
    });
  }
}

// Initialize the counter box on script load
injectHTMLAndCSS();

// Update the counter box when storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.aiRemovalCount) {
    updateCounterBox();
  }
});
