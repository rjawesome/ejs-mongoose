import express from "express"
import { stuffs } from "./models"

const app = express()

app.use(express.urlencoded());

app.use(express.static('static'))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  stuffs.find((err, stuffs) => {
    res.render('index',{stuffs})
  })
})

app.get("/add", (req, res) => {
  res.render('add')
})

app.post('/add', (req, res) => {
  if (req.body.title === "" || req.body.description === "" || !req.body.title || !req.body.description) {
    res.redirect("/add")
    return
  }
  else {
    stuffs.create({title: req.body.title, description: req.body.description}, err => {
      if (err) res.send("Error Occured")
      else res.redirect("/")
    })
  }
})

app.get("/edit/:id", (req, res) => {
  stuffs.findById(req.params.id, (err, stuff) => {
    if (err) res.send("Error Occured")
    else res.render('edit',{ stuff })
  })
})

app.post("/edit/:id", (req, res) => {
  stuffs.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description }, err => {
    if (err) res.send("Error Occured")
    else res.redirect("/")
  })
})

app.post("/delete/:id", (req, res) => {
  stuffs.deleteOne({_id: req.params.id}, err => {
    if (err) res.send("Error Occured")
    else res.redirect("/")
  })
})

app.listen(process.env.PORT || 3000)