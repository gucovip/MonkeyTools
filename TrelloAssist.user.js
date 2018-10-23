// ==UserScript==
// @name         Trello Assist
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://trello.com/*
// @grant        GM_addStyle
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".trello-assist-small{width:200px !important;}")
    $(".list-wrapper").addClass('trello-assist-small')
})();
