// ==UserScript==
// @name         JIRA2CommitMessage
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  try to take over the world!
// @author       You
// @match        http://jira.carzone365.com/browse/*
// @include     http://jira.carzone365.com/secure/RapidBoard.jspa*
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    $(document).on('click', '.aui-page-header-image', function(){
        const jiraCode = location.pathname.split('/')[2]
        const jiraTitle = $('#summary-val').text()
        const message = `${jiraCode} ${jiraTitle}`
        GM_setClipboard(message, { type: 'text', mimetype: 'text/plain'})
    })
    $(document).on('click', '.ghx-project-avatar', function() {
        const jiraCode = $('.ghx-group').find('.ghx-detail-list')[0].innerText
        const jiraTitle = $('.ghx-group').find('.ghx-detail-list')[1].innerText
        const message = `${jiraCode} ${jiraTitle}`
        GM_setClipboard(message, { type: 'text', mimetype: 'text/plain'})
    })
})();
