// ==UserScript==
// @name         DZDPGetMerchant
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  大众点评列表获取详情号码，仅供学习使用
// @author       You
// @match        *://**.dianping.com/search/**
// @require https://cdn.bootcss.com/jquery/2.1.3/jquery.min.js
// @grant       GM_addStyle
// @run-at       document-end
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    let localDzdp = localStorage.getItem('dzdp') || ''
    let page = $('.page').find('a.cur')[0] ? $('.page').find('a.cur')[0].innerText: '1'
    if(page === '1') localDzdp = ''
    if(page === '1'){
       const isStart = confirm('是否开始获取数据？')
       if(!isStart) return
       }
    $('[data-shopid][data-hippo-type="shop"]').each((index,item) => {
        let id = $(item).attr('data-shopid')
        getTel(id)
    })
    const resultArr = []
    let resultStr = ''
    function getTel(id){
        GM_xmlhttpRequest({
            method: 'get',
            url: 'http://www.dianping.com/shop/'+id,
            headers: {
                'user-agent': 'mozilla/4.0 (compatible) greasemonkey',
                'accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(responsedetails) {
                var tel = $(responsedetails.response).find('span[itemprop="tel"]')[0].innerText
                var shopName = $(responsedetails.response).find('h1.shop-name')[0].innerText
                var address = $(responsedetails.response).find('.expand-info.address')[0].innerText
                resultStr += ClearBr(replaceSpace(shopName)).replace('添加分店','')+'\t'
                resultStr += tel+'\t'
                resultStr += ClearBr(replaceSpace(address)).replace('地址：','')+'\n'
            }
        });
    }
    //去除空格
    function replaceSpace(key) {
        return key.replace(/\s+/g, "");
    }

    //去除换行
    function ClearBr(key) {
        key = key.replace(/<\/?.+?>/g,"");
        key = key.replace(/[\r\n]/g, "");
        return key;
    }
    setTimeout(()=>{
        console.log(resultStr);
        if(resultStr){
            localDzdp += resultStr
            localStorage.setItem('dzdp', localDzdp)
            if($('a.next[title="下一页"]')[0]){
                console.log($('a.next[title="下一页"]')[0])
                $('a.next[title="下一页"]')[0].click()
            }else{
                GM_setClipboard(localDzdp,{ type: 'text', mimetype: 'text/plain'})
                alert('已经放入剪切板')
            }
        }
    },5000)
})();
