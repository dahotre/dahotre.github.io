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

1.	Create an Index by providing the fields of the data to be indexed
		{% highlight javascript %}
		var index;
		createIndex();
		function createIndex() {
			index = lunr(function () {
			    this.field('title', {boost: 10})
			    this.field('content')
			    this.field('date')
			    this.ref('url')
		  });	
		}
		{% endhighlight %}

2.	Loading the data to be indexed: Being a Jekyll blog, there is no JSON data to represent the blog posts. So you have to store all your blog posts into the HTML on load. I know this is weird, but for blog with a few hundred pages of plain text should not slow down your load time much. Also, if you do not display all the blog posts at a time, it would be better to hide the loaded data using CSS. In the example below, I'm loading all blog data into `doc_*` elements, out of which the `.doc_content` tag is hidden by default.
		{% highlight javascript %}
		loadData();
		function loadData() {
			$('.doc').each(function(doc_index) {
				var doc = {};
				doc.date = $(this).find('.doc_date').text();
				doc.content = $(this).find('.doc_content').text();
				doc.title = $(this).find('.doc_title').text();
				doc.url = $(this).find('.doc_title').attr('href');

				index.add(doc);
				posts.push(doc);
			});
		}
		{% endhighlight %}

3.	Searching the index: Although searching the index is as easy as calling `index.search(query)`, the return object is not an `Array` of loaded documents. Instead it returns the `ref`, i.e., reference number of the indexed document along with the confidence level of a match. So we have to find the corresponding document from the list of loaded documents.
		{% highlight javascript %}

		function getResults(query) {
			var docs = [];
			var results = index.search(query);
			_.each(results, function(result) {
				console.log('Result ref: ' + result.ref);
				var doc = _.find(posts, function(post) {
					return post.url === result.ref;
				});
				if (doc) docs.push(doc);
				
			});
			return docs;
		}
		{% endhighlight %}

