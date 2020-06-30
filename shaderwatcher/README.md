# Shader watcher for Cinder project
This tool help to create shader ( .vert / .frag ) from template automatically.
When detect the shader name pattern in the source (cpp / hpp / h) files when it is saved. It will first check if the shader with the same name has existed. If not it will continue to make a copy of the template shader and rename it to the shader name detected in the source file.


## Installation

```
npm i -g
```


## Usage
- Navigate to your project folder in command line tool
- Run `shaderwatch`


## Example
`mShader = gl::GlslProg::create( loadAsset("test_2.vert"), loadAsset("test1.frag"));`
When save, it will create both `test2_vert` and `test1.frag` in the `assets` folder.


## Shader template
The shader template is located in the `/templates` folder. Please modify it to suit your need.
