console.log("JS loaded");
const bubbleContainer = document.getElementById("bubble-container");

let currentState = "root";
let stateHistory = [];

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

  "They expect consistency.": [
  "If I slip once, they’ll doubt me.",
  "I always have to be reliable."
],

"If I slip once, they’ll doubt me.": {
  final: true,
  insight: "Consistency feels tied to credibility.",
  deeper: "But trust isn’t erased by one fluctuation.",
  reframe: "Reliability is built over patterns, not perfection."
},

"I always have to be reliable.": {
  final: true,
  insight: "Carrying responsibility feels heavy.",
  deeper: "But you’re allowed to have off days.",
  reframe: "Strength includes rest."
},

  "A conversation I’m nervous about.": [
  "I’m afraid I’ll say the wrong thing.",
  "I’m afraid of their reaction.",
  "I don’t know how to express myself."
],

"I’m afraid I’ll say the wrong thing.": [
  "I’ll sound stupid.",
  "I’ll hurt them accidentally."
],

"I’ll sound stupid.": {
  final: true,
  insight: "You equate awkwardness with incompetence.",
  deeper: "But real conversations aren’t scripted.",
  reframe: "Clarity matters more than smoothness."
},

"I’ll hurt them accidentally.": {
  final: true,
  insight: "You care about their feelings.",
  deeper: "That already makes you careful.",
  reframe: "Honesty delivered gently builds trust."
},

"I’m afraid of their reaction.": [
  "They might get angry.",
  "They might withdraw."
],

"They might get angry.": {
  final: true,
  insight: "Anger feels threatening.",
  deeper: "But disagreement doesn’t equal danger.",
  reframe: "Emotions rise — then settle."
},

"They might withdraw.": {
  final: true,
  insight: "Silence feels like rejection.",
  deeper: "But space doesn’t always mean distance.",
  reframe: "Healthy connections survive discomfort."
},

"I don’t know how to express myself.": [
  "I can’t find the right words.",
  "I’m afraid I’ll freeze."
],

"I can’t find the right words.": {
  final: true,
  insight: "You want precision.",
  deeper: "But connection doesn’t require perfection.",
  reframe: "Speak honestly — refine later."
},

"I’m afraid I’ll freeze.": {
  final: true,
  insight: "Freezing is stress, not weakness.",
  deeper: "Your body reacts before your thoughts.",
  reframe: "Pause. Breathe. Continue."
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
  "Life milestones.": [
  "Others are settling down.",
  "I feel late compared to peers."
],

"Others are settling down.": {
  final: true,
  insight: "Milestones look universal.",
  deeper: "But timing is deeply personal.",
  reframe: "Life isn’t a synchronized race."
},

"I feel late compared to peers.": {
  final: true,
  insight: "You’re comparing timelines.",
  deeper: "But progress isn’t uniform.",
  reframe: "Late according to who?"
},
"Financially.": [
  "Others earn more than me.",
  "I’m not where I thought I’d be."
],

"Others earn more than me.": {
  final: true,
  insight: "Income feels like a scoreboard.",
  deeper: "But financial journeys differ drastically.",
  reframe: "Security grows steadily, not instantly."
},

"I’m not where I thought I’d be.": {
  final: true,
  insight: "Expectations create pressure.",
  deeper: "Reality rarely follows early predictions.",
  reframe: "Adjustment is growth, not failure."
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
  if (!options) return;

  // ===== ROOT SPECIAL CASE =====
  if (state === "root") {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = "50%";
    bubble.style.top = "50%";
    bubble.style.transform = "translate(-50%, -50%) scale(1.2)";
    bubble.innerText = options[0];

    bubble.addEventListener("click", () => handleBubbleClick(options[0]));

    bubbleContainer.appendChild(bubble);
    return;
  }

  // ===== Progress Indicator =====
  const progress = document.createElement("div");
  progress.style.position = "absolute";
  progress.style.top = "20px";
  progress.style.left = "50%";
  progress.style.transform = "translateX(-50%)";
  progress.style.opacity = "0.5";
  progress.style.fontSize = "14px";
  progress.innerText = `Step ${stateHistory.length + 1} of 6`;
  bubbleContainer.appendChild(progress);

  if (stateHistory.length > 0) {
  const back = document.createElement("div");
  back.innerText = "← Back";
  back.style.position = "absolute";
  back.style.top = "20px";
  back.style.left = "20px";
  back.style.opacity = "0.5";
  back.style.cursor = "pointer";

  back.addEventListener("click", () => {
    currentState = stateHistory.pop();
    renderState(currentState);
  });

  bubbleContainer.appendChild(back);
}

  // ===== Render Options Evenly =====
  if (Array.isArray(options)) {
    const total = options.length;

    options.forEach((text, index) => {
      createBubble(text, index, total);
    });
  }
}

function handleBubbleClick(text) {
  const next = emotionTree[text];
  if (!next) return;

  stateHistory.push(currentState);

  bubbleContainer.style.opacity = "0";

  setTimeout(() => {
    bubbleContainer.style.opacity = "1";

    if (next.final) {
      currentState = text; // <-- important small fix
      showFinalInsight(next);
    } else {
      currentState = text;
      renderState(currentState);
    }
  }, 300);
}

function createScatterEffect(x, y) {
  const pieces = 15;

  for (let i = 0; i < pieces; i++) {
    const particle = document.createElement("div");
    particle.classList.add("scatter-piece");

    particle.style.left = x + "px";
    particle.style.top = y + "px";

    // Random spread direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 60;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    particle.style.setProperty("--x", moveX + "px");
    particle.style.setProperty("--y", moveY + "px");

    bubbleContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}

function showFinalInsight(data) {
  bubbleContainer.innerHTML = "";

  document.body.classList.add("calm-mode");

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  bubble.style.background = "rgba(255,255,255,0.12)";
  bubble.style.border = "1px solid rgba(255,255,255,0.25)";
  bubble.style.left = "50%";
  bubble.style.top = "50%";
  bubble.style.transform = "translate(-50%, -50%) scale(0.8)";
  bubble.style.maxWidth = "500px";
  bubble.style.textAlign = "center";
  bubble.style.padding = "30px";
  bubble.style.animation = "none";
  bubble.style.cursor = "grab";

  bubble.innerHTML = `
    <div style="font-size:18px; margin-bottom:12px;">
      ${data.insight}
    </div>

    <div class="breathing-circle"></div>

    <div style="opacity:0.8; margin-bottom:15px;">
      ${data.deeper}
    </div>

    <div style="font-weight:600;">
      ${data.reframe}
    </div>

    <div style="margin-top:15px; font-size:13px; opacity:0.6;">
      Drag this bubble to the edge to release it.
    </div>
  `;

  bubbleContainer.appendChild(bubble);

  // Pop-in animation
  setTimeout(() => {
    bubble.style.transition = "all 0.4s ease";
    bubble.style.transform = "translate(-50%, -50%) scale(1)";
  }, 50);

  // ===== Drag-to-Release Logic =====
  let isDragging = false;
  let offsetX, offsetY;

  bubble.addEventListener("mousedown", (e) => {
    isDragging = true;
    bubble.style.transition = "none";
    bubble.style.cursor = "grabbing";

    const rect = bubble.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    bubble.style.left = e.clientX - offsetX + "px";
    bubble.style.top = e.clientY - offsetY + "px";
    bubble.style.transform = "scale(1)";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    bubble.style.cursor = "grab";

    const rect = bubble.getBoundingClientRect();

    const nearEdge =
      rect.left < 60 ||
      rect.right > window.innerWidth - 60 ||
      rect.top < 60 ||
      rect.bottom > window.innerHeight - 60;

    if (nearEdge) {
     const rect = bubble.getBoundingClientRect();
     const centerX = rect.left + rect.width / 2;
     const centerY = rect.top + rect.height / 2;

// Create scatter burst
    createScatterEffect(centerX, centerY);

// Hide main bubble
     bubble.style.transition = "all 0.2s ease";
     bubble.style.opacity = "0";
     bubble.style.transform = "scale(0.2)";

      setTimeout(() => {
        stateHistory = [];
        currentState = "root";
        document.body.classList.remove("calm-mode");
        renderState("root");
      }, 600);
    } else {
      bubble.style.transition = "all 0.3s ease";
      bubble.style.left = "50%";
      bubble.style.top = "50%";
      bubble.style.transform = "translate(-50%, -50%) scale(1)";
    }
  });

  // Restart Button
  const restart = document.createElement("div");
  restart.innerText = "Start again";
  restart.classList.add("restart-button");

  restart.addEventListener("click", () => {
    stateHistory = [];
    currentState = "root";
    document.body.classList.remove("calm-mode");
    renderState("root");
  });

  bubbleContainer.appendChild(restart);
}



renderState("root");