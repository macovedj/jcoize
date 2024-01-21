import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { TerminalInput } = terminalInput;
const { TerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { getDirectories } = preopens;
const { Descriptor,
  DirectoryEntryStream,
  filesystemErrorCode } = types;
const { Error: Error$1,
  InputStream,
  OutputStream } = streams;
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const resourceHandleSymbol = Symbol('resource');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen += s.length * 2);
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;

function trampoline8() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline9(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline10() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new Error('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = handleCnt0++;
  handleTable0.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline11() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}
let exports2;

function trampoline12(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new Error('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = handleCnt3++;
    handleTable3.set(handle1, { rep: tuple0_0, own: true });
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let memory0;
let realloc0;

function trampoline13(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.readViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new Error('Resource error: Not a valid "InputStream" resource.');
      }
      var handle2 = handleCnt0++;
      handleTable0.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline14(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline15(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg1 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline16(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'block-device': {
          enum2 = 1;
          break;
        }
        case 'character-device': {
          enum2 = 2;
          break;
        }
        case 'directory': {
          enum2 = 3;
          break;
        }
        case 'fifo': {
          enum2 = 4;
          break;
        }
        case 'symbolic-link': {
          enum2 = 5;
          break;
        }
        case 'regular-file': {
          enum2 = 6;
          break;
        }
        case 'socket': {
          enum2 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant11 = ret;
  switch (variant11.tag) {
    case 'ok': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      var val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v2_2), true);
      var variant5 = v2_3;
      if (variant5 === null || variant5=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant5;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v4_0, nanoseconds: v4_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v4_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v4_1), true);
      }
      var variant7 = v2_4;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant7;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v6_1), true);
      }
      var variant9 = v2_5;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant9;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v8_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val10 = e;
      let enum10;
      switch (val10) {
        case 'access': {
          enum10 = 0;
          break;
        }
        case 'would-block': {
          enum10 = 1;
          break;
        }
        case 'already': {
          enum10 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum10 = 3;
          break;
        }
        case 'busy': {
          enum10 = 4;
          break;
        }
        case 'deadlock': {
          enum10 = 5;
          break;
        }
        case 'quota': {
          enum10 = 6;
          break;
        }
        case 'exist': {
          enum10 = 7;
          break;
        }
        case 'file-too-large': {
          enum10 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum10 = 9;
          break;
        }
        case 'in-progress': {
          enum10 = 10;
          break;
        }
        case 'interrupted': {
          enum10 = 11;
          break;
        }
        case 'invalid': {
          enum10 = 12;
          break;
        }
        case 'io': {
          enum10 = 13;
          break;
        }
        case 'is-directory': {
          enum10 = 14;
          break;
        }
        case 'loop': {
          enum10 = 15;
          break;
        }
        case 'too-many-links': {
          enum10 = 16;
          break;
        }
        case 'message-size': {
          enum10 = 17;
          break;
        }
        case 'name-too-long': {
          enum10 = 18;
          break;
        }
        case 'no-device': {
          enum10 = 19;
          break;
        }
        case 'no-entry': {
          enum10 = 20;
          break;
        }
        case 'no-lock': {
          enum10 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum10 = 22;
          break;
        }
        case 'insufficient-space': {
          enum10 = 23;
          break;
        }
        case 'not-directory': {
          enum10 = 24;
          break;
        }
        case 'not-empty': {
          enum10 = 25;
          break;
        }
        case 'not-recoverable': {
          enum10 = 26;
          break;
        }
        case 'unsupported': {
          enum10 = 27;
          break;
        }
        case 'no-tty': {
          enum10 = 28;
          break;
        }
        case 'no-such-device': {
          enum10 = 29;
          break;
        }
        case 'overflow': {
          enum10 = 30;
          break;
        }
        case 'not-permitted': {
          enum10 = 31;
          break;
        }
        case 'pipe': {
          enum10 = 32;
          break;
        }
        case 'read-only': {
          enum10 = 33;
          break;
        }
        case 'invalid-seek': {
          enum10 = 34;
          break;
        }
        case 'text-file-busy': {
          enum10 = 35;
          break;
        }
        case 'cross-device': {
          enum10 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val10}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum10, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline18(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags2 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr3 = arg2;
  var len3 = arg3;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags4 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  if ((arg6 & 4294967288) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags6 = {
    readable: Boolean(arg6 & 1),
    writable: Boolean(arg6 & 2),
    executable: Boolean(arg6 & 4),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.openAt.call(rsc0, flags2, result3, flags4, flags5, flags6) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg7 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new Error('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = handleCnt3++;
      handleTable3.set(handle7, { rep: e, own: true });
      dataView(memory0).setInt32(arg7 + 4, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg7 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg7 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline19(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.metadataHash.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {lower: v2_0, upper: v2_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v2_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline20(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  const ret = filesystemErrorCode(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val2 = e;
    let enum2;
    switch (val2) {
      case 'access': {
        enum2 = 0;
        break;
      }
      case 'would-block': {
        enum2 = 1;
        break;
      }
      case 'already': {
        enum2 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum2 = 3;
        break;
      }
      case 'busy': {
        enum2 = 4;
        break;
      }
      case 'deadlock': {
        enum2 = 5;
        break;
      }
      case 'quota': {
        enum2 = 6;
        break;
      }
      case 'exist': {
        enum2 = 7;
        break;
      }
      case 'file-too-large': {
        enum2 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum2 = 9;
        break;
      }
      case 'in-progress': {
        enum2 = 10;
        break;
      }
      case 'interrupted': {
        enum2 = 11;
        break;
      }
      case 'invalid': {
        enum2 = 12;
        break;
      }
      case 'io': {
        enum2 = 13;
        break;
      }
      case 'is-directory': {
        enum2 = 14;
        break;
      }
      case 'loop': {
        enum2 = 15;
        break;
      }
      case 'too-many-links': {
        enum2 = 16;
        break;
      }
      case 'message-size': {
        enum2 = 17;
        break;
      }
      case 'name-too-long': {
        enum2 = 18;
        break;
      }
      case 'no-device': {
        enum2 = 19;
        break;
      }
      case 'no-entry': {
        enum2 = 20;
        break;
      }
      case 'no-lock': {
        enum2 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum2 = 22;
        break;
      }
      case 'insufficient-space': {
        enum2 = 23;
        break;
      }
      case 'not-directory': {
        enum2 = 24;
        break;
      }
      case 'not-empty': {
        enum2 = 25;
        break;
      }
      case 'not-recoverable': {
        enum2 = 26;
        break;
      }
      case 'unsupported': {
        enum2 = 27;
        break;
      }
      case 'no-tty': {
        enum2 = 28;
        break;
      }
      case 'no-such-device': {
        enum2 = 29;
        break;
      }
      case 'overflow': {
        enum2 = 30;
        break;
      }
      case 'not-permitted': {
        enum2 = 31;
        break;
      }
      case 'pipe': {
        enum2 = 32;
        break;
      }
      case 'read-only': {
        enum2 = 33;
        break;
      }
      case 'invalid-seek': {
        enum2 = 34;
        break;
      }
      case 'text-file-busy': {
        enum2 = 35;
        break;
      }
      case 'cross-device': {
        enum2 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val2}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum2, true);
  }
}

function trampoline21(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: InputStream.prototype.read.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val2 = e;
      var len2 = val2.byteLength;
      var ptr2 = realloc0(0, 0, 1, len2 * 1);
      var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
      (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
      dataView(memory0).setInt32(arg2 + 8, len2, true);
      dataView(memory0).setInt32(arg2 + 4, ptr2, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline22(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: InputStream.prototype.blockingRead.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val2 = e;
      var len2 = val2.byteLength;
      var ptr2 = realloc0(0, 0, 1, len2 * 1);
      var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
      (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
      dataView(memory0).setInt32(arg2 + 8, len2, true);
      dataView(memory0).setInt32(arg2 + 4, ptr2, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline23(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt1++;
          handleTable1.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 12, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline24(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline25(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline26(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt1++;
          handleTable1.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 8, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline27(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline28(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline29(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new Error('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = handleCnt6++;
    handleTable6.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline30(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new Error('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = handleCnt7++;
    handleTable7.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline31(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new Error('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = handleCnt7++;
    handleTable7.set(handle0, { rep: e, own: true });
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
let exports3;
let realloc1;
let postReturn0;
let postReturn1;
function trampoline0(handle) {
  const handleEntry = handleTable4.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable4.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline1(handle) {
  const handleEntry = handleTable1.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable1.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline2(handle) {
  const handleEntry = handleTable0.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable0.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline3(handle) {
  const handleEntry = handleTable2.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable2.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline4(handle) {
  const handleEntry = handleTable3.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable3.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline5(handle) {
  const handleEntry = handleTable6.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable6.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline6(handle) {
  const handleEntry = handleTable5.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable5.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline7(handle) {
  const handleEntry = handleTable7.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable7.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}

function generate(arg0, arg1) {
  var ptr0 = realloc1(0, 0, 4, 52);
  var val1 = arg0;
  var len1 = val1.byteLength;
  var ptr1 = realloc1(0, 0, 1, len1 * 1);
  var src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
  (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
  dataView(memory0).setInt32(ptr0 + 4, len1, true);
  dataView(memory0).setInt32(ptr0 + 0, ptr1, true);
  var {name: v2_0, noTypescript: v2_1, instantiation: v2_2, map: v2_3, compat: v2_4, noNodejsCompat: v2_5, base64Cutoff: v2_6, tlaCompat: v2_7, validLiftingOptimization: v2_8, tracing: v2_9, noNamespacedExports: v2_10 } = arg1;
  var ptr3 = utf8Encode(v2_0, realloc1, memory0);
  var len3 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 12, len3, true);
  dataView(memory0).setInt32(ptr0 + 8, ptr3, true);
  var variant4 = v2_1;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(ptr0 + 16, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(ptr0 + 16, 1, true);
    dataView(memory0).setInt8(ptr0 + 17, e ? 1 : 0, true);
  }
  var variant6 = v2_2;
  if (variant6 === null || variant6=== undefined) {
    dataView(memory0).setInt8(ptr0 + 18, 0, true);
  } else {
    const e = variant6;
    dataView(memory0).setInt8(ptr0 + 18, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'async': {
        dataView(memory0).setInt8(ptr0 + 19, 0, true);
        break;
      }
      case 'sync': {
        dataView(memory0).setInt8(ptr0 + 19, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`InstantiationMode\``);
      }
    }
  }
  var variant11 = v2_3;
  if (variant11 === null || variant11=== undefined) {
    dataView(memory0).setInt8(ptr0 + 20, 0, true);
  } else {
    const e = variant11;
    dataView(memory0).setInt8(ptr0 + 20, 1, true);
    var vec10 = e;
    var len10 = vec10.length;
    var result10 = realloc1(0, 0, 4, len10 * 16);
    for (let i = 0; i < vec10.length; i++) {
      const e = vec10[i];
      const base = result10 + i * 16;var [tuple7_0, tuple7_1] = e;
      var ptr8 = utf8Encode(tuple7_0, realloc1, memory0);
      var len8 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len8, true);
      dataView(memory0).setInt32(base + 0, ptr8, true);
      var ptr9 = utf8Encode(tuple7_1, realloc1, memory0);
      var len9 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len9, true);
      dataView(memory0).setInt32(base + 8, ptr9, true);
    }
    dataView(memory0).setInt32(ptr0 + 28, len10, true);
    dataView(memory0).setInt32(ptr0 + 24, result10, true);
  }
  var variant12 = v2_4;
  if (variant12 === null || variant12=== undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant12;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    dataView(memory0).setInt8(ptr0 + 33, e ? 1 : 0, true);
  }
  var variant13 = v2_5;
  if (variant13 === null || variant13=== undefined) {
    dataView(memory0).setInt8(ptr0 + 34, 0, true);
  } else {
    const e = variant13;
    dataView(memory0).setInt8(ptr0 + 34, 1, true);
    dataView(memory0).setInt8(ptr0 + 35, e ? 1 : 0, true);
  }
  var variant14 = v2_6;
  if (variant14 === null || variant14=== undefined) {
    dataView(memory0).setInt8(ptr0 + 36, 0, true);
  } else {
    const e = variant14;
    dataView(memory0).setInt8(ptr0 + 36, 1, true);
    dataView(memory0).setInt32(ptr0 + 40, toUint32(e), true);
  }
  var variant15 = v2_7;
  if (variant15 === null || variant15=== undefined) {
    dataView(memory0).setInt8(ptr0 + 44, 0, true);
  } else {
    const e = variant15;
    dataView(memory0).setInt8(ptr0 + 44, 1, true);
    dataView(memory0).setInt8(ptr0 + 45, e ? 1 : 0, true);
  }
  var variant16 = v2_8;
  if (variant16 === null || variant16=== undefined) {
    dataView(memory0).setInt8(ptr0 + 46, 0, true);
  } else {
    const e = variant16;
    dataView(memory0).setInt8(ptr0 + 46, 1, true);
    dataView(memory0).setInt8(ptr0 + 47, e ? 1 : 0, true);
  }
  var variant17 = v2_9;
  if (variant17 === null || variant17=== undefined) {
    dataView(memory0).setInt8(ptr0 + 48, 0, true);
  } else {
    const e = variant17;
    dataView(memory0).setInt8(ptr0 + 48, 1, true);
    dataView(memory0).setInt8(ptr0 + 49, e ? 1 : 0, true);
  }
  var variant18 = v2_10;
  if (variant18 === null || variant18=== undefined) {
    dataView(memory0).setInt8(ptr0 + 50, 0, true);
  } else {
    const e = variant18;
    dataView(memory0).setInt8(ptr0 + 50, 1, true);
    dataView(memory0).setInt8(ptr0 + 51, e ? 1 : 0, true);
  }
  const ret = exports1['local:js-component-bindgen/types#generate'](ptr0);
  let variant28;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len21 = dataView(memory0).getInt32(ret + 8, true);
      var base21 = dataView(memory0).getInt32(ret + 4, true);
      var result21 = [];
      for (let i = 0; i < len21; i++) {
        const base = base21 + i * 16;
        var ptr19 = dataView(memory0).getInt32(base + 0, true);
        var len19 = dataView(memory0).getInt32(base + 4, true);
        var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
        var ptr20 = dataView(memory0).getInt32(base + 8, true);
        var len20 = dataView(memory0).getInt32(base + 12, true);
        var result20 = new Uint8Array(memory0.buffer.slice(ptr20, ptr20 + len20 * 1));
        result21.push([result19, result20]);
      }
      var len23 = dataView(memory0).getInt32(ret + 16, true);
      var base23 = dataView(memory0).getInt32(ret + 12, true);
      var result23 = [];
      for (let i = 0; i < len23; i++) {
        const base = base23 + i * 8;
        var ptr22 = dataView(memory0).getInt32(base + 0, true);
        var len22 = dataView(memory0).getInt32(base + 4, true);
        var result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
        result23.push(result22);
      }
      var len26 = dataView(memory0).getInt32(ret + 24, true);
      var base26 = dataView(memory0).getInt32(ret + 20, true);
      var result26 = [];
      for (let i = 0; i < len26; i++) {
        const base = base26 + i * 12;
        var ptr24 = dataView(memory0).getInt32(base + 0, true);
        var len24 = dataView(memory0).getInt32(base + 4, true);
        var result24 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr24, len24));
        let enum25;
        switch (dataView(memory0).getUint8(base + 8, true)) {
          case 0: {
            enum25 = 'function';
            break;
          }
          case 1: {
            enum25 = 'instance';
            break;
          }
          default: {
            throw new TypeError('invalid discriminant specified for ExportType');
          }
        }
        result26.push([result24, enum25]);
      }
      variant28= {
        tag: 'ok',
        val: {
          files: result21,
          imports: result23,
          exports: result26,
        }
      };
      break;
    }
    case 1: {
      var ptr27 = dataView(memory0).getInt32(ret + 4, true);
      var len27 = dataView(memory0).getInt32(ret + 8, true);
      var result27 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr27, len27));
      variant28= {
        tag: 'err',
        val: result27
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant28.tag === 'err') {
    throw new ComponentError(variant28.val);
  }
  return variant28.val;
}

function generateTypes(arg0, arg1) {
  var ptr0 = utf8Encode(arg0, realloc1, memory0);
  var len0 = utf8EncodedLen;
  var {wit: v1_0, world: v1_1, tlaCompat: v1_2, instantiation: v1_3, map: v1_4 } = arg1;
  var variant5 = v1_0;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  switch (variant5.tag) {
    case 'source': {
      const e = variant5.val;
      var ptr2 = utf8Encode(e, realloc1, memory0);
      var len2 = utf8EncodedLen;
      variant5_0 = 0;
      variant5_1 = ptr2;
      variant5_2 = len2;
      break;
    }
    case 'binary': {
      const e = variant5.val;
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc1(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      variant5_0 = 1;
      variant5_1 = ptr3;
      variant5_2 = len3;
      break;
    }
    case 'path': {
      const e = variant5.val;
      var ptr4 = utf8Encode(e, realloc1, memory0);
      var len4 = utf8EncodedLen;
      variant5_0 = 2;
      variant5_1 = ptr4;
      variant5_2 = len4;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`Wit\``);
    }
  }
  var variant7 = v1_1;
  let variant7_0;
  let variant7_1;
  let variant7_2;
  if (variant7 === null || variant7=== undefined) {
    variant7_0 = 0;
    variant7_1 = 0;
    variant7_2 = 0;
  } else {
    const e = variant7;
    var ptr6 = utf8Encode(e, realloc1, memory0);
    var len6 = utf8EncodedLen;
    variant7_0 = 1;
    variant7_1 = ptr6;
    variant7_2 = len6;
  }
  var variant8 = v1_2;
  let variant8_0;
  let variant8_1;
  if (variant8 === null || variant8=== undefined) {
    variant8_0 = 0;
    variant8_1 = 0;
  } else {
    const e = variant8;
    variant8_0 = 1;
    variant8_1 = e ? 1 : 0;
  }
  var variant10 = v1_3;
  let variant10_0;
  let variant10_1;
  if (variant10 === null || variant10=== undefined) {
    variant10_0 = 0;
    variant10_1 = 0;
  } else {
    const e = variant10;
    var variant9 = e;
    let variant9_0;
    switch (variant9.tag) {
      case 'async': {
        variant9_0 = 0;
        break;
      }
      case 'sync': {
        variant9_0 = 1;
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant9.tag)}\` (received \`${variant9}\`) specified for \`InstantiationMode\``);
      }
    }
    variant10_0 = 1;
    variant10_1 = variant9_0;
  }
  var variant15 = v1_4;
  let variant15_0;
  let variant15_1;
  let variant15_2;
  if (variant15 === null || variant15=== undefined) {
    variant15_0 = 0;
    variant15_1 = 0;
    variant15_2 = 0;
  } else {
    const e = variant15;
    var vec14 = e;
    var len14 = vec14.length;
    var result14 = realloc1(0, 0, 4, len14 * 16);
    for (let i = 0; i < vec14.length; i++) {
      const e = vec14[i];
      const base = result14 + i * 16;var [tuple11_0, tuple11_1] = e;
      var ptr12 = utf8Encode(tuple11_0, realloc1, memory0);
      var len12 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len12, true);
      dataView(memory0).setInt32(base + 0, ptr12, true);
      var ptr13 = utf8Encode(tuple11_1, realloc1, memory0);
      var len13 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len13, true);
      dataView(memory0).setInt32(base + 8, ptr13, true);
    }
    variant15_0 = 1;
    variant15_1 = result14;
    variant15_2 = len14;
  }
  const ret = exports1['local:js-component-bindgen/types#generate-types'](ptr0, len0, variant5_0, variant5_1, variant5_2, variant7_0, variant7_1, variant7_2, variant8_0, variant8_1, variant10_0, variant10_1, variant15_0, variant15_1, variant15_2);
  let variant20;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len18 = dataView(memory0).getInt32(ret + 8, true);
      var base18 = dataView(memory0).getInt32(ret + 4, true);
      var result18 = [];
      for (let i = 0; i < len18; i++) {
        const base = base18 + i * 16;
        var ptr16 = dataView(memory0).getInt32(base + 0, true);
        var len16 = dataView(memory0).getInt32(base + 4, true);
        var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
        var ptr17 = dataView(memory0).getInt32(base + 8, true);
        var len17 = dataView(memory0).getInt32(base + 12, true);
        var result17 = new Uint8Array(memory0.buffer.slice(ptr17, ptr17 + len17 * 1));
        result18.push([result16, result17]);
      }
      variant20= {
        tag: 'ok',
        val: result18
      };
      break;
    }
    case 1: {
      var ptr19 = dataView(memory0).getInt32(ret + 4, true);
      var len19 = dataView(memory0).getInt32(ret + 8, true);
      var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
      variant20= {
        tag: 'err',
        val: result19
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn1(ret);
  if (variant20.tag === 'err') {
    throw new ComponentError(variant20.val);
  }
  return variant20.val;
}
const handleTable0= new Map();
let handleCnt0 = 0;
const handleTable1= new Map();
let handleCnt1 = 0;
const handleTable2= new Map();
let handleCnt2 = 0;
const handleTable3= new Map();
let handleCnt3 = 0;
const handleTable4= new Map();
let handleCnt4 = 0;
const handleTable5= new Map();
let handleCnt5 = 0;
const handleTable6= new Map();
let handleCnt6 = 0;
const handleTable7= new Map();
let handleCnt7 = 0;

const $init = (async() => {
  const module0 = fetchCompile(new URL('./js_component.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./js_component.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABUgxgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGAEf39/fwBgAn5/AGACf38Bf2AEf39/fwF/YAl/f39/f35+f38Bf2ABfwF/YAN/f38Bf2ABfwADIB8AAQECAgIDAgIBAQIEBAIFAAAAAAYHBwgGBgYJBgoLBAUBcAEfHwedASABMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASAjE5ABMCMjAAFAIyMQAVAjIyABYCMjMAFwIyNAAYAjI1ABkCMjYAGgIyNwAbAjI4ABwCMjkAHQIzMAAeCCRpbXBvcnRzAQAKmwMfCQAgAEEAEQAACw0AIAAgASACQQERAQALDQAgACABIAJBAhEBAAsLACAAIAFBAxECAAsLACAAIAFBBBECAAsLACAAIAFBBRECAAsXACAAIAEgAiADIAQgBSAGIAdBBhEDAAsLACAAIAFBBxECAAsLACAAIAFBCBECAAsNACAAIAEgAkEJEQEACw0AIAAgASACQQoRAQALCwAgACABQQsRAgALDwAgACABIAIgA0EMEQQACw8AIAAgASACIANBDREEAAsLACAAIAFBDhECAAsLACAAIAFBDxEFAAsJACAAQRARAAALCQAgAEEREQAACwkAIABBEhEAAAsJACAAQRMRAAALCwAgACABQRQRBgALDwAgACABIAIgA0EVEQcACw8AIAAgASACIANBFhEHAAsZACAAIAEgAiADIAQgBSAGIAcgCEEXEQgACwsAIAAgAUEYEQYACwsAIAAgAUEZEQYACwsAIAAgAUEaEQYACwkAIABBGxEJAAsLACAAIAFBHBEGAAsNACAAIAEgAkEdEQoACwkAIABBHhELAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE2LjEAkhAEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQH1Dx8ARWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVuc0AwLjIuMC1yYy0yMDIzLTEwLTE4LWdldC1kaXJlY3RvcmllcwFVaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTAtMTgtW21ldGhvZF1kZXNjcmlwdG9yLnJlYWQtdmlhLXN0cmVhbQJWaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTAtMTgtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0DV2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTEwLTE4LVttZXRob2RdZGVzY3JpcHRvci5hcHBlbmQtdmlhLXN0cmVhbQROaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTAtMTgtW21ldGhvZF1kZXNjcmlwdG9yLmdldC10eXBlBUppbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtcmMtMjAyMy0xMC0xOC1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAZNaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTAtMTgtW21ldGhvZF1kZXNjcmlwdG9yLm9wZW4tYXQHU2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTEwLTE4LVttZXRob2RdZGVzY3JpcHRvci5tZXRhZGF0YS1oYXNoCEhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtcmMtMjAyMy0xMC0xOC1maWxlc3lzdGVtLWVycm9yLWNvZGUJRmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTEwLTE4LVttZXRob2RdaW5wdXQtc3RyZWFtLnJlYWQKT2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTEwLTE4LVttZXRob2RdaW5wdXQtc3RyZWFtLmJsb2NraW5nLXJlYWQLTmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTEwLTE4LVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQxIaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLXJjLTIwMjMtMTAtMTgtW21ldGhvZF1vdXRwdXQtc3RyZWFtLndyaXRlDVtpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtcmMtMjAyMy0xMC0xOC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoDlFpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtcmMtMjAyMy0xMC0xOC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gPQGluZGlyZWN0LXdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMC1yYy0yMDIzLTEwLTE4LWdldC1yYW5kb20tYnl0ZXMQQWluZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLXJjLTIwMjMtMTAtMTgtZ2V0LWVudmlyb25tZW50EUdpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbkAwLjIuMC1yYy0yMDIzLTEwLTE4LWdldC10ZXJtaW5hbC1zdGRpbhJJaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3Rkb3V0QDAuMi4wLXJjLTIwMjMtMTAtMTgtZ2V0LXRlcm1pbmFsLXN0ZG91dBNJaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkZXJyQDAuMi4wLXJjLTIwMjMtMTAtMTgtZ2V0LXRlcm1pbmFsLXN0ZGVychQsYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9maWxlc3RhdF9nZXQVJGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcmVhZBYlYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZRcmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wYXRoX29wZW4YJ2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcmFuZG9tX2dldBkoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldBouYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldBslYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9jbG9zZRwrYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2dldB0wYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9wcmVzdGF0X2Rpcl9uYW1lHiZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdA');
  const module3 = base64Compile('AGFzbQEAAAABUgxgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGAEf39/fwBgAn5/AGACf38Bf2AEf39/fwF/YAl/f39/f35+f38Bf2ABfwF/YAN/f38Bf2ABfwACwAEgAAEwAAAAATEAAQABMgABAAEzAAIAATQAAgABNQACAAE2AAMAATcAAgABOAACAAE5AAEAAjEwAAEAAjExAAIAAjEyAAQAAjEzAAQAAjE0AAIAAjE1AAUAAjE2AAAAAjE3AAAAAjE4AAAAAjE5AAAAAjIwAAYAAjIxAAcAAjIyAAcAAjIzAAgAAjI0AAYAAjI1AAYAAjI2AAYAAjI3AAkAAjI4AAYAAjI5AAoAAjMwAAsACCRpbXBvcnRzAXABHx8JJQEAQQALHwABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4ALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE2LjEAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['25'],
      environ_sizes_get: exports0['26'],
      fd_close: exports0['27'],
      fd_filestat_get: exports0['20'],
      fd_prestat_dir_name: exports0['29'],
      fd_prestat_get: exports0['28'],
      fd_read: exports0['21'],
      fd_write: exports0['22'],
      path_open: exports0['23'],
      proc_exit: exports0['30'],
      random_get: exports0['24'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment@0.2.0-rc-2023-10-18': {
      'get-environment': exports0['16'],
    },
    'wasi:cli/exit@0.2.0-rc-2023-10-18': {
      exit: trampoline9,
    },
    'wasi:cli/stderr@0.2.0-rc-2023-10-18': {
      'get-stderr': trampoline8,
    },
    'wasi:cli/stdin@0.2.0-rc-2023-10-18': {
      'get-stdin': trampoline10,
    },
    'wasi:cli/stdout@0.2.0-rc-2023-10-18': {
      'get-stdout': trampoline11,
    },
    'wasi:cli/terminal-input@0.2.0-rc-2023-10-18': {
      '[resource-drop]terminal-input': trampoline5,
    },
    'wasi:cli/terminal-output@0.2.0-rc-2023-10-18': {
      '[resource-drop]terminal-output': trampoline7,
    },
    'wasi:cli/terminal-stderr@0.2.0-rc-2023-10-18': {
      'get-terminal-stderr': exports0['19'],
    },
    'wasi:cli/terminal-stdin@0.2.0-rc-2023-10-18': {
      'get-terminal-stdin': exports0['17'],
    },
    'wasi:cli/terminal-stdout@0.2.0-rc-2023-10-18': {
      'get-terminal-stdout': exports0['18'],
    },
    'wasi:filesystem/preopens@0.2.0-rc-2023-10-18': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types@0.2.0-rc-2023-10-18': {
      '[method]descriptor.append-via-stream': exports0['3'],
      '[method]descriptor.get-type': exports0['4'],
      '[method]descriptor.metadata-hash': exports0['7'],
      '[method]descriptor.open-at': exports0['6'],
      '[method]descriptor.read-via-stream': exports0['1'],
      '[method]descriptor.stat': exports0['5'],
      '[method]descriptor.write-via-stream': exports0['2'],
      '[resource-drop]descriptor': trampoline4,
      '[resource-drop]directory-entry-stream': trampoline0,
      'filesystem-error-code': exports0['8'],
    },
    'wasi:io/streams@0.2.0-rc-2023-10-18': {
      '[method]input-stream.blocking-read': exports0['10'],
      '[method]input-stream.read': exports0['9'],
      '[method]output-stream.blocking-flush': exports0['14'],
      '[method]output-stream.blocking-write-and-flush': exports0['13'],
      '[method]output-stream.check-write': exports0['11'],
      '[method]output-stream.write': exports0['12'],
      '[resource-drop]error': trampoline1,
      '[resource-drop]input-stream': trampoline2,
      '[resource-drop]output-stream': trampoline3,
    },
    'wasi:random/random@0.2.0-rc-2023-10-18': {
      'get-random-bytes': exports0['15'],
    },
    'wasi:sockets/tcp@0.2.0-rc-2023-10-18': {
      '[resource-drop]tcp-socket': trampoline6,
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline12,
      '1': trampoline13,
      '10': trampoline22,
      '11': trampoline23,
      '12': trampoline24,
      '13': trampoline25,
      '14': trampoline26,
      '15': trampoline27,
      '16': trampoline28,
      '17': trampoline29,
      '18': trampoline30,
      '19': trampoline31,
      '2': trampoline14,
      '20': exports2.fd_filestat_get,
      '21': exports2.fd_read,
      '22': exports2.fd_write,
      '23': exports2.path_open,
      '24': exports2.random_get,
      '25': exports2.environ_get,
      '26': exports2.environ_sizes_get,
      '27': exports2.fd_close,
      '28': exports2.fd_prestat_get,
      '29': exports2.fd_prestat_dir_name,
      '3': trampoline15,
      '30': exports2.proc_exit,
      '4': trampoline16,
      '5': trampoline17,
      '6': trampoline18,
      '7': trampoline19,
      '8': trampoline20,
      '9': trampoline21,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1['cabi_post_local:js-component-bindgen/types#generate'];
  postReturn1 = exports1['cabi_post_local:js-component-bindgen/types#generate-types'];
})();

await $init;
const types$1 = {
  generate: generate,
  generateTypes: generateTypes,
  
};

export { types$1 as types, types$1 as 'local:js-component-bindgen/types',  }