// Транзакция\запись о расходе или доходе
export class Transaction {
    ID;
    // Описание транзакции
    Description;
    // Сумма, полученная или потраченная
    Sum;
    // Дата создания
    CreatedAt;
    // Дата удаления
    DeletedAt;

    constructor(description, sum) {
        this.ID = this.newID();
        this.Description = description;
        this.Sum = sum;
        this.CreatedAt = new Date();
    }

    newID() {
        return Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000;
    }
}