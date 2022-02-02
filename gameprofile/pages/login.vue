<template>
  <div class="container has-text-centered mt-6">
    <div>
      <h2 class="subtitle">Twitterと連携します</h2>
    </div>
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