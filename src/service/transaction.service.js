import { Transaction } from '../model/transaction.js';
import { LocalStore } from "../store/localstorage.store.js";

export class TransactionServise {
    LocalStore;

    deleteIconTemplate = `<svg enable-background="new 0 0 40 40" id="Слой_1" class="transaction__icon" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>`;
    editIconTemplate = `<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" class="transaction__icon" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
    <path d="m18,42l-18,6 6-18 30-30 12,12-30,30zm-12,0l9-3-6-6-3,9zm6-12l6,6 18-18-6-6-18,18z"/>
    </svg>`
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
        deleteBtn.innerHTML = this.deleteIconTemplate;

        //Добавляю контейнер с иконкой редактировать 
        let editCont = document.createElement("div");
        editCont.className = "transaction_edit-cont";

        let editBtn = document.createElement("button");
        editBtn.className = "transaction_edit";
        editBtn.innerHTML = this.editIconTemplate;


        info.appendChild(desc);
        info.appendChild(sum);
        newTranCont.appendChild(info);
        editCont.appendChild(editBtn);
        newTranCont.appendChild(editCont);
        deleteCont.appendChild(deleteBtn);
        newTranCont.appendChild(deleteCont);
        
        let cont = document.getElementById("trans-cont");
        cont.appendChild(newTranCont);
    }

    deleteTransaction(transaction) {
        this.LocalStore.deleteTransaction(transaction);
    }
}


