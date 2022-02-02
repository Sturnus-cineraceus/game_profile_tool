<template>
  <div class="container has-text-centered mt-6">
    <div>
      <h2 class="subtitle">連携中</h2>
      <p>Please Wating...</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  async mounted() {
    let ot = this.$route.query.oauth_token;
    let ov = this.$route.query.oauth_verifier;
    let resp = await axios.get("/v1/api/callback", {
      params: { ot: ot, ov: ov },
    });
    this.$router.push({ path: "/" });
  },
};
</script>