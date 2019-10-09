child_process = require 'child_process'
hound         = require 'hound'

build = ->
    options = ['-c','-b', '-o', 'lib', 'src']
    builder = child_process.spawn './node_modules/.bin/coffee', options
    builder.stdout.pipe process.stdout
    builder.stderr.pipe process.stderr

runSpec = (fileOrFolder) ->
    test_runner = child_process.spawn './node_modules/.bin/mocha', [
        '--colors',
        '--compilers', 
        'coffee:coffee-script', 
        fileOrFolder
    ]
    test_runner.stdout.pipe process.stdout
    test_runner.stderr.pipe process.stderr

changed = (file) ->
    match = file.match /(src|spec)\/(.+)(_spec)?.coffee/
    spec_file = 'spec/' + match[2] + '_spec.coffee'
    spec_file = file if match[1] == 'spec'
    console.log 'Running: ', spec_file
    runSpec spec_file

watchSrcDir = ->
    console.log 'Watching ./src'
    watcher = hound.watch './src'
    watcher.on 'change', (file, stats) ->
        changed file
        build()

watchSpecDir = ->
    console.log 'Watching ./spec'
    watcher = hound.watch './spec'
    watcher.on 'change', (file, stats) ->
        changed file


task 'dev', 'Run dev/spec', ->
    watchSpecDir()
    watchSrcDir()


task 'spec', 'Run all tests', -> 
    runSpec './spec'


task 'build', 'Build', ->
    build()
