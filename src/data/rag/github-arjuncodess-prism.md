# GitHub README: arjuncodess/prism

> Repository: https://github.com/arjuncodess/prism
> Retrieved: 2026-10-15T06:35:09.912Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

# PRISM

PRISM forecasts later reported conjunction risk from information available 48 hours before closest approach. The target is a reported `log10(Pc)` estimate, not a collision outcome. This is a research prototype, not flight software.

The FMTS review revision is on `fmts-review-improvements`. The exact submission is commit `091d7c49fa74d28405c4cb1c9cfff4b9ab793712`, preserved by annotated tag `fmts-2026-submitted` and the package in `submissions/fmts_2026`. The active manuscript is [paper/main.tex](paper/main.tex), with the rebuilt [main PDF](paper/main.pdf) and [supplement PDF](paper/supplement.pdf). Both revised PDFs compile with the existing MiKTeX installation; the native editor compiler cannot initialize on this host.

## Revised evidence

Known censoring, mixture, decision-aware selection, and conformal methods supply the background. The revision adds a conjunction benchmark extension, not a new general statistical framework. Its observed −30 atom appears in the released raw archive, but ESA's public documentation and release do not establish its computation or export rule. Treating it as proven latent censoring would be unsupported.

On the original 1,659-event local test, the validation-ESA-selected guarded hurdle reduces non-floor MAE from 4.073 to 3.309 while tying persistence at ESA loss 0.167. On 2,167 official events, non-floor MAE falls from 4.287 to 3.192 while ESA loss ties at 0.694. The official paired non-floor difference is −1.095 with 95% interval [−1.550,−0.640]. Equal challenge score reflects preserved class calls and the official scoring clip; raw high-risk forecasting improvement is not established.

Outcome-category conformal inversion raises direct-model official high-risk coverage from 24.0% to 93.3%. It uses the category of each candidate outcome, not the unseen true category. The selected hurdle's sets review 30.0% of official events and still accept nine falsely reassuring forecasts. The calibrated mixture retains zero local high-risk recall, and category sets around the old hurdle require universal review. These failed remedies are reported alongside the gains.

Five ESA event redraws and 60 controlled simulation runs test sensitivity and known recording mechanisms. Simulations use ordered event splits and remain mechanism evidence. ESA's public raw release has no calendar timestamps or object-pair IDs, so true calendar validation is unresolved. No second empirical domain or pretrained temporal foundation model is claimed. The intended paper positioning is aerospace.

## Revision artifacts

- [Review response matrix](docs/FMTS_REVIEW_RESPONSE_MATRIX.md) records the supplied concerns, revised claims, and remaining evidence gaps.
- [Validation record](docs/FMTS_VALIDATION.md) lists commands, exit statuses, licenses, artifacts, and intervals.
- [Machine-readable outputs](ml/artifacts/fmts_review) contain input and source hashes, splits, predictions, sets, per-model metrics, paired intervals, and simulation results.

The main figure decomposes total MAE into population-weighted atom and non-atom contributions, with the high-risk metric separately visible. It is generated from the same JSON as the manuscript table.

## Reproduce the revision

Use Python 3.14 and the recorded package versions in `experiments/requirements-fmts-review.txt`. Run from the repository root. The source audit requires internet access to primary metadata services; experiment commands use downloaded files only.

```powershell
python scripts/audit_fmts_sources.py
python ml/src/fmts_review.py --config experiments/fmts_review.json --dataset esa
python ml/src/fmts_review.py --config experiments/fmts_review.json --dataset simulation
python ml/src/fmts_review.py --config experiments/fmts_review.json --dataset outputs
python scripts/summarize_fmts_revision.py
python -m pytest -p no:cacheprovider
```

`data/raw/train_data.zip` and `data/raw/test_data.csv` come from ESA Kelvins; `data/raw/zenodo_4463683.zip` is the official full release. Existing downloads and hashes are recorded in `data/PROVENANCE.md`; the revision independently hashes all three. Source audit downloads the full release if absent. The original Kelvins files can be acquired with `python ml/src/download.py`.

Seed 42 must reproduce the frozen split IDs or the runner stops. Current-runtime models are refits of the prior architectures, so their scores can differ from submitted frozen-model scores. No deployed artifact is overwritten. Undefined challenge losses remain null with a reason; absent or undersized conformal categories use infinite radii, represented by null and documented counts in JSON.

## Historical exhibit

The existing FastAPI and Next.js exhibit still serves the frozen pre-revision model bundle in `ml/artifacts`. New remedies are research outputs and are not deployed. Legacy evidence remains available at the submitted commit and in `submissions/fmts_2026`. `python main.py` runs the original pipeline and exhibit; it is not the remedy-revision command and can regenerate the legacy artifact bundle.

The evaluated ESA Zenodo release is CC BY 4.0. PRISM code and generated simulations use the repository's MIT license. Arjun Vijay Prakash is the sole listed author and reports no funding or conflicts. Codex assisted with research, code, execution, artifacts, and writing; independent author verification and prior AI-use history remain pending.

