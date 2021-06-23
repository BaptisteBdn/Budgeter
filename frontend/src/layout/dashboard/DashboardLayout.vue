<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          :name="$t('sidebar.dashboard')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/transactions"
          :name="$t('sidebar.transactions')"
          icon="tim-icons icon-credit-card"
        />
        <sidebar-link
          to="/balance"
          :name="$t('sidebar.balance')"
          icon="tim-icons icon-coins"
        />
        <sidebar-link
          to="/categories"
          :name="$t('sidebar.categories')"
          icon="tim-icons icon-bullet-list-67"
        />
      </template>
    </side-bar>
    <div class="main-panel" v-touch:swipe="swipeHandler">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggle" ></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "../ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggle() {
      this.toggleSidebar();
      this.toggleMenu();
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    toggleMenu() {
      if (this.$menu.showMenu) {
        this.$menu.displayMenu(false);
      }
    },
    swipeHandler(direction) {
      if (direction == "right") {
        this.$sidebar.displaySidebar(true);
      }
    },
  },
};
</script>
