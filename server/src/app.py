# connect to a database to register the info
# give the user the ability to register the material type

from flask import Flask, render_template, request, jsonify, send_file
import cv2
import torch
import numpy as np
from detectron2 import model_zoo
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
from PIL import Image
import io
import os
import base64

app = Flask(__name__)

# Initialize Detectron2 model once
cfg = get_cfg()
cfg.MODEL.DEVICE = "cpu"
cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml")
predictor = DefaultPredictor(cfg)

# Class configuration
classes_of_interest = ["bed", "chair", "bowl", "dining table", "couch", "tv", "cup", 
                      "wine glass", "bottle", "fork", "knife", "spoon", "umbrella", 
                      "backpack", "handbag", "suitcase", "skis", "snowboard", "frisbee", 
                      "sports ball", "skateboard", "tennis racket", "toilet", "book", "teddy bear"]
class_ids = [59, 56, 45, 60, 57, 62, 41, 40, 39, 42, 43, 44, 25, 24, 26, 28, 
            30, 31, 29, 32, 36, 38, 61, 73, 77]
weights = [19.95, 8.20, 0.91, 10.9, 52.61, 11.34, 0.16, 0.09, 0.68, 0.03, 
          0.03, 0.03, 0.91, 1.59, 0.91, 6.8, 2.04, 3.4, 0.09, 0.14, 3.86, 
          0.45, 68.04, 0.68, 0.45]

@app.route('/detectron2')
def index():
    return render_template('index.html')

@app.route('/detectron2/detect', methods=['POST'])
def detect_objects():
    # Get image from request
    file = request.files['image']
    img_bytes = file.read()
    img_np = np.frombuffer(img_bytes, np.uint8)
    im = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

    # Perform detection
    outputs = predictor(im)
    filtered_instances = outputs["instances"].to("cpu")
    class_ids_tensor = torch.tensor(class_ids)
    mask = torch.any(filtered_instances.pred_classes[:, None] == class_ids_tensor[None, :], dim=1)
    filtered_instances = filtered_instances[mask]

    # Process results
    results = []
    if len(filtered_instances) > 0:
        filtered_scores = filtered_instances.scores
        filtered_classes = filtered_instances.pred_classes
        
        for class_id, score in zip(filtered_classes, filtered_scores):
            idx = class_ids.index(class_id.item())
            results.append({
                "class": classes_of_interest[idx],
                "score": round(score.item(), 2),
                "weight": weights[idx]
            })

    # Generate visualization
    coco_metadata = MetadataCatalog.get("coco_2017_val")
    visualizer = Visualizer(im[:, :, ::-1], metadata=coco_metadata)
    visualized_output = visualizer.draw_instance_predictions(filtered_instances)
    output_img = visualized_output.get_image()[:, :, ::-1]

    # Convert output image to base64
    _, buffer = cv2.imencode('.jpg', output_img)
    img_str = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        "results": results,
        "image": f"data:image/jpeg;base64,{img_str}"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 12500)), threaded=True)
