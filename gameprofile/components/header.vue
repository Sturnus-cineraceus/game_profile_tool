<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand @click="$router.push({ path: '/' })" href="#"
        >ゲームの履歴書やるやつ (α版の前段階)
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-nav-text class="text-dark"
            >こんにちは、 {{ userName }}さん
            <b-avatar variant="info" :src="img" class="mr-3"></b-avatar
          ></b-nav-text>

          <b-nav-item
            @click="goProfile"
            v-if="inLogin && existsPublicProfile"
            href="#"
            >自分のプロフィール表示</b-nav-item
          >
          <b-nav-item
            v-if="!inLogin"
            @click="$router.push({ path: '/login' })"
            href="#"
            >ログイン</b-nav-item
          >
          <b-nav-item
            v-if="inLogin"
            @click="$router.push({ path: '/logout' })"
            href="#"
            >ログアウト</b-nav-item
          >
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
  }),
  methods: {
    goProfile: function () {
      let user_id = this.user.twitter_data.user_id;
      this.$router.push({ path: "/profile/" + user_id });
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
      } catch (e) {
        this.$logger.info("not found profile data");
      }
    });
  },
};
</script>