<template>
  <div class="wrapper">
    <div class="main-panel">
      <top-navbar></top-navbar>
      <login-content></login-content>
      <content-footer class="footer-login"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar";
import ContentFooter from "../ContentFooter";
import LoginContent from "./Content";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    LoginContent
  }
};
</script>
