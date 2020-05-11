
var div = document.getElementsByClassName("page")[0].getElementsByTagName("tbody")[0]
let tmp = div.firstChild.nextSibling;

for(let i = 0; tmp ;tmp = tmp.nextSibling.nextSibling, i++) {
    console.log(tmp);
    console.log(i%2);
    if(i%2 == 0) 
        tmp.className = "alt";
}

var dropfun = function(event) {
    event.preventDefault();
    console.log(event.type);
    // console.log(event.dataTransferItemList.length);
    if(event.dataTransfer.items) {
    myEvent = event;
        var files = event.dataTransfer.items;
        for(let i = 0; i < files.length; i++) {
        console.log(files[i].webkitGetAsEntry());
        }        
    }
    if(event.dataTransfer.files) {
        console.log(files[0].length);
    }
    // event.stopPropagation();
}
div.addEventListener("drop",  dropfun );
div.addEventListener("dragover",  dropfun );
