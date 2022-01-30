const express = require('express')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express()
app.use(express.json())

import * as log from 'loglevel'
if (process.env.DEV_MODE == 1) {
    log.setLevel('trace')
} else {
    log.setLevel('info')
}

let cookie_secure = true;
if (process.env.DEV_MODE == 1) {
    cookie_secure = false;
    console.log("デバッグモード")
}

const options = {
    host: 'mysqldb',
    port: 3306,
    user: process.env.DB_USER,
    cookie: {
        maxAge: 60000000, httpOnly: true,
        secure: cookie_secure,
    },
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

app.get("/profile/:user_id", async (req, res) => {
    let resp = await axios.get("http://api/profile/" + req.params.user_id);
    log.debug(resp.data)
    return res.send(resp.data)
});

app.post("/profile", async (req, res) => {
    log.debug(req.body)
    try {
        let resp = await axios.post("http://api/profile/",
            req.body);
        res.status(201).send()
    } catch (e) {
        log.error(e.response.status)
        log.error(e.response.statusText)
        res.status(e.response.status).send(e.response.statusText);
    }
})

app.get('/user_name', async (req, res) => {
    if (!req.session.oauth_token || !req.session.oauth_token_secret) {
        return res.json({ twitter_data: { user_name: "ゲスト" }, twitter: false })
    }
    let resp = await axios.post("http://api/user_name", { token: req.session.oauth_token, token_secret: req.session.oauth_token_secret });
    log.debug(resp.data)
    res.json({ twitter_data: resp.data, twitter: true })

})

app.get('/logout', async (req, res) => {
    delete req.session.oauth_token
    delete req.session.oauth_token_secret
    res.json({ result: "ok" })
})

app.get('/login', async (req, res) => {
    let resp = await axios.get("http://api/login");
    log.debug(resp.data)
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