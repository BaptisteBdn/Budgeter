<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction" v-if="addTransaction">
          <template slot="header">
            <h6 class="title d-inline">Ajouter une transaction</h6>
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
              @addTransaction="getTransactions"
            ></add-transaction>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="addtransaction">
          <template slot="header">
            <h6 class="title d-inline">Transactions</h6>
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
                  @click="edit(row.index)"
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
      addTransaction: false,
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
    this.addTransaction = this.$route.query.addTransaction;
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
    edit(index) {},
    hideTransaction() {
      this.addTransaction = false;
    },
    showTransaction() {
      this.addTransaction = true;
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
  },
};
</script>.