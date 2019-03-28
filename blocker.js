var selector = "div[id^='divB'], .jdn-pirsum, script[src='https://www.jdn.co.il/wp-content/plugins/jdn_ads/js/info.js']";
var query = document.querySelectorAll(selector);

query.forEach(function (element) {
  element.remove()
});

var frs = document.getElementsByTagName("iframe");

for (let fr of frs) {

  if (fr.src == "about:blank" && fr.attributes && fr.attributes["data-lazy-src"]) {

    var url = fr.attributes["data-lazy-src"].value;
    fr.attributes["data-lazy-src"].value = "about:blank";
    replaceToVideo(url, fr);

  } else {

    if (fr.src.startsWith("https://www.jdn.co.il/embed.php?vid")) {
      replaceToVideo(fr.src, fr);
    }

  }
}

function replaceToVideo(url, frame) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    var videoUrl = /var\s*url\s*=\s*"(.+)"/.exec(this.responseText)[1];
    var videoEl = document.createElement("video");
    videoEl.src = videoUrl;
    videoEl.controls = "controls";
    frame.outerHTML = videoEl.outerHTML;
  }

  xhr.send();
}
