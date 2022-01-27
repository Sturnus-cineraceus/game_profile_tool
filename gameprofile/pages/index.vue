<template>
  <div class="main">
    <Header></Header>
    <div class="contents">
      <div class="main_button_area">
        <b-button
          v-if="!login"
          variant="primary"
          @click="$router.push({ path: '/login' })"
        >
          <b-icon-twitter></b-icon-twitter>ツイッターでログイン
        </b-button>

        <b-button
          v-if="login"
          variant="success"
          @click="$router.push({ path: '/profile_edit' })"
        >
          <b-icon-pencil-square></b-icon-pencil-square>プロフィール編集
        </b-button>
      </div>

      <!-- <b-card title="Card title" sub-title="Card subtitle">
          <b-card-text>
            Some quick example text to build on the <em>card title</em> and make
            up the bulk of the card's content.
          </b-card-text>

          <b-card-text>A second paragraph of text in the card.</b-card-text>

          <a href="#" class="card-link">Card link</a>
          <b-link href="#" class="card-link">Another link</b-link>
        </b-card> -->
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
  async mounted() {
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
  button {
    padding: 1em 5em;
    margin: 5em;
  }
}
</style>