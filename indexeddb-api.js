app.indexeddb = {};

document.addEventListener("DOMContentLoaded", function(){
  if("indexedDB" in window) {
    console.log("initialized:indexeddb");
  } else {
    console.log("failed:indexeddb");
  }
},false);