console.log("JS loaded");
const bubbleContainer = document.getElementById("bubble-container");

const emotionTree = {
  root: ["Throw the stress away."],

  // LEVEL 1 → LEVEL 2

  "Throw the stress away.": [
    "It’s about something important.",
    "It’s about how I see myself."
  ],

  // ================= PATH A =================
  // IMPORTANT EVENT

  "It’s about something important.": [
    "An upcoming performance.",
    "Someone’s expectations.",
    "A conversation I’m nervous about."
  ],

  // --- Performance Branch

  "An upcoming performance.": [
    "I might freeze.",
    "I might embarrass myself.",
    "I might not perform perfectly."
  ],

  "I might freeze.": [
    "They’ll judge me.",
    "It proves I’m incapable."
  ],

  "They’ll judge me.": {
    final: true,
    insight: "Fear of judgment amplifies mistakes.",
    deeper: "But most people are preoccupied with themselves.",
    reframe: "Perception is louder in your mind than in reality."
  },

  "It proves I’m incapable.": {
    final: true,
    insight: "Capability isn’t measured in one moment.",
    deeper: "Stress interrupts flow, not intelligence.",
    reframe: "One pause does not erase your preparation."
  },

  "I might embarrass myself.": [
    "People will remember it.",
    "It will define me."
  ],

  "People will remember it.": {
    final: true,
    insight: "Embarrassment feels permanent.",
    deeper: "But memory fades quickly for others.",
    reframe: "Moments shrink with time."
  },

  "It will define me.": {
    final: true,
    insight: "Identity feels fragile under pressure.",
    deeper: "But identity is built over patterns, not incidents.",
    reframe: "One event cannot rewrite who you are."
  },

  "I might not perform perfectly.": [
    "Perfection is expected.",
    "Mistakes aren’t allowed."
  ],

  "Perfection is expected.": {
    final: true,
    insight: "Perfection is often self-imposed.",
    deeper: "Growth requires imperfection.",
    reframe: "Progress beats perfection."
  },

  "Mistakes aren’t allowed.": {
    final: true,
    insight: "That belief creates paralysis.",
    deeper: "Mistakes are data, not disasters.",
    reframe: "Improvement lives inside errors."
  },

  // --- Expectations Branch

  "Someone’s expectations.": [
    "I don’t want to disappoint them.",
    "They believe I’m better than I am.",
    "They expect consistency."
  ],

  "I don’t want to disappoint them.": [
    "Disappointment feels like rejection.",
    "I need their approval."
  ],

  "Disappointment feels like rejection.": {
    final: true,
    insight: "You link approval to connection.",
    deeper: "But connection survives imperfection.",
    reframe: "Respect isn’t conditional on flawlessness."
  },

  "I need their approval.": {
    final: true,
    insight: "External validation feels stabilizing.",
    deeper: "But self-trust builds deeper security.",
    reframe: "Approval is optional. Self-belief isn’t."
  },

  "They believe I’m better than I am.": [
    "I’m afraid they’ll see flaws.",
    "I feel like an imposter."
  ],

  "I’m afraid they’ll see flaws.": {
    final: true,
    insight: "Vulnerability feels risky.",
    deeper: "But authenticity builds stronger bonds.",
    reframe: "Flaws make you human, not fraudulent."
  },

  "I feel like an imposter.": {
    final: true,
    insight: "Imposter syndrome appears during growth.",
    deeper: "It signals expansion, not incompetence.",
    reframe: "You’re stretching — not faking."
  },

  // ================= PATH B =================
  // SELF-PERCEPTION

  "It’s about how I see myself.": [
    "I feel behind.",
    "I compare constantly.",
    "I overthink everything."
  ],

  "I feel behind.": [
    "Career-wise.",
    "Life milestones.",
    "Financially."
  ],

  "Career-wise.": [
    "Others are ahead.",
    "I chose wrong."
  ],

  "Others are ahead.": {
    final: true,
    insight: "You’re measuring speed.",
    deeper: "But life isn’t synchronized.",
    reframe: "Different timelines. Different growth."
  },

  "I chose wrong.": {
    final: true,
    insight: "Doubt appears during uncertainty.",
    deeper: "But paths evolve.",
    reframe: "Adjustment isn’t failure."
  },

  "I compare constantly.": [
    "Social media triggers it.",
    "Friends’ success triggers it."
  ],

  "Social media triggers it.": {
    final: true,
    insight: "Online life is curated.",
    deeper: "Comparison ignores context.",
    reframe: "Highlights are not full stories."
  },

  "Friends’ success triggers it.": {
    final: true,
    insight: "Success feels competitive.",
    deeper: "But growth isn’t zero-sum.",
    reframe: "Their win doesn’t reduce yours."
  },

  "I overthink everything.": [
    "I replay conversations.",
    "I predict worst outcomes."
  ],

  "I replay conversations.": {
    final: true,
    insight: "Replaying feels like control.",
    deeper: "But it keeps you stuck.",
    reframe: "Reflection helps. Rumination traps."
  },

  "I predict worst outcomes.": {
    final: true,
    insight: "Your brain predicts to protect.",
    deeper: "Fear exaggerates probability.",
    reframe: "Preparation works. Catastrophizing doesn’t."
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