<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">
        <img src="/img/logo.svg" class="header_logo" />
        フォトナプロフ プレα</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text class="text-dark">
            こんにちは、 {{ userName }}さん
            <b-avatar variant="info" :src="img" class="mr-3"></b-avatar>
          </b-nav-text>

          <b-nav-item v-if="inLogin && existsPublicProfile" :to="my_profile"
            >自分のプロフィール表示</b-nav-item
          >
          <b-nav-item v-if="mod_status" to="/ctrl">管理</b-nav-item>
          <b-nav-item v-if="!inLogin" to="/login">ログイン</b-nav-item>
          <b-nav-item v-if="inLogin" to="/logout">ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    user: {},
    userName: "",
    img: "",
    inLogin: false,
    existsPublicProfile: false,
    mod_status: false,
  }),
  computed: {
    my_profile: function () {
      let user_id = this.user.twitter_data.user_id;
      return "/profile/" + user_id;
    },
  },
  mounted() {
    this.$authUtil.verifyAuth().then(async () => {
      this.user = this.$store.state.user.data;
      this.userName = this.user.twitter_data.user_name;
      if (!this.user.twitter) {
        return;
      }
      this.inLogin = true;
      this.img = this.user.twitter_data.profile_image;
      let user_id = this.user.twitter_data.user_id;
      this.$logger.debug("ヘッダー ユーザーID", user_id);
      try {
        let initData = await axios.get("/v1/api/user_profile/" + user_id);
        this.$logger.debug("ヘッダープロフィールデータ", initData);
        this.existsPublicProfile = true;

        let modData = await axios.get("/v1/api/moderator_status");
        this.$logger.debug("ヘッダーモデレーターデータ", modData.data);
        this.mod_status = modData.data.status;
      } catch (e) {
        this.$logger.info("not found profile data");
      }
    });
  },
};
</script>
<style lang="scss">
.header_logo {
  width: 100%;
  @media screen and (min-width: 630px) {
    width: 4em;
  }

  width: 1.5em;
}
</style>