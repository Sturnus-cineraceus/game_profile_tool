from sqlalchemy import *
from migrate import *
meta = MetaData()


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    meta.bind = migrate_engine
    profile = Table('profile', meta, autoload=True)
    profile_image = Column('profile_image', String(64))
    profile_image.create(profile)


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    meta.bind = migrate_engine
    profile = Table('profile', meta, autoload=True)
    profile.c.profile_image.drop()
