// Select an event for registration
function selectEvent(eventName) {
    document.getElementById("selectedEvent").value = eventName;

    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}

// Store and display student registrations
let registrations = JSON.parse(
    localStorage.getItem("registrations") || "[]"
);

let volunteers = JSON.parse(
    localStorage.getItem("volunteers") || "[]"
);

let extraEvents = JSON.parse(
    localStorage.getItem("extraEvents") || "[]"
);

// Student registration
document.getElementById("registrationForm")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("studentName").value,
        usn: document.getElementById("usn").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("selectedEvent").value
    };

    registrations.push(student);

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    document.getElementById("registrationMessage").textContent =
        "Registration submitted successfully!";

    this.reset();
    displayRegistrations();
});

// Volunteer registration
document.getElementById("volunteerForm")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const volunteer = {
        name: document.getElementById("volName").value,
        department: document.getElementById("department").value,
        email: document.getElementById("volEmail").value,
        role: document.getElementById("volRole").value
    };

    volunteers.push(volunteer);

    localStorage.setItem(
        "volunteers",
        JSON.stringify(volunteers)
    );

    document.getElementById("volunteerMessage").textContent =
        "Volunteer application submitted successfully!";

    this.reset();
    displayVolunteers();
});

// Display student registrations
function displayRegistrations() {
    const list = document.getElementById("registrationList");
    list.replaceChildren();

    if (registrations.length === 0) {
        list.textContent = "No registrations yet.";
        return;
    }

    registrations.forEach(function(student, index) {
        const item = document.createElement("div");
        item.className = "record";

        const details = document.createElement("p");
        details.textContent =
            `${index + 1}. ${student.name} | ${student.usn} | ` +
            `${student.email} | ${student.event}`;

        item.appendChild(details);
        list.appendChild(item);
    });
}

// Display volunteer applications
function displayVolunteers() {
    const list = document.getElementById("volunteerList");
    list.replaceChildren();

    if (volunteers.length === 0) {
        list.textContent = "No volunteer applications yet.";
        return;
    }

    volunteers.forEach(function(volunteer, index) {
        const item = document.createElement("div");
        item.className = "record";

        const details = document.createElement("p");
        details.textContent =
            `${index + 1}. ${volunteer.name} | ` +
            `${volunteer.department} | ${volunteer.role}`;

        item.appendChild(details);
        list.appendChild(item);
    });
}

// Add a new event
document.getElementById("eventForm")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const event = {
        name: document.getElementById("newEventName").value,
        date: document.getElementById("newEventDate").value,
        category: document.getElementById("newEventCategory").value,
        description:
            document.getElementById("newEventDescription").value
    };

    extraEvents.push(event);

    localStorage.setItem(
        "extraEvents",
        JSON.stringify(extraEvents)
    );

    displayExtraEvents();

    alert("New event added successfully!");

    this.reset();
});

// Display newly added events
function displayExtraEvents() {
    const container = document.getElementById("eventList");

    extraEvents.forEach(function(event, index) {
        if (container.querySelector(`[data-extra="${index}"]`)) {
            return;
        }

        const card = document.createElement("div");
        card.className = "event-card";
        card.dataset.extra = index;

        const heading = document.createElement("h3");
        heading.textContent = event.name;

        const description = document.createElement("p");
        description.textContent = event.description;

        const date = document.createElement("p");
        date.textContent = "Date: " + event.date;

        const category = document.createElement("p");
        category.textContent = "Category: " + event.category;

        const button = document.createElement("button");
        button.textContent = "Register";

        button.addEventListener("click", function() {
            let select = document.getElementById("selectedEvent");

            let option = document.createElement("option");
            option.value = event.name;
            option.textContent = event.name;

            if (![...select.options].some(
                opt => opt.value === event.name
            )) {
                select.appendChild(option);
            }

            select.value = event.name;

            document.getElementById("register").scrollIntoView({
                behavior: "smooth"
            });
        });

        card.append(heading, description, date, category, button);
        container.appendChild(card);
    });
}

// Load saved information when website opens
displayRegistrations();
displayVolunteers();
displayExtraEvents();