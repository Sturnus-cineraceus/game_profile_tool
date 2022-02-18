from fastapi import APIRouter
from sqlalchemy import desc
from app.db.database import Profile, createSession
router = APIRouter()


@router.get('/list')
def get_latest_list():
    session = createSession()
    profiles = session.query(
        Profile).filter_by(available=True).order_by(desc(Profile.available)).limit(10)

    result = []
    for p in profiles:
        print(p)
        result.append(p)
    session.close()
    return {"latest": result}
