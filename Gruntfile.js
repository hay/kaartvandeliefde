module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            before : ['dist/*', '.tmp'],
            after : [
                'dist/css/scss',
                'dist/js/*',
                '!dist/js/dist.js',
                'dist/lib/*',
                '!dist/lib/c3',
                '!dist/lib/leaflet',
                '.tmp'
            ]
        },

        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd : 'web',
                        src: '**',
                        dest: 'dist'
                    }
                ]
            }
        },

        uglify : {
            options : {
                mangle : false,
                compress : false
            }
        },

        useminPrepare: {
            html: ['web/index.php'],
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html : ['dist/index.php']
        },

        asset_cachebuster : {
            options : {
                buster : Date.now()
            },
            build : {
                files : {
                    'dist/index.php' : ['dist/index.php']
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:before',
        'copy:all',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin',
        'asset_cachebuster',
        'clean:after'
    ]);

    grunt.registerTask('default', ['build']);
};