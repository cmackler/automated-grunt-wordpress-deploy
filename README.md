# Automated WordPress Development and Deployment with Vagrant and Grunt
<p>I created this grunt package to automate my local WordPress development workflow. <strong>Please read through this carefully!</strong></p>

<p><strong>This was designed to run in a Mac environment.</strong></p> 

<p>This package allows you to:
<ul>
	<li>Automatically compile SASS/SCSS.</li>
	<li>Pull /wp-content folder from your remote development/production websites into your local environment to get up and running quickly.</li>
	<li>Push content from your local environment to your remote development/production websites.</li>
	<li>Automatically sync your WordPress Database from local to remote and remote to local.</li>
</ul>
</p>

<h2>Prerequisites</h2>

<p>You should have at least an intermediate knowledge of the command line before proceeding.</p>

<p>This package assumes that you have the following installed:</p>
<ol>
	<li><a href="https://gruntjs.com/getting-started" target="_blank">Grunt</a></li>
	<li><a href="https://www.virtualbox.org/" target="_blank">VirtualBox</a></li>
	<li><a href="https://www.vagrantup.com/downloads.html" target="_blank">Vagrant</a></li>
	<li><a href="https://github.com/Varying-Vagrant-Vagrants/VVV" target="_blank">VVV (Varying-Vagrant-Vagrants)</a>. <strong>**Important - Use version 1.3.0 which can be downloaded <a href="https://github.com/Varying-Vagrant-Vagrants/VVV/archive/1.3.0.zip">HERE</a>. The newest version has issues with this setup.</strong></li>
	<li><a href="https://github.com/bradp/vv" target="_blank">Variable VVV</a></li>
	<li><a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en">LiveReload Extension for Chrome</a> (allows you to see SASS/SCSS updates in Chrome without a Refresh.</li>
</ol>

<p><em><strong>*Note: Please make sure that you have SSH access to your development/production websites and that you BACKUP YOUR DATABASES until you are comfortable with this workflow!</strong></em></p>

<p>If you are not familiar with running a Vagrant environment for WordPress development, a helpful guide can be found here: <a href="http://wpbeaches.com/setting-up-a-wordpress-vvv-vagrant-workflow/" target="_blank">Setting up a WordPress VVV Vagrant Workflow</a></p>

<h2>Getting Started</h2>

<p>Copy the Gruntfile.js, package.json and site_settings.json into your theme directory. Once done, install the grunt packages by running <code>$ npm install</code> in your terminal window.</p>

<p>Next, you will need to configure your <strong>site_settings.json</strong> file. It's pretty self-explanatory, just follow the template. <strong>**Make sure to double-check all entries before transferring any files or databases.</strong></p>

<h2>Available Commands</h2>
<ul>
	<li><code>$ grunt</code> - Runs the watch command for compiling SASS/SCSS</li>
	<li><code>$ grunt pull</code> - Pulls remote wp-content folder into your local site</li>
	<li><code>$ grunt push</code> - Pushes local wp-content folder into your remote site</li>
	<li><code>$ grunt push_theme</code> - Pushes local theme into your remote site</li>
	<li><code>$ grunt pull_db</code> - Pulls remote database, searches and replaces site name, imports it into your local database *</li>
	<li><code>$ grunt push_db</code> - Pushes local database, searches and replaces site name, imports it into your remote database *</li>
</ul>

<p><strong>*Remeber to back up your databases until you are comfortable with this workflow!</strong></p>

<p>The gruntfile can of course be modified to suit your needs.</p>

