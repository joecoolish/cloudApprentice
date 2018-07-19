#!/usr/bin/env node

//  https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/


const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const Preferences = require('preferences');

const log = console.log;

clear();

var program = require('commander');

function banner() {
  log(chalk.white('FNMOC') + ' | ' + chalk.blue('CLI') + ' | ' + chalk.green(program.version()));
  log(chalk.green(figlet.textSync('Cloud Apprentice', { horizontalLayout: 'full' })));
}





program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

  program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    var mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

  program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
  });
 
program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

  program.on('--help', () => {
    log('');
    log('  Examples:');
    log('');
    log('    $ custom-help --help');
    log('    $ custom-help -h');
    log('');
  });

  if (process.argv.length == 2 ){
    process.argv.push('--help');
  } 

  
  banner();
  program.parse(process.argv);

 
// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);