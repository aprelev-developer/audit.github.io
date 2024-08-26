document.addEventListener("DOMContentLoaded", function () {
    openTab(null, 'Experts');
    loadExperts();
    loadOrganizations();
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    }
}

function openExpertForm() {
    document.getElementById("expertForm").style.display = "block";
}

function closeExpertForm() {
    document.getElementById("expertForm").style.display = "none";
}

function saveExpert() {
    let name = document.getElementById("expertName").value;
    let email = document.getElementById("expertEmail").value;
    let organization = document.getElementById("expertOrganization").value;

    if (name && email) {
        let experts = JSON.parse(localStorage.getItem('experts')) || [];
        experts.push({ name, email, organization });
        localStorage.setItem('experts', JSON.stringify(experts));
        loadExperts();
        closeExpertForm();
    } else {
        alert("Имя и email обязательны для заполнения.");
    }
}

function loadExperts() {
    let table = document.getElementById("expertsTable");
    table.innerHTML = `
        <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Организация</th>
            <th>Действия</th>
        </tr>
    `;
    let experts = JSON.parse(localStorage.getItem('experts')) || [];
    experts.forEach((expert, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = expert.name;
        row.insertCell(1).innerText = expert.email;
        row.insertCell(2).innerText = expert.organization;
        row.insertCell(3).innerHTML = `
            <button onclick="editExpert(${index})">Редактировать</button>
            <button onclick="deleteExpert(${index})">Удалить</button>
        `;
    });
}

function editExpert(index) {
    let experts = JSON.parse(localStorage.getItem('experts')) || [];
    let expert = experts[index];

    let name = prompt("Введите новое имя эксперта:", expert.name);
    let email = prompt("Введите новый email эксперта:", expert.email);
    let organization = prompt("Введите новую организацию эксперта:", expert.organization);

    if (name && email) {
        experts[index] = { name, email, organization };
        localStorage.setItem('experts', JSON.stringify(experts));
        loadExperts();
    } else {
        alert("Имя и email обязательны для заполнения.");
    }
}

function deleteExpert(index) {
    let experts = JSON.parse(localStorage.getItem('experts')) || [];
    experts.splice(index, 1);
    localStorage.setItem('experts', JSON.stringify(experts));
    loadExperts();
}

function openOrganizationForm() {
    document.getElementById("organizationForm").style.display = "block";
}

function closeOrganizationForm() {
    document.getElementById("organizationForm").style.display = "none";
}

function saveOrganization() {
    let name = document.getElementById("organizationName").value;
    let expert = document.getElementById("organizationExpert").value;

    if (name) {
        let organizations = JSON.parse(localStorage.getItem('organizations')) || [];
        organizations.push({ name, expert });
        localStorage.setItem('organizations', JSON.stringify(organizations));
        loadOrganizations();
        closeOrganizationForm();
    } else {
        alert("Название организации обязательно для заполнения.");
    }
}

function loadOrganizations() {
    let table = document.getElementById("organizationsTable");
    table.innerHTML = `
        <tr>
            <th>Название</th>
            <th>Эксперт</th>
            <th>Действия</th>
        </tr>
    `;
    let organizations = JSON.parse(localStorage.getItem('organizations')) || [];
    organizations.forEach((organization, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = organization.name;
        row.insertCell(1).innerText = organization.expert;
        row.insertCell(2).innerHTML = `
            <button onclick="editOrganization(${index})">Редактировать</button>
            <button onclick="deleteOrganization(${index})">Удалить</button>
        `;
    });
}

function editOrganization(index) {
    let organizations = JSON.parse(localStorage.getItem('organizations')) || [];
    let organization = organizations[index];

    let name = prompt("Введите новое название организации:", organization.name);
    let expert = prompt("Введите нового эксперта для организации:", organization.expert);

    if (name) {
        organizations[index] = { name, expert };
        localStorage.setItem('organizations', JSON.stringify(organizations));
        loadOrganizations();
    } else {
        alert("Название организации обязательно для заполнения.");
    }
}

function deleteOrganization(index) {
    let organizations = JSON.parse(localStorage.getItem('organizations')) || [];
    organizations.splice(index, 1);
    localStorage.setItem('organizations', JSON.stringify(organizations));
    loadOrganizations();
}

function generateAccessCode() {
    let code = Math.random().toString(36).substring(2, 10).toUpperCase();
    let codes = JSON.parse(localStorage.getItem('accessCodes')) || [];
    codes.push(code);
    localStorage.setItem('accessCodes', JSON.stringify(codes));
    loadAccessCodes();
}

function loadAccessCodes() {
    let list = document.getElementById("accessCodesList");
    list.innerHTML = "";
    let codes = JSON.parse(localStorage.getItem('accessCodes')) || [];
    codes.forEach((code, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = code;
        listItem.innerHTML += ` <button onclick="deleteAccessCode(${index})">Удалить</button>`;
        list.appendChild(listItem);
    });
}

function deleteAccessCode(index) {
    let codes = JSON.parse(localStorage.getItem('accessCodes')) || [];
    codes.splice(index, 1);
    localStorage.setItem('accessCodes', JSON.stringify(codes));
    loadAccessCodes();
}

function exportData(format) {
    alert("Данные будут выгружены в формате: " + format.toUpperCase());
    // Здесь можно добавить логику для экспорта данных в указанный формат.
}
