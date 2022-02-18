const express = require('express')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express()
app.use(express.json())

//ロガー
import * as log from 'loglevel'
if (process.env.DEV_MODE == 1) {
    log.setLevel('trace')
    log.debug("ログデバッグモード")
} else {
    log.setLevel('info')
}

//セッション
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

/* sessionの情報 */
// req.session.user_data  ユーザーの情報
// req.session.oauth_token アクセストークン
// req.session.oauth_token_secret アクセストークンシークレット
// req.session.twitter_id twitterのID ログインしない限り存在しない


/* user_dataの構造 */
// {
//     "twitter_data": {
//         "user_name": "𓆲領主𓆲", //名前
//         "id": "99667392", //TwitterのID 
//         "screen_name": "glorificatio", //スクリーンネーム
//         "profile_image": "https://pbs.twimg.com/profile_images/1260579052596989952/vMiO0mf0_normal.jpg",  //サムネイル
//         "user_id": "<このシステム内でのID>"
//     },
//     "twitter": true //twitterと連携できていればtrue
// }

/* 本人のプロフィール用API */

//プロフィール情報を取得する。
//非公開も含めて取得させる。
//ログインしているユーザーとこのAPIを叩いているユーザーとの一致が必要
app.get("/profile/:user_id", async (req, res) => {
    if (!req.session.user_data) {
        log.info("ログイン情報なし")
        res.status(403).send()
        return;
    }
    let session_userid = req.session.user_data.twitter_data.user_id;
    if (req.params.user_id !== session_userid) {
        log.info("ログインしている人と違う人がユーザー情報を取得しようとしている")
        res.status(403).send()
        return;
    }

    let resp = await axios.get("http://api/profile/" + req.params.user_id);
    if (!resp.data) {
        res.status(404).send()
        return
    }
    res.send(resp.data)
});

//プロフィールを更新
//本人確認必須
app.post("/profile", async (req, res) => {
    log.debug(req.body)
    if (!req.session.user_data) {
        log.info("ログイン情報なし")
        res.status(403).send()
        return;
    }
    let session_userid = req.session.user_data.twitter_data.user_id;
    log.debug(session_userid, req.body.user_id)
    if (req.body.user_id !== session_userid) {
        log.info("ログインしている人と違う人がユーザー情報を更新しようとしている")
        res.status(403).send()
        return;
    }

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

app.delete("/profile/:user_id", async (req, res) => {
    let session_userid = req.session.user_data.twitter_data.user_id;
    log.debug(session_userid, req.params.user_id)
    if (req.params.user_id !== session_userid) {
        log.info("ログインしている人と違う人がユーザー情報を削除しようとしている")
        res.status(403).send()
        return;
    }

    try {
        await axios.delete("http://api/profile/" + req.params.user_id);
    } catch (e) {
        log.error(e)
        res.status(500).send()
        return
    }
    res.status(202).send()
})

/* 本人のプロフィール用API 終わり */

/* 公開情報用API */

//プロフィール情報を取得する
//公開情報として取得する
//非公開は404を返す
app.get("/user_profile/:user_id", async (req, res) => {
    let resp = await axios.get("http://api/user_profile/" + req.params.user_id);
    if (!resp.data) {
        res.status(404).send()
        return
    }
    return res.send(resp.data)
});


app.get("/latest/list", async (req, res) => {
    let resp = await axios.get("http://api/latest/list");
    if (!resp.data) {
        res.status(404).send()
        return
    }
    return res.send(resp.data)
});



/* 公開情報用API 終わり */


/* 認証用API */
//セッションに保存してある情報から本人情報を取得
app.get('/user_name', async (req, res) => {
    if (!req.session.user_data) {
        res.json({ twitter_data: { user_name: "ゲスト" }, twitter: false })
    } else {
        res.json(req.session.user_data);
    }
})

//ログアウト。セッションを削除
app.get('/logout', async (req, res) => {
    delete req.session.oauth_token
    delete req.session.oauth_token_secret
    delete req.session.user_data
    res.json({ result: "ok" })
})

//ログイン
app.get('/login', async (req, res) => {
    let resp = await axios.get("http://api/login");
    log.debug(resp.data)
    res.json({ url: resp.data })
})

//Oauth用のコールバック用URL
//Oauthのトークンが渡されてくる
app.get('/callback', async (req, res) => {
    let ot = req.query.ot;
    let ov = req.query.ov;
    try {
        let token = await axios.get("http://api/accesstoken", { params: { ot: ot, ov: ov } });
        req.session.oauth_token = token.data.at.oauth_token;
        req.session.oauth_token_secret = token.data.at.oauth_token_secret;
        let resp = await axios.post("http://api/user_name", { token: req.session.oauth_token, token_secret: req.session.oauth_token_secret });
        log.debug(resp.data)
        let user_data = { twitter_data: resp.data, twitter: true };
        req.session.user_data = user_data;
        req.session.twitter_id = user_data.twitter_data.id;
        res.json(user_data)
    } catch {
        res.status(500).send();
        return;
    }
})

app.get('/moderator_status', async (req, res) => {
    try {
        if (req.session.twitter_id) {
            let modstatus = await axios.get("http://api/admin/moderator_status/" + req.session.twitter_id);
            log.debug(req.session.twitter_id + "モデレーター権限:", modstatus.data)
            res.json(modstatus.data)
        } else {
            res.json({ status: false })
        }
    } catch (e) {
        log.error(e)
        res.status(500).send();
        return;
    }
})

/* 以下モデレーター用API */
/* モデレーター権限があるかどうかを1リクエストごとに確認し、なければ403を返さなければならない */
/* これはフロント側のいくつかの制御をクリアされるバグがあったとしても安全に保護される措置である */

app.get('/user/list', async (req, res) => {
    try {
        if (req.session.twitter_id) {
            let modstatus = await axios.get("http://api/admin/moderator_status/" + req.session.twitter_id);
            log.debug(req.session.twitter_id + "モデレーター権限:", modstatus.data)
            if (!modstatus.data.status) {
                res.status(403).send();
                return;
            }
            let userlist = await axios.get("http://api/admin/user/list/");
            return res.json(userlist.data)
        } else {
            res.status(403).send();
            return;
        }
    } catch (e) {
        log.error(e)
        res.status(500).send();
        return;
    }
})





module.exports = {
    path: '/v1/api',
    handler: app
}