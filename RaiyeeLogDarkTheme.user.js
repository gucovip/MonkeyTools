// ==UserScript==
// @name         RaiyeeLogDarkTheme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://devops.raiyee.cn:1000/
// @grant        GM_addStyle
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("._dark {color: green !important;background-color: black;}._dark table tr:first-child {background-color: #77ee7747;}._dark table td{border: 1px solid green;}._dark .tabs{background-color:black;}._dark *::selection{color:#ededed;background-color: #E1E100;}")
    $('html').addClass('_dark')
    // Your code here...
})();
