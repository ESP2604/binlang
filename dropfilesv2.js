class MyUploadItem {
    constructor(folder) {
        this.folder = folder;
        this.dirArray = [];
        this.fileArray = [];
        this.fileEntryArray = [];

        this.filesTotalCount = 0;
        this.filesuploadtotalcount = 0;
        this.fileSize = 0;
        this.addProcess();
    }
    addFileEntry(fileEntry) {
        this.fileEntryArray.push(fileEntry);
        fileEntryToFile(fileEntry,this);
    }
    addFile(file) {
        this.fileArray.push(file);
        this.fileSize += file.size;
        this.process.setAttribute("max", this.fileSize);

    }
    setFilesUploadTotalSize(size){
        this.filesuploadtotalcount = size;
        this.process.setAttribute("value", size);
    }
    addFilesUploadTotalSize(size){
        this.filesuploadtotalcount += size;
        this.process.setAttribute("value", this.filesuploadtotalcount);
    }
    getFilesUploadTotalSize(){
        return this.filesuploadtotalcount;
    }

    popFileEntry() {
        return this.fileEntryArray.pop();
    }
    addProcess() {
        div = fileUploadProcess(this.folder);
        this.process = div.firstElementChild.nextElementSibling;
        this.process.setAttribute("value", 0);
    }
    upload() {
        let a = this.fileArray.pop();
        let b =  this.fileEntryArray.pop();
        helloFile(this.fileArray.pop(), this.fileEntryArray.pop(), this); 
        // fileEntryToFile(this);
        // myUploadItem.upload(this);
    }
}

var uploadstatu = document.querySelector("div.upload_statu");
var upload = document.querySelector("table.page");


/**
 * 加入進度條
 * {FileEntry}
 */
function fileUploadProcess(entry) {
    let div = document.createElement("div")
    let span = document.createElement("span");
    let progress = document.createElement("progress");
    span.textContent = entry.name;
    div.appendChild(span)
    div.appendChild(progress);
    uploadstatu.appendChild(div);
    return div;
}

/**
 * 遍壢資料夾
 * @param {DirectoryEntry} dir 
 */
function scanFiles(dir, myUploadItem) {
    // entries.length = entries.length最大只有100
    
    //超過100要在遍壢一次 直到為0為止
    let directoryReader = dir.createReader();
    let read = directoryReader.readEntries.bind(directoryReader,
        function(entries) {
            if(entries.length == 0) 
                return;
            for(let i = 0; i < entries.length; i++) {
                let entry = entries[i];
                if(entry.isFile) {
                    myUploadItem.addFileEntry(entry);
                }else {
                    //資料夾
                    scanFiles(entry,myUploadItem);
                }
            }
        read();
    });
    read();
} 
/**
 * 檔案和目錄判斷
 * @param {DataTransferItemList} files 
 */
function fileForEach(files) {
   if(files== null) 
    return;

    for(let i = 0; i < files.length; i++) {
        var tmp = files[i].webkitGetAsEntry();
        myUploadItem= new MyUploadItem(tmp);
        if(tmp.isDirectory) {
            scanFiles(tmp, myUploadItem);
        }else{
            console.log(tmp);
            myUploadItem.addFileEntry(tmp);
        }
    }
    setTimeout(function(){
        myUploadItem.upload();
    } ,1000);
}
/**
 * 拖拉事件
 * @param {*} event 
 */
var dropfun = function(event) {
    //取消預設行為
    event.preventDefault();
    // console.log(event.type);
    if(event.dataTransfer.items) {
        var files = event.dataTransfer.items;
        fileForEach(files);
    }
}

upload.addEventListener("drop",  dropfun);
upload.addEventListener("dragover",function dragover(event) {
    event.preventDefault();
});


/**
 * 檔案準備好會在這 
 * @param {*} fileEntry 
 */
function fileEntryToFile(fileEntry ,myUploadItem) {
    // 閉包
    function a(fileEntry,myUploadItem)  {
        return function (file) {
            myUploadItem.addFile(file);
            // helloFile(file, fileEntry, myUploadItem)
        }
    }
    // console.log(fileEntry);
    fileEntry.file(a(fileEntry, myUploadItem), fail);

    function fail(error) {
        alert("Unable to retrieve file properties: " + error.code);
    }
}
function helloFile(file, fileEntry, myUploadItem) {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();

    let partlen = 1024 * 1024 * 10;
    let parts = parseInt(file.size/partlen);
    parts = file.size % partlen > 0 ? parts+1: parts;
    let oMyBlob = new Blob([parts], {type : 'hello/file'});
    // let oMyBlob = new Blob([parts,",", partlen], {type : 'hello/file'});
    fd.append("files",oMyBlob, fileEntry.fullPath);
    checkFile(xhr,file,fileEntry,parts, partlen, myUploadItem);

    xhr.open("POST", "http://127.0.0.1:8443/Ajax/BinlangUpFileV2", true);
    xhr.send(fd);
}

//Interrupt resume
/**
 * 中斷續傳 client
 * @param {*} ajax 
 * @param {*} file      準備好的檔案或Blob
 * @param {*} fileEntry fileEntry 提供路徑和檔名
 * @param {*} parts     (檔案長度/緩衝)長度
 * @param {*} partlen   緩衝長度
 */
function checkFile(ajax ,file,fileEntry,parts, partlen, myUploadItem) {
    ajax.onreadystatechange = function() {
        switch(ajax.readyState){
            case 0:
                console.log("客戶端已被建立，但 open() 方法尚未被呼叫。");
                break;
            case 1:
                console.log("open() 方法已被呼叫。")
                break;
            case 2:
                console.log("send() 方法已被呼叫，而且可取得 header 與狀態。");
                break;
            case 3:
                console.log("回應資料下載中，此時 responseText 會擁有部分資料");
                break;
            case 4:
                console.log("完成下載操作。");
                console.log(ajax.responseText);

                if(ajax.responseText==="OK") {
                    console.log("沒上傳過");
                    uploadNext(file,fileEntry, 0, partlen, parts, myUploadItem);
                } else if(ajax.responseText == "DONE") {
                    console.log(fileEntry.name +": DONE");
                    myUploadItem.addFilesUploadTotalSize(tmp);
                    myUploadItem.upload();
                }else {
                    let i = parseInt(ajax.responseText)
                    if(i)
                        uploadNext(file,fileEntry, i, partlen, parts,myUploadItem);
                }
        }
    }
}

function uploadNext(file, fileEntry, mark, partlen, parts, myUploadItem) {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    //最後一段
    if(mark == parts -1) {
        blob = file.slice(mark * partlen)
        fd.append("files", blob, fileEntry.fullPath + "-" + mark);
        myUploadItem.addFilesUploadTotalSize(partlen*mark + blob.size);
    }else{
        fd.append("files", file.slice(mark*partlen, mark*partlen + partlen) , fileEntry.fullPath +"-"+mark);
        myUploadItem.addFilesUploadTotalSize(partlen * mark);
    }
    checkFile(xhr,file,fileEntry,parts, partlen, myUploadItem);
    xhr.open("POST", "http://127.0.0.1:8443/Ajax/BinlangUpFileV2", true);
    xhr.send(fd);
}