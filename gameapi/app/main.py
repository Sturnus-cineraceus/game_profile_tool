from fastapi import FastAPI
import tweepy
from requests_oauthlib import OAuth1Session
import urllib.parse as parse
from pydantic import BaseModel
import app.config as config
from app.routers import profile, user_profile, admin, latest
from app.db.database import User, createSession
from fastapi.responses import JSONResponse
import hashlib
app = FastAPI()


def convert_twitter_id(twitter_id):
    idsrc = "twitter" + twitter_id
    return hashlib.md5(idsrc.encode('utf-8')).hexdigest()


oauth_callback = config.protocol + config.domain + "/callback"
twitter_base_url = 'https://api.twitter.com'
authorization_endpoint = twitter_base_url + '/oauth/authenticate'
request_token_endpoint = twitter_base_url + '/oauth/request_token'
token_endpoint = twitter_base_url + '/oauth/access_token'


app.include_router(profile.router, prefix="/profile")
app.include_router(user_profile.router, prefix="/user_profile")
app.include_router(admin.router, prefix="/admin")
app.include_router(latest.router, prefix="/latest")


@app.get('/login')
def login():
    # 1.リクエストトークンを取得する。
    # (Step 1: Obtaining a request token:https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter)
    twitter = OAuth1Session(config.api_key, config.api_secret)
    res = twitter.post(request_token_endpoint, params={
        'oauth_callback': oauth_callback})
    request_token = dict(parse.parse_qsl(res.content.decode("utf-8")))
    oauth_token = request_token['oauth_token']

    # 2.リクエストトークンを指定してTwitterへ認可リクエスト(Authorization Request)を行う。
    # (Step 2: Redirecting the user:https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter#tab2)
    return authorization_endpoint+'?{}'.format(parse.urlencode({
        'oauth_token': oauth_token
    }))


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


class TokenData(BaseModel):
    token: str
    token_secret: str


@app.post("/user_name")
def post_username(tokenData: TokenData):
    auth = tweepy.OAuthHandler(config.api_key, config.api_secret)
    auth.set_access_token(tokenData.token, tokenData.token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    user = api.verify_credentials()
    user_id = convert_twitter_id(user.id_str)
    session = createSession()
    try:
        user_count = session.query(User).filter_by(id=user_id).count()
        if user_count <= 0:
            userTable = User()
            userTable.id = user_id
            userTable.twitter_id = user.id_str
            session.add(userTable)
            session.commit()
        return {"user_name": user.name, "id": user.id_str,
                "screen_name": user.screen_name, "profile_image": user.profile_image_url_https, "user_id": user_id, "twitter_url": "https://twitter.com/" + user.screen_name}

    except Exception as e:
        print(e)
        session.rollback()
        return JSONResponse(status_code=500)
    finally:
        session.close()


@app.get("/accesstoken")
def get_twitter_access_token(ot, ov):

    twitter = OAuth1Session(
        config.api_key,
        config.api_secret,
        ot,
        ov,
    )
    response = twitter.post(
        token_endpoint,
        params={'oauth_verifier': ov}
    )
    access_token = dict(parse.parse_qsl(response.content.decode("utf-8")))
    return {"at": access_token}
