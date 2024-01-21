const transpile = import("@bytecodealliance/jco")
const publish = require("libnpmpublish")
const pack = require('libnpmpack')
const pacote = require("pacote")
const fs = require("fs")

async function execute(name, version, description, author, license) {
  const wasm = fs.readFileSync("./jcoize.wasm")
  const transpilable = await transpile
  const transpiled = await transpilable.transpile(wasm, {wasiShim: true}, "foo")
  for (const [fileName, bytes] of Object.entries(transpiled.files)) {
    fs.writeFileSync(`./package/${fileName}`, bytes)
  }
  fs.writeFileSync(`./package/package.json`, JSON.stringify({
    name,
    version,
    description,
    "main": "component.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    author,
    license,
    "types": "./component.d.ts"
  }))
  const manifest = await pacote.manifest("./package")
  const packable = await pack
  const tarData = await packable("./package")
  const publishable = await publish
  await publishable.publish(manifest, tarData, {
    forceAuth: {
      token: 'NPMTOKEN'
    }
  })
}
execute("1.0.7")
