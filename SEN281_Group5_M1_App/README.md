# LeafLens — Plant Disease Detection (Group 5)

This updated SEN 281 Flask application lets users select, preview, drag-and-drop and upload tomato leaf images. The design gives friendly conversational feedback. It **does not yet predict disease**; that is a later milestone.

## Structure

```text
LeafLens_Updated/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── style.css
    ├── script.js
    └── uploads/      # Created/used for saved images
```

## Run on your laptop

Open a terminal inside the `LeafLens_Updated` folder and run:

```bash
python -m pip install -r requirements.txt
python app.py
```

Visit http://127.0.0.1:5000

## M2 upload requirement

Uploaded JPG/PNG files under 8 MB are validated, reoriented when required, resized, converted to JPEG, and **saved on disk** to `static/uploads/`. After upload, the same page displays the saved image and a success message. This satisfies the M2 *upload saves and shows back* application requirement. For a production deployment, implement access controls, cleanup/retention, rate limiting and disable Flask debug mode.

## Files to update in your existing project

Replace your `app.py` and `templates/index.html`, replace `static/style.css` and create `static/script.js`. Keep your existing Colab notebook and links; the notebook link is included in `index.html`.
