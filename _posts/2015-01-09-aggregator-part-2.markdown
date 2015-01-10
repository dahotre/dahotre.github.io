---
layout: post
title:  "Aggregator: part 2"
date:   2015-01-09 23:10
location:   "2015-01-09-aggregator-part-2.markdown" 
---
## Background
I [wrote this](http://dahotre.github.io/2015/01/01/Yet-another-aggregator.html) a few days back. In whatever time I could spend since then, I'm almost done with a rough implementation of the first part–the dashboard to sign up and manage accounts. I'm using the word rough implementation liberally! But hey, it works.

As far as beginning the work on part 2, which is 75% of the project, I have been thinking about various ways to implementation. 

1. Serve the blog as a full-stack website. i.e., store each post in a DB table. For e.g., if a user creates a blog named 'grayskull', then a DB table entry such as the following will be stored:```
  {
    blogName: 'grayskull',
    postTitle: 'Prince Adams',
    postContent: '<article><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>',
    createdDate: '2015-01-10 22102301',
    postUrl: '20150110-prince-adams',
    providerName: 'EVERNOTE'
  }```
Whenver a browser requests for `http://aggregatorname.com/blogs/grayskull/20150110-prince-adams`, the post content will be served as a section within a HTML page. This HTML page will share its template with other pages in the blog. This can be done by storing the template file in another DB table. The home page of the blog, i.e., `http://aggregatorname.com/blogs/grayskull` will be served using the aggregation of the top `n` posts and whatever other elements the user would prefer to display using the customizable home page template. To make things more state-of-the-art, I should provide a easier blog name. Instead of `http://aggregatorname.com/blogs/grayskull` users would come to expect at least a `http://grayskull.aggregatorname.com`. This redirection can be provided using a web server redirection rule in the .htaccess file. [See this SO question](http://stackoverflow.com/questions/10642426/htaccess-rewrite-subdomain-to-directory "stack overflow QnA").
2. Serve the blog as static files hosted on a storage service. After reading [an article on the AWS website](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) this seems like an idea that has been done before. Applying the same use case from above, the blog post would now be stored in a HTML file named `20150110-prince-adams.html` in the bucket named `grayskull`. There is a little twist now. It is easy to make the blog available at `http://grayskull.com-s3-website-us-east-1-amazonaws.com`. Let me guess the number of people who would like that as their personal/professional blog domain – 0. How is Sonny going to tell his grandpa to visit his summer travel blog if it hosted at this ridiculously named domain. Grandpa won't like it. AWS Route 53 (or other DNS provider) to the rescue! This ridiculous sounding endpoint can be redirected to another domain by creating a `public hosted zone` and an `A Record`, e.g., `http://grayskull.com`. But, I won't own `grayskull.com`. I cannot force the users to use Route 53 to as their DNS provider either. Let's do a small compromise first. What if I provide the users a shorter URL `http://grayskull.aggregatorname.com`? That is the standard practice of all blogs (blogger, tumblr, medium, etc.). So it should be a fine first step. Can that be done using 53? A `public hosted zone` with the corresponding `A record set` is required for each of these endpoints. According to [the AWS Route 53 docs](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html) only 10,000 of these can be granted by default. More could be requested. Normally AWS has extremely relaxed thresholds. So, with my lack of knowledge about DNS basics, I will assume that 10,000 records is too much for normal websites. But, it should work fine for now. If I get more than 10,000 users, then I could look for better ways! An excellent problem to have. 😁 


### Pros and cons
1. In the first approach, the resources of the website, such as the server running the blog application, the database backing it, etc., becomes the single point of failure. If the DB connection is slow, all the users are screwed. If some user has too much traffic, all others share the same CPU and memory constraints. Although I do not have numbers to prove this, but my intuition is that static content such as blog posts would be cheaper (resource/cost-wise) in some other way than to be served via a dynamic web server. *Pros:* It would be easier to implement. Not necessarily simple.
2. This one is not easy. It could be simple. But will require some trial and error. The instructions I read were for using the AWS UI console. The API access shouldn't be too difficult, but things never work out 100% perfect when it comes to playing with XML. I haven't seen the Route 53 API, so I could be wrong about the simplicity. The upper limit of number of subdomains seems to be 10,000. Again, a risk mostly due to my lack of experience in the space. *Pros:* No need to maintain the blog servers. S3 will do the job orders of magnitude better. Traffic to one blog wouldn't affect traffic to the other ones adversely (maybe the DNS lookups for the A-record might be slow, if there is such a thing at all). 


### what the fuck we gon' do, huh?
![what the fuck we gon' do, huh?](http://i.crushable.com/wp-content/uploads/2014/01/jay-z-kanye-west.jpg)

I'm gon' open my horizons and try doing the second version. Going the route of Route 53 and s3.

