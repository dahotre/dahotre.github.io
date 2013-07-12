---
layout: post
title:  "Full text search in Jekyll blog using Lunr.js"
date:   2013-07-12 00:10
location:   "2013-07-12-Full-textsearch-in-jekyll-using-lunr.markdown" 
---

#### What is [lunr.js](http://lunrjs.com)
Lunr.js is Javascript library that indexes content provided in JSON format. The index can be used to perform a full text search. How is that different from a simple 'grep'? It uses modern search techniques such as tokenization, stemming, omitting stop words, etc. Although the default algorithms for each of these techniques are provided by lunr.js, the user can override them to fit their specific needs. And of course, the name lunr, is just a play on [solr](https://lucene.apache.org/solr/), which is a full text search engine, but made for heavy duty tasks.

#### Other libraries used in the example:
1. jQuery _(optional)_
2. underscore.js _(optional)_

#### Why do I need to search blog created by Jekyll?
First, because there is no database while using Jekyll. Hence no queries. So searching is not straight forward. Second, because I have started to Jekyll, and I think a blog without search is weird.

#### Show me the code
You could just _View Source_ of this file and find all the code I'm using for this site in `search.js`. Here is the rundown:


