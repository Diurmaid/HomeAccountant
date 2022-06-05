// Транзакция\запись о расходе или доходе
export class Transaction {
    // Описание транзакции
    Description;
    // Сумма, полученная или потраченная
    Sum;

    constructor(description, sum) {
        this.Description = description;
        this.Sum = sum;
    }
}