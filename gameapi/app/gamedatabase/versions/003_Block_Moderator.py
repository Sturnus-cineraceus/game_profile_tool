from sqlalchemy import *
from migrate import *
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
meta = MetaData()

moderator = Table(
    'moderator', meta,
    Column('twitter_id', String(40), primary_key=True))
block = Table(
    'block', meta,
    Column('user_id', String(40), primary_key=True),
    Column('twitter_id', String(40), primary_key=True),
    Column('update_time', Timestamp))


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    meta.bind = migrate_engine
    moderator.create()
    block.create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    meta.bind = migrate_engine
    moderator.drop()
    block.drop()
