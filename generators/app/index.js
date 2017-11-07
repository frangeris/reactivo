'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const fs = require('fs');

module.exports = class extends Generator {
  initializing() {
    this.updating = false;
    try {
      this.updating = fs.readFileSync(this.destinationPath('App.js'), 'utf8');
      this.log('Project detected, updating the core instead...');
    } catch (ex) {}
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      filter: _.kebabCase
    }]).then(props => {
      this.props = props;
    });
  }

  defaults() {
    // Create new folder if not updating
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    // Normal files
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    );

    // Hidden files
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath()
    );

    // Migrate .env vars
    this.fs.copy(
      this.templatePath('.env.js.example'),
      this.destinationPath('.env.js')
    );
  }

  install() {
    if (!this.updating) {
      this.installDependencies({
        bower: false,
        callback: () => {
          this._initRN();
        }
      });
    }
  }

  _initRN() {
    this.spawnCommandSync('node', [
      path.resolve(__dirname, 'setup-rn.js'),
      this.destinationRoot(),
      this.props.name
    ]);
  }
};
