#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const findFolder = require('./find-folder')
const watcher = require('./watch')
// const copyFile = require('./copy-file')
const checkExtension = require('./checkExtension')
const vsTemplate = require('./templates/basic.vert')
const fsTemplate = require('./templates/copy.frag')
const shaderPath = path.resolve(process.cwd(), 'assets')
const PATH_SRC = path.resolve(process.cwd(), 'src')
const regShader = /[^\"|\s|)]+\.(vert|frag)/g

const watcherViews = watcher([PATH_SRC])


function startWatch () {
  watcherViews.on('all', (event, file) => {
    if (file.indexOf('.DS_Store') > -1) return
    if (!checkExtension(file, ['cpp', 'hpp', 'h'])) return
    console.log('Event:', event, 'file :', file)
    if (event !== 'add' && event !== 'change') return
    checkFile(file)
  })
}

const checkFile = (file) => {
  getShaderImports(file).then(shaderImports => {
    return shaderImports.reduce((sequence, shaderName) => {
      return sequence.then(() => {
        return isShaderExist(shaderName)
      }).then((mName) => {
        generateShader(mName)
      }).catch((err) => {
        console.log(err)
      })
    }, Promise.resolve())
  }).catch((err) => {
    console.log('Error:', err)
  })
}

const getShaderImports = (mPath) => new Promise((resolve, reject) => {
  let results = []

  fs.readFile(mPath, 'utf8', (err, str) => {
    if (err) {
      reject('Error Loading file !')
    } else {
      let match
      while (match = regShader.exec(str)) {
        results.push(match[0])
      }

      console.log('Results', results)

      results = results.map((mPath) => {
        return mPath.replace('shaders/', '')
      })

      resolve(results)
    }
  })
})

const isShaderExist = (name) => new Promise((resolve, reject) => {
  fs.readdir(shaderPath, (err, files) => {
    if (err) {
      reject(err)
      return
    }
    if (files.indexOf(name) === -1) {
      resolve(name)
    } else {
      reject(`Shader existed : ${name}`)
    }
  })
})

function generateShader (mName) {
  if (isVertexShader(mName)) {
    generateVertexShader(mName)
  } else {
    generateFragmentShader(mName)
  }
}

function generateVertexShader (mName) {
  console.log('Generate vertex shader :', mName)
  fs.writeFile(path.resolve(shaderPath, mName), vsTemplate, (err) => {
    if (err) console.log('Err', err)
  })
}

function generateFragmentShader (mName) {
  console.log('Generate fragment shader : ', mName)
  fs.writeFile(path.resolve(shaderPath, mName), fsTemplate, (err) => {
    if (err) console.log('Err', err)
  })
}

function isVertexShader (mName) {
  return mName.indexOf('.vert') > -1
}

startWatch()
