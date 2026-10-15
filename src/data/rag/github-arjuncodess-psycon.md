# GitHub README: arjuncodess/psycon

> Repository: https://github.com/arjuncodess/psycon
> Retrieved: 2026-10-15T07:21:50.370Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

# PSYCON

PSYCON turns recorded discussions into speaker-specific communication measurements and evidence-linked reports for psychologist review. The working prototype combines audio normalization, speaker diarization, transcription, timestamped exchanges and a versioned observation rubric, so a reviewer can trace a measurement back to its source. Its research contribution is a reproducible workflow for studying communication behavior in context.

The project is framed for **Behavioral and Social Sciences (BEHA)** using the [ISEF science-project judging criteria](https://www.societyforscience.org/isef/grand-award/criteria/). The emphasis is the testable behavioral question, operational definitions, independent observations, sampling, controls, reliability, and limits of interpretation. A completed pipeline or a ready-profile count does not establish psychological validity.

## Paper, synopsis, and presentation

The [research paper](paper/main.pdf) and [separate two-page synopsis](paper/synopsis.pdf) use the requested [Overleaf preprint template](https://www.overleaf.com/latex/templates/style-and-template-for-preprints-arxiv-bio-arxiv/pkzcrhzcdxmc). [Sources and build instructions](paper/README.md) explain the evidence and format. Rebuild both with `python paper/build.py`; the builder regenerates the aggregate figure, checks LaTeX references and overflow, and verifies the synopsis page count. The paper puts the behavioral study first and retains software, legacy physiology, and hardware details as supporting methods or historical context.

These are AI-assisted working drafts for the students' independent writing and reference verification. The official [AI-use guidance](https://sspcdn.blob.core.windows.net/files/Documents/SEP/ISEF/2026/Rules/Generative-AI-Use-Table.pdf) does not permit AI to initially write the research plan, abstract, paper, poster, conclusions, or starter bibliography. Draft generation and disclosure do not certify competition eligibility. No poster is part of this work.

The [presentation content](docs/IRIS_PRESENTATION.md) contains exactly 25 numbered content slides, excluding a title-opening slide and closing thanks. It covers the behavioral argument, evidence boundaries, and a short future hardware/3D/KiCad roadmap. It is versioned alongside the research documentation.

The current ISEF prototype uses audio and transcripts. Its focus is what a person said and did in a particular exchange, how that relates to reviewed human observations, and how patterns differ across comparable conversations. The [v4.0 psychologist marksheet](docs/PSYCON_Psychologist_Observation_Mark_Sheet.pdf) and [answer interpretation guide](docs/PSYCON_Tendency_Flag_Guide.pdf) define the observation targets. Their [marksheet source](docs/PSYCON_Psychologist_Observation_Mark_Sheet.tex) and [guide source](docs/PSYCON_Tendency_Flag_Guide.tex) retain the exact definitions.

A psychologist-reviewed profile here means a set of contextual ratings, evidence, confidence, and review records. It does not establish a personality type or diagnosis. Model agreement with those ratings needs held-out evaluation. See [the behavioral direction](docs/PSYCON_VISION.md) for the staged work and [current coverage](docs/INSTRUMENT_STATUS.md) for implementation limits.

## Research question

**To what extent can speaker-specific talking patterns and discussion context predict contextual A-T ratings reviewed by school psychologists on held-out participants and recordings, and does adding strictly earlier personal history improve the evidence support and usefulness of the resulting communication reports?**

The study has two separate evaluations. H1 asks whether conversational measurements and context predict per-item reviewed ratings better than a constant training-median baseline on held-out participants and sources. H2 asks whether richer reports improve independently rated grounding and usefulness without increasing overclaiming. The report experiment compares transcript-only, structured-context, and full-PSYCON inputs using the same speaker, transcript window, local model digest, and generation settings. Structured context and full PSYCON share frozen supervised predictions. Full PSYCON also adds retrieved evidence and reference information, so the current package comparison cannot isolate history's effect; a history-only ablation must hold those other inputs fixed.

The behavioral analysis also needs independent rater agreement before adjudication, an explicit recruitment and sample-size justification, declared primary outcomes, and error/abstention slices for language, opportunity, moderation, topic, and recording quality. The estimator's minimum counts are software gates, not a power calculation. Current supervised snapshots do not automatically include the historical summaries used in reports.

The question is about observable behavior in context. A correlation between a speaking pattern and a psychologist's rating does not establish a cause, a psychological state, or a permanent characteristic of the person. Success requires supported evidence, reproducible human judgments, performance against simple prediction baselines, and independent review of the reports. A completed software pipeline alone cannot answer the research question.

## Psychology and the school psychologists' data

The study's human reference is the marksheet data provided and reviewed by psychologists from the project author's school. Their role is to judge recorded behavior against the item definitions, check the surrounding exchange, and retain evidence for their judgments. PSYCON connects those observations to the correct participant's audio and transcript. It does not generate the psychologist's answers or treat its own predictions as human validation.

Each marksheet describes one participant in one discussion. The five observation areas cover following the discussion, structuring contributions, sharing turns, responding to challenge, and delivery changes after an identifiable event. The psychological interpretation stays tied to what the recording supports. For example, reduced participation after a challenge needs evidence of the challenge, earlier participation, later behavior, and an opportunity to speak; a short contribution by itself cannot establish withdrawal or anxiety.

The rating scale preserves the psychologist's distinctions:

| Answer | Meaning in the v4.0 marksheet |
| --- | --- |
| 0 | The behavior was not observed despite a fair opportunity |
| 1 | One weak or brief occurrence |
| 2 | Repeated or noticeable behavior with limited effect |
| 3 | Clear and repeated behavior, or an effect on the exchange |
| 4 | Sustained behavior or a strong effect on the exchange |
| N/O | No fair opportunity, or a recording that cannot support a rating |
| Missing | No answer was supplied |

Scores above zero require timestamps and the surrounding event. The interpretation guide treats 1 as a weak moment, 2 as a possible one-session pattern needing more evidence, and 3 or 4 as support for a contextual description. Reviewers also record confidence, recording quality, language access, overlap, moderation, unequal participation, sensitive topics, and accommodations. These conditions can change what a rating means.

The app preserves the observer's original answer, independent review, disagreements, adjudication, and later corrections as separate records. Self-reports also remain separate from observer ratings. Reviewer agreement tests whether people apply the rubric consistently; model agreement tests whether conversational inputs predict their reviewed answers. Neither makes the marksheet a diagnostic instrument or establishes broader psychological validity.

The current live audit contains 76 imported version 5.0 participant forms from ten recordings: 2,432 item answers comprise 750 numeric scores, 1,662 N/O answers, and 20 missing answers. Item opportunity, observer confidence, structured evidence, and independent review are unavailable, so no labels meet the strict behavioral-validation gates. Nine private signed group-participation sheets have been visually reviewed. The authors confirm that recording and model-training permissions, applicable parental permission and prior approval are documented in the complete records. These details are not visible in the supplied photographs and have not been independently checked; see [the consent review](docs/CONSENT_REVIEW.md). Speaker identity is not independently verified. Synthetic demonstrations remain engineering checks only.

Ten private scanned bundles contain 228 image-only pages. Their imported version 5.0 form has A-T plus P1-P12 role-related items and is retained as `psycon-context-5.0`, separately from the legacy v4.0 rubric. Raw transcriptions remain source observations, not independently reviewed psychological ground truth. Missing answers and unavailable review fields have not been fabricated.

## Results that can be reported

The compact procedure improved agreement from **57.21% to 62.19%** and reduced MAE from **0.562 to 0.490** on the same 402 ratings. The project also delivered a 51-configuration feature audit, reproduced saved predictions and fixed a tested temporal-ordering defect. Training-mode agreement remains higher at 65.67%, so these retrospective results establish a working research prototype rather than independently validated behavioral prediction.

The [full pipeline autopsy](docs/research/pipeline-autopsy-2026-10-13/full_pipeline_report.md) traces audio through rating alignment and executes 51 fixed feature-family/model configurations with inner grouped selection. The selected challenger gets 251/402 correct (62.44%, MAE 0.488), versus compact 250/402 (62.19%, 0.490) and training mode 264/402 (65.67%, 0.453), so compact remains the research reference. A 273/402 fixed timing/overlap diagnostic is exploratory and was not promoted. A tested chronological-order correction fixes response latency on unordered stage retries; frozen features, ratings and current model artifacts remain unchanged. Stage speech/identity accuracy and a numerical label-reliability ceiling remain unmeasured.

The [maximum defensible audit](docs/research/maximum-defensible-2026-10-13/submission_results.md) reproduces the historical outputs exactly. New nested pooled selection reached 65.67% agreement and MAE 0.453 on the common 402 ratings, exactly matching the fold training-mode predictions; its score-3 recall fell to 4.85%, so compact remains the research reference. The 67.16% fixed-configuration diagnostic predicted score 4 on 397/402 ratings and is not a selected winner. No model was activated, independent testing remains unavailable, and 85% agreement is unsupported. [Aggregate results](docs/report_assets/maximum-defensible-summary.json) include both cohorts, class behaviour and all fixed configurations. Reproduce with `python -m research.maximum_defensible --output <new-directory>` using the private frozen inputs.

The earlier [emergency audit](docs/research/emergency-audit-2026-10-12/audit_report.md) reproduces the original omitted-group predictions exactly: 230/402 matches, with 21 abstentions. The often-quoted roughly 64% is the fold training-median reference, 259/402 (64.43%), rather than model agreement. A new fixed inner agreement-selection policy with ordinal-error and class-recall guards achieved 247/402 (61.44%), below the existing compact procedure's 250/402 (62.19%), so the existing implementation is retained. The fold training-mode reference reaches 264/402 (65.67%); it is a population reference, not individualized prediction. All results remain retrospective development. Reproduce the audit with `python -m research.emergency_audit --output <new-directory>` using the private frozen inputs; private artifacts remain in `.runtime/emergency-audit-2026-10-12/`. The versioned audit directory contains anonymized reports, aggregate metrics and graphs. No reference rating or live model was changed.

The [compact/ordinal development analysis](docs/report_assets/compact-source-summary.json) tests predefined four/eight-feature models, cumulative ordinal classifiers and shallow 64-tree ensembles. Inner selection minimizes group-average error while constraining sensitivity loss. On the same 402 labels it reaches 62.2% agreement and MAE 0.490, versus original 57.2%/0.562 and median-reference 64.4%/0.460. Mean score-class sensitivity is 30.0%; score-2 recall remains zero. All 423 labels yield 61.2% agreement/0.506 MAE versus reference 63.4%/0.478. Fourteen final fits contain eight population references and six feature-based models, saved as exploratory candidates without promotion. This is additional retrospective development, not independent final testing. Fixed-candidate results are retained rather than used to choose an outer-result winner.

The [nested repair analysis](docs/report_assets/defensible-source-summary.json) uses inner group folds for candidate selection and outer omitted groups for scoring. On the same 402 labels, agreement improves from 57.2% to 60.9% and MAE falls from 0.562 to 0.493, but the median reference remains better at 64.4%/0.460. Mean observed-class sensitivity falls from 30.3% to 28.8%; score 2 recall remains zero, and score 0 is unobserved. This is retrospective development after examining earlier results, not an untouched final test. Fourteen revised final fits are saved as candidates, including nine median references and five feature-based estimators; they were not promoted. [Defense notes](docs/DEFENSE_NOTES.md) explain the counts, originality, controls and unresolved evidence.

A separate post-hoc sensitivity-oriented nested procedure achieved 56.5% agreement, MAE 0.562 and 29.9% mean observed-class sensitivity on the same 402 labels. It detected score 2 in only 1/20 cases and did not improve on original class-average sensitivity. Neither repair is promoted as reliable behavioral prediction. See the [sensitivity experiment](docs/report_assets/sensitivity-source-summary.json).

The report now includes a deterministic measurement summary and an explicitly untested exercise selected by the user's communication goal. Prompt 1.3.3 bounds factual observations, interpretations and complete-recording limitations; validators withhold duplicates, mismatched measurements and unsupported numerical inferences. An actual bounded local run completed with the measured 17.80% speaking share. The interface distinguishes full-recording measurements from linked excerpts rather than treating excerpts as independent numerical verification. The exercise is prewritten, not proof of learned personalized coaching. A history-only comparison helper refuses missing history and changes only that input; no benefit study is claimed. Feature definition 1.0.1 corrects denominator metadata without altering frozen feature values or human scores.

A new [retrospective grouped diagnostic](docs/report_assets/source-cross-validation-summary.json) replays the deployed fit and refits after omitting each of five known groups. Training exact raw-score agreement is 97.9% (414/423), but omitted-group agreement is 57.2% (230/402), below the fold training-median baseline at 64.4%; twenty-one labels were withheld by fold fitting gates. MAE is 0.562 versus baseline 0.460. P1-P12 dominate this pooled result, with only five G/I labels scored in CV. This is exploratory raw-score evidence, not an independent final test or validated psychological accuracy. An earlier LLM report generated successfully but mostly paraphrased the topic and repeated claims; its example had no eligible history, so personalization benefit remains untested.

**Full-source exploratory training completed in Docker.** The separate `source-v5-exploratory` task retained 488 real numeric source scores across 40 participant-session examples, nine recordings, and five known person/source groups. Fourteen targets met the fitting gates: G, I, and P1-P12. Their final models used 423 score labels, median imputation with missingness indicators, standard scaling, and class-balanced logistic regression with fixed C=1.0 and seed 42. Eighteen of the 32 source targets remain untrained because of sparse data or unsupported measurements.

All fourteen models are active as explicitly exploratory prototypes, and an API prediction check returned fourteen scored outputs carrying their limitations. The fit uses all retained examples and has no validation or test partition; training agreement can be reproduced, but no independent test accuracy, behavioral effect size, reliability, or benefit is established. P1-P12 approximate source role ratings using general conversational proxies, whose role validity is unverified. The strict `contextual-v5` workflow still requires the missing review and evidence fields. [Aggregate training release](docs/report_assets/source-training-summary.json) records the frozen snapshot, runtime, target counts, and limitations. Private weights are packaged locally in `.runtime/participant-overlap/source-v5-models.zip`.


The retained audiovisual comparison covers 11 recordings and 85 marked person-recording slots, rather than 85 unique people. Guarded PSYCON produced 57 ready profiles, while guarded Nemotron streaming and offline each produced 51. The six-slot difference measures coverage under saved checks; it is not independently measured identity accuracy or behavioral prediction. See the [comparison report](docs/group_discussions_final_report.md) and [committed aggregate data](docs/report_assets/nemotron-benchmark-summary.json).

The author's [cross-recording seat mapping](docs/research/PARTICIPANT_OVERLAP.md) supplies nineteen identity links, reducing the 85 slots to 66 provisional components, an upper bound rather than a confirmed unique-person count. It connects seven recordings into two multi-recording groups; four other recordings remain singleton groups. These six provisional groups are minimum constraints for unseen-participant splitting and may merge further as remaining overlaps are resolved. Only the first handwritten mapping section's left labels are corrected to right. [Exact anonymous links](docs/research/PARTICIPANT_OVERLAP.json) retain full filenames and right-based seat indexes. The links were applied transactionally to 34 participant records representing fifteen known people, with private before-state journals and database audit events. Eight linked seats were added without invented answers or permissions; 84 participant-session records now exist, of which 76 have imported forms. Source/group constraints were used in the exploratory frozen dataset.

Human A-T prediction performance, psychologist agreement, blinded report usefulness, and longitudinal improvement remain pending. The older WESAD metrics concern a different physiology task; its calm-baseline features use labelled subject windows before splitting, including held-out-subject information. Those scores cannot be used as untouched unseen-person, current BEHA, or wearable deployment accuracy.

## Current scope: software active, hardware paused

Hardware development is paused for now. The active work is the recording-to-evidence pipeline, psychologist marksheet intake and review, supervised behavioral prediction, personal history, and report evaluation in the software application. No wearable, physiological sensor, face recognition, voice enrollment, or identity embedding is required to run this workflow. Earlier hardware and coaching material is retained in [the archived README](docs/LEGACY_PRODUCT_README.md). The ear firmware has I2S capture and protocol transport, but the wrist's sensor packet values remain placeholders. There are no tracked KiCad schematic/PCB files or validated manufactured assemblies. Future 3D assembly, circuit, power, and bench work would prepare a separate synchronized-sensor behavioral study.

## Run the research instrument

Run this one command from the repository root in PowerShell, with Docker Desktop running and the PostgreSQL URL in the ignored `.env`:

```powershell
.runtime\venv\Scripts\python.exe run_psycon.py docker --no-build
```

Open http://localhost:8008. Docker starts the web app, CUDA speech worker, and independent CPU trainer concurrently after applying migrations and idempotently queuing the original-video batch. All services use the configured PostgreSQL, including Neon pooled URLs. Startup never substitutes the old local database. The verified local startup uses the installed `psycon-instrument:local` image with `--no-build`. A clean rebuild requires the separate `psycon-week4-worker:latest` base, which is absent on this machine; omitting `--no-build` currently fails at that dependency. The mounted current code was used for training. Registered Windows paths are explicitly mapped to the mounted workspace, and originals are mounted read only.

PostgreSQL is the only application database; a connection failure never creates another store. Original media and generated models stay in registered local paths; answers, bounded source spreadsheets, evidence, jobs, model manifests, and results live in PostgreSQL. The application remains a local single-user research instrument.

Session **Participants & answers** supports anonymous participants, reviewed speaker mappings, individual/batch CSV and XLSX previews, source downloads, direct entry, immutable corrections, independent review, and consent records. **Training & models** shows explicit exclusions, frozen snapshots, queued supervised fitting, held-out evaluations, exploratory limitations, deliberate activation, rollback, and predictions. Saving a sheet does not grant consent or establish training eligibility. A-T uses the actual v4.0 marksheet; independent communication labels use [the annotation guidelines](docs/COMMUNICATION_ANNOTATION_GUIDELINES.md).

The training dashboard shows per-target training, validation, and final-evaluation records and independent source-group counts before fitting. Start training is disabled for snapshots that cannot fit any target. Jobs update automatically, and fitted models remain candidates until you deliberately activate them. Choose a processed recording and speaker to inspect predictions without copying database IDs. The trainer also commits queued spreadsheet imports independently of speech processing, using the worker database role for imports and the trainer role for fitting.

To run without Docker, use this one PowerShell command after installing the project runtime and configuring PostgreSQL:

```powershell
npx.cmd --yes concurrently@9.2.1 --kill-others --names web,media,trainer ".runtime\venv\Scripts\python.exe run_psycon.py web --port 8008" ".runtime\venv\Scripts\python.exe run_psycon.py worker" ".runtime\venv\Scripts\python.exe run_psycon.py trainer"
```

Read [the storage and training runbook](docs/POSTGRES_TRAINING_RUNBOOK.md) for migrations, least-privilege roles, snapshots, workers, exports, coordinated backups/restoration, and deletion. The retained legacy source is read only by the one-time migration command. `run_backend.py` and the local-runtime web/worker commands launch the same canonical application.

When an interpretation is requested, PSYCON reuses the configured local Ollama service. If the loopback service is stopped and the bundled `.runtime/ollama` executable exists, it starts that executable in the background with the project-local model directory and cloud access disabled. No model is downloaded, substituted, or repinned automatically. Container endpoints and independently installed runtimes must be started separately. You can also start the bundled runtime manually:

```powershell
powershell -ExecutionPolicy Bypass -File release_tools/local-runtime.ps1 ollama
```

The app uses Community-1 diarization and faster-whisper large-v3 through replaceable adapters. The launcher selects the available CUDA device or CPU and uses project-local model caches. The diarization model requires the applicable Hugging Face model access and `HF_TOKEN`. The local interpreter uses the configured Ollama model and records its actual digest. Missing models and rejected evidence references produce explicit failures, never substitute profiles.

Interpretation failures identify whether the service is unreachable, the selected model is absent, or its digest differs from `PSYCON_OLLAMA_DIGEST`. Digest mismatches remain blocked. Background-service logs are in `.runtime/logs/ollama-stdout.log` and `ollama-stderr.log`. Interpretation cites only the target speaker's supplied evidence IDs while retaining other speakers' words as interaction context, and truncated model responses are withheld.

## Use it

1. **Upload conversations.** Supply actual recording times, context, participant IDs, dataset role, and consent status. Each file becomes its own session, and originals keep their exact filenames.
2. **Inspect speaker evidence.** Review quality diagnostics, processing stages, the timeline, attributed transcript, measured talking patterns, and surrounding exchanges. Ambiguous overlapping words remain unattributed.
3. **Connect the correct person.** Keep longitudinal people, session participants, and speaker clusters separate. Confirm the participant-to-speaker mapping through a reviewer before linking answers to features. Names and identity embeddings are unnecessary.
4. **Save and review marksheets.** In Participants & answers, preview individual or batch CSV/XLSX files, map columns and participant codes, and save normalized answers to PostgreSQL. Retain the psychologist's identity, context, opportunity, confidence, timestamps, and independent review. Zero, N/O, and missing answers have different meanings.
5. **Examine contextual patterns.** Compare measured participation, timing, responses, and evidence with reviewed A-T observations and strictly earlier personal history. The Q-T event baseline comes from earlier in the same discussion; it is separate from the historical baseline. Optional archetype comparisons are exploratory reference tools.
6. **Train eligible targets.** Training & models shows data readiness and exclusion reasons. Freeze a versioned dataset, queue training on the Docker or local worker, inspect per-item held-out evaluation, and activate a compatible model deliberately. Saving a spreadsheet alone does not authorize training. Models learn from approved examples, rather than indiscriminately using every stored record.
7. **Interpret and evaluate.** Reports distinguish measurements, human annotations, supervised predictions, and LLM interpretation. Review cited audio before acting on suggestions. Evaluate supervised prediction separately from the controlled transcript-only, structured-context, and full-PSYCON comparison. Missing evaluation remains unavailable.
8. **Export or delete.** Exports retain actual processing states, annotations, revisions, and model provenance. Corrections, withdrawals, and deletion invalidate affected datasets and results and flag dependent models for retirement or retraining.

## How the software works

### From a recording to participant evidence

The launcher registers the 11 original files in `group_discussions` idempotently and queues their analysis in PostgreSQL. Uploaded recordings use the same processing workflow. Each session retains its exact original filename, file hash, recording time, context, ownership, and processing configuration. Registration and queuing do not imply that processing has succeeded.

The media worker extracts audio to a separate normalized playback file, checks recording quality, identifies anonymous speaker intervals with Community-1, and transcribes speech with faster-whisper large-v3. It keeps source timestamps and assigns words conservatively: ambiguous overlapping speech remains unattributed. Segmentation then creates turns, utterances, and surrounding exchanges for speaker-specific feature extraction.

Measurements include speaking time and share, turn count, words per minute, overlap candidates, and supported transcript markers. Every feature records its definition, unit, source, version, and limitations. An overlap candidate is not a confirmed intentional interruption, and a rule-based transcript marker is not a psychologist's judgment. Quality failures withhold unsupported analysis while preserving available stage outputs. Evidence links connect a result to the correct speaker, source excerpt, context, and playback time.

### From a marksheet to a trained predictor

Participants & answers previews CSV/XLSX files before saving, supports column and anonymous-code mapping, checks duplicates and invalid rows, and saves valid batches atomically. Direct entry follows the same versioned form definitions. PostgreSQL retains normalized answers, permitted source files, reviewer records, evidence windows, and immutable correction history. The current speaker mapping determines whether those answers can be joined to measured features.

Training & models explains exclusions before fitting. A frozen snapshot records label and mapping revisions, consent, source hashes, feature versions, and split assignments. Shared participants, duplicate recordings, and related recording sources cannot cross the split boundary. Historical inputs use only permitted earlier sessions, and preprocessing learns its parameters from training records alone.

The CPU trainer fits a separate supported target using median imputation, missing-value indicators, scaling, and class-balanced logistic regression. Validation selects the model configuration; final evaluation remains separate. The dashboard reports per-target sample counts, prediction errors, classification metrics, and a training-median prediction baseline where available. Small or unsupported targets remain unavailable or exploratory. This trains the supervised behavioral predictor; it does not fine-tune Whisper, diarization, or the LLM.

Generated model files stay local with their hashes, manifests, evaluations, and training lineage registered in PostgreSQL. A fitted model remains a candidate until an operator activates it. Activation and rollback are recorded, and predictions retain the exact model and input lineage. Corrections or withdrawals invalidate affected snapshots and outputs and identify dependent models that need retirement or retraining.

### From participant evidence to a report

The application keeps four layers visible: measured observations, human annotations, supervised predictions, and LLM interpretations. When available, the local LLM receives structured predictions with model versions, uncertainty, abstention, and evidence references, alongside measured features and interaction context. Personal history uses strictly earlier comparable sessions; pressure-event comparisons use an earlier baseline within the same discussion. Those baselines answer different questions and remain separate.

The report preserves its input, prompt, decoding settings, local model digest, output, citation checks, and processing attempts. Generated text from the video/session workflow is logged in PostgreSQL, including failed attempts. Invented or wrong-speaker citations and truncated responses are withheld. Reports offer qualified interpretations and evidence-backed communication suggestions, while measurements, human observations, and playback remain useful without a trained model or available LLM.

### Pages and services

| Application area | What it lets the researcher do |
| --- | --- |
| Dashboard | Check the original group-discussion videos and their latest analysis states |
| Sessions | Inspect processing, participants and answers, transcript, measurements, and reports; play or export evidence |
| People & history | Link anonymous people across reviewed session mappings and compare eligible earlier conversations |
| Talking patterns | Inspect recurring conversational indicators with evidence and historical limits |
| Evidence | Search saved speaker-specific excerpts and inspect their context and timestamps |
| Research | Run the controlled three-way report comparison and inspect independent reviewer results |
| Training & models | Review data readiness, freeze datasets, train, evaluate, activate, roll back, and inspect predictions |
| Blinded review | Rate a saved report and its cited sources without seeing its system or model label |

Optional reference comparisons remain secondary exploratory tools. They do not assign personality or provide training labels.

The web service uses Flask, Jinja templates, and plain JavaScript. The media worker handles recording analysis and local interpretation; the independent CPU trainer handles fitting and queued spreadsheet intake without waiting for speech processing. PostgreSQL owns durable jobs, claims, leases, retries, cancellation, and protection against stale completion writes, so a browser request does not have to remain open while work runs.

| Software component | Main source |
| --- | --- |
| Launcher and Docker services | [`run_psycon.py`](run_psycon.py), [`docker-compose.instrument.yml`](docker-compose.instrument.yml) |
| Web application and APIs | [`app.py`](backend/instrument/app.py), [`routes.py`](backend/instrument/routes.py), [`workflow_routes.py`](backend/instrument/workflow_routes.py) |
| Recording processing and features | [`service.py`](backend/instrument/service.py), [`audio.py`](backend/instrument/audio.py), [`features.py`](backend/instrument/features.py) |
| Human forms, answers, and eligibility | [`forms.py`](backend/instrument/forms.py), [`answers.py`](backend/instrument/answers.py), [`annotations.py`](backend/instrument/annotations.py) |
| Snapshots and supervised models | [`datasets.py`](backend/instrument/datasets.py), [`training.py`](backend/instrument/training.py) |
| History and controlled report research | [`profiles.py`](backend/instrument/profiles.py), [`research.py`](backend/instrument/research.py) |
| PostgreSQL, jobs, and workers | [`store.py`](backend/instrument/store.py), [`jobs.py`](backend/instrument/jobs.py), [`worker.py`](backend/instrument/worker.py) |
| Exports, backups, and deletion | [`exports.py`](backend/instrument/exports.py), [`backup.py`](backend/instrument/backup.py), [`deletion.py`](backend/instrument/deletion.py) |

The [architecture and research protocol](docs/INSTRUMENT_ARCHITECTURE.md) records feature calculations, quality gates, historical rules, and experimental controls. The [PostgreSQL and training runbook](docs/POSTGRES_TRAINING_RUNBOOK.md) covers configuration, migration, file registration, exports, coordinated database/local-file backup and verified restoration. The complete original-media backup still needs a destination with sufficient free space; database verification does not stand in for that media backup.

## Marksheet targets and training limits

| Observation area | Items | Focus |
| --- | --- | --- |
| Discussion tracking | A-D | Following the current point, answering it, adapting to changes, and needing repetition |
| Contribution structure | E-H | Idea order, requested support, completing a point, and task relevance |
| Turn-taking and reciprocity | I-L | Turn entry, continuing overlap, sharing cues, and acknowledging a direct contribution |
| Response to challenge | M-P | Observable changes after disagreement, their duration, participation changes, and response to feedback |
| Pressure-linked delivery change | Q-T | Event-linked changes in rate, hesitation, vocal delivery, movement, or participation against an earlier same-session baseline |

These are the marksheet's observation areas, not a total personality score. A rating above zero needs contextual evidence. N/O means the recording or opportunity cannot support a conclusion; missing means no answer was supplied. A model must abstain when its target or input evidence is unsupported. Visual-only evidence cannot train the current audio-based predictor. Item S remains excluded until supported vocal-change window features exist; T can use supported participation change, while visual-only answers remain saved and excluded.

Training uses reviewed human ratings as separate per-item targets. Feature/label associations are descriptive, and prediction is evaluated on held-out people and source groups with recorded counts and baseline comparisons. Neither an association nor a fitted model establishes psychological validity. Independently defined communication ratings have their own [annotation guidelines](docs/COMMUNICATION_ANNOTATION_GUIDELINES.md); they are session-level behavioral labels and do not come from archetype choices or model outputs. The current real records do not yet provide eligible, consented, independently reviewed training labels.

## Optional reference comparisons

Saved guarded group analysis can be imported without rerunning face recognition; PostgreSQL must be available:

```powershell
.runtime/venv/Scripts/python.exe run_psycon.py import-groups
.runtime/venv/Scripts/python.exe run_psycon.py build-references
```

The importer uses retained word timestamps and guarded speaker intervals. Imported transcripts are partial, their original Whisper-small provenance remains visible, and absent word confidences stay null. It reads recording times from the original video's metadata; missing times cause an explicit skip. Consent remains `not documented` unless independently established and supplied with `--consent documented`. Do not change that field merely to hide a limitation.

Group-derived Executive, Builder, Salesperson, and Negotiator lenses use an explicit project-defined selection framework and actual recording-level feature distributions. They are exploratory behavioral subsets, not empirically validated occupational archetypes. The corpus is not labeled with occupational identities, and A–T behavioral scores are not converted into role ground truth. Users can also construct a custom empirical reference from selected speakers in at least three reference recordings. Reference participants must be disjoint from analysis participants when their identities are known.

## Implementation and research limits

The pipeline, storage, baseline statistics, comparisons, exports, worker recovery, local reasoning, and evaluation workflow are implemented. Marker extraction is a transparent, unvalidated ruleset, not a validated semantic classifier. Topic control, interruption intent, paraphrasing, and other complex behaviors require manual review; manual event rates are explicitly labeled as partial annotation coverage. No participant counts, accuracies, reviewer scores, confidence intervals, or statistical significance are invented.

LLM inputs use a documented bounded transcript window and retrieved evidence. A valid evidence ID does not prove that a citation supports a claim; independent reviewers evaluate that separately. The current dataset does not establish longitudinal validity or validated prediction of psychologist ratings. See [the architecture and research protocol](docs/INSTRUMENT_ARCHITECTURE.md) and [requirement coverage](docs/INSTRUMENT_STATUS.md).

## Verify

October 12 documentation checks: both PDFs built, with an 11-page paper and exactly two-page synopsis. Both ESP32 firmware targets compiled, both frontend behavior scripts passed, and protocol typechecking plus all 20 protocol tests passed. The Python run passed 331 tests with five optional integrations skipped, excluding the three PostgreSQL-dependent instrument suites because Docker was unavailable. This is not a complete instrument integration rerun or a physical hardware test. Historical suite counts remain in the implementation-status record with their original dates.

## Repository map

| Area | Current role |
| --- | --- |
| `backend/instrument/`, instrument templates/static files | Canonical BEHA recording, evidence, annotation, training, and report workflow |
| `backend/group/` | Retained audiovisual attribution, seat/face mapping, group observations, and benchmark adapters |
| `backend/communication/`, other backend modules | Earlier private coaching and device/API workflows, separate from the canonical instrument |
| `ml/src/` | Shared audio, speech, language, voice-quality, device-feature utilities, and archived WESAD models |
| `research/` | Group observations, batch comparisons, recovery diagnostics, and earlier study/evaluation tools |
| `protocol/` | Python/TypeScript/C++ packet contracts, CRC/validation, fixtures, and cross-language tests |
| `firmware/ear/`, `firmware/wrist/` | Paused ESP32 work; compiled software is not a validated sensor assembly |
| `validation/`, `tests/` | Evidence gates, software tests, and separate physical/integration requirements |
| `demo/` | Earlier audio-upload demonstration, not the active behavioral study |
| `paper/` | BEHA paper, two-page synopsis, shared preprint style, bibliography, figures, and reproducible builder |
| `docs/`, `results/`, `data/processed/` | Current/legacy protocols and retained aggregate or physiological artifacts; distinguish their tasks before quoting results |

The research workspace keeps its restrained green design across session inspection, participant answers, evidence, reports, research, and training. Long views include keyboard-accessible section navigation; wide tables scroll within their panels. Interface conventions and browser verification limits are recorded in [DESIGN.md](DESIGN.md).

```powershell
$env:PSYCON_TEST_DATABASE_URL = "postgresql://psycon:psycon@127.0.0.1:5432/psycon"
.runtime/venv/Scripts/python.exe -m pytest tests -o addopts= -q
.runtime/node/node.exe --check backend/static/instrument.js
.runtime/node/node.exe --check backend/static/instrument_review.js
.runtime/node/node.exe --check backend/static/instrument_reports.js
.runtime/node/node.exe tests/frontend/instrument_reports.cjs
.runtime/node/node.exe tests/frontend/instrument_workflow.cjs
```

The previous coaching, wearable, physiology, and face-linked workflows remain as legacy code. Their documentation is archived in [the previous README](docs/LEGACY_PRODUCT_README.md); they do not define the current prototype. The legacy Flask app also exposes this workspace at `/instrument`, but its startup still requires its original external services.

