FROM mysql:8.0
RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 3A79BD29 && \
    apt-get update && apt-get install -y        \
    mecab                                       \
    libmecab-dev                                \
    mecab-ipadic-utf8                           \
    locales                                     \
    &&  locale-gen ja_JP.UTF-8                      \
    &&  echo "dicdir=/var/lib/mecab/dic/ipadic-utf8" > /etc/mecabrc
ENV LANG        ja_JP.UTF-8
ENV LC_CTYPE    ja_JP.UTF-8
