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
  const next = emotionTree[text];

  if (!next) return;

  if (next.final) {
    showFinalInsight(next);
  } else {
    currentState = text;
    renderState(currentState);
  }
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