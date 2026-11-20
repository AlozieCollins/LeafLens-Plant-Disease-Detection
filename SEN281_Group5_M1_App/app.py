from pathlib import Path
from uuid import uuid4

from flask import Flask, render_template, request, url_for
from PIL import Image, ImageOps, UnidentifiedImageError


app = Flask(__name__)

# Store uploaded images on disk so they remain available after submission.
UPLOAD_FOLDER = Path(app.static_folder) / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

# Limit each upload to 8 MB and return a friendly error if exceeded.
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024


@app.route("/")
def home():
    # Show the upload page before an image has been submitted.
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():
    # The field name must match the HTML file input's name attribute.
    file = request.files.get("leaf_image")

    if not file or not file.filename:
        return render_template("index.html", error="Please choose a tomato leaf photo first."), 400

    try:
        # Inspect the actual image format, rather than trusting its filename.
        with Image.open(file.stream) as image:
            if image.format not in ("JPEG", "PNG"):
                raise ValueError("Please upload a JPG or PNG image.")

            # Respect phone camera orientation and standardize display size.
            image = ImageOps.exif_transpose(image)
            image.thumbnail((1400, 1400))
            image = image.convert("RGB")

            # Give every upload a unique name to avoid overwriting older files.
            filename = f"leaf_{uuid4().hex}.jpg"
            image.save(UPLOAD_FOLDER / filename, format="JPEG", quality=90)

        # Return the saved file URL and a friendly message to the template.
        return render_template(
            "index.html",
            image=url_for("static", filename=f"uploads/{filename}"),
            success="Your leaf image was uploaded and saved successfully!",
        )

    except (ValueError, UnidentifiedImageError, OSError, Image.DecompressionBombError):
        return render_template(
            "index.html",
            error="That file could not be opened. Please select a valid JPG or PNG image.",
        ), 400


@app.errorhandler(413)
def too_large(_error):
    # Tell users how to fix a file that exceeds the upload limit.
    return render_template(
        "index.html", error="Your image is too large. Please choose a file smaller than 8 MB."
    ), 413


if __name__ == "__main__":
    app.run(debug=True)
