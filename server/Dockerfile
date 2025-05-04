FROM python:3.13

RUN pip3 install --upgrade pip --root-user-action=ignore

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 --root-user-action=ignore
RUN pip3 install opencv-python-headless Flask pillow numpy gunicorn cython flask_cors --root-user-action=ignore
RUN pip3 install --no-build-isolation 'git+https://github.com/facebookresearch/detectron2.git' --root-user-action=ignore

ENV APP_HOME app/

COPY src/ $APP_HOME

WORKDIR $APP_HOME

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app