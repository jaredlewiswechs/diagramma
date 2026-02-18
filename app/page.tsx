'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

const mustHave = [
  'Import photo + scan capture',
  'Page detection + perspective correction',
  'Clean preview (Enhance + Paper Lines + Crop adjust)',
  'OCR for typed text and supported handwriting',
  'Core structure detection: headings, bullets, steps, definitions',
  'Outline view + deterministic Fix List',
  'DOCX export + PDF export'
];

const pipeline = [
  {
    title: '1) Capture & Rectify',
    body: 'Detect page corners, apply homography, and flatten perspective so notes look like scanned documents.'
  },
  {
    title: '2) Normalize & Clean',
    body: 'Remove lighting gradients, binarize ink, and suppress ruled/graph lines without deleting handwriting strokes.'
  },
  {
    title: '3) OCR by Blocks',
    body: 'Segment components into lines and blocks, run OCR per block, and keep confidence metadata for every extracted region.'
  },
  {
    title: '4) Deterministic Structure',
    body: 'Infer headings, lists, definitions, and conservative tables with invariant checks and no silent guessing.'
  },
  {
    title: '5) Verify & Compile',
    body: 'Generate a Fix List for ambiguous areas, then compile typed IR into production-ready DOCX/PDF exports.'
  }
];

const onboarding = [
  'Welcome → explain scan-to-structured-doc value in one sentence.',
  'Choose Input → scan, photo import, or PDF import.',
  'Capture Tips → quick visual guidance for corners, glare, and alignment.',
  'Crop Confirm → drag corners and lock page boundaries.',
  'Clean Preview → Enhance, Paper Lines toggle, rotate, crop.',
  'Convert Progress → straightening, OCR, structure detection, outline build.',
  'Outline View → expandable sections for fast navigation.',
  'Fix List → resolve only uncertain blocks with one-tap labels.',
  'Export → DOCX, PDF, and optional share link.',
  'Success → optional flashcards and practice-question generation.'
];

const demoExtraction = {
  title: 'Bats',
  metadata: [
    'Title: Notes',
    'Date: 2/17/26',
    'Class: HOME',
    'Definition: Bat = animal'
  ],
  bullets: ['fly', 'can make sounds', 'usually black'],
  summary: 'Bats are animals that can fly and communicate with sounds. Their color is often black.'
};

const supportedFileHint = 'Accepted formats: JPG, PNG, HEIC, PDF.';

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDemoVisible, setIsDemoVisible] = useState(false);

  const fileLabel = useMemo(() => {
    if (!selectedFile) {
      return 'No file selected yet';
    }

    const sizeInMb = (selectedFile.size / (1024 * 1024)).toFixed(2);
    return `${selectedFile.name} (${sizeInMb} MB)`;
  }, [selectedFile]);


  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePickerOpen = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);

    if (!file || !file.type.startsWith('image/')) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
      return objectUrl;
    });
  };

  return (
    <main className="page">
      <section className="hero card">
        <p className="eyebrow">Production Build • Vercel Ready</p>
        <h1>Diagramma: scan notes, structure instantly, export confidently.</h1>
        <p>
          A production-ready Next.js app shell for your scan-to-structured-notes workflow.
          It captures notes, applies deterministic parsing logic, and exports editable DOCX/PDF
          while surfacing uncertainty through a human review queue.
        </p>
        <div className="actions">
          <button type="button" onClick={handlePickerOpen}>
            New Scan
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => setIsDemoVisible((currentState) => !currentState)}
          >
            {isDemoVisible ? 'Hide Demo Workflow' : 'See Demo Workflow'}
          </button>
        </div>
        <input
          ref={inputRef}
          className="fileInput"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
        />
        <p className="fileHint">{supportedFileHint}</p>
        <p className="fileStatus">Upload status: {fileLabel}</p>
        {previewUrl ? (
          <figure className="previewCard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Uploaded scan preview" className="previewImage" />
            <figcaption>Preview of uploaded scan</figcaption>
          </figure>
        ) : null}
      </section>

      {isDemoVisible ? (
        <section className="card">
          <h2>Demo Workflow (from your sample notes)</h2>
          <div className="demoGrid">
            <article className="tile">
              <h3>Detected metadata</h3>
              <ul>
                {demoExtraction.metadata.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
            <article className="tile">
              <h3>Main heading</h3>
              <p className="demoTitle">{demoExtraction.title}</p>
              <h3>Bullets</h3>
              <ul>
                {demoExtraction.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
            <article className="tile">
              <h3>Compiler summary</h3>
              <p>{demoExtraction.summary}</p>
              <p className="confidence">Confidence: 0.93 (handwriting + structure checks passed)</p>
            </article>
          </div>
        </section>
      ) : null}

      <section className="card">
        <h2>Compiler-style pipeline</h2>
        <div className="grid">
          {pipeline.map((step) => (
            <article key={step.title} className="tile">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card split">
        <div>
          <h2>v1 Ship Scope</h2>
          <ul>
            {mustHave.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Onboarding Screens</h2>
          <ol>
            {onboarding.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="card">
        <h2>Operator guarantees</h2>
        <p>
          Deterministic invariants enforce that uncertain structure is never silently accepted.
          Each ambiguous block is downgraded or flagged in the Fix List before export.
        </p>
        <div className="banner">
          <strong>No silent hallucination policy:</strong> if confidence or invariants fail,
          we require user confirmation before final DOCX/PDF generation.
        </div>
      </section>
    </main>
  );
}
