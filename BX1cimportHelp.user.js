// ==UserScript==
// @name         BX1cimportHelp
// @namespace    http://bitrix.ru/
// @version      0.3.1
// @description  Помощник импорта xml файлов 1с
// @downloadURL  https://github.com/iozhik1988/bx_1c_import_js/blob/main/BX1cimportHelp.user.js
// @author       Yury Smirnov
// @match        */bitrix/admin/*
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?dev\.1c-bitrix\.ru(:[0-9]{1,5})?\/.*$)/
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?www\.1c-bitrix\.ru(:[0-9]{1,5})?\/.*$)/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// #a5b557 зеленый цвет панели Битрикс
addGlobalStyle('.BX1cimportHelp { cursor: pointer;position:fixed;bottom:40px;right:0px;font-size:24px;width: 30px;height: 30px;background:hsl(0,0%,500%) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAFc0lEQVRoge2YX2xTdRTHv+fedq0OJmwkgkLE+GDISCRRSLeWeLvWNdsgCDp9ISZGlECIU3wgwQiNL0g0YgJqMEh8wRhroiOyZcu6VkbXintwCTwYBQkDCUY2HULL7f31+MA6773707txOzXez9s5v9/5nd+35/7+FXBwcHBwcHBwcHBwcHCYCJkd6VCIrQTWxeMTYq1wyu+fL3k86wgIgmgVmJeDaAEAgPl3EP0M5kEi6tVyuROBVOr6bPJMxZwJHohEluSF2APm5wDcbTHsJoBPWYj99cnkTzPJNxVlF9zR1ORZoKqvE7ATQOUM51ckD6J3R9zuvc2dnbdmOQYAQLqT4FIMKMqialXtJuANzF4sALjBvKtaVROnFWXxnczJ8mdprnypCqcaG1dKQnQAWDZJ8xCI2pn5BGT5QiUwBAA3gGWkaQ8yUQsBGwAsnST2YkGWW/zd3Weszl1PWQRnQqF7GfgOE8VeJqI3s5p2NJhMatPl42hUSp88+RQRvQ3gAVPzRQLW+OLxq1bnX4RKrdmiMKuCE4rivUuWexmoM2ai4yKb3TzTXfeU3z9f9nqPAVhvaGBOjXg8oZmuadvXsEeWd08Qy3zQFwhsnM0RE0ilrvvWrn0SRIcMDUT+alXdO9PxbK3wQCSyJK9pP0K/QREd9wUCGykaLej7phobV5IQWwCECVgOAAxcANDDsnzEvEY5GpUyfX1fwVhp1UW0YnVPz3krYgGbK5wXYg+Mu/Flkc1u1os929pakQ6F3peEGCSgjYDasZhKAmoJaJOE+D4dDh8829paUYyjaLRAFRWbGbiiG78iz7xrJnMseQ5brXBCUeZ5ZfkKgHlFHwNb6uPxj/Vi/xge7iSgwdLsmONVNTXNtbGYWnRlwuGXmPmwrteNnBCLg8nkn1aGtK3CHklaD51YAEOXqqs/0fcZHR4+YFksABCFRq9de0fvymraUQCXda5Kr8vVbHVI2wQTEDQ6qP2ZWEwUzVRj40oAW01hQ0T0tMjlqkQuV8XMmwj4wTTO9tPBYG3RHDvO2g1dmC3/iC6rHUtCtMpgFwodhubbG5Sscw2xy7WqrqtrWOf7sj8S+YY0bRB/XzpkQfQCbl9NAQASUUeBeXvRZnPuabBz03rQMDDROb1NwBMGm+jVeqNYAEB9V9cwM+80uQ2xQpIMY4PZkHs67BRcpTduCvGLqd1w69Ky2e4pJ+XxdBkcRIab1i1VvWQKucfqJO37pE248/lZvZcBwNfZOYpprr1jO/KsxrezwqN6w+31LjG1DxkSezxhG3Nbxk7BhttOgfkhvU1Ehk9YItrXH4lU25jfEvYJZh40mEQthkRCHAEwfkwx8DBp2mB/Q0NrpqnJsP7LiW1rmIh6GXhx3AY2JBTlleIzcE0icTYdDn8I5h26sKVE9DmrKtKhkF1TmRbbKpwV4msA+uvdUq/L9by+T9XCha+BOW5Xztlgm+CxnfMzg5M5esrvn180a2MxtaqmphnMB6H7vOcSW19LLMR+AHmd6z7Z6z3G0eh4ntpYTK3r7X1ZLhQeAfMBMJ+B8csoK7a9lsbjw+G3YH6yER3yBQJt5jfxP4Ht/3iMuN17AfQbnMw7Mn197XO5G0+F7YKbOztvEbAJwEVT0zpW1XOZUKgtoShlu+GVoiz/S/vi8asFWW7BRNGLGHjPK8sX0g0NH2SCweZ0OLwioSjzJhunHJTtl/Z3d58ZUJRH85L0BYgeNzXfD6JtTLQNzPDK8n/vHJ6Mx5LJ30Y8nggB+wCoJQPmgLIKBm6vaV88vttFtIKBjwDcKHfO6Si74CKre3rO18fjW3NCLAbRswQcBtG3AH7Fv6T6Dg4ODg4ODg4ODg4O/1/+AvwlEbSKvmPfAAAAAElFTkSuQmCC) no-repeat;background-size: 90% 90%;box-shadow: 0px 0px 5px black;padding:5px;border-radius:10px 0 0 0;z-index:999999 }.BX1cimportHelp:hover:after{white-space:nowrap;background:#333;background:rgba(0,0,0,.8);border-radius:5px;bottom:35px;color:#fff;content:attr(title);right:0%;padding:5px 15px;position:absolute;z-index:98;width:auto;font-size:12px}.BX1cimportHelp:hover:before{border:solid;border-color:#333 transparent;border-width:6px 6px 0 6px;bottom:29px;content:"";left:25%;position:absolute;z-index:99}');
addGlobalStyle('.bx1cimport {position: absolute;background-color: #f1f1f1;border: 1px solid #d3d3d3;/*text-align: center;*/margin: 0 auto;width:1000px;height:800px;top: 10%;left: 20%;display:none;padding: 5px;border-color: black;border-style: solid;z-index:999999999;background-color: white;}');
addGlobalStyle('.logimport {overflow: scroll;width: 600px;height: 750px;border-color: black;border-style: solid;}');
addGlobalStyle('.managepanel {padding-left: 10px;}');
addGlobalStyle('.managepanel>input {padding: 2px;margin: 2px 2px 12px;}');
addGlobalStyle('.managepanel>label {padding-left: 16px;}');
addGlobalStyle('.bx1cimportclose{#position: absolute;bottom: 15px;right: 15px;}');
addGlobalStyle('#divheader {padding: 12px 16px;cursor: move;z-index: 10;background-color: #2196F3;color: #fff;display: inline-block;width: 922px;height: 15px;}');
addGlobalStyle('.btn1 {background-color: #2196F3;border: none;color: white;padding: 12px 16px;font-size: 12px;cursor: pointer;}');
addGlobalStyle('.btn1:hover {background-color: RoyalBlue;}');
addGlobalStyle('.btn2 {background-color: #2196F3;border: none;color: white;padding: 12px 16px;font-size: 13px;cursor: pointer;}');
addGlobalStyle('.btn2:hover {background-color: RoyalBlue;}');

$(document).ready(function() {
    var icon1cDiv = document.createElement('div');
    icon1cDiv.className = 'BX1cimportHelp';
    icon1cDiv.title = 'Скрипт импорта xml 1C';
    icon1cDiv.textContent = '';
    document.body.append(icon1cDiv);

    var bx1cimport = document.createElement('div');
    bx1cimport.className = 'bx1cimport';
    document.body.append(bx1cimport);
    $('.bx1cimport').append('<div id="divheader">Скрипт отладки интеграции с 1C через xml</div>');
    $('.bx1cimport').append('<button class="btn1" id="closeform"><i class="fa fa-close"></i></button>');
    $('.bx1cimport').append('<div id="div1ccontent"style="display: flex">');
    var logimport = document.createElement('div');
    logimport.className = 'logimport';
    $('#div1ccontent').append(logimport);

    var managepanel = document.createElement('div');
    managepanel.className = 'managepanel';
    $('#div1ccontent').append(managepanel);

    //$('.bx1cimport').append('<button id="closeform" class="bx1cimportclose">Закрыть</button>');
    $('#closeform').bind( 'click', closeform );
    $('.managepanel').append('<hr><label><strong>Импорт xml товаров версии 2.09</strong></label></br></br>');
    managepanel.innerHTML+='<input type="text" id="domain" value="nowhost()"><label>Домен</label></br>';
    managepanel.innerHTML+='<input type="text" id="filename"><label for="filename">Файл импорта</label></br>';

    var importbutton = document.createElement('button');
    //importbutton.type = 'button';
    //importbutton.value= 'Импорт';
    importbutton.className= 'btn2';
    importbutton.textContent= 'Импорт';
    managepanel.append(importbutton);
    importbutton.onclick = function(){importprodxml1c();}
    $('.managepanel').append('<hr><label><strong>Получения xml заказов версии 3.1</strong></label><br><br><button class="btn2" id="getorder">Получить xml</button></br><hr>');
    $('#getorder').bind( 'click', getorderxml1c );
    $('.managepanel').append('</br><button class="btn2"  onclick="document.location=\'/bitrix/admin/fileman_admin.php?lang=ru&path=%2Fupload%2F1c_catalog\'">Управление структурой</button>');
    $('.managepanel').append('</br></br><button class="btn2"  onclick="document.location=\'/bitrix/admin/1c_admin.php?lang=ru\'">Настройки интеграции с 1С</button>');


    function bxFormimport1c() {
        if(document.getElementsByClassName('bx1cimport')[0].style.display !== 'block'){
            document.getElementsByClassName('bx1cimport')[0].style.display = 'block';
            dragElement(document.getElementsByClassName('bx1cimport')[0]);
        }
        else{
            document.getElementsByClassName('bx1cimport')[0].style.display = 'none'}
    }

    function closeform() {
        document.getElementsByClassName('bx1cimport')[0].style.display = 'none';
    }

    document.getElementsByClassName('BX1cimportHelp')[0].addEventListener('click', function(event) {
        bxFormimport1c();});
    document.getElementById('domain').value=document.location.hostname;

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById("divheader")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById("divheader").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    function query(url,login,pass) // Функция отправки запроса
    {
        var import_1c = new XMLHttpRequest();
        console.log(url+' '+login+' '+pass);
        import_1c.open('GET', url, false, login, pass);
        import_1c.onreadystatechange = function () {
            if (import_1c.readyState == 4 && import_1c.status == 0) {
                alert("Import is crashed!" + url);
            }
            if (import_1c.readyState == 4 && import_1c.status == 200) {
                console.log(import_1c.responseText);
                res=import_1c.responseText;
            }
        }
        import_1c.send(null);
        return res;
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function importprodxml1c() {
        //log.innerHTML ='';
        var domain = document.getElementById('domain').value;
        var login = '';//document.getElementById('login').value;
        var password = '';//document.getElementById('password').value;
        var filename = document.getElementById('filename').value;
        var importurl=location.protocol + '//'  + domain + '/bitrix/admin/1c_exchange.php?type=catalog&mode=checkauth';
        var log = document.getElementsByClassName('logimport')[0];
        var sessid1c;
        log.innerHTML += "Импорт файла" + filename + "<hr>";
        sessid1c=query(importurl,login,password);
        await sleep(1000);
        log.innerHTML += sessid1c+'<hr>';
        if ((sessid1c.substr(0, 8) != "progress") && (sessid1c.substr(0, 7) != "success") && (sessid1c.substr(0, 5) != "debug")) {
            alert("error"); return;
        }
        sessid1c=sessid1c.substr(sessid1c.indexOf('sessid', 0), 39);
        console.log(sessid1c);
        let status=true;
        while (status) {
            url = location.protocol+'//' + domain + '/bitrix/admin/1c_exchange.php?type=catalog&mode=import&' + sessid1c + '&filename=' + filename;
            result = query(url, '', '');
            await sleep(1000);
            log.innerHTML += result + '<hr>';
            console.log(result.substr(0, 8));
            if ((result.substr(0, 8) == "progress")||(result.substr(0, 7) == "success")) {
                console.log(result.indexOf("Импорт успешно завершен.", 0));
                if (result.indexOf("Импорт успешно завершен.", 0) !== -1) {
                    status = false;
                    console.log('end');
                }
            }
            else {alert("error"); return;}
        }

    }

    async function getorderxml1c() {
        //log.innerHTML ='';
        var domain = document.getElementById('domain').value;
        var login = '';//document.getElementById('login').value;
        var password = '';//document.getElementById('password').value;
        var url=location.protocol + '//'  + domain + '/bitrix/admin/1c_exchange.php?type=sale&mode=checkauth';
        var log = document.getElementsByClassName('logimport')[0];
        var sessid1c;
        log.innerHTML += "Получение xml заказа<hr>";
        sessid1c=query(url,login,password);
        await sleep(1000);
        log.innerHTML += sessid1c+'<hr>';
        if ((sessid1c.substr(0, 8) != "progress") && (sessid1c.substr(0, 7) != "success") && (sessid1c.substr(0, 5) != "debug")) {
            alert("error"); return;
        }
        sessid1c=sessid1c.substr(sessid1c.indexOf('sessid', 0), 39);
        console.log(sessid1c);

        url = location.protocol+'//' + domain + '/bitrix/admin/1c_exchange.php?type=sale&mode=init&' + sessid1c + '&version=3.1';
        console.log(url);
        result = query(url, '', '');
        await sleep(1000);
        log.innerHTML += result + '<hr>';
        console.log(result.substr(0, 8));
        if ((result.substr(0, 6) == "zip=no")||(result.substr(0, 7) == "zip=yes")) {
            log.innerHTML += result + '<hr>';
            log.innerHTML += "Инициализация успешна" + '<hr>';
            url = location.protocol+'//' + domain + '/bitrix/admin/1c_exchange.php?type=sale&mode=query&' + sessid1c + '&version=3.1';
            console.log(url);
            result = query(url, '', '');
            await sleep(1000);
            log.innerHTML += '<textarea style="width: 582px;height: 586px;">' + result + '</textarea><hr>';
        }
        return;
    }

}
                 )
