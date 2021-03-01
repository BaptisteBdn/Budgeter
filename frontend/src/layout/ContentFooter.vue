<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/BaptisteBdn/Budgeter">
            Github
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://www.apache.org/licenses/LICENSE-2.0">
            License
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{year}} made by
        <a href="https://github.com/BaptisteBdn" target="_blank" rel="noopener">BaptisteBdn</a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
