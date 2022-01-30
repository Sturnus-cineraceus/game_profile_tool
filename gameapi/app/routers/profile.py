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


def convert_twitter_id(twitter_id):
    idsrc = "twitter" + twitter_id
    return hashlib.md5(idsrc.encode('utf-8')).hexdigest()


@router.get('/{user_id}')
def get_profile(user_id):
    session = createSession()
    profile = session.query(
        Profile).filter_by(user_id=user_id).one()
    print(profile)
    return profile


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
        else:
            profile = Profile(**data_dic)
            profile.user_id = user_id
            session.add(profile)
        session.commit()
        return
    except Exception as e:
        print("dasdas")
        print(e)
        session.rollback()
        return JSONResponse(status_code=500)
