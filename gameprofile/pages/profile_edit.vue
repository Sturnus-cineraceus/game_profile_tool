<template>
  <div>
    <b-form-input v-model="epic_name"></b-form-input>
    <b-button variant="outline-primary" @click="click">Button</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ProfileEdit",
  data: () => ({ hoge: "das", epic_name: "" }),
  async mounted() {
    this.$authUtil.permitLogin().then(() => {
      // this.user = this.$store.state.user.data;
      // this.userName = this.user.twitter_data.user_name;
      // this.login = this.user.twitter;
    });
  },
  methods: {
    click: function () {
      let user = this.$store.state.user.data;
      console.log(user);
      if (!user.twitter_data) {
        console.log("ほげ");
        window.location.href = "/";
        return;
      }
      console.log(user);
      let data = {
        twitter_id: user.twitter_data.id,
        epic_name: this.epic_name,
      };

      axios.post("/v1/api/profile", data).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>