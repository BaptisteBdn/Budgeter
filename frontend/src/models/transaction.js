export default class Transaction {
  constructor(id, date, credit, debit, account, destination, category, subcategory, comment, who) {
    this.id = id;
    this.date = date;
    this.credit = credit;
    this.debit = debit;
    this.account = account;
    this.destination = destination;
    this.category = category;
    this.subcategory = subcategory;
    this.comment = comment;
    this.who = who;
  }

  static DateInstance(date) {
    return new Transaction(-1, date, null, null, "", "", "", "", "", []);
  }

  static DateWhoInstance(date, who) {
    return new Transaction(-1, date, null, null, "", "", "", "", "", who);
  }
}