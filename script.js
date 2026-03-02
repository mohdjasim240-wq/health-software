console.log("JS loaded");
const bubbleContainer = document.getElementById("bubble-container");

const emotionTree = {
  root: [
    "Big moment coming up?",
    "Feeling behind everyone?",
    "Can’t switch your brain off?"
  ],

  // ===== PERFORMANCE PATH =====

  "Big moment coming up?": [
    "Scared I’ll blank out?",
    "Too many expectations?",
    "What if I mess it up?"
  ],

  "Scared I’ll blank out?": [
    "Mind going empty?",
    "Heart racing?",
    "Forgetting everything I studied?"
  ],

  "Mind going empty?": [
    "Looking incapable?",
    "Letting someone down?"
  ],

  "Looking incapable?": {
    final: true,
    insight: "You’re not afraid of failing.",
    deeper: "You’re afraid of being judged.",
    reframe: "Judgment lasts minutes. Growth lasts years."
  },

  // ===== COMPARISON PATH =====

  "Feeling behind everyone?": [
    "Everyone seems ahead?",
    "Scrolling makes it worse?",
    "Comparing nonstop?"
  ],

  "Everyone seems ahead?": [
    "Career-wise?",
    "Life-wise?",
    "Financially?"
  ],

  "Career-wise?": [
    "Am I too late?",
    "Did I choose wrong?"
  ],

  "Am I too late?": {
    final: true,
    insight: "You’re not late.",
    deeper: "You’re just measuring yourself with someone else’s clock.",
    reframe: "Different timelines. Same potential."
  },

  // ===== OVERTHINKING PATH =====

  "Can’t switch your brain off?": [
    "Replay mode activated?",
    "What-if scenarios?",
    "Overanalyzing one sentence?"
  ],

  "Replay mode activated?": [
    "That awkward moment?",
    "Something I said?",
    "Something they said?"
  ],

  "That awkward moment?": [
    "Did I look stupid?",
    "Do they think differently of me now?"
  ],

  "Did I look stupid?": {
    final: true,
    insight: "Most people forgot that moment.",
    deeper: "Your brain just didn’t.",
    reframe: "Embarrassment fades. Memory exaggerates."
  }
};

let currentState = "root";

function createBubble(text, index, total) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;

  const spacing = 100 / (total + 1);
  bubble.style.top = "50%";
  bubble.style.left = `${spacing * (index + 1)}%`;
  bubble.style.transform = "translate(-50%, -50%)";

  bubble.addEventListener("click", () => handleBubbleClick(text));

  bubbleContainer.appendChild(bubble);
}

function renderState(state) {
  bubbleContainer.innerHTML = "";

  const options = emotionTree[state];
  if (!options || !Array.isArray(options)) return;

  const total = options.length;
    options.forEach((text, index) => {
    createBubble(text, index, total);
  });
}

function handleBubbleClick(text) {
  const next = emotionTree[text];

  if (!next) return;

  bubbleContainer.style.opacity = "0";
  setTimeout(() => {
    bubbleContainer.style.opacity = "1";

  if (next.final) {
    showFinalInsight(next);
  } else {
    currentState = text;
    renderState(currentState);
  }
}, 300);
}

function showFinalInsight(data) {
  bubbleContainer.innerHTML = "";

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left = "50%";
  bubble.style.top = "50%";
  bubble.style.transform = "translate(-50%, -50%)";
  bubble.style.maxWidth = "400px";
  bubble.style.textAlign = "center";

  bubble.innerHTML = `
    <div style="font-size:18px; margin-bottom:10px;">${data.insight}</div>
    <div style="opacity:0.8; margin-bottom:15px;">${data.deeper}</div>
    <div style="font-weight:600;">${data.reframe}</div>
  `;

  bubbleContainer.appendChild(bubble);
}

renderState(currentState);