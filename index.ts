import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('hello express')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
