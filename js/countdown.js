// COUNTDOWN TIMER

const COUNTDOWN_DURATION_MS = 10 * 60 * 1000;
const COUNTDOWN_WARNING_THRESHOLD_MS = 60 * 1000;
let countdownIntervalId = null;
let countdownEndsAt = null;
let countdownRemainingMs = COUNTDOWN_DURATION_MS;
let countdownStartedAt = null;

function ensureCountdownElement() {
  let countdownElement = document.getElementById("countdown-timer");

  if (!countdownElement) {
    countdownElement = document.createElement("div");
    countdownElement.id = "countdown-timer";
    countdownElement.className = "countdown-timer countdown-timer-hidden";
    countdownElement.setAttribute("aria-live", "polite");
    document.body.appendChild(countdownElement);
  }

  return countdownElement;
}

function formatCountdown(ms) {
  const safeMs = Math.max(0, ms);

  if (safeMs === 0) {
    return "Temps écoulé";
  }

  const totalSeconds = Math.floor(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    "Temps restant : " +
    minutes +
    "min " +
    String(seconds).padStart(2, "0") +
    "sec"
  );
}

function renderCountdown(ms) {
  const countdownElement = ensureCountdownElement();
  const safeMs = Math.max(0, ms);

  countdownElement.textContent = formatCountdown(ms);
  countdownElement.classList.toggle(
    "countdown-timer-warning",
    safeMs <= COUNTDOWN_WARNING_THRESHOLD_MS,
  );
}

function setCountdownRecapState(isRecapVisible) {
  const countdownElement = ensureCountdownElement();
  countdownElement.classList.toggle("countdown-timer-recap", isRecapVisible);
}

function startCountdown() {
  const countdownElement = ensureCountdownElement();

  if (countdownIntervalId) {
    window.clearInterval(countdownIntervalId);
  }

  countdownRemainingMs = COUNTDOWN_DURATION_MS;
  countdownEndsAt = Date.now() + COUNTDOWN_DURATION_MS;
  countdownStartedAt = Date.now();
  countdownElement.classList.remove("countdown-timer-hidden");
  renderCountdown(countdownRemainingMs);

  countdownIntervalId = window.setInterval(function () {
    countdownRemainingMs = Math.max(0, countdownEndsAt - Date.now());
    renderCountdown(countdownRemainingMs);

    if (countdownRemainingMs === 0) {
      freezeCountdown();
    }
  }, 1000);
}

function freezeCountdown() {
  if (countdownIntervalId) {
    window.clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }

  if (countdownEndsAt !== null) {
    countdownRemainingMs = Math.max(0, countdownEndsAt - Date.now());
  }

  renderCountdown(countdownRemainingMs);
}
