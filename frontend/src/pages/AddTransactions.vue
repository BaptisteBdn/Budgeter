<template>
  <div class="row">
    <div class="col-12" style="font-weight: bold">
      <card>
        <b-form-group
          label="DATE:"
          label-for="nested-date"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-input
            id="nested-date"
            type="date"
            v-model="currentDate"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="DEBIT:"
          label-for="nested-debit"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-input v-model="debit" id="nested-debit"></b-form-input>
        </b-form-group>
        <b-form-group
          label="CREDIT:"
          label-for="nested-credit"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-input v-model="credit" id="nested-credit"></b-form-input>
        </b-form-group>
        <b-form-group
          label="COMPTE:"
          label-for="nested-account"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-select
            class="form-control"
            style="background-color: #27293d"
            v-model="account"
            :options="accountOptions"
            id="nested-account"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="BENEFICIAIRE/EMETTEUR:"
          label-for="nested-destination"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-input
            v-model="destination"
            id="nested-destination"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="CATEGORIE:"
          label-for="nested-category"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-select
            class="form-control"
            style="background-color: #27293d"
            v-model="category"
            :options="categoryOptions"
            id="nested-category"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="SOUS-CATEGORIE:"
          label-for="nested-subcategory"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-select
            class="form-control"
            style="background-color: #27293d"
            v-model="subcategory"
            :options="subcategoryOptions"
            id="nested-subcategory"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="COMMENTAIRE:"
          label-for="nested-comment"
          label-align-sm="right"
          label-cols-sm="1"
        >
          <b-form-input v-model="comment" id="nested-comment"></b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button
            @click="validate()"
            class="center btn btn-sm btn-primary btn-simple"
          >
            Ajouter
          </b-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
export default {
  data() {
    return {
      currentDate: new Date().toISOString().substr(0, 10),
      debit: null,
      credit: null,
      account: null,
      destination: null,
      category: null,
      subcategory: null,
      comment: null,
      accountOptions: [
        { value: "card", text: "Carte" },
      ],
      categoryOptions: [
        { value: "hobbies", text: "Culture & Sport" },
        { value: "health", text: "Santé & Bien-être" },
      ],
      subcategoryOptions: [
        { value: "videogames", text: "Jeux Vidéos" },
        { value: "cosmetics", text: "Cosmétiques" },
      ],
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
      message: [
        "<b> Erreur - </b> L'ajout de la transaction a échoué !",
        "<b> Succès - </b> La transaction a bien été ajoutée !",
      ],
    };
  },
  methods: {
    validate() {
      this.debit = null;
      this.credit = null;
      this.account = null;
      this.destination = null;
      this.category = null;
      this.subcategory = null;
      this.comment = null;
      this.notifyVue("bottom", "center", 1);
    },
    notifyVue(verticalAlign, horizontalAlign, success) {
      this.$notify({
        component: NotificationTemplate,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[success],
        icon: this.icon[success],
        message: this.message[success],
        timeout: 2500,
      });
    }
  },
};
</script>