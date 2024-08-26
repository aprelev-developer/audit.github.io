// script.js
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const statusInputs = document.querySelectorAll('.status-input');
    const submitStatusButton = document.getElementById('submit-status');
    const notification = document.getElementById('notification');
    const addFormButton = document.getElementById('add-form-btn');
    const auditTableBody = document.querySelector('#audit-table tbody');
    const formDetailsSection = document.getElementById('form-details');
    const formNameTitle = document.getElementById('form-name-title');
    const saveFormDetailsButton = document.getElementById('save-form-details');
    const backToAuditButton = document.getElementById('back-to-audit');
    const auditDetailsForm = document.getElementById('audit-details-form');
    let currentFormName = '';

    function activateSection(sectionId) {
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            activateSection(targetId);
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function updateFormStatus() {
        let allCompleted = true;

        statusInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (value < 100) {
                allCompleted = false;
                notification.style.display = 'block';
                input.disabled = false;
            } else {
                input.disabled = true;
            }
        });

        if (allCompleted) {
            notification.style.display = 'none';
            alert('Все формы аудита пройдены. Доступ к проверке закрыт.');
            document.getElementById('audit').innerHTML = '<p>Все формы аудита были успешно проверены и заполнены.</p>';
        }
    }

    submitStatusButton.addEventListener('click', updateFormStatus);

    function addForm() {
        const rowCount = auditTableBody.rows.length + 1;
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td class="form-name">Новая форма аудита ${rowCount}</td>
            <td><input type="number" class="status-input" value="0" min="0" max="100">%</td>
            <td><button class="delete-form-btn">Удалить</button></td>
        `;

        auditTableBody.appendChild(newRow);

        const newStatusInput = newRow.querySelector('.status-input');
        const deleteButton = newRow.querySelector('.delete-form-btn');

        newStatusInput.addEventListener('input', updateFormStatus);
        deleteButton.addEventListener('click', function() {
            newRow.remove();
        });

        const formNameCell = newRow.querySelector('.form-name');
        formNameCell.addEventListener('click', function() {
            openFormDetails(formNameCell.textContent);
        });
    }

    addFormButton.addEventListener('click', addForm);

    function openFormDetails(formName) {
        currentFormName = formName;
        formNameTitle.textContent = `Форма: ${formName}`;
        activateSection('form-details');
    }

    function saveFormDetails() {
        // Пример сохранения данных, здесь можно добавить логику сохранения данных на сервере
        alert(`Данные для ${currentFormName} сохранены!`);
    }

    saveFormDetailsButton.addEventListener('click', saveFormDetails);

    backToAuditButton.addEventListener('click', function() {
        activateSection('audit');
    });

    // Активируем первую секцию по умолчанию
    activateSection('profile');
    links[0].classList.add('active');

    // Добавляем события для существующих элементов
    document.querySelectorAll('.delete-form-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
        });
    });

    document.querySelectorAll('.form-name').forEach(formName => {
        formName.addEventListener('click', function() {
            openFormDetails(formName.textContent);
        });
    });
});
