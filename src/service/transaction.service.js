import { Transaction } from '../model/transaction.js';
import { LocalStore } from "../store/localstorage.store.js";

export class TransactionServise {
    LocalStore;

    constructor() {
        this.LocalStore = new LocalStore();
    }

    /**
     * Получает со страницы ввод пользователя и сохраняет новую транзакцию на его основе
     */
    createNewTransaction() {
        let descElement = document.getElementById("desc");
        let sumElement = document.getElementById("sum");
        let desc = descElement.value;
        let sum = sumElement.value;
        if (!desc || !sum) {
            return;
        }
                
        let newTran = new Transaction(desc, sum);
        this.LocalStore.setTransaction(newTran);

        this.viewTransaction(newTran);
        descElement.value = null;
        sumElement.value = null;
    }

    /**
     * Достает все транзакции из хранилища и отображает на странице
     */
    viewTransactions() {
        let tranArr = this.LocalStore.getTransactions();
        for (let tran of tranArr) {
            this.viewTransaction(tran);
        }
    }

    /**
     * Добавляет отображение транзакции на странице приложения
     * @param {Transaction} 
     */
    viewTransaction(tran) {
        let newTranCont = document.createElement("div");
        newTranCont.className = "transactions_tran";
    
        let info = document.createElement("div");
        info.className = "transactions_info";
    
        let desc = document.createElement("div");
        desc.className = "transactions_desc";
        desc.innerText = tran.Description;
    
        let sum = document.createElement("div");
        sum.className = "transactions_sum";
        sum.innerText = tran.Sum;
        
        let deleteCont = document.createElement("div");
        deleteCont.className = "transaction_delete-cont";
    
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "transactions_delete";
        deleteBtn.addEventListener('click', () => {
            if(confirm('Do you want to delete a transaction?')) {
                this.deleteTransaction(tran);
                newTranCont.remove();
            }
        });
    
        info.appendChild(desc);
        info.appendChild(sum);
        newTranCont.appendChild(info);
        deleteCont.appendChild(deleteBtn);
        newTranCont.appendChild(deleteCont);
        
        let cont = document.getElementById("trans-cont");
        cont.appendChild(newTranCont);
    }

    deleteTransaction(transaction) {
        this.LocalStore.deleteTransaction(transaction);
    }
}


