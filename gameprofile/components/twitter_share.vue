<template>
  <div>
    <b-button variant="tw_share" @click="tweet()"
      ><b-icon-twitter class="twicon"></b-icon-twitter
      ><span class="tw_btn_label">ツイート</span></b-button
    >
  </div>
</template>
<script>
export default {
  props: { profile_data: null },
  methods: {
    tweet: function () {
      let nowurl =
        this.$config.HTTP_PROTOCOL +
        this.$config.DOMAIN +
        "/profile/" +
        this.profile_data.user_id;
      let hashtags = "フォートナイト,フォトナプロフ";
      let message = this.profile_data.message.substr(0, 80);
      if (message) {
        message = message + "... ";
      }
      message = message.replace(/\r?\n/g, " ");
      message = '"' + message + '"';
      let tweeturl =
        "https://twitter.com/intent/tweet?hashtags=" +
        hashtags +
        "&url=" +
        nowurl +
        "&text=" +
        message;

      window.open(tweeturl, "_blank");
    },
  },
};
</script>
<style lang="scss">
.btn-tw_share {
  background-color: #1da1f2;
  color: #ffffff;
  //   border: 1px solid #000000;
  vertical-align: middle;
  .twicon {
    width: 32px;
    height: 32px;
  }
  .tw_btn_label {
    padding-left: 0.5em;
  }
  .share-icon {
    margin-left: 1em;
    width: 16px;
    height: 16px;
  }
}
.btn-tw_share:hover {
  background-color: #1da1f2;
  color: #ffffff;
  //   border: 1px solid #000000;
}
</style>