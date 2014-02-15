---
layout: post
title:  "Java Notes"
date:   2013-07-10 18:10
location:   "2013-07-10-Java-Notes.markdown" 
---

#### Shift Operators
Used to double or halve an integer or double.
{% highlight java %}
short num = 0b0000_0100 << 1; // left operand is 4
// 0b00_01000, i.e., 8
{% endhighlight %}

#### Logical operators
Order of precedence is &(AND) , ^(XOR ..determines if operand bits or booleans are different. Returns 0 for match, and 1 for mismatch), |(OR)

#### Garbage Collection
{% highlight java %}
Geocode g1 = new Geocode(51, 110); // g1 refers to memory allocated to geocode object, say 5123-5153
g1 = new Geocode(50, 109); //Block 5123-5153 is not referred any more and ready for GC
{% endhighlight %}

#### Primitive Type vs Objects
{% highlight java %}
int a = 21;
int b = a; // Now JVM has 2 blocks in memory that contain the integer value 21
Geocode g1 = new Geocode(51, 110);
Geocode g2 = g1; // Now JVM has 1 block in memory that contain the object new Geocode(51,110)
{% endhighlight %}
If you want to Garbage Collect memory assigned to an object, then assign that object to null.

#### Variable length arguments
{% highlight java %}
private int max(int first, int... rest);
{% endhighlight %}
is same as
{% highlight java %}
private int max(int first, int[] rest);
{% endhighlight %}

#### synchronized
can be used to wrap a block of code or in the signature of a class/instance method. Doing this makes the stuff inside thread-safe. E.g., all methods within `HashTable` are synchronized.
Note: Use `ConcurrentHashMap` instead of `HashTable` if you need Thread-safety. `HashTable` are slower because it locks the entire table of data for any read/write operation. Whereas, `ConcurrentHashMap` has 32 locks, each managing some of the Hash buckets for the table.

#### Generic Methods
Generic methods allow type parameters to be used to express dependencies among the types of one or more arguments to a method and/or its return type. e.g., the error in the following method can be prevented by parameterizing it, i.e., making it generic.
{% highlight java %}
static void fromArrayToCollection(Object[] a, Collection< ? > c) {
    for (Object o : a) { 
        c.add(o); // compile-time error
    }
}
static < T > void fromArrayToCollection(T[] a, Collection< T > c) {
    for (T o : a) {
        c.add(o); // Correct
    }
}
{% endhighlight %}
If there is no dependency between the return type and/or the arguments of a method, then you are better off, using wildcards instead of generic method. [Excellent example](http://docs.oracle.com/javase/tutorial/extra/generics/methods.html)

#### Array vs ArrayList
`ArrayList` can hold a list of Objects, not primitives, whereas `Array` can hold either.
Size of an array cannot grow dynamically. ArrayList's size can.

#### WTH is Stack and Heap
Stack holds primitives. whereas Objects are allocated memory on the heap.
Stack being implemented using an actual Stack, follows LIFO, i.e., it has limited memory and the stuff put on the stack last, will be vacated if more space is required. Heap undergoes garbage collection.

#### finalize()
Any object can override Object's finalize() method for cleaning up any resources. This method is only triggered by the GC whenever it deems the object ready to be GCed.

#### == vs equals() for enum
Both are similar for enum, unlike for `String`. So it is better to use `==` to avoid `NullPointerException`

#### Basics of session management
`HttpSession` generates a cookie named `jsessionid` on the client's browser. You can store the identifier of the user's session in this cookie by `httpSession.setAttribute("userName", "Bob")`. The server maintains this session in-memory (or on disk, as per your server's policy) for it's life. The duration can be set by `httpSession.setMaxInactiveInterval(n)`. If the `n <= 0`, then the session is maintained for ever by the server. The important thing to understand is that this persistence is on the server, not the client. The `jsessionid` cookie is killed as soon as the user closes the browser. The practice of storing the session for ever on the server sounds bad, but in fact is even worse than bad. It's horrible. The `jsessionid` itself has some risks (attacker can steal the cookie), and remembering and honoring it's value for ever is dangerous. 

So how to let the user inside the secure area of your website, without having him to log in each time he closes the browser?
Here is a very [nice article from 2006](http://jaspan.com/improved_persistent_login_cookie_best_practice) that explains best practices: 
