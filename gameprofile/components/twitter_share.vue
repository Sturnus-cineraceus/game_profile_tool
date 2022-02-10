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
  methods: {
    tweet: function () {
      console.log("dadada");
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