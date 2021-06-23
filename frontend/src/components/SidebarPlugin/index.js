import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink";

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  }
};

const MenuStore = {
  showMenu: false,
  displayMenu(value) {
    this.showMenu = value;
  }
};

const SidebarPlugin = {
  install(Vue) {
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore,
        menuStore: MenuStore
      }
    });

    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.prototype.$menu = app.menuStore;
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-link", SidebarLink);
  }
};

export default SidebarPlugin;
