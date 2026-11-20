from pathlib import Path
from PIL import Image, UnidentifiedImageError

# Folder where Flask stores uploaded images
upload_folder = Path("static/uploads")

# Check that the upload folder exists
if not upload_folder.is_dir():
    print("Upload folder does not exist.")
else:

    # Find saved JPG and PNG files
    images = [
        file for file in upload_folder.iterdir()
        if file.suffix.lower() in [".jpg", ".jpeg", ".png"]
    ]

    print("Saved images found:", len(images))

    # Verify that saved files are readable images
    for image_path in images:
        try:
            with Image.open(image_path) as image:
                image.verify()

            print("VALID:", image_path.name)

        except (UnidentifiedImageError, OSError):
            print("INVALID:", image_path.name)