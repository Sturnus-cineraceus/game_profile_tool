<template>
  <div>
    <Header></Header>
    <div id="mod_main">
      <table class="table info_table" v-show="visible">
        <thead>
          <tr>
            <th scope="col">twitter_id</th>
            <th scope="col">Twitter</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in user_list">
            <tr :key="user.twitter_id">
              <td>{{ user.twitter_id }}</td>
              <th>
                <a
                  :href="user.twitter_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ user.twitter_name }}
                </a>
              </th>
              <td>
                <a
                  :href="base_url + user.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ user.id }}</a
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
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
    return { user_list: [], visible: false };
  },
  mounted: async function () {
    try {
      let res = await axios.get("/v1/api/user/list");
      this.user_list = res.data;
      this.visible = true;
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
  computed: {
    base_url: function () {
      return this.$config.HTTP_PROTOCOL + this.$config.DOMAIN + "/profile/";
    },
  },
};
</script>
<style lang="scss">
#mod_main {
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: start;
  .info_table {
    width: 80%;
    padding: 5em;
  }
}
</style>