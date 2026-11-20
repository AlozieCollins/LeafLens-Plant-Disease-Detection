# LeafLens — SEN 281 Group 5 Plant Disease Detection

## Milestone 1: Working App Skeleton
This project is a **working Flask app skeleton** for the Group 5 SEN 281 Plant Disease Detection project. The homepage and image upload form run on a laptop. Uploaded photos are validated and previewed. **It does not yet diagnose plants or calculate leaf damage.** Those features are planned for later milestones.

## Run on Windows (VS Code terminal)
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Optional but recommended: `py -m venv .venv`, then `.venv\Scripts\activate`.
4. Install libraries: `py -m pip install -r requirements.txt`.
5. Run: `py app.py`.
6. Open `http://127.0.0.1:5000` in your browser.
7. Click **Try image upload**, select a JPG/PNG/WebP tomato leaf photo (8 MB or less), click **Upload & preview image**, and check that your photo appears.

**Mac/Linux:** replace `py` with `python3` and activate using `source .venv/bin/activate`.

## M1 evidence
- Screenshot of the homepage.
- Screenshot of a successful uploaded image preview.
- GitHub repository link, README and working code.
- **Separately required:** one-page plan PDF with roles/success measures, PlantVillage dataset citation and field-photo plan, and a Google Colab notebook displaying 10 sample images using OpenCV (BGR→RGB). This ZIP is **the web app skeleton only**, not all M1 deliverables.

## Project structure
- `app.py`: Flask routes, image validation and in-memory preview.
- `templates/index.html`: accessible homepage, upload form, preview and milestones.
- `static/style.css`: responsive styling.
- `static/app.js`: selected file label and drag-and-drop behaviour.
- `requirements.txt`: Python dependencies.

## Data and privacy
Images are processed in memory for the response and are not saved to the app's disk or a database. This prototype runs on the Flask development server and should **not** be deployed publicly as-is.

## Planned development
- Download and cite PlantVillage tomato leaf classes.
- Train a transfer-learning classifier and report accuracy/F1/confusion matrix.
- Use OpenCV HSV segmentation to estimate visible damage area.
- Evaluate on consented field photos and communicate model limitations.
- Display appropriate reviewed guidance, not automatic pesticide instructions.


## Google Colab notebook

**Notebook:**  https://colab.research.google.com/drive/1Zq4ZhwuatgT8tbjPTyRrFLRSwpFllJ0g?usp=sharing