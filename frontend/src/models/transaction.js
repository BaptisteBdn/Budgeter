export default class Transaction {
  constructor(date) {
    this.date = date;
    this.debit = null;
    this.credit = null;
    this.account = "";
    this.destination = "";
    this.category = "";
    this.subcategory = "";
    this.comment = "";
    this.who = [];
  }
}
