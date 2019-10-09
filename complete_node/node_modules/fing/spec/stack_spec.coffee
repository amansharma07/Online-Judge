should = require 'should'
Stack  = require '../lib/stack'
require '../lib/fing'

describe 'Stack', -> 

    it 'provides optional access to the process stack', (done) ->

        Stack.trace.should.be.an.instanceof Function
        done()


    it 'generates a stack array when called', (done) ->

        Stack.trace().should.be.an.instanceof Array
        done()


    it 'provides access to the made call', (done) ->

        #
        # mocha made the call
        #
        Stack.trace()[0].call.should.equal 'Context.<anonymous>'
        done()


    it 'provides the script filename where the call was made', (done) ->

        Stack.trace()[0].file.should.match /stack_spec\.coffee$/
        done()


    it 'privides line number', (done) -> 

        Stack.trace()[0].line.should.equal 28 # !36 (the only downside of coffee-script)
        done()


    it 'provides column number', (done) ->
        Stack.trace()[0].col.should.equal 13
        done()

