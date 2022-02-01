<template>
  <div>
    <Header></Header>
    <div class="profilem_main">
      <b-container class="prof_cont">
        <b-row>
          <b-col cols="3">EpicID</b-col>
          <b-col>{{ profile_data.epic_name }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="3">1 of 3</b-col>
          <b-col>2 of 3</b-col>
        </b-row>

        <b-row>
          <b-col cols="3">1 of 3</b-col>
          <b-col>2 of 3</b-col>
        </b-row>
      </b-container>
    </div>
    {{ profile_data }}
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
export default {
  components: { Header, Footer },
  name: "Profile",
  async asyncData({ route, error }) {
    try {
      let res = await axios.get(
        "http://localhost:3000/v1/api/user_profile/" + route.params.user_id
      );
      console.log(res.data);
      return { profile_data: res.data };
    } catch (e) {
      error({ statusCode: 404, message: "Profile not found" });
      return;
    }
  },
};
</script>
<style lang="scss">
.profilem_main {
  padding-top: 3em;
  .prof_cont {
    border: 1px solid warning;
    .row {
      background-color: rgba(23, 162, 184, 0.1);
      margin-top: 0.8em;
      border: 1px solid #000000;
      .col {
        padding-top: 2em;
        padding-bottom: 1em;
        border-left: 1px solid #000000;
      }
      .col-3 {
        padding-top: 2em;
        padding-bottom: 1em;
      }
    }
  }
}
</style>