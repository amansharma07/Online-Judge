knax
====

Dynamic Module Loader

### Current Verision

0.0.3

### Usage (local)

returns required './cars/fiat'

```coffee

Fiat = require('knax').load

    category: 'car'
    class: 'fiat'

```

Pending Functionality
---------------------

### local

First tries loading from `./category_plural/class_name` and fallsback to `node_modules/calling_module_name/lib/category_plural/class_name` to allow for userland overideability


### npm modules

Loads npm module require('module').ClassName


```coffee

#
# returns require('french-car-makers').Fiat
# 
# considering! - Installing the module if not installed to enable 
#                the merging of config distribution and runtime 
#                provisioning into one single action.
# 

Fiat = require('knax').load

    npm:     'french-car-makers'
    version: '3.14'
    class:   'fiat'

```