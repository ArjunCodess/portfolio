# GitHub README: arjuncodess/ngta

> Repository: https://github.com/arjuncodess/ngta
> Retrieved: 2026-10-15T06:35:11.423Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

# NGTA

**NARS-Guided Transformer Attention for clinical transformers under extreme missingness**

**TL;DR:** NGTA is a clinical transformer that does not just rank patients; it tries to tell the truth about its own uncertainty. It estimates epistemic uncertainty with MC Dropout, heuristically converts that uncertainty into initial NARS-style truth values, injects explicit human-written medical rules at inference time, and feeds the revised confidence back into attention so brittle evidence is downweighted before the final prediction is made.

NGTA is a neurosymbolic clinical prediction architecture that maps neural uncertainty into NARS truth values and feeds revised confidence back into Transformer attention during inference. The repository now supports two benchmarks in parallel:

- `tcga`: TCGA-THCA lymph node metastasis prediction from merged clinical tables plus a mutation-derived binary gene panel
- `wids`: WiDS Datathon 2020 ICU hospital mortality prediction from a high-missingness ICU tabular cohort

The anonymous NeurIPS 2026 workshop manuscript is [`paper/main.tex`](paper/main.tex), with the compiled submission at [`paper/main.pdf`](paper/main.pdf).

## April 21, 2026 Feedback Update

After an email exchange on April 21, 2026, Pei Wang pointed out two conceptual issues that now shape this repository:

- Statistical variance is not itself NARS evidence amount or native NARS confidence. In NGTA, MC-dropout variance is now described explicitly as a heuristic initializer for neural confidence that can later be revised by symbolic evidence.
- The strong-deduction confidence calculation in the manuscript needed to match the standard NAL rule rather than the custom form previously written in the paper.

Repository updates made from that feedback:

- [`src/nars_interface.py`](src/nars_interface.py) now exposes standard NAL strong deduction, revision, evidence-confidence conversion, and expectation helpers.
- Triggered symbolic rules are grounded by an explicit deduction step from empirical observations before neural-symbolic revision.
- The README and paper now attribute these clarifications to Pei Wang and describe the variance-to-confidence mapping more carefully.

## Key Achievements

- **Inference-Time Logic Injection:** Fuses MC-Dropout epistemic uncertainty with NARS symbolic logic and pushes the revised confidence signal directly into Transformer attention during inference.
- **Scale & Calibration:** Benchmarked on `91,713` ICU stays. The baseline has the highest AUC point estimate (`0.88034`), while MC-confidence-only has the lowest Brier (`0.056468`) and ECE (`0.005808`) point estimates. NARS-gated is nearly identical to MC-confidence-only. Its paired Brier and ECE improvements over the ungated baseline exclude zero, but its comparisons with flat-confidence and MC-confidence-only include zero, so the run supports confidence gating without isolating a symbolic-revision advantage.
- **Glass-Box Activity:** On held-out WiDS ICU data, explicit symbolic rules fired in `8551` of `13757` stays for `13031` total feature-level revisions, showing that the logic layer is active rather than decorative.
- **Multi-Modal Ready:** Demonstrated on fused clinical tabular features and genomic mutation matrices on TCGA-THCA, where the same interface remains operational as a clinical-plus-genomic proof of concept. The TCGA transformer variants are not statistically separated from one another on the 69-case held-out split.

## Overview

### What it does

NGTA is a medical prediction system for messy hospital-style tables where many values are missing. It uses a Transformer to make predictions, but it does not stop at producing a single risk score. It estimates epistemic uncertainty, checks a set of human-written medical rules, and then uses both pieces of information to adjust how the model pays attention to the input features before the final output is emitted.

### Why it matters

Many clinical AI systems can give a strong prediction even when the data are incomplete or unreliable. That is dangerous in real settings because missing hospital data can produce overconfident probabilities that look trustworthy when they are not. NGTA is designed to separate "high score" from "high confidence" and to expose a human-readable revision path when symbolic rules intervene. The current experiments measure calibration and trace fidelity under high missingness; they do not establish clinical safety.

In standard clinical prediction, models optimize for point-estimate accuracy but lack native mechanisms to express epistemic doubt, leading to overconfident extrapolation when faced with missing features. NGTA is built around the opposite design goal: instead of a black-box predictor that guesses blindly across data gaps, it calculates feature-level uncertainty and can route attention toward explicit medical heuristics when uncertainty is high. In that sense, the repository's core contrast is simple: standard transformers behave like black boxes, while NGTA is designed to behave like a glass box.

### What is novel here

The main novelty is not just "Transformer + rules." The key idea is that NGTA turns neural uncertainty into explicit symbolic truth values in a NARS-compatible evidential space, revises those values with domain rules, and then feeds the revised confidence back into Transformer attention. In simple terms: the model can use both learned patterns and symbolic evidence to decide how much trust to place in each feature at inference time, while also leaving behind an auditable evidential trace.

This repository is not a full NARS cognitive architecture. It operationalizes selected NAL truth-value functions as an interface layer for a clinical transformer: heuristic neural truth initialization, explicit symbolic deduction from triggered observations, and revision-based fusion before attention reweighting.

The end result is not just another tabular model with a rules layer attached to the side. It is a prototype auditable reasoning interface: instead of emitting only a scalar score, the system exposes uncertainty and provides a direct insertion point for human-authored physiological rules in the inference path. We refer to this uncertainty-conditioned attention update as Dynamic Evidential Routing. Calibration measurement, rule-based intervention, and operational auditability appear in the same implemented inference loop; clinician steerability and usability remain to be evaluated.

### How it works

1. The Transformer reads the patient features and predicts risk.
2. Monte Carlo dropout is used to measure how stable that prediction is across repeated passes.
3. That uncertainty is heuristically converted into initial NARS-style truth values: frequency and confidence.
4. If a symbolic rule fires, the rule is first grounded by explicit NAL deduction from an empirical observation and then combined with the neural truth value using NARS revision.
5. The revised confidence is used to reweight attention, so uncertain or weakly supported features matter less.
6. The pipeline then evaluates discrimination, calibration, decision curves, symbolic trigger activity, and baseline comparisons.

### Why there are two datasets

The two benchmarks test different strengths of the architecture:

- `tcga` is the multi-modal proof of concept. It shows that NGTA can fuse clinical variables with a genomic mutation matrix without breaking the mathematical interface.
- `wids` is the primary empirical validation. It shows that the same architecture scales to a much larger ICU dataset with heavy missingness and gives the clearest large-scale view of calibration, uncertainty routing, and symbolic activity.

### What we found

The main result is that NGTA works as intended on both a small multi-modal cancer dataset and a much larger high-missingness ICU dataset, but the two datasets support different claims.

- On `tcga`, the Transformer-based models still beat the random-forest baseline numerically. The current best default AUC is `0.73277` for `flat_confidence`, versus `0.66134` for random forest. `nars_gated` reports AUC `0.73109` and Brier score `0.21094`. This supports the claim that the interface can learn useful signal from combined clinical and genomic inputs, but it does not support a claim that NARS gating is statistically better than the other Transformer variants.
- The flat-confidence control is the strongest TCGA Transformer variant by point estimate in the current default run because it has the highest AUC (`0.73277`), the lowest Brier score (`0.21091`), and the lowest ECE (`0.11779`). TCGA should therefore still be treated as a multi-modal interface proof of concept rather than evidence that dynamic NARS gating dominates simpler confidence gates on very small cohorts.
- On `wids`, all Transformer variants are extremely close on AUC around `0.8802--0.8803`. The baseline leads AUC (`0.88034`), while MC-confidence-only has the lowest Brier (`0.056468`) and ECE (`0.005808`) point estimates. NARS-gated differs only in the sixth Brier decimal and fifth ECE decimal (`0.056469`, `0.005833`).
- Paired bootstrap comparisons show lower Brier and ECE for NARS-gated than for the ungated baseline, with both intervals excluding zero. However, comparisons against flat-confidence and MC-confidence-only include zero. The evidence therefore supports confidence-based routing relative to the ungated model, but it does not identify symbolic revision as the source of that improvement.
- The WiDS result still matters because NARS-gated has a lower Brier score than the random forest with a paired interval excluding zero, the transformer family has higher AUC point estimates, and the symbolic path is physically active during inference. AUC intervals overlap, and the random-forest ECE comparison includes zero, so these are not broad superiority claims.
- The symbolic rules were not just decorative. On the held-out WiDS test set, ICU rules fired in `8551` of `13757` cases for `13031` total feature-level revisions, which means the neurosymbolic revision path was active at scale rather than sitting unused.
- Operational audit checks were complete: every TCGA and WiDS trigger mapped to a feature, every trigger trace was finite, every triggered rule changed confidence and attention, and independently recomputed revision and gating residuals were `0`. Routing changed the baseline threshold decision in `0` triggered TCGA cases and `10` triggered WiDS cases. These are implementation-fidelity results, not clinician-usability or clinical-correctness evidence.
- Taken together, the results support a narrower and more defensible claim than "always better accuracy": NGTA is competitive on discrimination, operational as a human-auditable instrumentation layer under heavy missingness, and strongest as a framework for explicit uncertainty routing rather than as a proved winner over every control.

Put differently: the main architectural achievement here is auditability-oriented behavior, not just ranking performance. NGTA turns the transformer's attention update into an inspectable inference path where uncertainty is explicit, rule interventions are traceable, and probability reliability can be measured rather than simply assumed.

## Running

Create an environment and install dependencies:

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run one dataset:

```bash
python main.py --dataset tcga
python main.py --dataset wids
```

Run the whole repository pipeline:

```bash
python main.py --run-all
```

`--run-all` is the full orchestration entrypoint. It runs the complete TCGA pipeline and the complete WiDS pipeline sequentially, computes every metric/chart/trace artifact for both datasets, and writes an aggregate `run_all_summary.json` at the chosen output root.

Useful flags:

- `--data-dir`: directory containing the TCGA tables / MAF files and `wids_icu.csv`
- `--output-dir`: base directory for per-dataset outputs
- `--epochs`, `--batch-size`, `--learning-rate`, `--weight-decay`
- `--mc-samples`, `--gamma`, `--seed`
- `--d-model`, `--num-heads`, `--num-layers`, `--dropout`, `--patience`
- `--seeds 0 1 2 3 4`: run multiple seeds and aggregate submission-ready metrics
- `--baseline-set standard`: add calibrated logistic regression, ExtraTrees, and histogram gradient boosting baselines
- `--ablation-set submission`: add symbolic-disabled and rule-truth sensitivity summaries
- `--export-case-traces`: write curated glass-box case traces for representative held-out patients
- `--paper-tables`: export aggregate CSV and LaTeX tables under `results/submission`
- `--skip-paper-figures`: skip automatic regeneration of the paper figures under `paper/figures`

Notes:

- WiDS uses a dataset-specific batch-size override of `512`
- `--dataset` is used for single-dataset execution; `--run-all` runs both datasets regardless
- outputs are namespaced by dataset so TCGA and WiDS artifacts do not overwrite each other
- multi-seed runs are written under `results/seed_<seed>/...` so repeated submission runs do not overwrite each other

Submission-oriented run:

```bash
python main.py --run-all --seeds 0 1 2 3 4 --baseline-set standard --ablation-set submission --export-case-traces --paper-tables
```

This writes:

- `results/submission/multiseed_metrics.csv`
- `results/submission/baseline_comparison.csv`
- `results/submission/ablation_summary.csv`
- `results/submission/case_traces.csv`
- `results/submission/auditability_metrics.csv`
- `results/submission/paired_metric_deltas.csv`
- `results/submission/paper_tables.tex`
- refreshed paper figures under `paper/figures`

Paper figures are regenerated automatically at the end of a complete run when both TCGA and WiDS result directories are available under the selected `--output-dir`. The LaTeX paper references stable figure paths, so recompiling `paper/main.tex` picks up the updated images and generated tables. The same step can be run directly:

```bash
python -c "from src.paper_figures import generate_paper_figures; generate_paper_figures('results')"
```

The submission artifacts support an auditability-first framing: NGTA is a glass-box evidential routing interface for clinical transformers, with performance treated as compatibility evidence rather than as a claim of universal superiority. `auditability_metrics.csv/json` reports held-out rule coverage, trace completeness, arithmetic residuals, attention effects, probability changes, and threshold flips. These are operational checks, not a clinician usability evaluation.

Rules are evaluated independently in a single inference pass; any subset can fire. The current prototype permits at most one rule per logical feature and rejects collisions instead of applying an order-dependent overwrite. Larger same-feature rule bases require an explicit provenance-aware conflict policy.

## Data

TCGA expects the following in [`data/`](data):

- `clinical.tsv`
- `exposure.tsv`
- `family_history.tsv`
- `follow_up.tsv`
- `pathology_detail.tsv`
- one or more `*.maf` files

WiDS expects:

- `wids_icu.csv`

## WiDS Configuration

The WiDS branch uses exactly these 15 core features:

- Continuous numeric: `age`, `bmi`, `d1_heartrate_max`, `d1_sysbp_min`, `d1_temp_max`, `d1_lactate_max`, `d1_bun_max`, `d1_creatinine_max`, `d1_glucose_max`, `d1_wbc_max`, `d1_spo2_min`, `d1_platelets_min`, `apache_4a_hospital_death_prob`
- Binary pass-through: `elective_surgery`
- Categorical: `gender`

Preprocessing rules:

- `pd.read_csv(..., na_values=['NA'])`
- drop rows where `hospital_death` is missing
- stratified `70/15/15` split with the run seed
- `KNNImputer(n_neighbors=5)` on the 13 continuous features, fit on train only
- `SimpleImputer(strategy='most_frequent')` + one-hot encoding for `gender`
- `StandardScaler` on the 13 continuous features only, fit on train only

WiDS symbolic ICU rules are evaluated after KNN imputation and before scaling:

- `d1_lactate_max >= 4.0`
- `d1_sysbp_min <= 90.0`
- `age >= 75.0`
- `d1_creatinine_max >= 2.0`

## Interpretation Caveats

This repository is a first methods implementation, not a clinical validation package.

- The TCGA held-out split has only `69` cases. The transformer variants are close and should not be described as statistically separated from one another.
- The symbolic rule bases are deliberately thin: four thyroid rules and four ICU rules. They demonstrate that the NARS revision path is active, but they are not independently curated clinical ontologies.
- Following feedback from Pei Wang on April 21, 2026, the repository treats the variance-to-confidence map as an application-specific heuristic initializer, not as a claim that model variance directly measures NARS evidence amount.
- The current results do not establish that these exact hand-selected rules are sufficient or optimal. A stronger study would lock a broader expert-curated rule base before evaluation and report sensitivity to rule inclusion and truth-value assignments.
- There is no external validation cohort in this snapshot. Clinical claims would require temporally or institutionally independent test cohorts with locked preprocessing, model settings, and rule definitions.

## Outputs

Each dataset writes a full artifact bundle under the chosen output root:

- `<output-dir>/tcga/charts`
- `<output-dir>/tcga/metrics`
- `<output-dir>/tcga/traces`
- `<output-dir>/wids/charts`
- `<output-dir>/wids/metrics`
- `<output-dir>/wids/traces`

Top-level orchestration output:

- `<output-dir>/run_all_summary.json`

Per-dataset metrics/traces include:

- `metrics.csv`
- `training_history.csv`
- `gamma_ablation.csv`
- `decision_curve.csv`
- `calibration_reliability.csv`
- `run_summary.json`
- `test_predictions.csv`
- `auditability_metrics.csv` and `auditability_metrics.json`
- ROC, calibration, training-history, gamma-ablation, and decision-curve plots

`metrics.csv` reports 95% bootstrap confidence intervals for AUC, Brier score, and ECE across the random forest, baseline transformer, flat-confidence transformer, MC-confidence-only ablation, and NARS-gated transformer. Run summaries and `results/submission/paired_metric_deltas.csv` include paired Brier/ECE differences between NARS-gated routing and each transformer control.

## Latest Full Run

The current default full run was produced with:

```bash
python main.py --run-all
```

This was a single-seed default run with `baseline_set=minimal`, `ablation_set=quick`, `mc_samples=50`, `gamma=2.0`, and seed `0`. The richer multi-seed submission artifacts are produced only by the longer `--seeds ... --baseline-set standard --ablation-set submission --export-case-traces --paper-tables` command.

Result bundles written by that run:

- [`results/run_all_summary.json`](results/run_all_summary.json)
- [`results/tcga/metrics/run_summary.json`](results/tcga/metrics/run_summary.json)
- [`results/wids/metrics/run_summary.json`](results/wids/metrics/run_summary.json)

The numerical summary below is sourced from these per-dataset artifacts. The existing files under `results/submission/` were not regenerated by this default `--run-all` invocation and should not be used as the source of the refreshed numbers.

TCGA-THCA full-run summary:

Role in the paper: multi-modal proof of concept for clinical-plus-genomic fusion

- Split: `319 / 69 / 69` train/validation/test from `457` labeled cases
- Best default AUC: `0.73277` for `flat_confidence` with 95% CI `[0.60282, 0.84794]`
- Best Brier: `0.21091` for `flat_confidence` with 95% CI `[0.18160, 0.24265]`
- Best ECE: `0.11779` for `flat_confidence` with 95% CI `[0.11300, 0.26405]`
- Accuracy: `0.68116` for all four Transformer variants
- MC-confidence-only ablation: AUC `0.73109`, Brier `0.21095`, ECE `0.11843`, accuracy `0.68116`
- NARS-gated: AUC `0.73109`, Brier `0.21094`, ECE `0.11837`, accuracy `0.68116`
- Symbolic activity: `42 / 69` held-out cases with any trigger, `79` total feature-level revisions
- Operational auditability: `100%` trigger mapping and finite traces; all `79` rule events changed confidence and attention; mean/median/maximum absolute probability changes among triggered cases were `0.00205 / 0.00185 / 0.00600`; no triggered case crossed the `0.5` threshold; revision and gate residuals were `0`.
- Interpretation: the flat-confidence control is strongest by TCGA point estimates, but all paired Brier/ECE comparisons between NARS-gated and the Transformer controls include zero. The 69-case split supports multimodal feasibility, not model-ranking or symbolic-gating superiority.

WiDS ICU full-run summary:

Role in the paper: primary scale test for missingness, calibration, and operational auditability

- Split: `64199 / 13757 / 13757` train/validation/test from `91713` labeled rows
- Input width: `16` model features after preprocessing
- Best AUC: `0.88034` for `baseline` with 95% CI `[0.87001, 0.89021]`
- Best Brier: `0.056468` for `mc_confidence_only` with 95% CI `[0.053647, 0.059625]`
- Best ECE: `0.005808` for `mc_confidence_only` with 95% CI `[0.004090, 0.010617]`
- Best accuracy: `0.92862`, tied across `flat_confidence`, `mc_confidence_only`, and `nars_gated`
- NARS-gated: AUC `0.88024`, Brier `0.056469`, ECE `0.005833`, accuracy `0.92862`
- Symbolic activity: `8551 / 13757` held-out cases with any trigger, `13031` total feature-level revisions
- Operational auditability: `100%` trigger mapping and finite traces; all `13031` rule events changed confidence and attention; mean/median/maximum absolute probability changes among triggered cases were `0.00214 / 0.00159 / 0.03102`; `10` triggered cases crossed the `0.5` threshold relative to the ungated baseline; revision and gate residuals were `0`.
- Paired bootstrap comparisons:
- `baseline -> nars_gated` Brier `0.056527 -> 0.056469`; paired delta CI `[0.0000249, 0.0000911]`
- `baseline -> nars_gated` ECE `0.007496 -> 0.005833`; paired delta CI `[0.0000282, 0.0020241]`
- `flat_confidence -> nars_gated` Brier `0.056480 -> 0.056469`; paired delta CI `[-0.0000050, 0.0000290]`
- `flat_confidence -> nars_gated` ECE `0.006182 -> 0.005833`; paired delta CI `[-0.0003862, 0.0008464]`
- `mc_confidence_only -> nars_gated` Brier `0.056468 -> 0.056469`; paired delta CI `[-0.00000286, 0.00000070]`
- `mc_confidence_only -> nars_gated` ECE `0.005808 -> 0.005833`; paired delta CI `[-0.0001681, 0.0001255]`
- `random_forest -> nars_gated` Brier `0.058169 -> 0.056469`; paired delta CI `[0.0009628, 0.0023993]`
- `random_forest -> nars_gated` ECE `0.007372 -> 0.005833`; paired delta CI `[-0.0038679, 0.0079440]`
- AUC confidence intervals overlap across all WiDS variants.
- Interpretation: the paired baseline comparison supports a small calibration benefit from confidence-gated inference, while the flat-confidence and MC-confidence comparisons do not isolate an additional benefit from symbolic revision. The `10` baseline-to-NARS threshold flips likewise measure the entire routing path; the updated prediction export has no threshold flips between MC-confidence-only and NARS-gated predictions.
- Per-rule test triggers:
  - `rule_lactate: 1936`
  - `rule_hypotension: 5338`
  - `rule_age: 3443`
  - `rule_creatinine: 2314`

## Repository Layout

- [`main.py`](main.py): CLI entry point and `--run-all` orchestration
- [`src/data_loader.py`](src/data_loader.py): TCGA ingestion and preprocessing
- [`src/wids_loader.py`](src/wids_loader.py): WiDS ingestion, preprocessing, and ICU rule-mask generation
- [`src/knowledge_base.py`](src/knowledge_base.py): TCGA symbolic rule base
- [`src/wids_knowledge_base.py`](src/wids_knowledge_base.py): WiDS symbolic ICU rule base
- [`src/neural_encoder.py`](src/neural_encoder.py): tabular Transformer with MC-dropout inference
- [`src/nars_interface.py`](src/nars_interface.py): heuristic neural truth mapping plus standard NAL deduction, revision, and evidential utility operators
- [`src/attention_hook.py`](src/attention_hook.py): confidence-based attention gating
- [`src/pipeline.py`](src/pipeline.py): training, baselines, evaluation, plotting, and summary generation
- [`paper/main.tex`](paper/main.tex): anonymous NeurIPS 2026 workshop manuscript source
- [`paper/main.pdf`](paper/main.pdf): compiled submission PDF

## Acknowledgments

The repository updates in this snapshot were shaped directly by Pei Wang's email feedback on April 21, 2026. In particular, he pointed out that statistical variance is not the same thing as NARS evidence amount and that the manuscript's deduction confidence formula needed to match standard NAL. The current code and paper now reflect those corrections.

The author also thanks Prof. Leilani H. Gilpin for reviewing the manuscript and for guidance on its central contribution: an auditable inference-time neurosymbolic interface rather than a claim of clinically validated prediction improvement. Her feedback informed the paper's framing, NAL/NARS boundary, pipeline figure, case-trace presentation, rule-base discussion, and cautious interpretation of the experimental results.

The project also relies on public TCGA-THCA data from the NCI Genomic Data Commons.

