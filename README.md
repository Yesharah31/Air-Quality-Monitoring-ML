# Air Quality Monitoring Station Clustering Using Machine Learning

A machine learning-based web application that groups air-quality observations into clusters based on environmental and pollution parameters using **K-Means Clustering**.

## Project Overview

This project demonstrates the application of unsupervised machine learning to identify patterns in air-quality monitoring data. It integrates a trained clustering model with an interactive Flask web dashboard.

## Key Features

- Synthetic dataset generation using NumPy
- Data preprocessing using median imputation and RobustScaler
- K-Means clustering with cluster evaluation
- Interactive dashboard using HTML, CSS and JavaScript
- Flask API for predicting clusters from user-entered measurements
- Visualization and interpretation of pollution patterns

## Dataset

The project uses a **synthetically generated dataset containing 500 observations**, created using Python NumPy.

The dataset simulates four environmental profiles: traffic-dominated, industrial, suburban and cleaner coastal conditions.

### Input Features

| Feature | Description |
|---|---|
| PM2.5 | Fine particulate matter |
| PM10 | Particulate matter |
| NO₂ | Nitrogen dioxide |
| Ozone | Ozone concentration |
| Humidity | Relative humidity |
| Wind Speed | Wind speed |

The dataset is simulated and does not contain live or historical measurements collected from physical monitoring stations.

## Technologies Used

- Python
- NumPy and Pandas
- Scikit-learn
- K-Means Clustering
- Flask
- HTML, CSS and JavaScript
- Joblib
- Jupyter Notebook

## Machine Learning Workflow

1. Generate 500 synthetic environmental observations.
2. Handle missing values using median imputation.
3. Scale features using RobustScaler.
4. Evaluate different numbers of clusters.
5. Train a K-Means clustering model.
6. Save the trained model and preprocessing pipeline.
7. Integrate the saved model with Flask.
8. Predict clusters using environmental measurements entered through the dashboard.

## Model Evaluation

The initial synthetic-data experiment selected three clusters.

- Silhouette Score: 0.5530
- Davies–Bouldin Index: 0.6254

These results are specific to the generated dataset and should not be interpreted as performance on real-world monitoring data.

## How to Run

Install the required libraries:

```bash
pip install -r requirements.txt
```

Ensure the trained model files `air_quality_model.pkl` and `preprocessor.pkl` are available in the project directory.

Start the Flask application:

```bash
python app.py
```

Open `http://127.0.0.1:5000` in your browser.

If the trained model files are not available, regenerate them using the project's training notebook before starting the application.



