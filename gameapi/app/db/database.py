from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String, Text, Boolean, DateTime
import app.config as config

HOST = 'mysqldb'


# MySQL Connector/Pythonを使うためmysqlconnectorを指定する
engine = create_engine(
    f'mysql+mysqlconnector://{config.USER}:{config.PASSWORD}@{HOST}/{config.DATABASE}')

# テーブルを定義する
Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    __table_args__ = ({"mysql_charset": "utf8mb4"})
    id = Column(String(40), primary_key=True)
    twitter_id = Column(String(40), primary_key=True)


class Profile(Base):
    __tablename__ = 'profile'
    __table_args__ = ({"mysql_charset": "utf8mb4"})
    user_id = Column(String(40), primary_key=True)
    epic_name = Column(String(254))
    sex = Column(Integer)
    strength = Column(Integer)
    play = Column(Integer)
    important = Column(Integer)
    vc = Column(Integer)
    time = Column(Integer)
    device = Column(Integer)
    ctrler = Column(Integer)
    message = Column(Text)
    team = Column(String(254))
    twitter_name = Column(String(254))
    twitter_url = Column(String(254))
    twitter_screen_name = Column(String(254))
    twitter_image_url = Column(String(254))
    available = Column(Boolean)
    update_time = Column(DateTime)


def createSession():
    Session = sessionmaker(engine)
    session = Session()
    return session

# # テーブルを作成する


def init():
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    init()


# # セッションを作成する
# Session = sessionmaker(engine)
# session = Session()

# # データを追加する
# cat = Animal(name='cat')
# dog = Animal(name='dog')
# session.add(cat)
# session.add(dog)
# session.commit()

# # データを更新する
# cat = session.query(Animal).get(1)
# cat.name = 'pengin'
# session.commit()

# # データを取得する
# animals = session.query(Animal).all()
# for animal in animals:
#     print('id=', animal.id, 'name=', animal.name)
