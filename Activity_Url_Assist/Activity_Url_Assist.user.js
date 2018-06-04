// ==UserScript==
// @name         Activity_Url_Assist
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        *://test.go.easy-hi.com/*
// @match        *://app.go.easy-hi.com/*
// @match        *://appn.go.easy-hi.com/*
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @resource https://github.com/raiyeeeric/RaiyeeTools/raw/master/Activity_Url_Assist/index.css
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("#activity-btn{z-index:100000000;position:fixed;top:0;right:0;min-width:100px;opacity:.5;background-color:#000;overflow:hidden;width:130px;box-sizing:border-box}");
    GM_addStyle(".activity-line-btn{height:30px;text-align:center;line-height:30px;border:1px solid red;border-radius:5px;color:red;width:120px;margin:5px}");
    $('body').append('<div id="activity-btn"></div>')
    $('#activity-btn').append('<div id="createActivityUrl" class="activity-line-btn">自动生成链接</div>')
    $('#activity-btn').append('<div id="convertUrl" class="activity-line-btn">手动生成链接</div>')
    $('#activity-btn').append('<div id="decodeUrl" class="activity-line-btn">提取正常链接</div>')
    jQuery(document).ready(
        function() {
            $('#activity-btn').mousedown(
                function(event) {
                    var isMove = true;
                    var abs_x = event.pageX - $('#activity-btn').offset().left;
                    var abs_y = event.pageY - $('#activity-btn').offset().top;
                    $(document).mousemove(function(event) {
                        if (isMove) {
                            var obj = $('#activity-btn');
                            obj.css({
                                'left': event.pageX - abs_x,
                                'top': event.pageY - abs_y
                            });
                        }
                    }).mouseup(
                        function() {
                            isMove = false;
                        }
                    )
                }
            );
        }
    );
    function resolveUrl(url){
        if(url.indexOf('route=')>=0) return url
        const urlArr = url.split('#')
        const preArr = urlArr[0].split('center')
        let str = ''
        str += preArr[0] + 'oauth/center' + preArr[1] + '?route=' + urlArr[1]
        return str
    }
    $('#createActivityUrl').click(()=>{
        alert(resolveUrl(location.href))
    })
    function urlParam(search,param) {
        const a = new RegExp('(\\?|&)' + param + '=([^&\\?]*)').exec(search)
        if (!a) return ''
        return RegExp.$2
    }
    $('#convertUrl').click(()=>{
        let oldUrl = prompt("请将微信中复制的地址粘贴到这里：")
        oldUrl = oldUrl.replace('visionAutoAuthc','oauth')
        if(oldUrl.indexOf('redirect_uri')>=0){
            let search = oldUrl.split('?')[1].split('#')[0]
            realUrl = decodeURIComponent(urlParam(search, 'redirect_uri'))
        }else {
            realUrl = oldUrl
        }
        alert(resolveUrl(realUrl))
    })
    $('#decodeUrl').click(()=>{
        let oldUrl = prompt("请将带oauth的粘贴到这里：")
        oldUrl = oldUrl.replace('visionAutoAuthc','oauth')
        if(oldUrl.indexOf('redirect_uri')>=0){
            let search = oldUrl.split('?')[1].split('#')[0]
            realUrl = decodeURIComponent(urlParam(search, 'redirect_uri'))
        }else {
            realUrl = oldUrl
        }
        let result = resolveUrl(realUrl).replace('oauth/','')
        result = result.split('?')[0]+'#' + urlParam('?'+result.split('?')[1],'route')
        alert(result)
    })

    // Your code here...
})();
