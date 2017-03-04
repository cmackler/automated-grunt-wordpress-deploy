'use strict';
module.exports = function(grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// watch for changes and trigger sass and livereload (install livereload extension on your browser)
		mysql: grunt.file.readJSON('site_settings.json'),
		timestamp: grunt.template.today('mm-dd-yyyy_HH-MM-ss'),

		watch: {
			options: {
			  livereload: true,
			},
			sass: {
				files: ['scss/*.scss'],
				tasks: ['sass']
			}
		},
		// sass - automatically compiles sass
		sass: {
			dist: {
				options: {
					// I like my css compressed. You can change this to 'expand' for easier to read css
					style: 'compressed',
				},
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},
		//rsync commands for pulling and pushing to local, staging and production websites
		rsync: {
			options: {
				args: ["--verbose"],
				//Be sure to exclude any files that pose a security risk if published, or simply
				//aren't needed for your site to function.
				exclude: [".git*", "site_settings", "node_modules", "Gruntfile.js", "package.json", ".sass-cache*", "main.css.map"],
				recursive: true
			},
			//Pushes wp-content from local to remote website
			push_wp: {
				options: {
					src: "../../",
					dest: "<%= mysql.remote.wpcontent_dir %>",
					host: "<%= mysql.remote.username %>@<%= mysql.remote.host %>",
					port: "<%= mysql.remote.port %>", //default SSH port is 22, some hosts move it
					dryRun: false, //To test the rsync operation before performing a real transfer, change this to true
					args: ["--links"],
					delete: false // Careful this option could cause data loss, read the docs!
				}
			},
			//Pushes theme from local to remote website
			push_theme: {
				options: {
					src: "./",
					dest: "<%= mysql.remote.theme_dir %>",
					host: "<%= mysql.remote.username %>@<%= mysql.remote.host %>",
					port: "<%= mysql.remote.port %>", //default SSH port is 22, some hosts move it
					dryRun: false, //To test the rsync operation before performing a real transfer, change this to true
					args: ["--links"],
					delete: false // Careful this option could cause data loss, read the docs!
				}
			},
			//Pulls wp-content from remote site
			pull: {
				options: {
					ssh: true,
					src: "<%= mysql.remote.username %>@<%= mysql.remote.host %>:<%= mysql.remote.wpcontent_dir %>",
					dest: "../../",
					port: "<%= mysql.remote.port %>", //default SSH port is 22, some hosts move it
					dryRun: false, //To test the rsync operation before performing a real transfer, change this to true
					args: ["--links"],
					delete: false // Careful this option could cause data loss, read the docs!
				}
			}
		},
		sshexec: {
			dump_remote_db: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.db_save_path %> && mysqldump <%= mysql.remote.dbname %> -u <%= mysql.remote.dbuser %> -p<%= mysql.remote.dbpass %> > remote.sql'
			},
			cleanup_remote: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.db_save_path %> && rm local_migrated.sql'
			},
			cleanup_remote_dump: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.db_save_path %> && rm remote.sql'
			},
			import_migrated_local_dump: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.db_save_path %> && mysql -u <%= mysql.remote.dbuser %> -p<%= mysql.remote.dbpass %> <%= mysql.remote.dbname %> < local_migrated.sql'
			},
			search_replace_remote: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.db_save_path %> && mysql -u <%= mysql.remote.dbuser %> -p<%= mysql.remote.dbpass %> <%= mysql.remote.dbname %> < local.sql'
			},
			download_wp: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && curl -O https://wordpress.org/latest.tar.gz && tar -xvzf latest.tar.gz'
			},
			cleanup_wp: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && mv wordpress/* . && rm -rf wordpress/ && rm latest.tar.gz'
			},
			create_db: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && echo "CREATE DATABASE <%= mysql.remote.dbname %>; GRANT ALL ON <%= mysql.remote.dbname %>.* TO <%= mysql.remote.dbuser %>@localhost; flush privileges;" | mysql -u <%= mysql.remote.username %> -p<%= mysql.remote.password %>'
			},
			create_wpconfig: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && cp wp-config-sample.php wp-config.php'
			},
			edit_secret: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && SECRETKEYS=$(curl -L https://api.wordpress.org/secret-key/1.1/salt/) && EXISTINGKEYS="put your unique phrase here" && printf "%s\n" "g/$EXISTINGKEYS/d" a "$SECRETKEYS" . w | ed -s wp-config.php'
			},
			edit_wpconfig: {
				options: {
					host: '<%= mysql.remote.host %>',
					username: '<%= mysql.remote.username %>',
					password: '<%= mysql.remote.password %>',
					port: '<%= mysql.remote.port %>'
				},
				command: 'cd <%= mysql.remote.root_dir %> && DBUSER=$"<%= mysql.remote.dbuser %>" && DBPASS=$"<%= mysql.remote.dbpass %>" && DBNAME=$"<%= mysql.remote.dbname %>" && sed -i -e "s/username_here/${DBUSER}/g" wp-config.php && sed -i -e "s/password_here/${DBPASS}/g" wp-config.php && sed -i -e "s/database_name_here/${DBNAME}/g" wp-config.php'
			}
		},
		exec: {
			wget_remote_dump: {
				command: 'wget -nv <%= mysql.remote.db_save_url %>/remote.sql'
			},
			import_migrated_remote_dump: {
				command: 'vagrant ssh -c "cd <%= mysql.local.db_dump_dir %> && mysql -u <%= mysql.local.dbuser %> -p<%= mysql.local.dbpass %> <%= mysql.local.dbname %> < remote_migrated.sql"'
			},
			cleanup_local: {
				command: 'rm -rf local.sql && rm -rf local_migrated.sql'
			},
			cleanup_local_from_remote: {
				command: 'rm -rf remote.sql remote.sql && rm -rf remote_migrated.sql'
			},
			dump_local_db: {
				command: 'vagrant ssh -c "mysqldump -u <%= mysql.local.dbuser %> -p<%= mysql.local.dbpass %> <%= mysql.local.dbname %> > <%= mysql.local.db_dump_dir %>local.sql"'
			},
			scp_local_dump: {
				command: 'scp -P <%= mysql.remote.port %> <%= mysql.local.db_local_dump_dir %>local_migrated.sql <%= mysql.remote.username %>@<%= mysql.remote.host %>:<%= mysql.remote.db_save_path %>'
			},
			search_replace_local: {
				command: 'sed "s/<%= mysql.remote.sr_remote %>/<%= mysql.local.sr_local %>/g" remote.sql > remote_migrated.sql'
			},
			search_replace_remote: {
				command: 'sed "s/<%= mysql.local.sr_local %>/<%= mysql.remote.sr_remote %>/g" local.sql > local_migrated.sql'
			},
			install_wp: {
				command: 'open <%= mysql.remote.site_url %>/wp-admin/install.php'
			}
		}
	});
	// register tasks, change names of default grunt commands. 
	grunt.registerTask('default', ['sass', 'watch']);
	grunt.registerTask('stage', ['rsync:stage']);
	grunt.registerTask('push_wp', ['rsync:push_wp']);
	grunt.registerTask('push_theme', ['rsync:push_theme']);
	grunt.registerTask('pull', ['rsync:pull']);
	grunt.registerTask('pull_db', [
	  'sshexec:dump_remote_db',             //dump remote database
	  'exec:wget_remote_dump',              //download remote dump
	  'sshexec:cleanup_remote_dump',        //delete remote dump
	  'exec:search_replace_local',			//search replace local
	  'exec:import_migrated_remote_dump',   //import the migrated database
	  'exec:cleanup_local_from_remote'      //delete local database dump files
	]);
	grunt.registerTask('push_db', [
	  'exec:dump_local_db',                 //dump local database
	  'exec:search_replace_remote',			//search replace remote
	  'exec:scp_local_dump',                //upload local dump
	  'exec:cleanup_local',                 //delete local database dump files
	  'sshexec:import_migrated_local_dump', //import the migrated database
	  'sshexec:cleanup_remote'              //delete remote database dump file
	]);
	grunt.registerTask('search_replace_local', ['exec:search_replace_local']);
	grunt.registerTask('create_wp', [
	  'sshexec:download_wp',				//Download latest WP install
	  'sshexec:cleanup_wp',					//Move and cleanup WP install
	  'sshexec:create_db',					//create wp database and set user privileges
	  'sshexec:create_wpconfig',				//create wp-config file
	  'sshexec:edit_secret',				//edit secret keys in wp-config
	  'sshexec:edit_wpconfig',				//edit db login in wp-config
	  'exec:install_wp'					//open browser and install wp
	]);
};