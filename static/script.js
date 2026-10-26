
const form = document.getElementById("prediction-form");
const predictButton = document.getElementById("predict-btn");
const resetButton = document.getElementById("reset-btn");

const placeholder = document.getElementById("result-placeholder");
const resultContent = document.getElementById("result-content");
const errorMessage = document.getElementById("error-message");

const defaultValues = {
    pm25: 85,
    pm10: 130,
    no2: 60,
    ozone: 28,
    humidity_pct: 58,
    wind_kph: 9
};

const clusterColors = {
    0: { background: "#fff0ee", border: "#ffd5cf", text: "#c74e42" },
    1: { background: "#e6f8ef", border: "#bfead3", text: "#16865c" },
    2: { background: "#fff5df", border: "#f4dfad", text: "#a76d12" }
};

function getMeasurements() {
    const measurements = {};

    for (const [key, value] of Object.entries(defaultValues)) {
        const input = form.elements.namedItem(key);
        const number = input.valueAsNumber;

        if (!input.value.trim() || !Number.isFinite(number)) {
            throw new Error(`Please enter a valid value for ${key}.`);
        }

        if (number < 0) {
            throw new Error(`${key} cannot be negative.`);
        }

        measurements[key] = number;
    }

    if (measurements.humidity_pct > 100) {
        throw new Error("Humidity must be between 0 and 100%.");
    }

    return measurements;
}

function updateSummary(values) {
    document.getElementById("stat-pm25").textContent = values.pm25;
    document.getElementById("stat-pm10").textContent = values.pm10;
    document.getElementById("stat-no2").textContent = values.no2;
    document.getElementById("stat-wind").textContent = values.wind_kph;
}

function showResult(result) {
    document.getElementById("cluster-number").textContent = result.cluster;
    document.getElementById("cluster-name").textContent = result.name;
    document.getElementById("cluster-description").textContent =
        result.description;

    const circle = document.getElementById("cluster-circle");
    const color = clusterColors[result.cluster];

    circle.style.backgroundColor = color.background;
    circle.style.borderColor = color.border;
    circle.style.color = color.text;

    placeholder.hidden = true;
    resultContent.hidden = false;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorMessage.textContent = "";
    predictButton.disabled = true;
    predictButton.textContent = "Analyzing...";

    try {
        const measurements = getMeasurements();

        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(measurements)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Prediction request failed.");
        }

        updateSummary(result.measurements);
        showResult(result);

    } catch (error) {
        errorMessage.textContent =
            error.message || "Could not connect to the prediction server.";
    } finally {
        predictButton.disabled = false;
        predictButton.innerHTML = 'Predict Cluster <span>→</span>';
    }
});

resetButton.addEventListener("click", () => {
    for (const [key, value] of Object.entries(defaultValues)) {
        form.elements.namedItem(key).value = value;
    }

    errorMessage.textContent = "";
    updateSummary(defaultValues);

    placeholder.hidden = false;
    resultContent.hidden = true;
});
