let totalFileLength = 0, totalUploaded, fileCount=0, filesUploaded = 0;

function debug(s) {
    let debug = document.getElementById('debug');
    if(debug) {
        debug.innerHTML = debug.innerHTML + '<br/>' + s;
    }
}
function onUploadComplete(e) {
    fileCount =  document.getElementById("file").files.length;
    totalUploaded =  document.getElementById("file").files[filesUploaded].size;
    filesUploaded ++; 
    debug('complete '+ filesUploaded + " of " + fileCount);
    debug('totalUploaded: ' + totalUploaded);
    if(filesUploaded < fileCount)
        uploadNext();
}
function onFileSelect(e) {
    let files = document.getElementById("file").files;
    fileCount = files.length;
    for(let i = 0; i < fileCount; i++) {
        let file = files[i];
        // file.lastMondifiedDate.toLocaleDateString(),
        debug('add' + file.size);
        totalFileLength += file.size;
    }
    debug('tatalFileLength:' + totalFileLength);
}
function onUploadProgress(e) {
    if(e.lengthComputable) {
        let percentComplete = (parseInt(e.loaded + totalUploaded) * 100 / totalFileLength);
        let bar = document.getElementById('progress');
        bar.style.width = percentComplete + '%';
        bar.innerHTML = percentComplete + ' % complete';
    }
}

function uploadNext() {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    let file = document.getElementById('file').files[filesUploaded];
    fd.append('files',file);
    fd.append("path", "1");
    xhr.upload.addEventListener("progress", onUploadProgress, false);
    xhr.addEventListener("load", onUploadComplete, false);
    // xhr.addEventListener("error",)
    debug("uploading" + file.name);
    xhr.open("POST", "http://127.0.0.1:8080/Ajax/BinlangUpFile", true);
    xhr.send(fd);
}
function startUpload() {
    totalUploaded = filesUploaded = 0;
    uploadNext();
}

document.getElementById("file").onchange = onFileSelect;
document.getElementById("uploadButton").onclick = startUpload;
