<template>
  <div>
    <footer class="fixed-bottom">
      <b-row align-h="start">
        <b-col cols="6" md="3">
          <div>Copyright 2022 glorificatio.</div>
        </b-col>
        <b-col cols="4" md="3">
          <div>
            <nuxt-link to="/info/readme">各ポリシー</nuxt-link>
          </div>
        </b-col>
      </b-row>
    </footer>
  </div>
</template>
<style lang="scss">
footer {
  // padding-top: 2em;
  background-color: var(--cyan);
  color: var(--white);
  min-height: 1em;
  div {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.5em;
    a {
      color: var(--white);
    }
  }
}
</style>