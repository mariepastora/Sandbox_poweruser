// Defining global var
var tab_url; 

// 
function getCurrentTab(callback){
    tab_url;
    chrome.tabs.query({active:true, currentWindow:true},function(tab){
        tab_url = tab[0].url
        get_page(tab_url)
        callback(tab[0].url);
    });
};

function displayTab(tab){
  console.log(tab_url)
  return tab
}

function get_page(url) {
  url_tab = url.split("/wiki/")[1]
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&titles=" + url_tab + "&format=xml", false);

  xhr.setRequestHeader('Content-Type', 'text/xml');
  xhr.send();

  xmlDocument = xhr.responseXML;
  console.log(xmlDocument);

  var created = document.getElementById('created');
  console.log(created)
  created.innerHTML = url_tab;

}

getCurrentTab(displayTab)

// GETTING THE INFO THROUGH  JSON 

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://xtools.wmflabs.org/api/page/prose/en.wikipedia.org/Albert_Einstein',
function(err, data) {
  if (err !== null) {
    console.log(err);
  } else {
    console.log(data);
  }
});


// GETTING INFO THROUGH HTTP REQUEST

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("1var").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://xtools.wmflabs.org/articleinfo/en.wikipedia.org/White_supremacy", true);
xhttp.send();

