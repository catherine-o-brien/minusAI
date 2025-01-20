let aiRemovalCount = 0;

function createCounterBox() {
  // Create AI removal counter
  if (!document.getElementById("ai-removal-counter")) {
    const aiRemovalCountBox = document.createElement("div");
    aiRemovalCountBox.id = "ai-removal-counter";
    aiRemovalCountBox.style.position = "fixed";
    aiRemovalCountBox.style.bottom = "50px";  // Offset from bottom
    aiRemovalCountBox.style.right = "10px";
    aiRemovalCountBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    aiRemovalCountBox.style.color = "#fff";
    aiRemovalCountBox.style.padding = "10px 20px";
    aiRemovalCountBox.style.borderRadius = "5px";
    aiRemovalCountBox.style.zIndex = "9999";
    aiRemovalCountBox.style.fontSize = "14px";
    aiRemovalCountBox.style.fontFamily = "Arial, sans-serif";
    aiRemovalCountBox.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
    document.body.appendChild(aiRemovalCountBox);

    // Create carbon emissions counter
    const carbonEmissionsCountBox = document.createElement("div");
    carbonEmissionsCountBox.id = "carbon-emissions-counter";
    carbonEmissionsCountBox.style.position = "fixed";
    carbonEmissionsCountBox.style.bottom = "10px";  // Keep this at the bottom
    carbonEmissionsCountBox.style.right = "10px";
    carbonEmissionsCountBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    carbonEmissionsCountBox.style.color = "#fff";
    carbonEmissionsCountBox.style.padding = "10px 20px";
    carbonEmissionsCountBox.style.borderRadius = "5px";
    carbonEmissionsCountBox.style.zIndex = "9999";
    carbonEmissionsCountBox.style.fontSize = "14px";
    carbonEmissionsCountBox.style.fontFamily = "Arial, sans-serif";
    carbonEmissionsCountBox.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
    document.body.appendChild(carbonEmissionsCountBox);

    updateCounterBox();
  }
}

function updateCounterBox() {
  const aiRemovalCountBox = document.getElementById("ai-removal-counter");
  if (aiRemovalCountBox) {
    chrome.storage.local.get("aiRemovalCount", (data) => {
      aiRemovalCount = data.aiRemovalCount || 0;
      aiRemovalCountBox.textContent = `AI results removed: ${aiRemovalCount}`;
    });
  }

  const carbonEmissionsCountBox = document.getElementById("carbon-emissions-counter");
  if (carbonEmissionsCountBox) {
    chrome.storage.local.get("aiRemovalCount", (data) => {
      carbonEmissionsCount = aiRemovalCount * 0.5 / 1000 || 0;
      carbonEmissionsCountBox.textContent = `Carbon emissions saved: ${carbonEmissionsCount} kg`;
    });
  }
}

// Initialize the counter box on script load
createCounterBox();

// Update the counter box when the storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.aiRemovalCount) {
    updateCounterBox();
  }
});
