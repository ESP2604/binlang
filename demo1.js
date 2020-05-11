var uploadstatu = document.querySelector("div.upload_statu");
var upload = document.querySelector("div.dropfile");

/**
 * 加入進度條
 * {FileEntry}
 */
function fileUploadProcess(entry) {
            let div = document.createElement("div");
            let span = document.createElement("span");
            let progress = document.createElement("progress");
            span.textContent = entry.name;
            div.appendChild(span)
            div.appendChild(progress);
           uploadstatu.appendChild(div);
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
                console.log(entry);
                
                scanFiles(entry);
                if(entry.isFile)
                    fileUploadProcess(entry);
                else {
                    //資料夾
                }
            }
    });
}

/**
 * 檔案和目錄判斷
 * @param {DataTransferItemList} files 
 */
function file(files) {
   if(files) 
        for(let i = 0; i < files.length; i++) {
            var tmp = files[i].webkitGetAsEntry();
            console.log(tmp);

            if(tmp.isDirectory) {
                scanFiles(tmp);
                console.log("資料夾名稱:" + tmp.name)
            }
            else{
                console.log(tmp);
                fileUploadProcess(tmp);
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
    console.log(event.type);
    if(event.dataTransfer.items) {
        var files = event.dataTransfer.items;
        console.log(files);
        file(files);
    }
}
upload.addEventListener("drop",  dropfun);
upload.addEventListener("dragover",function dragover(event) {
    event.preventDefault();
});

