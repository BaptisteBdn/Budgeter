<template>
  <div class="row">
    <div class="col-12">
      <card>
        <div>
          <b-table small responsive hover :fields="fields" :items="items">
            <template #cell(credit)="data">
              <b class="text-success">{{ data.value }}</b>
            </template>
            <template #cell(debit)="data">
              <b class="text-danger">{{ data.value }}</b>
            </template>

            <template #cell(actions)="row">
              <b-button
                @click="edit(row.index)"
                class="mr-1 btn btn-sm btn-primary btn-simple"
              >
                <b-icon icon="pencil-square"></b-icon>
              </b-button>
              <b-button
                @click="remove(row.index)"
                class="mr-1 btn btn-sm btn-primary btn-simple"
              >
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </template>
          </b-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Transactions",
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
      items: [
        {
          date: "04/01/2021",
          credit: "",
          debit: "1333.99",
          account: "Carte",
          destination: "Epic games",
          category: "Culture & Sport",
          subcategory: "Jeux Vidéos",
          comment: "Satisfactory",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "13.00",
          account: "Carte",
          destination: "Décathlon",
          category: "Santé & Bien-être",
          subcategory: "Produit de beauté",
          comment: "Serviette cheveux + sports bra",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "21.75",
          debit: "",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "04/01/2021",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
      ],
    };
  },
  methods: {
    remove(index) {
      this.items.splice(index, 1);
    },
    edit(index) {}
  }
};
</script>