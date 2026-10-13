
document.addEventListener("DOMContentLoaded", function () {

  // Mobile navigation menu
  const menuButton = document.querySelector(".menu");
  const navigation = document.querySelector(".nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("open");

      const isOpen = navigation.classList.contains("open");
      menuButton.textContent = isOpen ? "✕" : "☰";
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Automatically update copyright year
  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Prevent selecting a past appointment date
  const dateInput = document.querySelector("#date");

  if (dateInput) {
    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;
  }

  // Demo appointment form
  const bookingForm = document.querySelector("#bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const service = document.querySelector("#service").value;
      const date = document.querySelector("#date").value;
      const message = document.querySelector("#formMessage");

      if (!name || !phone || !service || !date) {
        message.textContent = "Please fill in all required fields.";
        return;
      }

      if (!/^[0-9+() -]{8,18}$/.test(phone)) {
        message.textContent = "Please enter a valid phone number.";
        return;
      }

      message.textContent =
        "Thank you, " + name + "! Your " + service +
        " appointment request has been recorded in this demo.";

      bookingForm.reset();
    });
  }

});
