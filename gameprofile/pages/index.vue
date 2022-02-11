<template>
  <div class="main">
    <Header></Header>
    <div class="toppage_contents">
      <div class="main_button_area">
        <b-card
          title="フォートナイトの履歴書"
          tag="article"
          class="mb-2 text-center"
          :img-src="top_img"
          img-bottom
        >
          <b-card-text>
            <article class="introduction">
              フォートナイトの強さプレイスタイルを登録して、フレンドづくりの手助けをします
            </article>
          </b-card-text>

          <div v-if="!login">
            <b-button
              variant="twitter_login"
              class="top_btn twitter_login"
              to="/login"
            >
              <b-icon-twitter class="twicon"></b-icon-twitter
              ><span class="loginword">ツイッターでログイン</span>
            </b-button>
          </div>
          <div v-if="login">
            <b-button class="top_btn" variant="success" to="/profile_edit">
              <b-icon-pencil-square></b-icon-pencil-square
              ><span>プロフィール編集</span>
            </b-button>

            <b-button class="top_btn" variant="info" :to="myprof">
              <b-icon-journal-richtext></b-icon-journal-richtext
              >プロフィールを見る
            </b-button>
          </div>
        </b-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: { Header, Footer },
  name: "IndexPage",
  data: () => ({ text: "", user: {}, userName: "", login: false }),
  head: function () {
    let ogimg =
      this.$config.HTTP_PROTOCOL + this.$config.DOMAIN + "/ogpimg.png";
    let nowurl = this.$config.HTTP_PROTOCOL + this.$config.DOMAIN;
    return {
      title: "フォトナプロフ",
      titleTemplate: "",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "フォートナイトのプレイヤーがプロフィール（履歴書）を書いて共有できるサイト。",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "フォトナプロフ",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "フォートナイトのプレイヤーがプロフィール（履歴書）を書いて共有できるサイト",
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
  async mounted() {
    this.$authUtil.verifyAuth().then(() => {
      this.user = this.$store.state.user.data;
      this.userName = this.user.twitter_data.user_name;
      this.login = this.user.twitter;
    });
  },
  computed: {
    myprof: function () {
      return "/profile/" + this.user.twitter_data.user_id;
    },
    top_img: function () {
      let url = "img/assets/" + this.$config.TOP_IMG;
      return url;
    },
  },
};
</script>
<style lang="scss">
.twitter_login {
  background-color: #1da1f2;
  color: #ffffff;
  .twicon {
    width: 32px;
    height: 32px;
  }
  span.loginword {
    padding-left: 1em;
  }
}
.twitter_login:hover {
  background-color: #1da1f2;
  color: #ffffff;
  border: 1px solid #000000;
}

div.main {
  width: 100%;
  div.toppage_contents {
    width: 100%;
    padding-top: 5em;
  }
}
.main_button_area {
  display: flex;
  justify-content: center;
  align-items: center;
  .introduction {
    margin-top: 3em;
  }
  .top_btn {
    @media screen and (min-width: 630px) {
      padding: 1em 5em;
      margin: 2.5em 1em;
    }
    margin: 2.5em 1em;
  }
}
</style>