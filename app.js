const form = document.getElementById("marks-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value)
    ];

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    const allValid = marks.every(mark =>
        Number.isFinite(mark) && mark >= 0 && mark <= 100
    );

    if (!allValid) {
        errorMessage.textContent = "Enter valid marks between 0 and 100.";
        document.getElementById("total-result").textContent = "Total: --";
        document.getElementById("average-result").textContent = "Average: --";
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / 3;

    document.getElementById("total-result").textContent =
        `Total: ${Number(total.toFixed(2))}`;

    document.getElementById("average-result").textContent =
        `Average: ${average.toFixed(2)}`;
});
