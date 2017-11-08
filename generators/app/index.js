'use strict'
const Generator = require('yeoman-generator')
const path = require('path')
const mkdirp = require('mkdirp')
const _ = require('lodash')
const fs = require('fs')

module.exports = class extends Generator {
  initializing() {
    this.updating = false
    try {
      this.updating = fs.readFileSync(this.destinationPath('App.js'), 'utf8')
      this.log('Project detected, updating the core instead...')
    } catch (ex) {
      // oops crash or not found
    }
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      filter: _.kebabCase
    }]).then(props => {
      this.props = props
    })
  }

  defaults() {
    // create new folder if not updating
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      )
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  writing() {
    // normal files
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    )

    // hidden files
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath()
    )

    // migrate .env vars
    this.fs.copy(
      this.templatePath('.env.js.example'),
      this.destinationPath('.env.js')
    )
  }

  install() {
    if (!this.updating) {
      this.installDependencies({
        bower: false,
        callback: () => {
          // create cross index
          let platforms = ['ios', 'android']
          platforms.forEach(platform => {
            this.fs.copy('index.js', this.destinationPath(`index.${platform}.js`))
          })

          this._initRN()
        }
      })
    }
  }

  _initRN() {
    this.spawnCommandSync('node', [
      path.resolve(__dirname, 'setup-rn.js'),
      this.destinationRoot(),
      this.props.name
    ])

    // end up removing index
    this.fs.delete(this.destinationRoot('index.js'))
  }
}
