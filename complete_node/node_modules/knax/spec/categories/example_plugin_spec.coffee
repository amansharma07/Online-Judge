require('nez').realize 'ExamplePlugin', (ExamplePlugin, test, context) -> 

    context 'in CONTEXT', (does) ->

        does 'an EXPECTATION', (done) ->

            test done
