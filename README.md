# Air Quality Monitoring Station Clustering Using Machine Learning

An end-to-end machine learning project for analyzing air quality data and identifying pollution patterns using **K-Means Clustering**, integrated with an interactive **Flask web dashboard**.

## About the Project

This project applies unsupervised machine learning to environmental monitoring data to group air-quality observations with similar pollution and meteorological characteristics.

It provides a web-based interface where users can enter environmental measurements and receive a predicted cluster based on the trained machine learning model.

## Key Features

- Air-quality data cleaning and preprocessing
- Missing-value handling using median imputation
- Feature scaling using RobustScaler
- K-Means clustering for identifying pollution patterns
- Cluster evaluation using Silhouette Score and Davies–Bouldin Index
- Interactive dashboard using HTML, CSS, and JavaScript
- Flask backend for machine learning predictions
- Model serialization using Joblib

## Dataset

**Beijing Multi-Site Air Quality Dataset**

Source: [Kaggle Dataset](https://www.kaggle.com/datasets/aravindpcoder/beijing-multi-site-air-quality-data)

The dataset contains hourly air-quality observations from 12 monitoring stations in Beijing, covering 2013–2017.

### Features Used

| Feature | Description |
|---|---|
| PM2.5 | Fine particulate matter |
| PM10 | Part