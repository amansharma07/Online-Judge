require('nez').realize 'Knax', (Knax, test, can, should) -> 

    can 'load locally defined plugins by category', (done) ->

        plugin = Knax.load

            category: 'category'
            class: 'example_plugin'

        plugin.should.equal require '../lib/categories/example_plugin'
        test done
