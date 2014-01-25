---
layout: post
title:  "Coolness of IntelliJ"
date:   2014-01-25 00:10
location:   "2014-01-25-Coolness-IntelliJ.markdown" 
---
#### Shelve changes 
If you are using svn, the changelist feature can provide some utility, but it is nothing compared to the `git stash`. If you are using IntelliJ and svn, but want the `stash` like feature, you are in luck. IntelliJ has a feature under it's VCS Menu item, named 'Shelve changes'. Here is the link to the details: http://www.jetbrains.com/idea/webhelp/shelving-and-unshelving-changes.html

#### Smart joining of lines 
Have you ever had a situation where you wanted to join a line of code with the line above. For e.g.,
{% highlight java %}
if (!Strings.isNullOrEmpty(reference.getUserName())
    && reference.getUserName().equalsIgnoreCase(userName)) {
{% endhighlight %}
Press `Ctrl Shift J` while your cursor is on the line where the merge will result.
