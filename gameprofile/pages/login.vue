<template>
  <div class="container has-text-centered mt-6">
    <Header></Header>
    <div>
      <h2 class="subtitle">Twitterと連携します</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/header";
export default {
  components: { Header },
  async mounted() {
    try {
      let response = await axios.get("/v1/api/login");
      console.log(response.data.url);
      window.location.href = response.data.url;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>