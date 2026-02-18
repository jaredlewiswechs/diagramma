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

export default function HomePage() {
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
          <button type="button">New Scan</button>
          <button type="button" className="secondary">
            See Demo Workflow
          </button>
        </div>
      </section>

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
