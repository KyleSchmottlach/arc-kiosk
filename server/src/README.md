# Object Detection at Reuse Areas
This project is an object detection app that allows users to take pictures and automatically identify household items such as chairs, tables, sofas, and beds.
Using Detectron2, the app detects objects in the image and provides an estimated weight for each identified item.
The goal is to assist recycling centers with reuse assessment by giving approximate weight values based on common household furniture.

## Dependencies

This project requires the following Python libraries:

- `detectron2` – Facebook’s object detection framework. Refer to the [installation guide](https://detectron2.readthedocs.io/en/latest/tutorials/install.html).
- `tkinter` – GUI toolkit for creating the application interface (comes pre-installed with Python)
- `Pillow` (`PIL`) – Image processing library for handling images in Tkinter
- `opencv-python` (`cv2`) – Computer vision library for image processing
- `torch` – PyTorch, an open-source machine learning framework
- `model_zoo` – Pretrained models for object detection
- `get_cfg` – Configuration settings for models
- `DefaultPredictor` – Inference engine for making predictions
- `Visualizer` – Tool for drawing predictions on images
- `MetadataCatalog` – Metadata storage for datasets

### Installation

You can install the required dependencies using `pip`:

```sh
pip install torch torchvision torchaudio
pip install opencv-python pillow detectron2
