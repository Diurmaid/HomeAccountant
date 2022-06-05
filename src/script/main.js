import { TransactionServise } from "../service/transaction.service.js";

let tranService = new TransactionServise();

(function Init() {
    tranService.viewTransactions();
    initEventListeners();
})();

function initEventListeners() {
    let addBtn = document.getElementById("add-transaction-btn");
    addBtn.addEventListener('click', () => {
        tranService.createNewTransaction();
    });
}