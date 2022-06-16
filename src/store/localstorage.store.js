import { LocalStorageConstant } from '../model/constant.js';
import { Transaction } from '../model/transaction.js';


// Представляет логику работы с локальным хранилищем браузера
export class LocalStore {
    constructor() {
    }

    /**
     * Получить массив со всеми транзакциями
     * @returns {Transaction[]} Массив транзакций, где каждый элемент типа 
     */
    getTransactions() {
        let transJson = localStorage.getItem(LocalStorageConstant.TransactionsKey);
        let arr = JSON.parse(transJson);
        if (!arr) {
            arr = [];
        }
        return arr;
    }

    /**
     * Сохраняет транзакцию в localStorage
     * @param {Transaction} Объект класса transaction 
     */
    setTransaction(transaction) {
        let arr = this.getTransactions();
        arr.push(transaction);
        let newTransJson = JSON.stringify(arr);
        localStorage.setItem(LocalStorageConstant.TransactionsKey, newTransJson);
    }

    deleteTransaction(transaction) {
        let arr = this.getTransactions();
        let deletedTranIndex = arr.findIndex((tran) => tran.ID == transaction.ID);
        arr.splice(deletedTranIndex, 1);
        let newTransJson = JSON.stringify(arr);
        localStorage.setItem(LocalStorageConstant.TransactionsKey, newTransJson);
    }
    
}
