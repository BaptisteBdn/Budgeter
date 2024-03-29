<template>
  <form
    style="font-weight: bold"
    name="form"
    @submit.prevent="handleAddTransaction"
  >
    <b-form-group
      label="DATE:"
      label-for="nested-date"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-date"
        type="date"
        v-model="transaction.date"
        v-validate="'required'"
        name="date"
      ></b-form-input>
      <div
        v-if="errors.has('date')"
        class="alert alert-danger small"
        role="alert"
      >
        Date is required!
      </div>
    </b-form-group>
    <b-form-group
      label="CREDIT:"
      label-for="nested-credit"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-credit"
        type="number"
        v-model="transaction.credit"
        step="0.01"
        min="0"
        name="credit"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="DEBIT:"
      label-for="nested-debit"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-debit"
        type="number"
        v-model="transaction.debit"
        step="0.01"
        min="0"
        name="debit"
      ></b-form-input>
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
        :options="accountOptions"
        v-model="transaction.account"
        v-validate="'required'"
        name="account"
        id="nested-account"
      ></b-form-select>
      <div
        v-if="errors.has('account')"
        class="alert alert-danger small"
        role="alert"
      >
        Account is required!
      </div>
    </b-form-group>
    <b-form-group
      label="BENEFICIAIRE/EMETTEUR:"
      label-for="nested-destination"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-destination"
        v-model="transaction.destination"
        name="destination"
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
        :options="categoryOptions"
        v-model="transaction.category"
        v-on:input="updateSubcategories"
        v-validate="'required'"
        name="category"
        id="nested-category"
      ></b-form-select>
      <div
        v-if="errors.has('category')"
        class="alert alert-danger small"
        role="alert"
      >
        Category is required!
      </div>
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
        :options="subcategoryOptions"
        v-model="transaction.subcategory"
        v-validate="'required'"
        name="subcategory"
        id="nested-subcategory"
      ></b-form-select>
      <div
        v-if="errors.has('subcategory')"
        class="alert alert-danger small"
        role="alert"
      >
        Subcategory is required!
      </div>
    </b-form-group>
    <b-form-group
      label="COMMENTAIRE:"
      label-for="nested-comment"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-input
        id="nested-comment"
        v-model="transaction.comment"
        name="comment"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="POUR:"
      label-for="nested-who"
      label-align-sm="right"
      label-cols-sm="1"
    >
      <b-form-checkbox-group
        id="nested-who"
        v-model="transaction.who"
        :options="whoOptions"
        name="who"
        buttons
        button-variant="btn btn-sm btn-primary btn-simple"
      ></b-form-checkbox-group>
    </b-form-group>
    <div class="text-center">
      <button class="center btn btn-primary btn-block">
        <span v-if="!showUpdate">Ajouter</span>
        <span v-if="showUpdate">Modifier</span>
      </button>
    </div>
  </form>
</template>

<script>
import Transaction from "../../models/transaction";
import NotificationTemplate from "../Notifications/NotificationTemplate";

export default {
  data() {
    return {
      transaction: Transaction.DateInstance(this.currentDate()),
      currentUser: null,
      accountOptions: [{ value: "Carte", text: "Carte" }],
      categoryOptions: [],
      subcategoryOptions: [],
      whoOptions: [],
      showUpdate: false,
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
      message: [
        "<b> Erreur - </b> L'ajout de la transaction a échoué !",
        "<b> Succès - </b> La transaction a bien été validée !",
      ],
    };
  },
  props: ["currentTransactionId"],
  watch: {
    currentTransactionId: function (id) {
      if (id === -1) {
        this.$validator.reset();
        this.showUpdate = false;
        this.transaction = Transaction.DateWhoInstance(this.currentDate(), [
          this.currentUser,
        ]);
        this.subcategoryOptions = [];
        return;
      }
      this.showUpdate = true;
      this.getTransaction(id);
    },
    currentUser: function (id) {
      this.transaction.who = [id];
    },
  },
  created() {
    this.getCategories();
    this.getUsernames();
    if (this.currentTransactionId != -1) {
      this.showUpdate = true;
      this.getTransaction(this.currentTransactionId);
    }
  },
  methods: {
    currentDate() {
      return new Date().toISOString().substr(0, 10);
    },
    getTransaction(id) {
      this.$store.dispatch("transaction/getTransaction", id).then(
        (transaction) => {
          this.transaction = new Transaction(
            transaction.data.id,
            transaction.data.date,
            transaction.data.credit,
            transaction.data.debit,
            transaction.data.account,
            transaction.data.destination,
            transaction.data.category,
            transaction.data.subcategory,
            transaction.data.comment,
            transaction.data.who
          );
        },
        (error) => {
          this.notifyVue(0);
        }
      );
    },
    getUsernames() {
      this.$store.dispatch("user/getUsernames").then(
        (usernames) => {
          this.whoOptions = usernames.data.map((u) => {
            if (u.currentUser) {
              this.currentUser = u.id;
            }
            return { text: u.username, value: u.id };
          });
        },
        (error) => {
          this.notifyVue(0);
        }
      );
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
      this.$store
        .dispatch("category/getSubcategories", this.transaction.category)
        .then(
          (sub) => {
            this.subcategoryOptions = sub.data;
          },
          (error) => {
            this.notifyVue(0);
          }
        );
    },
    handleAddTransaction() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }

        let request = this.showUpdate
          ? "transaction/updateTransaction"
          : "transaction/createTransaction";

        this.$store.dispatch(request, this.transaction).then(
          (data) => {
            this.$validator.reset();
            this.transaction = Transaction.DateWhoInstance(this.currentDate(), [
              this.currentUser,
            ]);
            this.$emit("addTransaction", this.showUpdate);
            this.notifyVue(1);
          },
          (error) => {
            this.notifyVue(0);
          }
        );
      });
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