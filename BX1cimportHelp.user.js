// ==UserScript==
// @name         BX1cimportHelp
// @namespace    http://bitrix.ru/
// @version      0.2
// @description  Помощник импорта xml файлов 1с
// @downloadURL  https://drive.google.com/file/d/1IhIF_XG8ZhhZ8hlNDwhjwP55vnBFAHq7/view?usp=sharing
// @author       Yury Smirnov
// @match        */bitrix/admin/*
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

addGlobalStyle('.BX1cimportHelp { position:fixed;bottom:40px;right:0px;font-size:24px;background:rgba(255,255,255,0.75);box-shadow: 0px 0px 5px black;padding:5px;border-radius:10px 0 0 0;z-index:99999999 }');
addGlobalStyle('.bx1cimport {position: absolute;margin: 0 auto;width:1000px;height:800px;display:none;padding: 5px;border-color: black;border-style: solid;z-index:999999999;top: 0;left: 0;background-color: white;}');
addGlobalStyle('.logimport {overflow: scroll;width: 600px;height: 600px;border-color: black;border-style: solid;}');
addGlobalStyle('.managepanel {padding-left: 10px;}');
addGlobalStyle('.managepanel>input {padding: 2px;margin: 2px;}');
addGlobalStyle('.bx1cimportclose{#position: absolute;bottom: 15px;right: 15px;}');

$(document).ready(function() {
    var icon1cDiv = document.createElement('div');
    icon1cDiv.className = 'BX1cimportHelp';
    icon1cDiv.textContent = '1c';
    document.body.append(icon1cDiv);

    var bx1cimport = document.createElement('div');
    bx1cimport.className = 'bx1cimport';
    document.body.append(bx1cimport);

    var logimport = document.createElement('div');
    logimport.className = 'logimport';
    bx1cimport.append(logimport);

    var managepanel = document.createElement('div');
    managepanel.className = 'managepanel';
    bx1cimport.append(managepanel);

    var bx1cimportclose = document.createElement('input');
    bx1cimportclose.className = 'bx1cimportclose';
    bx1cimportclose.type = 'button';
    bx1cimportclose.value= 'Закрыть';
    bx1cimport.append(bx1cimportclose);
    bx1cimportclose.onclick = function(){closeform();}

    managepanel.innerHTML+='<input type="text" id="domain" value="nowhost()"><label>Домен</label><br>';
    managepanel.innerHTML+='<input type="text" id="filename"><lable for="filename">Файл мпорта</lable><br>';

    var importbutton = document.createElement('input');
    importbutton.type = 'button';
    importbutton.value= 'Импорт';
    managepanel.append(importbutton);
    importbutton.onclick = function(){import1c();}

    function bxFormimport1c() {
            document.getElementsByClassName('bx1cimport')[0].style.display = 'flex';
        }

    function closeform() {
            document.getElementsByClassName('bx1cimport')[0].style.display = 'none';
        }

    document.getElementsByClassName('BX1cimportHelp')[0].addEventListener('click', function(event) {
                bxFormimport1c();});
    document.getElementById('domain').value=document.location.hostname;

 /* function query1c() {
                var login = '';//document.getElementById('login').value;
                var password = '';//document.getElementById('password').value;
                var filename = document.getElementById('filename').value;
                var log = document.getElementsByClassName('logimport')[0];
                var domain = document.getElementById('domain').value;
                alert(login + ' ' + password + ' ' + domain);
                log.innerHTML += "<b>Импорт " + filename + "</b><hr>";
                var import_1c = new XMLHttpRequest();
                var auth_1c = new XMLHttpRequest();
                let url = location.protocol+'//' + domain + '/bitrix/admin/1c_exchange.php?type=catalog&mode=checkauth';
                auth_1c.open('GET', url, [true, login, password]);
                auth_1c.send();
                auth_1c.onreadystatechange = function () {
                    if (auth_1c.readyState == 4 && auth_1c.status == 0) {
                        alert("Import is crashed!" + url);
                    }

                    if (auth_1c.readyState == 4 && auth_1c.status == 200) {
                        alert(auth_1c.responseText);
                        if ((auth_1c.responseText.substr(0, 8) != "progress") && (auth_1c.responseText.substr(0, 7) != "success") && (auth_1c.responseText.substr(0, 5) != "debug")) {
                            alert("error");
                        }

                        if (auth_1c.responseText.substr(0, 7) == "success") {
                            log.innerHTML += auth_1c.responseText;


                           params = 'type=catalog&mode=import&' + import_1c.responseText.substr(import_1c.responseText.indexOf('sessid', 0), 40)) + ;
                    import_1c.open("GET", document.location.protocol + '//' + document.location.hostname + '/bitrix/admin/1c_exchange.php?' + params, [true]);
                    import_1c.send();

                        }
                    }
                }
    }*/
    function importquery(url,login,pass) // Функция отправки запроса
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

           async function import1c() {
     var domain = document.getElementById('domain').value;
     var login = '';//document.getElementById('login').value;
     var password = '';//document.getElementById('password').value;
     var filename = document.getElementById('filename').value;
     var importurl='http://' + domain + '/bitrix/admin/1c_exchange.php?type=catalog&mode=checkauth';
     var log = document.getElementsByClassName('logimport')[0];
     var sessid1c;
     log.innerHTML += "Импорт файла" + filename + "<hr>";
     sessid1c=importquery(importurl,login,password);
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
         result = importquery(url, '', '');
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

})
