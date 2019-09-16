(async() => {
    const validator = require('html-validator')
    const { readFileSync } = require('fs')
    const options = {
        url: 'http://localhost:8086',
        format: 'text',
        data: readFileSync('src/index.html', 'utf8')
    }

    try {
        const result = await validator(options)
        console.log(result)
    } catch (error) {
        console.error(error)
    }
})()