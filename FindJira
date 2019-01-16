// ==UserScript==
// @name         FindJira
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @include        https://git.carzone365.com/*
// @include        https://xcz.yuque.com/*
// @include        http://jira.carzone365.com/*
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @require https://cdn.bootcss.com/tooltipster/3.3.0/js/jquery.tooltipster.min.js
// @reuqire https://cdn.bootcss.com/tooltipster/3.3.0/css/tooltipster.min.css
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    function getTitle(jiraCode){
        GM_xmlhttpRequest({
            method: 'get',
            url: 'http://jira.carzone365.com/browse/'+jiraCode,
            headers: {
                'user-agent': 'mozilla/4.0 (compatible) greasemonkey',
                'accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(responsedetails) {
                var title = $(responsedetails.response).find('#summary-val')[0].innerText
                alert(title)
            }
        });
    }
    $(document).on('keydown', function(event){
        const selectedJiraCode = window.getSelection().toString();
        if(selectedJiraCode.indexOf('-')<0) return
        if(event.altKey && event.keyCode==70){
            getTitle(selectedJiraCode.trim())
        }
    })
})();
