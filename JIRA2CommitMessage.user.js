// ==UserScript==
// @name         JIRA2CommitMessage
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  try to take over the world!
// @author       Cong, Ziyuan
// @match        http://jira.carzone365.com/browse/*
// @include      http://jira.carzone365.com/secure/RapidBoard.jspa*
// @require      https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    $(document.querySelector('#stalker > div > div > div > div > div.toolbar-split.toolbar-split-left')).append('<ul id="jira-helper" class="toolbar-group pluggable-ops"></ul>')
    $(document.querySelector('#jira-helper')).append('<li class="toolbar-item"><a id="copy-simple" class="toolbar-trigger issueaction-workflow-transition">复制(简单)</a></li>')
    $(document.querySelector('#jira-helper')).append('<li class="toolbar-item"><a id="copy-detailed" class="toolbar-trigger issueaction-workflow-transition">复制(详细)</a></li>')

    $('#copy-simple').on('click', function(){
        const jiraCode = $('.aui-nav.aui-nav-breadcrumbs').children(':last-child').text()
        GM_setClipboard(jiraCode, { type: 'text', mimetype: 'text/plain'})
    })
    $('#copy-detailed').on('click', function(){
        const jiraCode = $('.aui-nav.aui-nav-breadcrumbs').children(':last-child').text()
        const jiraTitle = $('#summary-val').text()
        GM_setClipboard(`${jiraCode} ${jiraTitle}`, { type: 'text', mimetype: 'text/plain'})
    })
})();
