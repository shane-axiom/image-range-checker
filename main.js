$(document).ready(function() {
  $("#url").keypress(function(e) {
    if(e.which == 13) {
      updateUrlParam();
      loadUrls();
    }       
  });

  updateUrlParam = function() {
    var url = URI(window.location.href);
    var params = url.search(true);
    params.u = encodeURIComponent($("#url").val());
    window.location.href = url.search(params).toString();
  };

  loadUrls = function() {
    var url = $("#url").val();
    var urls = buildUrls(url.split(/[\[\]]/));
    var $results = $("#results");
    $results.empty();
    for (var url of urls) {
      var $figure = $("<figure>");
      $figure.append($("<img>").prop("src", url));
      $figure.append($("<figcaption>").text(url));
      var $href = $("<a>").prop("href", url).prop("target", "_blank");
      $href.append($figure);
      $results.append($href);
    }
  };
  
  buildUrls = function(split) {
    var urls = [];
    if (split.length == 0) return [""];
    var cur = split.shift();
    if (/^(\d+)-(\d+)$/.test(cur)) {
      var rangeSplit = cur.split(/-/);
      for (var i = rangeSplit[0]; i <= rangeSplit[1]; i++) {
        for (var url of buildUrls(split.slice())) {
          urls.push(i + url);
        }
      }            
    } else {
      for (var url of buildUrls(split.slice())) {
        urls.push(cur + url);
      }
    }
    return urls;
  };

  var u = URI(window.location.href).query(true).u;
  if (u != undefined) {
    $("#url").val(decodeURIComponent(u));
    loadUrls();
  }
});
