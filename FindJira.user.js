// ==UserScript==
// @name         FindJira
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  选中jira号，按键盘 w 键即可, 按键盘 Q 键即可复制到剪切板 格式：【code title】
// @author       Cong
// @include      https://git.carzone365.com/*
// @include      https://xcz.yuque.com/*
// @include      http://jira.carzone365.com/*
// @require      https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @require      https://cdn.bootcss.com/layer/2.3/layer.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    function includeLinkStyle(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    includeLinkStyle("https://cdn.bootcss.com/layer/2.3/skin/layer.css");
    function getTitle(jiraCode, copyTag){
        GM_xmlhttpRequest({
            method: 'get',
            url: 'http://jira.carzone365.com/browse/'+jiraCode,
            headers: {
                'user-agent': 'mozilla/4.0 (compatible) greasemonkey',
                'accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(responsedetails) {
                var title = $(responsedetails.response).find('#summary-val')[0].innerText
                layer.msg(title)
                if(copyTag){
                    const message = `${jiraCode} ${title}`
                    GM_setClipboard(message, { type: 'text', mimetype: 'text/plain'})
                }
            }
        });
    }
    $(document).on('keydown', function(event){
        const selectedJiraCode = window.getSelection().toString();
        if(selectedJiraCode.indexOf('-')<0) return
        if(event.keyCode==87){
            getTitle(selectedJiraCode.trim())
        }
        if(event.keyCode==81){
            getTitle(selectedJiraCode.trim(), true)
        }
    })
})();
