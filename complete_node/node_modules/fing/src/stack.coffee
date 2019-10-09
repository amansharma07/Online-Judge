module.exports = Stack = 

    trace: -> 

        #
        # generate an error and marshal its stack into
        # this array:
        #

        stack = []

        #
        # first two calls in the stack are
        # Object.error and this.trace()
        #

        skip  = 2

        try

            for line in Error.apply(this).stack.split('\n')

                #
                # some of this may vary from node to node
                # mine at the time:
                # 
                # node --version
                #   v0.8.19
                #
                #

                continue if line == 'Error'
                continue if skip-- > 0

                parts    = line.match /^.*at (.*)\((.*)\)/
                location = parts[2].match /(.*)\:(.*)\:(.*)/
                
                stack.push 

                    call: parts[1].trim()
                    file: location[1]
                    line: parseInt location[2]
                    col:  parseInt location[3]


        catch error

            # hmm.


        return stack
