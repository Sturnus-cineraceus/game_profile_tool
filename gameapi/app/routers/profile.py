from fastapi import APIRouter
from pydantic import BaseModel
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


@router.post('/')
def post_profile(data: ProfileData):
    print(data)
    return "das"
