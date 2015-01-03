---
layout: post
title:  "Yet another aggregator"
date:   2015-01-01 23:10
location:   "2015-01-01-Yet-another-aggregator.markdown" 
---
## Background
I like Evernote. I like Postach.io. It has made me host a badass website called badassnordics.com with the least amount of trouble and 0 lines of code. But I have hit a wall with the service.

1. Changing the layout has become tedious. You need to fork their code on github and make necessary changes to the theme. This is not terrible. But I didn't signup for that.
2. Restricted only to Evernote (and Dropbox?). I repeat: I like Evernote. But sometimes, I'd rather use other 'save for later' tools such as Instapaper.
3. No preview.
4. I believe that I can do better with more integrations (my aim would be to get Evernote and Instapaper at the very least).

### Hard things
1. I do not have much knowledge about the workings of DNS resolving. So a parity with postach.io on that feature would be a difficult task. For now, instead of yourname.aggregatorname.com, I could provide, aggregatorname.com/yourname.
2. Will they come? I don't worry much about this. It will definitely scratch my itch.

### How do I wing it?
Two parts:

1. The admin section: You set up your integrations using Oauth or whichever scheme the original provider supports.

2. The blog/aggregator: The actual yourname.aggregatorname.com . I'm confident that people like responsive websites. But SEO is necessary for any blog too. I had tried using backbone.js a long time back (dahotre.herokuapp.com was written in backbone). But it was painful. I'm pretty sure I had botched the entire thing. Facebook's React.js seemed interesting, but it requires hacks for SEO. Instead of making a multiple page, server-side rendered HTML website that will be eventually converted to a single page app, I'll make a single page app from the get-go.

| Decision  | Options  |  Final |
|---|---|---|
| Programming language  | Javascript, Java  | Java  |
| Hosting  | Parse, Heroku, AWS   | AWS  |
| DB  | Parse, MongoDB, DynamoDB   | DynamoDB   |

