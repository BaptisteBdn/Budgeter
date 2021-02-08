<template>
  <div class="row">
    <div class="col-12">
      <card :title="title">
        <div>
          <b-table small responsive fixed hover :fields="fields" :items="items">
            <template #cell(date)="data">
              <b-input
                type="date"
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(credit)="data">
              <b-input
                v-model="data.value"
                style="font-weight: bold"
                class="text-success"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(debit)="data">
              <b-input
                v-model="data.value"
                style="font-weight: bold"
                class="text-danger"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(account)="data">
              <b-input
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(destination)="data">
              <b-input
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(category)="data">
              <b-input
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(subcategory)="data">
              <b-input
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(comment)="data">
              <b-input
                v-model="data.value"
                class="text-light"
                :plaintext="data.index != selectedIndex"
                :disabled="data.index != selectedIndex"
              ></b-input>
            </template>
            <template #cell(actions)="data">
              <b-button
                size="sm"
                @click="edit(data.index)"
                :disabled="selectedIndex != -1 && data.index != selectedIndex"
                class="mr-1"
              >
                <b-icon :icon="getIcon(data.index)"></b-icon>
              </b-button>
              <b-button
                size="sm"
                @click="remove(data.index)"
                :disabled="selectedIndex != -1 && data.index != selectedIndex"
                class="mr-1"
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
      selectedIndex: -1,
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
          date: "2021-01-04",
          credit: "",
          debit: "1333.99",
          account: "Carte",
          destination: "Epic games",
          category: "Culture & Sport",
          subcategory: "Jeux Vidéos",
          comment: "Satisfactory",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "13.00",
          account: "Carte",
          destination: "Décathlon",
          category: "Santé & Bien-être",
          subcategory: "Produit de beauté",
          comment: "Serviette cheveux + sports bra",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "21.75",
          debit: "",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
          credit: "",
          debit: "21.75",
          account: "Carte",
          destination: "Jardiland",
          category: "Culture & Sport",
          subcategory: "Cadeaux & Dons",
          comment: "Cadeau justine",
        },
        {
          date: "2021-01-04",
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
      this.selectedIndex = -1;
    },
    edit(index) {
      if (this.selectedIndex == index) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = index;
      }
    },
    getIcon(index) {
      if (this.selectedIndex == index) {
        return "check-square";
      } else {
        return "pencil-square";
      }
    },
    convertDate(date) {
      console.log(new Date().toISOString().substr(0, 10));
      return new Date().toISOString().substr(0, 10);
    },
  },
};
</script>