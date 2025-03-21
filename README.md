# AGRILAK: AI-Based Smart Solutions for Paddy Harvesting

## 📅 Project Timeline: Mar 2025 – Present

AGRILAK is an intelligent agricultural management system designed to revolutionize paddy harvesting using AI-driven solutions. This full-stack application leverages machine learning and deep learning algorithms, such as Random Forest Classifiers and Convolutional Neural Networks (CNNs), to provide precise and data-driven recommendations for farmers.

## 🚀 Key Features:
- **🌾 Paddy Yield Prediction** – Forecasts crop yield based on environmental and historical data.
- **🦠 Pest & Disease Detection** – Uses deep learning to identify potential threats to crops from images and data inputs.
- **🌱 Fertilizer Recommendations** – Suggests optimal fertilizer usage based on soil and weather conditions.
- **💧 Irrigation Optimization** – Provides real-time water management recommendations to enhance efficiency.

## 🏗 Technology Stack:

![Tech Stack](docs/techstack.png)

- **🚀 Machine Learning & Deep Learning** – Applied Random Forest for predictive analytics and CNNs for image-based classification.
- **🖥 Flask Backend** – Built a scalable API for handling predictions and data management.
- **🌐 Next.js & React Frontend** – Developed a modern and interactive user interface.
- **📊 Feature Engineering** – Processed raw agricultural datasets from APIs & Kaggle to enhance model performance.
- **📂 MongoDB Database** – Stored user inputs and AI-generated insights for real-time retrieval.
- **☁️ Cloud Deployment** – Hosted the system on a scalable cloud platform (e.g., AWS/GCP).

## 🏆 Project Outcomes:
- ✅ **End-to-End AI Solution** – Developed a full-stack application integrating AI/ML for smart paddy farming.
- ✅ **Real-Time Data Processing** – Collected and transformed agricultural data for actionable insights.
- ✅ **User-Centric Design** – Built a responsive web application with an intuitive interface for farmers.
- ✅ **Improved Precision in Agriculture** – Enabled farmers to make smarter, data-driven decisions for increased productivity and environmental sustainability.

## 🎥 Demo Video
[![Watch the Demo](https://img.youtube.com/vi/?/maxresdefault.jpg)](https://www.youtube.com/watch?v=?)

## 📁 Folder Structure

The project is organized into the following structure:

```
root/
├── backend/                         # Flask backend
│   ├── app/                         # Main application directory
│   │   ├── __init__.py              # Flask app initialization
│   │   ├── routes/                  # API routes
│   │   ├── services/                # Business logic
│   │   ├── models/                  # Pre-trained and saved models
│   │   ├── static/                  # Static files
│   │   ├── templates/               # HTML templates
│   │   └── utils/                   # Helper functions
│   ├── tests/                       # Unit tests for backend
│   ├── requirements.txt             # Python dependencies
│   ├── .env                         # Environment variables
│   └── run.py                       # Flask app entry point
├── frontend/                        # Next.js frontend
│   ├── public/                      # Public assets
│   ├── src/                         # Frontend source files
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Next.js pages
│   │   ├── services/                # API integrations
│   │   ├── styles/                  # CSS/SCSS files
│   │   └── utils/                   # Helper functions
│   ├── .env.local                   # Frontend environment variables
│   ├── next.config.js               # Next.js configuration
│   ├── package.json                 # Node.js dependencies
│   └── tsconfig.json                # TypeScript configuration
├── datasets/                        # Project datasets
│   ├── raw/                         # Unprocessed datasets
│   └── processed/                   # Processed datasets
├── notebooks/                       # Jupyter notebooks
├── docs/                            # Documentation
│   ├── README.md
│   ├── API_DOCS.md                  # API documentation
│   └── architecture_diagram.png
├── .gitignore                       # Ignored files for Git
└── docker/                          # Docker configuration
    ├── backend.Dockerfile
    ├── frontend.Dockerfile
    └── docker-compose.yml
```


## 💻 Coding Practices

### Backend (Flask)
- Follow **PEP 8** for Python code formatting.
- Use **blueprints** for organizing routes.
- Write modular code in the `services` and `utils` directories.
- Use environment variables for sensitive information (e.g., API keys).
- Add type hints wherever possible to improve code readability.

### Frontend (Next.js)
- Use **ESLint** and **Prettier** for code formatting.
- Write reusable React components and organize them in `components`.
- Use environment variables for API endpoints.
- Ensure CSS/SCSS files are modular and scoped to components.
- Avoid inline styles unless absolutely necessary.

### Jupyter Notebooks
- Keep notebooks clean and well-documented.
- Use Markdown cells for explaining steps and results.
- Save outputs only if necessary to reduce file size.

## 🏷️ Contributors

| Name | Role |
|------|------|
| [Ranudee Fernando] | Paddy Yield Prediction |
| [Dilshan Indigahawela] | Paddy Disease Detection |
| [Dinithi Anthony] | Fertilizer Recommendation |
| [Binara Mendis] | Irrigation Optimization |


## 📜 Getting Started

### Backend Setup
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the Flask app:
   ```bash
   python run.py
   ```

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Start the Next.js server:
   ```bash
   npm run dev
   ```

---

## 📬 Contact
For questions or issues, reach out to the project maintainer.

---

🔗 **Tags**: `#MachineLearning` `#AI` `#SustainableAgriculture` `#DeepLearning` `#Flask` `#NextJS` `#MongoDB` `#PrecisionFarming`
