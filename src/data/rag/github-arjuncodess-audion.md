# GitHub README: arjuncodess/audion

> Repository: https://github.com/arjuncodess/audion
> Retrieved: 2026-10-15T06:35:14.488Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

<h2 align="center">Audion - Audio CNN Inference Visualizer</h2>

<p align="center">
  Train a small audio classification CNN, serve it through Modal, and inspect predictions, waveforms, spectrograms, and convolutional feature maps from a minimal Next.js app.
</p>

## Table of Contents

- [About](#about)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [ML Workflow](#ml-workflow)
- [Web App](#web-app)
- [Environment Variables](#environment-variables)
- [Built Using](#built-using)

## About

Audion is an ML-first audio classification project. The repository keeps the model pipeline and the web interface separate so the local and Modal inference path can stay simple before adding more UI.

The ML side downloads FSD50K metadata from Hugging Face, prepares deterministic manifests, converts audio to fixed-size log-mel spectrograms, trains a residual CNN on Modal, and exposes a Modal FastAPI endpoint for inference.

The web app uploads one `.wav` file at a time, forwards it to the Modal endpoint through a server route, and renders the top predictions along with the waveform, input spectrogram, and selected convolutional activations.

## Project Structure

```text
audion/
  ml/    Python ML pipeline, Modal training, and Modal inference endpoint
  app/   Next.js app and API bridge for running inference from the browser
```

## Getting Started

### Requirements

- Python 3.11
- Node.js 20 or newer
- pnpm
- Modal account and CLI authentication
- Hugging Face access for the `Fhrozen/FSD50k` dataset

### Install ML Dependencies

```bash
cd ml
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Install Web Dependencies

```bash
cd app
pnpm install
```

## ML Workflow

Run these from the `ml/` directory:

```bash
python bootstrap.py
python dataset.py
python subsets.py
python preprocess.py
python model.py
python overfit.py
python -m modal run train.py
python -m modal deploy infer.py
```

The scripts are intentionally standalone:

- `bootstrap.py` prepares the local directory layout.
- `dataset.py` downloads FSD50K label metadata and writes `artifacts/labels.json`.
- `subsets.py` creates deterministic tiny and full manifests.
- `preprocess.py` creates mono 16 kHz, 4 second log-mel inputs.
- `model.py` defines `AudionCNN` and saves an initial checkpoint.
- `overfit.py` runs a local tiny overfit check.
- `train.py` trains on Modal and stores artifacts in Modal volumes.
- `infer.py` deploys a Modal FastAPI endpoint for `.wav` inference.

## Web App

Create `app/.env.local`, then run:

```bash
cd app
pnpm dev
```

Open `http://localhost:3000` and upload one `.wav` file. The app sends the file to `/api/infer`, which proxies the request to the configured Modal endpoint.

Useful web commands:

```bash
pnpm dev
pnpm build
pnpm lint
```

## Environment Variables

Add these to `app/.env.local`:

```env
AUDION_MODAL_INFER_URL=
AUDION_MODAL_KEY=
AUDION_MODAL_SECRET=
```

`AUDION_MODAL_INFER_URL` is required. `AUDION_MODAL_KEY` and `AUDION_MODAL_SECRET` are used when the Modal endpoint requires proxy authentication.

## Built Using

- Python
- PyTorch and torchaudio
- Hugging Face Hub
- FSD50K
- Modal
- FastAPI
- Next.js
- React
- TypeScript
- Tailwind CSS

