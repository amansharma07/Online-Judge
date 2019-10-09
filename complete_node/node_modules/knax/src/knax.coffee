require 'fing'
i = require 'inflection'

module.exports = Knax =

    load: (definition) ->

        unless typeof definition.category == 'undefined'

            path   = '.'
            caller = fing.trace()[1]

            unless typeof caller == 'undefined'

                #
                # got caller, loading local plugin
                #

                path = require('path').dirname caller.file
                
                # console.log "PATH:", path


            directory = "#{path}/#{i.pluralize definition.category}"

            unless definition.class 

                throw 'local plugin requires category and class'

            try

                module = "#{directory}/#{definition.class}"
                return require module

            catch error

                if error.code == 'MODULE_NOT_FOUND'

                    return Knax.loadNested definition, error

                throw error


    loadNested: (definition, error) ->

        console.log 'TODO: loadNested'
        throw error
