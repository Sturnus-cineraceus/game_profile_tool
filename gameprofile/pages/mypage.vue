<template>
  <div class="container has-text-centered mt-6">
    <div>
      <h1 class="title">sample-nuxt-auth</h1>
      <h2 class="subtitle">マイページ</h2>
      <p>こんにちは、{{ familyName }}さん</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  middleware: "useAuth",
  computed: {
    familyName() {
      console.log(this.$auth);
      return this.$auth.loggedIn ? this.$auth.$state.user.nickname : "ゲスト";
    },
  },
};
</script>