// ==UserScript==
// @name         Sql_Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  点击登录，新开tab
// @author       You
// @match        http://sql.raiyee.cn:1000/home
// @run-at            document-end
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    $('.loginButton').off();
    $('.loginButton').click(function(){
        $.ajax({
            type: 'POST',
            url: contextPath + "/login",
            success: function (content, textStatus, request) {
                GM_openInTab(content.RedirectUrl,{active:true,insert:true})
                window.open(content.RedirectUrl);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\nStatus: " + textStatus + "\nError: " + errorThrown)
            }
        })
    })

    // Your code here...
})();
