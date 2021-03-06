from sqlalchemy import *
from migrate import *
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
meta = MetaData()


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    meta.bind = migrate_engine
    profile = Table('profile', meta, autoload=True)
    profile.c.update_time.drop()
    update = Column('update_time', Timestamp)
    update.create(profile)


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    meta.bind = migrate_engine
    profile = Table('profile', meta, autoload=True)
    profile.c.update_time.drop()
    update = Column('update_time', DateTime)
    update.create(profile)
