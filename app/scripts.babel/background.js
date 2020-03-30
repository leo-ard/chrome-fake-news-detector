'use strict';

var req = new XMLHttpRequest();

var result = {state:"wait"}


function sendURL(url, callback){
  req.open("GET", "https://4ua127bd2e.execute-api.us-east-2.amazonaws.com/api/predict-url/?url=" + url);
  req.onload = ()=>callback(JSON.parse(req.responseText))
  req.send(null);
}

console.log("background HOHOHO")
//sendURL("https://www.google.com", console.log);

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener((message, sender, res) => {
  console.log("BACKGROUND : " + message);
  if(message === "GET"){
    res(result);
  }
})

function process(info) {
  console.log("updated")
  result = {state:"wait"};
  chrome.runtime.sendMessage({state:"wait"});
  
  chrome.tabs.get(info.tabId, (tab) =>{
    console.log("prout " + tab.url);
    sendURL(tab.url, (res) => {
      console.log(res)
      if(res.error == null || res.error == undefined){
        if(res.result == 1){
          result = {state:"fake", chance:res.chance}
        }
        else{
          result = {state:"trust"}
        }
      }
      else{
        result = {state:"error"}
      }
      chrome.runtime.sendMessage(result);
    });

  })

}



chrome.tabs.onActivated.addListener(process);
chrome.tabs.onUpdated.addListener((tabid, info, tab)=>{
  if(info.status == "complete"){
    process({tabId:tabid});
  }
});
