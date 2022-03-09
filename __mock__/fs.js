const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

// 创建假的fs去替代真的fs
fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        // 解决只传2个参数的情况
        callback = options
    }
    // 当这个路劲访问过时我就可以直接调用callback
    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        // 没有访问过的话还是需要借助这个功能
        _fs.readFile(path, options, callback)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
    if (path in writeFile) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callbac)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}

module.exports = fs