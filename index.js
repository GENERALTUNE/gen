#!/usr/bin/env node

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');


var files = require('./lib/files');

clear();
console.log(
  chalk.green(
      figlet.textSync('Gen UI', { horizontalLayout: 'full' })
    )
);


if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!'));
//    process.exit();
}

//console.log(process.argv);
console.log(
		chalk.yellow(figlet.textSync(files.getCurrentDirectoryBase(), {horizontalLayout: 'full'})));
var status = new Spinner('Authenticating you, please wait...');
status.start();
//status.stop();


var co = require('co');
var prompt = require('co-prompt');

//var program = require('commander');
//program
// .arguments('<file>')
// .option('-u, --username <username>', 'The user to authenticate as')
// .option('-p, --password <password>', 'The user\'s password')
// .action(function(file) {
//         co(function *() {
//         var username = yield prompt('username: ');
//         var password = yield prompt.password('password: ');
//	 console.log('user: %s pass: %s file: %s', username, password, file);
//  })
// .parse(process.argv);

function getGithubCredentials(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Github username or e-mail address:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

getGithubCredentials(function(){
  console.log(arguments);
});

