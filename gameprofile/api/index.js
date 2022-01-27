const express = require('express')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express()
app.use(express.json())

const options = {
    host: 'mysqldb',
    port: 3306,
    user: process.env.DB_USER,
    cookie: { maxAge: 60000000 },
    password: process.env.DB_PASSWD,
    database: process.env.DB,
};
const sessionStore = new MySQLStore(options);
import axios from "axios";

app.use(session({
    secret: process.env.SESSION_SCRT,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


app.post("/profile", async (req, res) => {
    console.log(req.body)
    // let resp = await axios.post("http://api/profile", {
    //     firstName: '三郎',
    //     lastName: '田中'
    // });
    // console.log(resp);
})

app.get('/', async (req, res) => {
    let resp = await axios.get("http://api/");
    console.log(resp.data);
    if (!req.session.hoge) {
        req.session.hoge = "kamisama";
        res.json({ message: resp.data })
    } else {
        res.json({ message: req.session.hoge })
    }

})

app.get('/user_name', async (req, res) => {
    console.log(req.session)
    if (!req.session.oauth_token || !req.session.oauth_token_secret) {
        return res.json({ twitter_data: { user_name: "ゲスト" }, twitter: false })
    }
    let resp = await axios.get("http://api/user_name", { params: { token: req.session.oauth_token, token_secret: req.session.oauth_token_secret } });
    res.json({ twitter_data: resp.data, twitter: true })
})

app.get('/login', async (req, res) => {
    let resp = await axios.get("http://api/login");
    res.json({ url: resp.data })
})

app.get('/callback', async (req, res) => {
    let ot = req.query.ot;
    let ov = req.query.ov;
    try {
        let token = await axios.get("http://api/accesstoken", { params: { ot: ot, ov: ov } });
        req.session.oauth_token = token.data.at.oauth_token;
        req.session.oauth_token_secret = token.data.at.oauth_token_secret;
        res.status(200).send({ name: token.data.at.screen_name });
    } catch {
        res.status(500).send();
        return;
    }
})


module.exports = {
    path: '/v1/api',
    handler: app
}