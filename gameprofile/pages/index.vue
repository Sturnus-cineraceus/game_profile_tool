<template>
  <div class="main">
    <Header></Header>
    <div class="contents">
      <div class="main_button_area">
        <b-card
          title="フォートナイトの履歴書"
          tag="article"
          class="mb-2 text-center"
          img-src="/top_card.jpg"
          img-bottom
        >
          <b-card-text>
            <article class="introduction">フォートナイトの強さプレイスタイルを登録して、フレンドづくりの手助けをします</article>
          </b-card-text>

          <b-button v-if="!login" variant="primary" @click="$router.push({ path: '/login' })">
            <b-icon-twitter></b-icon-twitter>ツイッターでログイン
          </b-button>

          <b-button v-if="login" variant="success" @click="$router.push({ path: '/profile_edit' })">
            <b-icon-pencil-square></b-icon-pencil-square>プロフィール編集
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
export default {
  components: { Header, Footer },
  name: "IndexPage",
  data: () => ({ text: "", user: {}, userName: "", login: false }),
  head: function () {
    return { title: "フォトナプロフ", titleTemplate: "" };
  },
  async mounted() {
    this.$logger.debug("マウント");
    this.$authUtil.verifyAuth().then(() => {
      this.user = this.$store.state.user.data;
      this.userName = this.user.twitter_data.user_name;
      this.login = this.user.twitter;
    });
  },
};
</script>
<style lang="scss">
div.main {
  width: 100%;
  div.contents {
    width: 100%;
  }
}
.main_button_area {
  display: flex;
  justify-content: center;
  align-items: center;
  .introduction {
    margin-top: 3em;
  }
  button {
    @media screen and (min-width: 630px) {
      padding: 1em 5em;
    }
    margin: 5em;
  }
}
</style>