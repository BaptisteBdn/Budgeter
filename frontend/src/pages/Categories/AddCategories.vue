<template>
  <form
    style="font-weight: bold"
    name="form"
    @submit.prevent="handleAddCategory"
  >
    <b-form-group
      label="CATEGORIE:"
      label-for="nested-category"
      label-align-sm="right"
      label-cols-sm="1"
      v-if="!showSelectCategory"
    >
      <b-form-input
        id="nested-category"
        v-model="category.category"
        name="category"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="CATEGORIE:"
      label-for="nested-category"
      label-align-sm="right"
      label-cols-sm="1"
      v-if="showSelectCategory"
    >
      <b-form-select
        class="form-control"
        style="background-color: #27293d"
        :options="categoryOptions"
        v-model="category.category"
        name="category"
        id="nested-category"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label="SOUS-CATEGORIE:"
      label-for="nested-subcategory"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-subcategory"
        v-model="category.subcategory"
        v-validate="'required'"
        name="subcategory"
      ></b-form-input>
      <div
        v-if="errors.has('subcategory')"
        class="alert alert-danger small"
        role="alert"
      >
        Subcategory is required!
      </div>
    </b-form-group>
    <div class="text-center">
      <button class="center btn btn-primary btn-block">
        <span>Ajouter</span>
      </button>
    </div>
  </form>
</template>

<script>
import Category from "../../models/category";
import NotificationTemplate from "../Notifications/NotificationTemplate";

export default {
  data() {
    return {
      category: new Category(),
      categoryOptions: [],
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
      message: [
        "<b> Erreur - </b> L'ajout de la transaction a échoué !",
        "<b> Succès - </b> La transaction a bien été validée !",
      ],
    };
  },
  props: ["showSelectCategory"],
  created() {
    this.getCategories();
  },
  methods: {
    handleAddCategory() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }

        this.$store.dispatch("category/create", this.category).then(
          (data) => {
            this.$validator.reset();
            this.category = new Category();
            this.getCategories();
            this.$emit("refreshCategory");
            this.notifyVue(1);
          },
          (error) => {
            this.notifyVue(0);
          }
        );
      });
    },
    getCategories() {
      this.$store.dispatch("category/getCategories").then(
        (category) => {
          this.categoryOptions = category.data;
        },
        (error) => {
          this.notifyVue(0);
        }
      );
    },
    notifyVue(success) {
      this.$notify({
        component: NotificationTemplate,
        horizontalAlign: "center",
        verticalAlign: "bottom",
        type: this.type[success],
        icon: this.icon[success],
        message: this.message[success],
        timeout: 2500,
      });
    },
  },
};
</script>