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

getJSON('https://api.wikiwho.net/en/api/v1.0.0-beta/rev_content/Dog/?o_rev_id=true&editor=true&token_id=true&out=true&in=true',
function(err, data) {
  if (err !== null) {
    console.log(err);
  } else {
    console.log(data.revisions[0]);
  }
});


// GETTING INFO THROUGH HTTP REQUEST AND SCRAPING

var doc;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       doc = xhttp.responseText
       console.log(doc)
       doc
       document.getElementById("1var").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://xtools.wmflabs.org/articleinfo/en.wikipedia.org/White_supremacy", true);
xhttp.send();
console.log(doc)


var xhr = new XMLHttpRequest();
xhr.onload = function() {
  table = this.responseXML.getElementsByClassName("top-editors-table")[0]
  for (i=0, this.responseXML.getElementsByClassName("top-editors-table")[0].getElementsByClassName("sort-entry--username"); i< 20; i++){
    console.log(this.responseXML.getElementsByClassName("top-editors-table")[0].getElementsByClassName("sort-entry--username")[i])
  }
  print(table)
}
xhr.open("GET", "https://xtools.wmflabs.org/articleinfo/en.wikipedia.org/White_supremacy");
xhr.responseType = "document";
xhr.send();

function HTMLinXHR() {
  if (!window.XMLHttpRequest)
    return false;
  var req = new window.XMLHttpRequest();
  req.open('GET', window.location.href, false);
  try {
    req.responseType = 'document';
  } catch(e) {
    return true;
  }
  return false;
}

