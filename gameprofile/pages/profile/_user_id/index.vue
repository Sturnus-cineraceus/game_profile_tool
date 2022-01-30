<template>
  <div>
    <Header></Header>
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
        "http://localhost:3000/v1/api/profile/" + route.params.user_id
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