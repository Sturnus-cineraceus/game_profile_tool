#!/usr/bin/env python
from migrate.versioning.shell import main
import app.config as config
HOST = 'mysqldb'

if __name__ == '__main__':
    main(debug='False',
         url=f'mysql+mysqlconnector://{config.USER}:{config.PASSWORD}@{HOST}/{config.DATABASE}', repository='./app/gamedatabase')
