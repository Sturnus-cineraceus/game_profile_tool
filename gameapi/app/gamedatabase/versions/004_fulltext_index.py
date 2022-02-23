from sqlalchemy import *
from migrate import *


def upgrade(migrate_engine):

    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    meta = MetaData(bind=migrate_engine)
    profile = Table('profile', meta, autoload=True)
    index = Index('message_index', profile.c.message,
                  mysql_prefix="FULLTEXT", mysql_with_parser="mecab")
    index.create(migrate_engine)


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    meta = MetaData(bind=migrate_engine)
    profile = Table('profile', meta, autoload=True)
    index = Index('message_index', profile.c.message,
                  mysql_prefix="FULLTEXT", mysql_with_parser="mecab")
    index.drop(migrate_engine)
    pass
