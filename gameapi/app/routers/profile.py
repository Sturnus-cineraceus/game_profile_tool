from app.db.database import Profile, User, createSession
from fastapi import APIRouter, status
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse

router = APIRouter()


class ProfileData(BaseModel):
    twitter_id: int
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


@router.post('/', status_code=201)
def post_profile(data: ProfileData):
    session = createSession()
    data_dic = data.__dict__
    data_dic.pop('twitter_id')
    profile = Profile(**data.__dict__)
    session.add(profile)
    session.commit()
    return {status: "OK"}
