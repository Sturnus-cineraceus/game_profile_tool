<template>
  <div>
    <footer>
      <b-row align-h="start">
        <b-col cols="6" md="3">
          <div class="copyright">Copyright 2022 glorificatio.</div>
        </b-col>
        <b-col cols="4" md="3">
          <div>
            <nuxt-link to="/info/readme">各種ポリシー</nuxt-link>
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
    width: 100%;
    a {
      color: var(--white);
    }
  }
}
.copyright {
  padding-left: 1em;
}
</style>