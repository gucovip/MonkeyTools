// ==UserScript==
// @name         JIRA2GitMessage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://jira.carzone365.com/browse/*
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    const jiraCode = location.pathname.split('/')[2]
    const jiraTitle = $('#summary-val').text()
    const message = `${jiraCode} ${jiraTitle}`
    $('.aui-page-header-image').on('dblclick', function(){
        GM_setClipboard(message, { type: 'text', mimetype: 'text/plain'})
    })
})();
