function speakAbout() {
  const text = document.getElementById("about-text").innerText;
  const msg = new SpeechSynthesisUtterance(text);

  // Try to select a male voice (not all browsers/devices support all voices)
  const voices = window.speechSynthesis.getVoices();
  const maleVoice = voices.find(voice =>
    voice.name.toLowerCase().includes('english') &&
    (voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('david') || voice.name.toLowerCase().includes('alex'))
  );

  if (maleVoice) {
    msg.voice = maleVoice;
  }

  msg.rate = 1; // speaking speed
  msg.pitch = 1; // voice pitch
  speechSynthesis.speak(msg);
}

// Preload voices
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
