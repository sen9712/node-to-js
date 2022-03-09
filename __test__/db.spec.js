const db = require('../db.js')
const fs = require('../__mock__/fs.js')

jest.mock('fs')

// 测试用例描述测试文件
describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('can read', async() => {
        const data = [{ title: 'hi', done: true }]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStringEqual(data)
    })
    it('can write', async() => {
        let fakeFile
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{ title: '毛嘴', done: true }, { title: '买醉', done: true }]
        await db.write(list, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    })
})