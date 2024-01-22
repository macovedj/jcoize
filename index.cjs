const transpile = import("jco")
const publish = require("libnpmpublish")
const pack = require('libnpmpack')
const fs = require("fs")
const path = require("path")

const resolve = (...str) => path.resolve(__dirname, ...str);

async function execute({name, version, description, author, license}) {
  const transpileFunc = await transpile
  console.log("transpiling for node")
  const transpiledNode = await transpileFunc.transpile(wasm, {wasiShim: true}, "foo")
  console.log("transpiling for browser")
  const transpiledBrowser = await transpileFunc.transpile(wasm, {wasiShim: true, nodeJsCompat: false}, "foo")
  fs.mkdirSync(`./${name}/node/interfaces`, {recursive: true})
  fs.mkdirSync(`./${name}/browser/interfaces`, {recursive: true})
  fs.writeFileSync("./README.md", "")
  fs.writeFileSync(`./${name}/package.json`, JSON.stringify({
    name,
    version,
    description,
    author,
    repository: "",
    license,
    exports: {
      browser: `./browser`,
      node: `./node`
    }
  }, null, 2))
  console.log("WRITING FOR NODE")
  for (const [fileName, bytes] of Object.entries(transpiledNode.files)) {
    fs.writeFileSync(`./${name}/node/${fileName}`, bytes)
  }
  console.log("WRITING FOR BROWSER")
  for (const [fileName, bytes] of Object.entries(transpiledBrowser.files)) {
    fs.writeFileSync(`./${name}/browser/${fileName}`, bytes)
  }

  console.log("manifesting")
  console.log("packing")

  const pkg = require(resolve(`./${name}/package.json`));
  const tarData = await pack(`./${name}`)
  console.log("publishing")
  await publish.publish(pkg, tarData, {
    forceAuth: {
      access: true,
      token: process.env.NPM_TOKEN
    }
  })
}

const filePath = process.argv[2].split("/");
const wasm = fs.readFileSync(filePath[filePath.length - 1])
const version = process.argv[3]
console.log({version})
const description = ""
const author = ""
const license = ""
execute({name: filePath[filePath.length - 1].split(".")[0], version, description, author, license })
