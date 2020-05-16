var uploadstatu = document.querySelector("div.upload_statu");
var upload = document.querySelector("table.page");

/**
 * 加入進度條
 * {FileEntry}
 */
function fileUploadProcess(entry, ajax) {
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
function scanFiles(dir) {
    if(dir.isFile)
        return;

    let directoryReader = dir.createReader();
    directoryReader.readEntries(
        function(entries) {
            for(let i = 0; i < entries.length; i++) {
                let entry = entries[i];
                // jsons.push(JSON.stringify({"fullPath":entry.fullPath,
                // "isDirectory":entry.isDirectory,
                // "isFile":entry.isFile,
                // "name":entry.name
                // }));
                if(entry.isFile) {
                    // fileUploadProcess(entry);
                    fileEntryToFile(entry); 
                }
                else {
                    //資料夾
                    scanFiles(entry);
                }
            }
    });
}
/**
 * 檔案和目錄判斷
 * @param {DataTransferItemList} files 
 */
function fileForEach(files) {
   if(files) 
        for(let i = 0; i < files.length; i++) {
            var tmp = files[i].webkitGetAsEntry();

            if(tmp.isDirectory) 
                scanFiles(tmp);
            else{
                fileEntryToFile(tmp); 
            }
        }
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
function initAjax(ajax, file) {
        let div = fileUploadProcess(file, ajax);

        ajax.upload.addEventListener("progress", progress);
        ajax.upload.addEventListener("loadstart", loadstart);
        ajax.upload.addEventListener("abort",test );
        ajax.upload.addEventListener("error", error);
        ajax.upload.addEventListener("load", load);
        ajax.upload.addEventListener("timeout", test);
        ajax.upload.addEventListener("loadend", test)

        function loadstart(event) {
            console.log("上船開始");
        }
         function load(event) {
            console.log("上載成功完成");
            div.remove();
        }
        function error(event) {
            console.log("上傳錯誤")
        }
        function test(event) {
            console.log(event)
        }
        function progress(event) {
            let loaded = event.loaded;
            let total  = event.total;
            let p = loaded / total;
            p = parseInt(parseInt(p*100) / 100 * 100);
            // console.log(p);
            let process = div.firstElementChild.nextElementSibling;
            process.setAttribute("max", 100);
            process.setAttribute("value", p);
            
        }
        ajax.onreadystatechange = function(event) {
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
                    break;

            }
                console.log(ajax.readyState );
        }
}

function uploadNext(file, fileEntry) {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open("POST", "http://127.0.0.1:8080/Ajax/BinlangUpFile", true);
    fd.append("files", file, fileEntry.fullPath);
    initAjax(xhr, fileEntry);
    xhr.send(fd);
}

function fileEntryToFile(fileEntry) {
    fileEntry.file(success, fail);

    function success(file) {
        uploadNext(file, fileEntry);
    }

    function fail(error) {
        alert("Unable to retrieve file properties: " + error.code);
    }
}