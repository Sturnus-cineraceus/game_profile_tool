<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">ゲームの履歴書やるやつ</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-nav-text class="text-dark"
            >こんにちは、 {{ userName }}さん</b-nav-text
          >
          <b-nav-item href="/profile">プロフィール</b-nav-item>
          <b-nav-item href="/login">ログイン</b-nav-item>
          <b-nav-item href="/logout">ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data: () => ({ user: {}, userName: "" }),
  mounted() {
    console.log(this.$authUtil);
    this.$authUtil.verifyAuth().then(() => {
      this.user = this.$store.state.user.data;
      this.userName = this.user.twitter_data.user_name;
    });
  },
};
</script>