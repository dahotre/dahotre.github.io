---
layout: post
title:  "Creating a new cloud hosted Java website"
date:   2014-12-07 00:10
location:   "2014-12-07-Creating-new-cloud-hosted-Java-website.markdown" 
---
## Why Java
Because I do not find Java as repulsive as a lot of people who write blogs. I have been working with Java for a while. If one intends to be an expert in software/web programming then he should spend more time honing complex skills such as availability, data design, cross platform communication, logging, user interaction, continuous deployment, and analytics (see below for details). Unfortunately, you have to relearn few of these from scratch if you decide to use a new programming language. I have attempted to use Rails in a limited manner previously and was extremely happy with it. But I ended up taking a lot of shortcuts by trying to reuse too much code via RubyGems instead of taking the time to learn Ruby well. Ruby is an awesome language and using it in a half-ass manner is doing yourself more harm than good.
So, Java.

### Availability
In order to run a website for your 3 infrequent users or 1 million daily users, it has to be available for each and every minute of the day. If you have a server at home that runs all the time and a few other admin skills and resources, then a home server might be fine. Beginners can always use something like ngrok. It is meant for a different purpose, but can be used on a tiny scale for hosting a website. For everyone else, just host it on a cloud provider. Most of them will start with the 3 basic services: virtual machines (around 0.5-0.6 GB RAM, single core CPU), file storage (5GB), hosted database (RDBMS and key value store). These are the 3 things you will have to interact with the most. Then there are a lot of other services such as load balancing, queues, email service, etc. For my current project, I've decided to use Heroku. It provides a free tier with a restrictive virtualized hardware config. But it should be enough to get started. If I find it too restrictive for my use, I can change over to something else such as AWS with Elasticbeanstalk without much effort.

### Data design
This note will mainly focus on database system rather than data modeling. I'm planning to create a website (later, maybe a native app) to allow people to store events. Irrespective of the domain, most applications will require some users to interact, mostly after signing up. It is crucial to ensure that this data is secured and backed up. I have used RDMS and a few NoSQL databases with varying levels of involvement. I have had a difficult time to get the Spring Security working fluently before and have decided not to waste any time with it this time. But, I don't wish to spend much time designing user management from scratch either. So this time I have decided to give Parse.com a try. Parse core is nothing but a fancier JSON store. So, if I decide later that their system does not provide X in the future, I can swap it with another database system such as MongoDB. I understand that this might require significant effort. But I'm willing to take a chance this time. The main reason being the simplification of the data as well as UI level user management. More on the UI piece later. By choosing Parse, I'm leaving my data availability worries on the able shoulders of Facebook/Parse engineers.

### Cross platform communication
This section deals with communication of a client and your server using various browsers via HTML, native apps, or RESTful API via JSON. I have done the HTML and JSON part before using Spring MVC. It is simple and works reliably. Because most of the scenarios in a native app would require communicating using a RESTful backend, the Spring MVC backend should work out fine. There could be some scenarios where I might want to communicate with the DB layer directly. Parse gives that option with ease.

### Logging
The logging library question has been resolved in Java for good. Just use slf4j. Its API is rich and accepted everywhere. Maintain system logs is a different issue though. There are various services available for storing and processing your logs. While selecting look for the primary features such as:
  1. retention days (a couple days might be okay), 
  2. retention size (a few hundred MBs should be enough)
  3. passive/active log scanning
  4. and alerting (MOST IMPORTANT in my opinion).

I have used the free edition of Splunk and New Relic before. Splunk watches logs passively, whereas New Relic has to be deployed as part of your website's WAR file. Both free editions are restrictive but New Relic provides alerting and 1 day log retention. I haven't tried other open source log management tools yet. I will update this section if I do. For now, I'm planning to use PaperTrail. The free edition provides a mere 100MB log each month. It does have alerting support, unlike the free Splunk. 

### User interaction

### Continuous deployment
Do not ignore CD (or CI). Even though you might be a lone developer, having an efficient workflow will save much time in the long run. To keep things simple, you can download Jenkins on your machine and call it a day. To make things fancier and cloudy (err.. maybe cloud-sy), look for services such as Codeship. If you are building an OSS then Travis CI or Atlassian products could provide deep discounts too. AWS has (or is about to release) similar products too. I'm planning to use Codeship.io because I prefer to keep my work machine as light as possible. So if I have to work on a different machine for a few days, I can only worry about installing the bare minimum software.

### Analytics
