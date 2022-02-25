from app.db.database import Profile, User, createSession, Tweet
from fastapi import APIRouter, status
import hashlib

router = APIRouter()


@router.get('/{user_id}')
def get_profile(user_id):
    session = createSession()
    profile = session.query(
        Profile).filter_by(user_id=user_id, available=True).first()

    if profile == None:
        session.close()
        return None
    pdic = profile.__dict__
    tweet = session.query(Tweet).filter_by(user_id=user_id).first()
    if tweet != None:
        pdic["tweet"] = {"url": tweet.tweet_url,
                         "status": tweet.tweet_status_id,
                         "caption": tweet.tweet_caption}
    else:
        pdic["tweet"] = {"url": "", "status": "", "caption": ""}
    session.close()
    return pdic
