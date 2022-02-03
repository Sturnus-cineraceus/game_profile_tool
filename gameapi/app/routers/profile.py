from app.db.database import Profile, User, createSession
from fastapi import APIRouter, status
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import hashlib

router = APIRouter()


class ProfileData(BaseModel):
    twitter_id: str
    epic_name: str
    sex: int
    strength: int
    play: int
    important: int
    vc: int
    time: int
    device: int
    ctrler: int
    message: str
    team: str
    twitter_name: str
    twitter_url: str
    twitter_screen_name: str
    twitter_image_url: str
    available: bool


def convert_twitter_id(twitter_id):
    idsrc = "twitter" + twitter_id
    return hashlib.md5(idsrc.encode('utf-8')).hexdigest()


@router.get('/{user_id}')
def get_profile(user_id):
    session = createSession()
    profile = session.query(
        Profile).filter_by(user_id=user_id).first()

    return profile


@router.delete('/{user_id}', status_code=202)
def delete_profile(user_id):
    session = createSession()
    try:
        profile = session.query(
            Profile).filter_by(user_id=user_id).first()
        session.delete(profile)
        session.commit()
    except Exception as e:
        print(e)
        session.rollback()
        return JSONResponse(status_code=500)


@router.post('/', status_code=201)
def post_profile(data: ProfileData):
    session = createSession()
    try:
        data_dic = data.__dict__
        twitter_id = data_dic.pop('twitter_id')
        user_id = convert_twitter_id((twitter_id))
        user_count = session.query(User).filter_by(id=user_id).count()
        if user_count <= 0:
            user = User()
            user.id = user_id
            user.twitter_id = twitter_id
            session.add(user)

        profile_count = session.query(
            Profile).filter_by(user_id=user_id).count()
        if profile_count > 0:
            profile = session.query(
                Profile).filter_by(user_id=user_id).one()
            profile.epic_name = data.epic_name
            profile.sex = data.sex
            profile.strength = data.strength
            profile.play = data.play
            profile.important = data.important
            profile.vc = data.vc
            profile.time = data.time
            profile.device = data.device
            profile.ctrler = data.ctrler
            profile.message = data.message
            profile.team = data.team
            profile.twitter_name = data.twitter_name
            profile.twitter_url = data.twitter_url
            profile.twitter_screen_name = data.twitter_screen_name
            profile.twitter_image_url = data.twitter_image_url
            profile.available = data.available
        else:
            profile = Profile(**data_dic)
            profile.user_id = user_id
            session.add(profile)
        session.commit()
        return
    except Exception as e:
        print(e)
        session.rollback()
        return JSONResponse(status_code=500)
