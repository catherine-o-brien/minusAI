let aiRemovalCount = 0;

function createCounterBox() {
  if (!document.getElementById("ai-removal-counter")) {
    const box = document.createElement("div");
    box.id = "ai-removal-counter";
    box.style.position = "fixed";
    box.style.bottom = "10px";
    box.style.right = "10px";
    box.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    box.style.color = "#fff";
    box.style.padding = "10px 20px";
    box.style.borderRadius = "5px";
    box.style.zIndex = "9999";
    box.style.fontSize = "14px";
    box.style.fontFamily = "Arial, sans-serif";
    box.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
    document.body.appendChild(box);
    updateCounterBox();
  }
}

function updateCounterBox() {
  const box = document.getElementById("ai-removal-counter");
  if (box) {
    chrome.storage.local.get("aiRemovalCount", (data) => {
      aiRemovalCount = data.aiRemovalCount || 0;
      box.textContent = `Gen AI removed: ${aiRemovalCount}`;
    });
  }
}

// Initialize the counter box on script load
createCounterBox();

// Update the counter box when the page loads
chrome.storage.onChanged.addListener((changes) => {
  if (changes.aiRemovalCount) {
    updateCounterBox();
  }
});
