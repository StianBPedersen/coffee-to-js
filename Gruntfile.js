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
				tasks: ['clean', 'coffee', 'uglify'],
				options: {
					livereload: true
				},
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('coffee-to-js', ['watch']);
};