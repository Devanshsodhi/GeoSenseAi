# GeoSenseAi
GeoSenseAI is a web-based platform that leverages AI and satellite raster data to classify land cover types and monitor environmental changes, such as urban expansion and deforestation. It provides an interactive dashboard to visualize land-use patterns and detect environmental risks in real-time.
![Uploading image.png…]()

Key Features

Raster Data Ingestion: Upload GeoTIFF or satellite raster imagery for analysis.

AI-Powered Classification: CNN + transfer learning models classify land cover types — Vegetation, Water, Urban/Built-up, and Barren Land — with over 92% accuracy.

Change Detection: Compare images across time to detect vegetation loss and urban growth, providing actionable environmental insights.

Interactive Dashboard: Real-time map visualization using Leaflet.js, displaying classified layers, metrics, and detected changes.

Metrics & Summaries: View land cover percentages and summarized environmental risk analysis alongside the map.

🛠 Tech Stack

Frontend: React, Tailwind CSS, Leaflet.js

Backend: FastAPI / Flask (for AI inference and preprocessing)

AI & Data Processing: Python, TensorFlow / PyTorch, Rasterio, GDAL, GeoPandas

Deployment & Utilities: Docker, PostgreSQL + PostGIS (optional for storing geospatial data)
