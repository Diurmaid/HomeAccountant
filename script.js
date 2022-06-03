const transactionKey = '_transKey';

transactionInit();

// Добавляет информацию о новой транзакции в LocalStorge, которые были указаны в полях "описание и сумма"
function addTransaction() {
    let desc = document.getElementById("desc").value;
    let sum = document.getElementById("sum").value;

    let transArr = getTransactionsArr();

    // Создаем новый объект
    let newTran = {
        Description: desc,
        Sum: sum,
    };
    // В массив вставляем новый объект
    transArr.push(newTran)

    // Из массива преобразовали в строку и записываем в LocalStorage
    let newTransJson = JSON.stringify(transArr);
    localStorage.setItem(transactionKey, newTransJson);

    addNewTransactionOnCont(newTran);
}

function transactionInit() {
    let trans = getTransactionsArr();
    for (const tran of trans) {
        addNewTransactionOnCont(tran);
    }
}
// Получает из LocalStorage иформацию о транзакциях в виде массива объектов вида { Description: "value", Sum: 12345 }
function getTransactionsArr() {
    let transJson = localStorage.getItem(transactionKey);

    //Преобразовываем JSON в объект 
    let transactions = JSON.parse(transJson);
    if (!transactions) {
        transactions = [];
    }

    return transactions;
}

function addNewTransactionOnCont(tran) {
    let newTranCont = document.createElement("div");
    newTranCont.innerText = `Описание: ${tran.Description} | Сумма: ${tran.Sum}`;
    
    let cont = document.getElementById("trans-cont");
    cont.appendChild(newTranCont);
}