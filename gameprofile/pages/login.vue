<template>
  <div class="container">
    <b-overlay class="base" :show="true">
      <div>
        <h2 class="subtitle">Twitterと連携します</h2>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async mounted() {
    try {
      let response = await axios.get("/v1/api/login");
      window.location.href = response.data.url;
    } catch (e) {
      this.$logger.error(e);
    }
  },
};
</script>
<style lang="scss">
.base {
  width: 100%;
  margin: 0 calc(50% - 50vw);
  height: 100vh;
}
</style>