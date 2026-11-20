
from flask import Flask, render_template, request
from PIL import Image, UnidentifiedImageError
import base64
import io

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files.get("leaf_image")

    if not file or not file.filename:
        return render_template(
            "index.html",
            error="Please choose an image."
        )

    try:
        # Read image and verify its format
        image_bytes = file.read(8 * 1024 * 1024 + 1)

        if len(image_bytes) > 8 * 1024 * 1024:
            raise ValueError("Image must be less than 8 MB.")

        img = Image.open(io.BytesIO(image_bytes))
        if img.format not in ("JPEG", "PNG"):
            raise ValueError("Only JPG and PNG images are allowed.")

        img.thumbnail((900, 900))
        img = img.convert("RGB")

        buffer = io.BytesIO()
        img.save(buffer, format="JPEG")

        encoded = base64.b64encode(
            buffer.getvalue()
        ).decode("utf-8")

        image_url = "data:image/jpeg;base64," + encoded

        return render_template(
            "index.html",
            image=image_url
        )

    except (ValueError, UnidentifiedImageError, OSError):
        return render_template(
            "index.html",
            error="Please upload a valid JPG or PNG under 8 MB."
        ), 400

if __name__ == "__main__":
    app.run(debug=True)
