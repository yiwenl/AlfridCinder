# Shader watcher for Cinder project
This tool help to create shader ( .vert / .frag ) from template automatically when detect the string in the cpp / hpp / h files when it is saved.


## Installation

```
npm i -g
```


## Usage
- Navigate to your project folder in command line tool
- Run `shaderwatch`


## Example
`mShader = gl::GlslProg::create( loadAsset("test_2.vert"), loadAsset("test1.frag"));`
when save, it'll create both `test2_vert` and `test1.frag` in the `assets` folder.


## Shader template
The shader template is located in the `/templates` folder. Please modify it to suit your need.
