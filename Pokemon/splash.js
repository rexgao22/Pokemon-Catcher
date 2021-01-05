function playOrPause() {
  var audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
    document.getElementById("playbtn").style.backgroundImage =
      "url(img/musicplaying.png)";
  } else if (audio.played) {
    audio.pause();
    document.getElementById("playbtn").style.backgroundImage =
      "url(img/musicpause.png)";
  }
}
