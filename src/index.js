import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import chalk from 'chalk'

let bb = express()
bb.set('views', './src/views')
bb.set('view engine', 'ejs')
bb.use(logger('dev'))
bb.use(parser.json())
bb.use(parser.urlencoded({extended:true}))
bb.use(express.static('./src/public'))

bb.get('/', (req, res)=> {
  res.redirect('/bugbot')
})

bb.get('/bugbot', (req, res)=> {
  res.render('index')
})

bb.get('/bugbot/auth', (req, res)=> {
  // req.query.code
  res.end('auth success/fail page here')
})

export default bb

if (require.main === module) {
  let port = process.env.PORT || 3000
  bb.listen(port, x=> {
    if (!process.env.NODE_ENV) {
      let msg = chalk.green('#!/bugbot> ')
      let url = chalk.underline.cyan(`http://localhost:${port}`)
      console.log(`${msg} ${url}`)
    }
  })
}

