# automated-grunt-wordpress-deploy
<p>I created this grunt package to help automate my WordPress development workflow.</p> 

<p>This package allows you to:
<ul>
	<li>Automatically compile SASS/SCSS. No more running sass --watch!</li>
	<li>Pull /wp-content folder from your remote development/production websites into your local environment to get up and running quickly</li>
	<li>Push content from your local environment to your remote development/production websites</li>
	<li>Automatically sync your WordPress Database from local to remote and remote to local</li>
</ul>
</p>

<h2>Prerequisites</h2>

<p>This package assumes that you have the following installed:</p>
<ol>
	<li><a href="https://gruntjs.com/getting-started" target="_blank">Grunt</a></li>
	<li><a href="https://www.virtualbox.org/" target="_blank">VirtualBox</a></li>
	<li><a href="https://www.vagrantup.com/downloads.html" target="_blank">Vagrant</a></li>
	<li><a href="https://github.com/Varying-Vagrant-Vagrants/VVV" target="_blank">VVV (Varying-Vagrant-Vagrants)</a></li>
	<li><a href="https://github.com/bradp/vv" target="_blank">Variable VVV</a></li>
	<li><a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en">LiveReload Extension for Chrome</a> (allows you to see SASS/SCSS updates in Chrome without a Refresh_</li>
</ol>

<p><em>*Note: Please make sure that you have <strong>SSH</strong> access to your development/production websites and that you <strong>BACKUP YOUR DATABASES</strong> until you are comfortable with this workflow!</em></p>

<p>If you are not familiar with running a Vagrant environment for WordPress development, a helpful guide can be found here: <a href="http://wpbeaches.com/setting-up-a-wordpress-vvv-vagrant-workflow/" target="_blank">Setting up a WordPress VVV Vagrant Workflow</a></p>



