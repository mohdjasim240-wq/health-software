const bubbleContainer = document.getElementById("bubble-container");

const emotionTree = {
  root: [
    "Big moment coming up?",
    "Feeling behind everyone?",
    "Can’t switch your brain off?"
  ],
  "Big moment coming up?": [
    "Scared I’ll blank out?",
    "Too many expectations?",
    "What if I mess it up?"
  ],
  "Feeling behind everyone?": [
    "Everyone seems ahead?",
    "Scrolling makes it worse?",
    "Comparing nonstop?"
  ],
  "Can’t switch your brain off?": [
    "Replay mode activated?",
    "What-if scenarios?",
    "Overanalyzing that one sentence?"
  ]
};

let currentState = "root";

function createBubble(text) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;

  bubble.style.top = Math.random() * 70 + "%";
  bubble.style.left = Math.random() * 70 + "%";

  bubble.addEventListener("click", () => handleBubbleClick(text));

  bubbleContainer.appendChild(bubble);
}

function renderState(state) {
  bubbleContainer.innerHTML = "";
  emotionTree[state].forEach(text => {
    createBubble(text);
  });
}

function handleBubbleClick(text) {
  if (emotionTree[text]) {
    currentState = text;
    renderState(currentState);
  }
}

renderState(currentState);