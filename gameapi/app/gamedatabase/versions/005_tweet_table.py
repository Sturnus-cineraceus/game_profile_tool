from sqlalchemy import *
from migrate import *
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
meta = MetaData()
tweet = Table(
    'tweet', meta,
    Column('user_id', String(40), primary_key=True),
    Column('tweet_status_id', String(40), primary_key=True),
    Column('update_time', Timestamp))


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    meta.bind = migrate_engine
    tweet.create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    meta.bind = migrate_engine
    tweet.drop()
