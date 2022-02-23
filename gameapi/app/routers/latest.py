from fastapi import APIRouter
from typing import Optional
from sqlalchemy import desc
from app.db.database import Profile, createSession
router = APIRouter()


@router.get('/list')
def get_latest_list(limit: Optional[int] = None):
    session = createSession()
    lmt = 10
    if limit:
        lmt = limit
    profiles = session.query(
        Profile).filter_by(available=True).order_by(desc(Profile.available)).limit(lmt)

    result = []
    for p in profiles:
        print(p)
        result.append(p)
    session.close()
    return {"latest": result}
