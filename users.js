// Defining global var
var tab_url; 

// Getting currentTab
function getCurrentTab(callback){
    tab_url;
    chrome.tabs.query({active:true, currentWindow:true},function(tab){
        tab_url = tab[0].url
        get_page(tab_url)
        callback(tab[0].url);
    });
};

// Chained function because chrome.tabs.query is asynchronous
function displayTab(tab){
  console.log(tab_url)
  return tab
}

// Chained function too
// Actual code nested
function get_page(url) {

  // Retrieving url
  url_tab = url.split("/wiki/")[1]

  // Creating list of all user names + edits
  var all_user_names = []
  var number_edits = []

  // XHTML REQUEST
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    // Retrieving all usernames
    table = this.responseXML.getElementsByClassName("top-editors-table")[0]
    for (i=0, this.responseXML.getElementsByClassName("top-editors-table")[0].getElementsByClassName("sort-entry--username"); i< 20; i++){
        all_user_names.push(this.responseXML.getElementsByClassName("top-editors-table")[0].getElementsByClassName("sort-entry--username")[i].getAttribute("data-value"))
    }
    // Replacing them in HTML document
    document.getElementById("1var").innerHTML = all_user_names;
    }
  xhr.open("GET", "https://xtools.wmflabs.org/articleinfo/en.wikipedia.org/"+url_tab);
  xhr.responseType = "document";
  xhr.send();

  // Reading HTML attributes of page retrieved
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

}

// Calling main function - asynchronous won't be problematic
getCurrentTab(displayTab)


