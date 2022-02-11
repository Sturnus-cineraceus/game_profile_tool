<template>
  <div>
    <Header></Header>
    <div id="mod_main">
      <b-table striped hover :items="user_list"></b-table>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
export default {
  components: { Header, Footer },
  data: function () {
    return { user_list: [] };
  },
  mounted: async function () {
    try {
      let res = await axios.get("/v1/api/user/list");
      this.user_list = res.data;
    } catch (e) {
      this.$logger.debug(e);
      window.location.href = "/";
    }
  },
  created: async function () {
    if (!process.server) {
      try {
        await this.$authUtil.permitModerator();
      } catch (e) {
        this.$logger.debug(e);
        window.location.href = "/";
      }
    }
  },
};
</script>
<style lang="scss">
#mod_main {
  width: 100%;
  min-height: 200px;
}
</style>