module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			files: ['<app/javascripts/js/script/script.js']
		},
		coffee: {
			compile: {
				options: {
					bare: true,
					separator: ";"
				},
				files: {
					'app/javascripts/js/script.js': ['app/javascripts/coffeescript/*.coffee']
				}
			}
		},
		uglify: {
			options: {
				banner: '/* by <%= pkg.author %> at <%= grunt.template.today("dd-mm-yyyy") %> */',
				mangle: true,
				sourceMap: true,
				compress: {
					drop_console: true
				}
			},
			target: {
				files: {
					'app/javascripts/js/script.min.js': ['app/javascripts/js/script.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ['**/*.coffee'],
				tasks: ['coffeelint', 'clean', 'coffee', 'uglify'],
				options: {
					livereload: true
				},
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: 'app/',
					hostname: '127.0.0.1',
					keepalive: true
				}
			}
		},
		coffeelint: {
			app: ['app/javascripts/coffeescript/*.coffee']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-coffeelint');

	grunt.registerTask('s', ['connect']);
	grunt.registerTask('coffee-to-js', ['watch']);
};