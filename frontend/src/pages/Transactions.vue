<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction" v-if="showAddTransaction">
          <template slot="header">
            <h4 class="title d-inline" v-if="!showUpdate">
              {{ $t("transactions.add.title") }}
            </h4>
            <h4 class="title d-inline" v-if="showUpdate">
              {{ $t("transactions.update.title") }}
            </h4>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a
                class="dropdown-item"
                href="#transactions"
                @click="hideTransaction()"
                >Cacher</a
              >
            </base-dropdown>
          </template>
          <div>
            <add-transaction
              @addTransaction="handleAddTransaction"
              v-bind:currentTransactionId="currentTransactionId"
            ></add-transaction>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction">
          <template slot="header">
            <h4 class="title d-inline">Transactions</h4>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a
                class="dropdown-item"
                href="#transactions"
                @click="showTransaction()"
                >Ajouter une transaction</a
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
            >
              <template #cell(credit)="data">
                <b class="text-success">{{ data.value }}</b>
              </template>
              <template #cell(debit)="data">
                <b class="text-danger">{{ data.value }}</b>
              </template>

              <template #cell(actions)="row">
                <base-button
                  type="link"
                  @click="edit(row.item)"
                  aria-label="edit button"
                >
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
                <base-button
                  type="link"
                  @click="remove(row.index, row.item)"
                  aria-label="trash button"
                >
                  <i class="tim-icons icon-trash-simple"></i>
                </base-button>
              </template>
            </b-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import AddTransaction from "./Transaction/AddTransactions";

export default {
  components: {
    AddTransaction,
  },
  data() {
    return {
      title: "Transactions",
      showAddTransaction: false,
      showUpdate: true,
      currentTransactionId: -1,
      fields: [
        {
          key: "date",
        },
        {
          key: "credit",
        },
        {
          key: "debit",
        },
        {
          key: "account",
          label: "Compte",
        },
        {
          key: "destination",
          label: "Beneficiaire/Emetteur",
        },
        {
          key: "category",
          label: "Categorie",
        },
        {
          key: "subcategory",
          label: "Sous-Categorie",
        },
        {
          key: "comment",
          label: "Commentaire",
        },
        {
          key: "who",
          label: "pour",
        },
        {
          key: "actions",
          label: "Actions",
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
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      this.$store.dispatch("transaction/getTransactions").then(
        (transactions) => {
          this.items = transactions.data.map((transaction) => {
            return {
              id: transaction.id,
              date: new Date(transaction.date).toLocaleDateString("fr-FR"),
              credit: transaction.credit,
              debit: transaction.debit,
              account: transaction.account,
              destination: transaction.destination,
              category: transaction.category,
              subcategory: transaction.subcategory,
              comment: transaction.comment,
              who: transaction.who,
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
    handleAddTransaction(isUpdate) {
      if (isUpdate) {
        this.showAddTransaction = false;
      }
      this.getTransactions();
    },
    remove(index, item) {
      if (!confirm("Do you really want to delete?")) {
        return;
      }

      this.$store.dispatch("transaction/deleteTransaction", item.id).then(
        (transactions) => {
          this.items.splice(index, 1);
          this.notifyVue(1, this.message[1]);
        },
        (error) => {
          this.notifyVue(0, this.message[0]);
        }
      );
    },
    edit(item) {
      this.currentTransactionId = item.id;
      this.showUpdate = true;
      this.showAddTransaction = true;
      this.scrollToTop();
    },
    hideTransaction() {
      this.showAddTransaction = false;
    },
    showTransaction() {
      this.currentTransactionId = -1;
      this.showUpdate = false;
      this.showAddTransaction = true;
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