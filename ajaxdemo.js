var ajax = new XMLHttpRequest();
ajax.addEventListener("load", function sucess(event) {
    console.log(ajax.responseText);
});
ajax.open("GET", 'data/data.json', true);
ajax.send();