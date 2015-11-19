module.exports = function (grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',

        requirejs: {
            compile: {
                options: {
                    uglify2: {
                        mangle: false
                    },
                    baseUrl: "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    name: "main", // assumes a production build using almond
                    out: "app/dist/main.js",
                    optimize: 'uglify2'
                }
            }
        }

    })


    grunt.loadNpmTasks('grunt-contrib-requirejs')

    grunt.registerTask('default', ['requirejs'])
}