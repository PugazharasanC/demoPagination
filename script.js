let currentPage = 0;

function reqListener() {
    let data = JSON.parse(this.response);
    doPagination(data);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://restcountries.eu/rest/v2/all");
oReq.send();


function doPagination(data) {
    console.log(data);
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    let dataDiv = document.createElement("div");
    dataDiv.id = "dataDiv";
    document.body.appendChild(dataDiv);
    document.body.appendChild(mainDiv);
    let numDetailsPerPage = 25;
    createButtons(data, numDetailsPerPage);
}

function createButtons(data, numDetailsPerPage) {
    let num = Math.ceil(data.length / numDetailsPerPage);
    console.log(num);
    let mainDiv = document.getElementById('mainDiv');
    let prevButton = document.createElement("button");
    prevButton.innerHTML = "prev";
    prevButton.className = "btn btn-primary"
    prevButton.onclick = () => {
        if (currentPage != 0)
            document.getElementById("button"+(currentPage - 1)).click();
    };
    mainDiv.appendChild(prevButton);
    for (let ind = 0; ind < num; ind++) {
        let button = document.createElement("button");
        mainDiv.appendChild(button);
        button.id = "button"+ind;
        button.innerHTML = "" + (ind + 1);
        button.className = "btn btn-primary"
        button.onclick = () => {
            let buttons = document.getElementsByClassName("btn btn-success");
            console.log(buttons);
            for (const button of buttons) {
                button.className = "btn btn-primary"
            };
            button.className = "btn btn-success"
            fillData(data, numDetailsPerPage, ind)
        };

    }

    let nextButton = document.createElement("button");
    nextButton.innerHTML = "next";
    nextButton.className = "btn btn-primary"
    nextButton.onclick = () => {
        if (currentPage + 1 != num)
            document.getElementById("button"+(currentPage + 1)).click();
    };
    mainDiv.appendChild(nextButton);
    currentPage = 0;
    document.getElementById("button"+(currentPage)).click();
}

function fillData(data, numDetailsPerPage, ind) {
    let dataDiv = document.getElementById("dataDiv");
    dataDiv.innerHTML = "";
    currentPage = ind;
    let table = document.createElement("table");

    let tr = document.createElement("tr");

    Object.keys(data[0]).forEach((key) => {
        let thead = document.createElement("th");
        thead.innerHTML = key;
        tr.appendChild(thead);
    })

    table.appendChild(tr);

    for (let dataInd = ind * numDetailsPerPage; dataInd < (ind + 1) * numDetailsPerPage && data.length > dataInd; dataInd++) {
        let tr = document.createElement("tr");
        Object.keys(data[0]).forEach((key) => {
            let td = document.createElement("td");
            td.innerHTML = data[dataInd][key];
            tr.appendChild(td);
        })
        table.appendChild(tr);
    }

    dataDiv.appendChild(table);

}