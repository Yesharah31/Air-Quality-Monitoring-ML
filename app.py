
from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent

preprocessor = joblib.load(BASE_DIR / "preprocessor.pkl")
model = joblib.load(BASE_DIR / "air_quality_model.pkl")

FEATURES = [
    "pm25",
    "pm10",
    "no2",
    "ozone",
    "humidity_pct",
    "wind_kph",
]

CLUSTER_INFO = {
    0: {
        "name": "High Pollution / Traffic-Industrial Pattern",
        "description": (
            "High particulate matter and NO2, "
            "with relatively low wind speeds."
        ),
    },
    1: {
        "name": "Cleaner / Windy Conditions",
        "description": (
            "Lower pollutant concentrations with "
            "higher humidity and wind speeds."
        ),
    },
    2: {
        "name": "Moderate Pollution / Suburban-Like Pattern",
        "description": (
            "Moderate particulate matter and NO2, "
            "with intermediate wind conditions."
        ),
    },
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(silent=True)

        if not isinstance(payload, dict):
            return jsonify({"error": "Invalid JSON input."}), 400

        values = {}

        for feature in FEATURES:
            value = payload.get(feature)

            if value is None or isinstance(value, bool):
                return jsonify({
                    "error": f"Missing or invalid value: {feature}"
                }), 400

            try:
                value = float(value)
            except (TypeError, ValueError):
                return jsonify({
                    "error": f"{feature} must be a number."
                }), 400

            import math

            if not math.isfinite(value):
                return jsonify({
                    "error": f"{feature} must be finite."
                }), 400

            if value < 0:
                return jsonify({
                    "error": f"{feature} cannot be negative."
                }), 400

            values[feature] = value

        if values["humidity_pct"] > 100:
            return jsonify({
                "error": "Humidity must be between 0 and 100."
            }), 400

        station = pd.DataFrame([values], columns=FEATURES)

        transformed = preprocessor.transform(station)
        cluster = int(model.predict(transformed)[0])

        result = CLUSTER_INFO[cluster]

        return jsonify({
            "cluster": cluster,
            "name": result["name"],
            "description": result["description"],
            "measurements": values,
        })

    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({
            "error": "Prediction failed. Check the model files and server logs."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
