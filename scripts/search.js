console.log("search.js…");

var container = document.getElementById('articles-container');

var ref = [];

function Entry(title, date, categories, url) {
	this.title = title;
	this.date = date;
	this.categories = categories;
	this.url = url;
}

let entry

{% for post in site.posts %}
	entry = new Entry({{ post.title }}, {{ post.date }}, {{ post.categories }}, {{ post.url }} );
	ref.push( entry );
{% endfor %}

console.log(ref);


function chercher(tag){

}