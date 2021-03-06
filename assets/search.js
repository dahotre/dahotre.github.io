
var index;
var posts = [];
var search_elem = '#search';

var docTemplate = _.template(
	'<li id="<%= url %>" class="doc">' +
      	'<span class="doc_date"><%= date %></span>' +
      	' &raquo; ' +
      	'<a href="<%= url %>" class="doc_title"><%= title %></a>' +
    '</li>'
	);

$(document).ready(function () {

createIndex();
loadData();

$(search_elem).bind('keyup', function() {
	var query = $(this).val();
	console.log(query);
	if (query.length < 2) {
		return;
	}
	else {
		displayResults(getResults(query));
		$('#clear_search').show();
	}

});

$('#clear_search').click(function(e) {
	displayResults(posts);
	$(search_elem).val('');
	$(this).hide();
});

function displayResults(docs) {
	var li_s = [];
	_.each(docs, function(doc) {
		li_s.push(docTemplate(doc));
	});
	$('.posts').empty().append(li_s);
}

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

function createIndex() {
	index = lunr(function () {
	    this.field('title', {boost: 10})
	    this.field('content')
	    this.field('date')
	    this.ref('url')
  });	
}

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



});