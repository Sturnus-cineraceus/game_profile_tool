<template>
  <div>
    <nuxt-link to="/profile_edit">書き込み</nuxt-link>
  </div>
</template>
<script>
export default {
  mounted: function () {
    console.log(this.$store.state.user.data);
  },
};
</script>