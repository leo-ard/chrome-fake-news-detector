'use strict';

console.log("popup")

function setState(state){
    if(state == "wait"){
        document.getElementById("text").innerHTML = "processing information...";
        document.getElementById("body").style.backgroundColor = "white";
        chrome.browserAction.setBadgeText({text : ""});
    }
    else if(state == "fake"){
        document.getElementById("text").innerHTML = "WARNING, this website is fake";
        document.getElementById("body").style.backgroundColor = "#ffc6c4";
        chrome.browserAction.setBadgeText({text : "FAKE"});
    }
    else if(state == "error"){
        document.getElementById("text").innerHTML = "This website is not a news website";
        document.getElementById("body").style.backgroundColor = "white";
        chrome.browserAction.setBadgeText({text : ""});
    }
    else if(state == "trust"){
        document.getElementById("text").innerHTML = "You can probably trust this website";
        document.getElementById("body").style.backgroundColor = "#90ee90";
        chrome.browserAction.setBadgeText({text : ""});
    }
}

setState("wait");

chrome.runtime.sendMessage("GET", res);
chrome.runtime.onMessage.addListener(res);


function res(response) {
    console.log("POPUP : " + response);
    setState(response.state)
}


/*
chrome.tabs.getSelected(null,function(tab) {
    document.getElementById("text").innerHTML = tab.url;
    

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function (s) {
        document.getElementById("text").innerHTML = this.responseText;
        
        //console.log(tablink);
       
    };
    

    xhr.send()
});*/
