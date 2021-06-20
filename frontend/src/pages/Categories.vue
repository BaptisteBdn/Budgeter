<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction" v-if="showAddCategory">
          <template slot="header">
            <h4 class="title d-inline">Ajouter une catégorie</h4>

            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a
                class="dropdown-item"
                href="#categories"
                v-if="showSelectCategory"
                @click="show('SelectCategory', false)"
                >Nouvelle catégorie</a
              >
              <a
                class="dropdown-item"
                href="#categories"
                v-if="!showSelectCategory"
                @click="show('SelectCategory', true)"
                >Catégories existantes</a
              >
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#categories"
                @click="show('AddCategory', false)"
                >Cacher</a
              >
            </base-dropdown>
          </template>
          <div>
            <add-category
              @refreshCategory="refreshCategories"
              v-bind:showSelectCategory="showSelectCategory"
            ></add-category>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction" v-if="showDeleteCategory">
          <template slot="header">
            <h4 class="title d-inline">Supprimer une catégorie</h4>

            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a
                class="dropdown-item"
                href="#categories"
                @click="show('DeleteCategory', false)"
                >Cacher</a
              >
            </base-dropdown>
          </template>
          <div>
            <delete-category
              @refreshCategory="refreshCategories"
            ></delete-category>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction">
          <template slot="header">
            <h4 class="title d-inline">Categories</h4>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a
                class="dropdown-item"
                href="#categories"
                @click="show('AddCategory', true)"
                >Ajouter une categorie</a
              >
              <a
                class="dropdown-item"
                href="#categories"
                @click="show('AddCategory', true)"
                >Modifier une categorie</a
              >
              <a
                class="dropdown-item"
                href="#categories"
                @click="show('DeleteCategory', true)"
                >Supprimer une categorie</a
              >
            </base-dropdown>
          </template>
          <div>
            <b-table
              small
              responsive
              hover
              :fields="fields"
              :items="items"
              primary-key="a"
              style="white-space: pre-line"
            >
            </b-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import AddCategory from "./Categories/AddCategories.vue";
import DeleteCategory from "./Categories/DeleteCategorie.vue";

export default {
  components: {
    AddCategory,
    DeleteCategory,
  },
  data() {
    return {
      title: "Transactions",
      showAddCategory: false,
      showSelectCategory: true,
      showDeleteCategory: false,
      fields: [
        {
          key: "categories",
        },
        {
          key: "subcategories",
          label: "sous-categories",
        },
      ],
      items: [],
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
      message: [
        "<b> Erreur - </b> La suppression de la transaction a échouée !",
        "<b> Succès - </b> La transaction a bien été supprimée !",
      ],
    };
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      this.$store.dispatch("category/getAllCategories").then(
        (category) => {
          this.items = category.data.map((category) => {
            return {
              categories: category.category,
              subcategories: category.subcategories.join("\n"),
            };
          });
        },
        (error) => {
          this.notifyVue(
            0,
            (error.response && error.response.data.message) ||
              error.message ||
              error.toString()
          );
        }
      );
    },
    refreshCategories() {
      this.getAllCategories();
    },
    show(type, boolean) {
      switch (type) {
        case "AddCategory":
          this.showAddCategory = boolean;
          this.showDeleteCategory = false;
          break;
        case "UpdateCategory":
          break;
        case "DeleteCategory":
          this.showDeleteCategory = boolean;
          this.showAddCategory = false;
          break;
        case "SelectCategory":
          this.showSelectCategory = boolean;
          break;
      }
      this.scrollToTop();
    },
    notifyVue(success, message) {
      this.$notify({
        component: NotificationTemplate,
        horizontalAlign: "center",
        verticalAlign: "bottom",
        type: this.type[success],
        icon: this.icon[success],
        message: message,
        timeout: 2500,
      });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>.