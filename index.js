import {transpile} from "@bytecodealliance/jco"
import {publish} from "libnpmpublish"
import pacote  from "pacote"
import {helloWorld} from "./virt/virt.js"
console.log({poof: helloWorld()})
// const pacote = require("pacote")
import fs from "fs"
// import {helloWorld} from "./test.js"


// const wasm = fs.readFileSync("./js_component.wasm")
// // const wasm = fs.readFileSync("./jcoize.wasm")
// const transpiled = await transpile(wasm, {wasiShim: true}, "foo")
// for (const [fileName, bytes] of Object.entries(transpiled.files)) {
//   fs.writeFileSync(`./package/${fileName}`, bytes)
// }
// const path = "./package"
// const manifest = await pacote.manifest(path)
// const tarData = await pacote.tarball(path)
// console.log({transpiled})
// console.log(helloWorld())
