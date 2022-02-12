from app.db.database import Moderator, User, Profile, createSession
from fastapi import APIRouter, status
from pydantic import BaseModel


router = APIRouter()


@router.get('/moderator_status/{twitter_id}')
def get_moderator_status(twitter_id):
    session = createSession()
    mod_cout = session.query(
        Moderator).filter_by(twitter_id=twitter_id).count()

    status = mod_cout != 0
    session.close()
    return {"status": status}


@router.get('/user/list')
def get_moderator_status():
    session = createSession()
    users = session.query(
        User.twitter_id, User.id, Profile.twitter_name, Profile.twitter_screen_name, Profile.twitter_url).outerjoin(User, User.id == Profile.user_id).all()

    session.close()
    return users
