from flask import Flask, request, send_file, render_template
import cv2
import numpy as np
from rembg import remove
from PIL import Image, ImageEnhance
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return 'No image part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    # Read and process image using rembg
    input_image = file.read()
    output_image = remove(input_image)
    
    # Convert to PIL Image for easier handling
    output_image = Image.open(io.BytesIO(output_image))
    output_image_path = 'static/output_image.png'
    output_image.save(output_image_path)

    return send_file(output_image_path, as_attachment=True)

@app.route('/remove-watermark', methods=['POST'])
def remove_watermark():
    if 'image' not in request.files:
        return 'No image part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    # Read image with OpenCV
    input_image = file.read()
    np_img = np.frombuffer(input_image, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Simple watermark removal using inpainting
    mask = cv2.inRange(img, (200, 200, 200), (255, 255, 255))  # Create mask for watermark
    result = cv2.inpaint(img, mask, 3, cv2.INPAINT_TELEA)

    result_path = 'static/removed_watermark.png'
    cv2.imwrite(result_path, result)

    return send_file(result_path, as_attachment=True)

@app.route('/unblur-image', methods=['POST'])
def unblur_image():
    if 'image' not in request.files:
        return 'No image part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    # Read image and apply unblurring
    input_image = file.read()
    np_img = np.frombuffer(input_image, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Perform unblurring using denoising
    result = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)

    result_path = 'static/unblurred_image.png'
    cv2.imwrite(result_path, result)

    return send_file(result_path, as_attachment=True)

@app.route('/restore-photo', methods=['POST'])
def restore_photo():
    if 'image' not in request.files:
        return 'No image part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    # Enhance the photo for restoration (example of basic contrast enhancement)
    input_image = file.read()
    img = Image.open(io.BytesIO(input_image))

    enhancer = ImageEnhance.Contrast(img)
    enhanced_image = enhancer.enhance(2.0)  # Increasing contrast as a placeholder for restoration

    enhanced_image_path = 'static/restored_photo.png'
    enhanced_image.save(enhanced_image_path)

    return send_file(enhanced_image_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
