function toggleTestList() {
    const testList = document.getElementById('test-list');

    if (testList.style.maxHeight) {
        testList.style.maxHeight = null;
        testList.style.padding = "0 15px";
    } else {
        testList.style.maxHeight = testList.scrollHeight + "px";
        testList.style.padding = "10px 15px";
    }
}

function editProfile() {
    // Открытие модального окна
    document.getElementById('edit-modal').style.display = 'flex';

    // Заполнение полей текущими данными
    document.getElementById('edit-surname').value = document.getElementById('surname').innerText;
    document.getElementById('edit-name').value = document.getElementById('name').innerText;
    document.getElementById('edit-email').value = document.getElementById('email').innerText;
    document.getElementById('edit-phone').value = document.getElementById('phone').innerText;
}

function closeModal() {
    // Закрытие модального окна
    document.getElementById('edit-modal').style.display = 'none';
}

function saveChanges() {
    // Сохранение изменений и обновление интерфейса
    document.getElementById('surname').innerText = document.getElementById('edit-surname').value;
    document.getElementById('name').innerText = document.getElementById('edit-name').value;
    document.getElementById('email').innerText = document.getElementById('edit-email').value;
    document.getElementById('phone').innerText = document.getElementById('edit-phone').value;

    // Закрытие модального окна
    closeModal();
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == document.getElementById('edit-modal')) {
        closeModal();
    }
}
