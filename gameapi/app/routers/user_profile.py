from app.db.database import Profile, User, createSession
from fastapi import APIRouter, status
import hashlib

router = APIRouter()


@router.get('/{user_id}')
def get_profile(user_id):
    session = createSession()
    profile = session.query(
        Profile).filter_by(user_id=user_id, available=True).first()
    session.close()
    return profile
