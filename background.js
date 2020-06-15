// Copyright 2018he Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const blocked = ["facebook.com", "reddit.com", "netflix.com", "twitter.com"];
const target = 'https://set.target.in.background.js/to_change_this/to_your_prefered_page';

let block_expand = [];

for (let i = 0; i < blocked.length; i++) {
    block_expand.push("*://www." + blocked[i] + "/*", "*://" + blocked[i] + "/*")
}
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        for (let i = 0; i < blocked.length; i++) {
            if (details.url.search(blocked[i]) >= 0) {
                return {
                    redirectUrl: target
                };
            }
        }
    },

    {
        urls: block_expand
    }
    ,
    ["blocking"]
);
