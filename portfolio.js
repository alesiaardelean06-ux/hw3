document.getElementById("portfolioForm").addEventListener("submit", function (e){
    e.preventDefault();

    const projectName = document.getElementById("projectName").value.trim();
    const description = document.getElementById("description").value.trim();
    const projectUrl = document.getElementById("projectUrl").value.trim();
    const technologies = document.getElementById("technologies").value;
    const projectImage = document.getElementById("projectImage");
    const completionDate = document.getElementById("completionDate").value;
    const formMessage = document.getElementById("formMessage");

    let valid = true;
    formMessage.textContent = "";

    clearError("projectName");
    clearError("description");
    clearError("projectUrl");
    clearError("technologies");
    clearError("projectImage");
    clearError("completionDate");

    if (projectName.length < 3) {
        showError("projectName", "Project name must contain at least 3 characters.");
        valid = false;
    }

    if (description.length < 15) {
        showError("description", "Description must contain at least 15 characters.");
        valid = false;
    }

    if (!projectUrl.startsWith("https://")) {
        showError("projectUrl", "Project URL must start with https://");
        valid = false;
    }

    if (technologies === "") {
        showError("technologies", "Please choose a technology.");
        valid = false;
    }

    const file = projectImage.files[0];
    const maxFileSize = 2 * 1024 * 1024;

    if (!file) {
        showError("projectImage", "Please upload an image.");
        valid = false;
    }
    else if (!file.name.toLowerCase().endsWith(".jpg") && !file.name.toLowerCase().endsWith(".jpeg") && !file.name.toLowerCase().endsWith(".png")){
        showError("projectImage", "Only JPG or PNG  images are accepted.");
        valid = false;
    }
    else if (file.size > maxFileSize) {
        showError("projectImage", "Image size must not exceed 2MB.");
        valid = false;
    }

    if (completionDate === "") {
        showError("completionDate", "Please select a completion date.");
        valid = false;
    }
    else {
        const selectedDate = new Date(completionDate + "T00:00:00");
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            showError("completionDate", "Completion date cannot be in the future.");
            valid = false;
        }
    }

    if (!valid) {
        formMessage.textContent = "Please correct the errors before adding the project.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        addProject(projectName, description, projectUrl, technologies, reader.result, completionDate);
        document.getElementById("portfolioForm").reset();
        formMessage.textContent = "Project added successfully.";
    };

    reader.readAsDataURL(file);
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");

    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");

    field.removeAttribute("aria-invalid");
    error.textContent = "";
}

function addProject(projectName, description, projectUrl, technologies, imageSource, completionDate) {
    const emptyRow = document.getElementById("emptyRow");

    if (emptyRow) {
        emptyRow.remove();
    }

    const tableBody = document.getElementById("projectsBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${projectName}</td>
        <td>${description}</td>
        <td><a href="${projectUrl}" target="_blank">View project</a></td>
        <td>${technologies}</td>
        <td><img src="${imageSource}" alt="Thumbnail for ${projectName}" class="project-thumb"></td>
        <td>${completionDate}</td>
    `;

    tableBody.appendChild(row);
}