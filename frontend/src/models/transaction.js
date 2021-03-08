export default class Transaction {
  constructor(date, category, who) {
    this.id = -1;
    this.date = date;
    this.debit = null;
    this.credit = null;
    this.account = "";
    this.destination = "";
    this.category = category;
    this.subcategory = "";
    this.comment = "";
    this.who = who;
  }
}