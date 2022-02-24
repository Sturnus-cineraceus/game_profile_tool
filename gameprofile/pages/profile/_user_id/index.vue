<template>
  <div class="main">
    <Header></Header>
    <div class="profilem_main">
      <div class="side_parts">
        <div class="update_time_parts">
          <small>更新日: {{ update_time }}</small>
        </div>
        <div>
          <TwitterShare
            class="tw_share"
            :profile_data="profile_data"
          ></TwitterShare>
        </div>
      </div>
      <b-container class="prof_card_container">
        <b-row>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="EpicID"
              class="text-center profile_card"
            >
              <b-card-text>{{ profile_data.epic_name }}</b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="性別"
              class="text-center profile_card"
            >
              <b-card-text>{{ sex }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="Twitter"
              class="text-center profile_card"
            >
              <b-card-text>
                <a
                  class="prf_link"
                  :href="profile_data.twitter_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="tw_name">
                    <b-avatar
                      class="tw_avt"
                      :src="profile_img"
                      size="4rem"
                    ></b-avatar>
                    <span class="tw_name">{{ profile_data.twitter_name }}</span>
                    <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
                  </span>
                </a>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="チーム名"
              class="text-center profile_card"
            >
              <b-card-text>{{ profile_data.team }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="メッセージ"
              class="text-center profile_card"
            >
              <b-card-text class="profile_message">
                <pre class="profile_message_body">{{
                  profile_data.message
                }}</pre>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="強さ"
              class="text-center profile_card"
            >
              <b-card-text>
                <div class="level_star">
                  <template v-for="n of 10">
                    <span :key="n">
                      <template v-if="n <= profile_data.strength">
                        <b-icon-star-fill></b-icon-star-fill>
                      </template>
                      <template v-else>
                        <b-icon-star></b-icon-star>
                      </template>
                    </span>
                  </template>
                </div>
                <div>
                  {{ strength }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="ゲーム機"
              class="text-center profile_card"
            >
              <b-card-text>
                <div>
                  {{ device }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="よく遊ぶモード"
              class="text-center profile_card"
            >
              <b-card-text>
                <div>
                  {{ playmode }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="ボイスチャット"
              class="text-center profile_card"
            >
              <b-card-text>
                <div>
                  {{ voice }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="コントローラー"
              class="text-center profile_card"
            >
              <b-card-text>
                <div>
                  {{ ctrler }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="遊んでる時間帯"
              class="text-center profile_card"
            >
              <b-card-text>
                <div>
                  {{ time }}
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card
              border-variant="danger"
              bg-variant="light"
              text-variant="dark"
              header-border-variant="danger"
              header="ゲームで大切にしてること"
              class="text-center profile_card"
            >
              <b-card-text>
                <p>{{ important }}</p>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>

      <div class="to_main_area">
        <b-card
          header-bg-variant="primary"
          border-variant="info"
          title="フォートナイトの履歴書"
          tag="article"
          class="text-center"
        >
          <b-card-text>
            <article class="introduction">
              フォートナイトの強さプレイスタイルを登録して、フレンドづくりの手助けをします
            </article>
          </b-card-text>

          <b-button variant="success" to="/">
            <b-icon-pencil-square></b-icon-pencil-square
            >あなたもプロフィール編集
          </b-button>
        </b-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import TwitterShare from "@/components/twitter_share";
import axios from "axios";

export default {
  components: { Header, Footer, TwitterShare },
  name: "Profile",
  head: function () {
    let desc =
      this.profile_data.twitter_name + "さんのフォトナのプロフィールです。";
    let nowurl =
      this.$config.HTTP_PROTOCOL +
      this.$config.DOMAIN +
      "/profile/" +
      this.profile_data.user_id;
    let ogimg =
      this.$config.HTTP_PROTOCOL + this.$config.DOMAIN + "/ogpimg.png";
    if (this.profile_data.message) {
      desc = this.profile_data.message.substr(0, 80);
    }
    return {
      title: this.profile_data.twitter_name + "さんのプロフ",
      meta: [
        { hid: "description", name: "description", content: desc },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.profile_data.twitter_name + "さんのフォトナプロフ",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: desc,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "og:url", property: "og:url", content: nowurl },
        { hid: "og:image", property: "og:image", content: ogimg },
      ],
    };
  },
  async asyncData({ route, error }) {
    let url = "/v1/api/user_profile/";
    if (process.server) {
      url = "http://localhost:3000" + url;
    }

    try {
      let res = await axios.get(url + route.params.user_id);
      return { profile_data: res.data };
    } catch (e) {
      error({ statusCode: 404, message: "Profile not found" });
      return;
    }
  },
  computed: {
    update_time: function () {
      let dt = new Date(this.profile_data.update_time);
      const upd = this.$dayjs(dt);
      return upd.format("YYYY/MM/DD HH:mm ");
    },
    profile_img: function () {
      return this.profile_data.twitter_image_url.replace("normal", "bigger");
    },
    sex: function () {
      const sexobj = ["", "男性", "女性", "その他"];
      return sexobj[this.profile_data.sex];
    },
    playmode: function () {
      const plyary = [
        "",
        "ソロ",
        "デュオ",
        "トリオ",
        "スクワッド",
        "アリーナ ソロ",
        "アリーナ デュオ",
        "アリーナ トリオ",
        "チームランブル",
        "クリエイティブ",
        "スクリム",
        "その他",
      ];

      let ply = this.profile_data.play;
      if (ply === 0) {
        return "";
      }
      return plyary[ply];
    },

    strength: function () {
      const stgtary = [
        "",
        "始めたばかり",
        "初キル済み",
        "壁や階段は出せる",
        "ソロでビクロイはした",
        "建築バトルできる",
        "編集活用してバトルできる",
        "10キル以上余裕",
        "チャンピオンリーグ常連",
        "競技に本気",
        "プロとして生計を立てている",
      ];

      let strg = this.profile_data.strength;
      if (strg === 0) {
        return "";
      }
      return stgtary[strg];
    },
    time: function () {
      const timeary = ["", "早朝", "日中帯", "夕方", "夜", "深夜"];

      let timenum = this.profile_data.time;
      if (timenum === 0) {
        return "";
      }
      return timeary[timenum];
    },

    device: function () {
      const dvary = [
        "",
        "Switch",
        "PlayStation4",
        "PlayStation5",
        "XBox",
        "PC",
        "モバイル",
      ];
      let devicenum = this.profile_data.device;
      if (devicenum === 0) {
        return "";
      }
      return dvary[devicenum];
    },

    ctrler: function () {
      const ctary = ["", "パッド", "キーマウ"];
      let ctrlernum = this.profile_data.ctrler;
      if (ctrlernum === 0) {
        return "";
      }
      return ctary[ctrlernum];
    },
    voice: function () {
      const vcary = [
        "",
        "VCできません",
        "たまにできます",
        "いつでもオンです",
        "たまにできません",
        "仲良くなったらできます",
      ];
      let vcnum = this.profile_data.vc;
      if (vcnum === 0) {
        return "";
      }
      return vcary[vcnum];
    },
    important: function () {
      const importantary = [
        "",
        "みんなと協力してバトルしたい",
        "おしゃべりしたい ロビーにいるだけでもいい！",
        "ビクロイしたい",
        "たくさんキルしたい",
        "珍しい戦い方を検証したい",
        "フォートナイト考察のために島を回りたい",
        "クエストをクリアしたい",
        "動画映えするプレイを極めたい",
        "アリーナポイントためたい",
        "大会で良い成績を残したい",
      ];

      let importantnum = this.profile_data.important;
      if (importantnum === 0) {
        return "";
      }
      return importantary[importantnum];
    },
  },
};
</script>
<style lang="scss">
div.main {
  width: 100%;
  div.profilem_main {
    width: 100%;
  }
}
a.prf_link {
  // color: #6610f2;
  font-weight: bold;
}
.tw_name {
  .tw_avt,
  .tw_name {
    margin-right: 1em;
  }
}
.to_main_area {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
  button {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
.profilem_main {
  padding-top: 3em;
  padding-bottom: 6em;
  .prof_card_container {
    .profile_card {
      margin: 1em;
    }
  }
}
.tw_share {
  padding-top: 2em;
}
.side_parts {
  width: 100%;
  text-align: right;
  padding-right: 5em;
  padding-bottom: 0.5em;
}
.profile_message {
  display: flex;
  justify-content: center;
  align-items: center;
  .profile_message_body {
    font-size: 100%;
    text-align: left;
    white-space: pre-wrap;
  }
}

.level_star {
  span {
    padding-right: 0.1em;
    color: #ebd234;
  }
}
</style>