<template>
  <div class="container has-text-centered mt-6">
    <div>
      <h3 class="subtitle">ログアウトしました</h3>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("/v1/api/logout").then((res) => {
      window.location.href = "/";
    });
  },
};
</script>