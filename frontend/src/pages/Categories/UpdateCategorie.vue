<template>
  <form
    style="font-weight: bold"
    name="form"
    @submit.prevent="handleUpdateCategory"
  >
    <b-form-group
      label="CATEGORIE ACTUELLE:"
      label-for="nested-category"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-select
        class="form-control"
        style="background-color: #27293d"
        :options="categoryOptions"
        v-model="categoryToUpdate"
        v-on:input="updateSubcategories"
        name="category"
        id="nested-category"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label="NOUVELLE CATEGORIE:"
      label-for="nested-input-category"
      label-align-sm="right"
      label-cols-sm="1"
      v-if="!showUpdateSubCategory"
    >
      <b-form-input
        id="nested-input-category"
        v-model="newCategory"
        v-validate="'required'"
        name="input-category"
      ></b-form-input>
      <div
        v-if="errors.has('input-category')"
        class="alert alert-danger small"
        role="alert"
      >
        Category is required!
      </div>
    </b-form-group>
    <b-form-group
      label="SOUS-CATEGORIE ACTUELLE:"
      label-for="nested-subcategory"
      label-align-sm="right"
      label-cols-sm="1"
      v-if="showUpdateSubCategory"
    >
      <b-form-select
        class="form-control"
        style="background-color: #27293d"
        :options="subcategoryOptions"
        v-model="subCategoryToUpdate"
        name="category"
        id="nested-subcategory"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label="NOUVELLE SOUS-CATEGORIE:"
      label-for="nested-subcategory"
      label-align-sm="right"
      label-cols-sm="1"
      v-if="showUpdateSubCategory"
    >
      <b-form-input
        id="nested-input-subcategory"
        v-model="newSubCategory"
        v-validate="'required'"
        name="input-subcategory"
      ></b-form-input>
      <div
        v-if="errors.has('input-subcategory')"
        class="alert alert-danger small"
        role="alert"
      >
        Subcategory is required!
      </div>
    </b-form-group>
    <div class="text-center">
      <button class="center btn btn-primary btn-block">
        <span>Modifier</span>
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
      newCategory: "",
      newSubCategory: "",
      categoryToUpdate: "",
      subCategoryToUpdate: "",
      categoryOptions: [],
      subcategoryOptions: [],
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
      message: [
        "<b> Erreur - </b> L'ajout de la transaction a échoué !",
        "<b> Succès - </b> La transaction a bien été validée !",
      ],
    };
  },
  props: ["showUpdateSubCategory"],
  created() {
    this.getCategories();
  },
  methods: {
    handleUpdateCategory() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }

        let payload = {};
        let request = "";

        if (!this.showUpdateSubCategory) {
          request = "category/updateCategorie";
          payload = {
            category: this.categoryToUpdate,
            newCategory: this.newCategory,
          };
        } else {
          request = "category/updateSubCategorie";
          payload = {
            category: this.categoryToUpdate,
            subCategory: this.subCategoryToUpdate,
            newSubCategory: this.newSubCategory,
          };
        }

        this.$store.dispatch(request, payload).then(
          (data) => {
            this.$validator.reset();
            this.resetVariable();
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
    updateSubcategories() {
      if (!this.showUpdateSubCategory) {
        return;
      }

      this.$store
        .dispatch("category/getSubcategories", this.categoryToUpdate)
        .then(
          (sub) => {
            this.subcategoryOptions = sub.data;
          },
          (error) => {
            this.notifyVue(0);
          }
        );
    },
    resetVariable() {
      this.newCategory = "";
      this.newSubCategory = "";
      this.categoryToUpdate = "";
      this.subCategoryToUpdate = "";
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