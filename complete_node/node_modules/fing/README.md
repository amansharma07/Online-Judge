fing
====

Meta tools for Node/Javascript

Usage
-----

### By example

```coffee

coffee> require 'fing'



coffee> class Thing
[Function: Thing]
coffee> 
coffee> 
coffee> Thing.fing
{ type: 'prototype',    # <------------------ is a 'class' or function
  name: 'Thing',
  args: [],             # <------------------ constructor / function signature
  id: 1,                
  ref: 'prototype:Thing:1' }



coffee> thing1 = new Thing
{}
coffee> 
coffee> thing1.fing
{ type: 'instance',    # <------------------- an instance of a 'class'
  name: 'Thing',
  args: [],            # <------------------- constructor signature
  id: 2,               # <------------------- unique 
  ref: 'instance:Thing:2' }



coffee> thing2 = new Thing
{}
coffee> thing2.fing
{ type: 'instance',
  name: 'Thing',
  args: [],
  id: 3,                
  ref: 'instance:Thing:3' }  # <------------ unique reference



coffee> Thing.fing
{ type: 'prototype',
  name: 'Thing',
  args: [],
  id: 1,                # <--------------- Thing still has id 1
  ref: 'prototype:Thing:1' }



coffee> fn = (arg1,arg2) ->
[Function]
coffee> fn.fing
{ type: 'prototype',
  name: '',                                      # <---- anonymous function
  args: [ { name: 'arg1' }, { name: 'arg2' } ],  # <---- function arg signature
  id: 5,                                         # <---- unique id
  ref: 'prototype::5' }                          



coffee> test = -> fing.trace()
[Function]
coffee> test()
[ { call: 'test',
    file: 'evalmachine.<anonymous>',
    line: 4,
    col: 15 } ]
coffee> 


```

### Identity

The generated identity is only ensured unique for single threaded environments, eg. Nodejs


ChangeLog
---------

### 2013-03-27 v0.0.5

* Protected prototype override from multiple requires

### 2013-02-24 v0.0.4

* Added fing.trace()

### 2013-02-18 v0.0.3

* Added ano_ther underscode to __id
* Hid ___id away, as a non enumerating property

### 2013-02-09 v0.0.2

* Added <object|function/prototype>.fing.[type,name,args,id,ref]

### 2013-02-04 v0.0.1

* Added <function>.fing.args (= [{name:'arg1name'},{name:'arg2name'},...])
