const homedir = require('os').homedir(); //home目录
const home = process.env.HOME || homedir; //HOME变量，优选选用用户设置的变量
const p = require('path') //会自动是识别win还是mac添加对应的符号
const fs = require('fs')
const dbPath = p.join(home, '.todo') //拼接成正确的路径

const db = {
    read(path = dbPath) {
        // 异步函数是不能够直接return的，我们需要利用promise将异步转化为同步
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) return reject(error)
                    // 解决存在空的情况
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                if (error) return reject()
                resolve()
            })
        })
    }
}

module.exports = db