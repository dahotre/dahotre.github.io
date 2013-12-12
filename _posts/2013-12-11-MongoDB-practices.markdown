---
layout: post
title:  "MongoDB practices"
date:   2013-12-11 14:10
location:   "2013-12-11-MongoDB-practices.markdown" 
---
Fact 1. : There is way too much criticism of MongoDB in several blog posts.
Fact 2. : Most of these criticisms have rebuttal posts.

I have used MongoDB in some small scale attempts and have found it satisfactory. And that is better than most other databases because I don't have to interact a lot with it. No schema changes. Not worrying much about adding some boilerplate code in the ORM (debatable). It always seems like the invisible force working behind the scenes. Isn't that the sole purpose of databases?

Here is some documentation of good practices that could be easily followed to avoid the pitfalls of MongoDB:

1. TLDR: Set write concern to 1 or `SAFE`, i.e., receive ack on failures.
Problem: The default is set to 0, i.e., not to send ACK if writes fail. This makes the writes super fast, but in most applications, it will be unacceptable if the write failed.
Detailed solution: All language drivers for MongoDB support this write concern setting. E.g., in Java here is the class [WriteConcern](http://api.mongodb.org/java/2.10.1/com/mongodb/WriteConcern.html). In Spring Data, this can be done while initializing the `MongoTemplate`.


2. TLDR: db.runCommand ( { repairDatabase: 1 } )
Problem: MongoDB does not release the disk storage to the OS, it used for storing a document, even after the document has been deleted. This is one of the reason for the overarching issue of MongoDB consuming more space than actually required for the data it stores.
Detailed solution: [MongoDB Docs](http://docs.mongodb.org/manual/reference/command/repairDatabase/#dbcmd.repairDatabase)

