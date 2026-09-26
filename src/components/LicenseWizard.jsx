import { useState } from 'react';
import data from '../data/licenses.json';

const allTypes = data.categories.flatMap(c => c.types.map(t => ({ ...t, category: c.label })));

const STEPS = [
  { n: 1, label: 'Business' },
  { n: 2, label: 'License' },
  { n: 3, label: 'States' },
];

export default function LicenseWizard() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [stateCount, setStateCount] = useState('');
  const [showResult, setShowResult] = useState(false);

  const selectedCategory = data.categories.find(c => c.id === category);
  const selectedLicense = allTypes.find(t => t.id === licenseType);

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    setLicenseType('');
    setShowResult(false);
    setStep(2);
  };

  const handleTypeSelect = (typeId) => {
    setLicenseType(typeId);
    setShowResult(false);
    setStep(3);
  };

  const handleFinish = (count) => {
    setStateCount(count);
    setShowResult(true);
  };

  const reset = () => {
    setStep(1);
    setCategory('');
    setLicenseType('');
    setStateCount('');
    setShowResult(false);
  };

  const progress = showResult ? 100 : ((step - 1) / 3) * 100;

  return (
    <div className="wizard-wrap" id="wizard">
      <div className="wizard-card">
        <p className="lms-kicker wiz-kicker">Roadmap</p>
        <h3>Your Licensing Roadmap</h3>
        <p className="wizard-sub">3 questions. Who needs the license, and where it is filed.</p>

        <ol className="wiz-progress" aria-label="Roadmap progress">
          {STEPS.map((s) => {
            const done = showResult || s.n < step;
            const current = !showResult && s.n === step;
            return (
              <li
                key={s.n}
                className={done ? 'is-done' : current ? 'is-current' : ''}
                aria-current={current ? 'step' : undefined}
              >
                <span className="wiz-num">{done ? '✓' : s.n}</span>
                <span className="wiz-label">{s.label}</span>
              </li>
            );
          })}
        </ol>
        <div className="wiz-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <div className="wiz-panel">
            <p className="wiz-q">What kind of business are you in?</p>
            <div className="wiz-choices">
              {data.categories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className="wiz-choice"
                  onClick={() => handleCategorySelect(c.id)}
                >
                  <span className="wiz-choice-title">{c.label}</span>
                  <span className="wiz-choice-sub">{c.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedCategory && (
          <div className="wiz-panel">
            <button type="button" className="wiz-back" onClick={() => setStep(1)}>
              Back
            </button>
            <p className="wiz-q">What type of license do you need?</p>
            <div className="wiz-choices">
              {selectedCategory.types.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className="wiz-choice wiz-choice-row"
                  onClick={() => handleTypeSelect(t.id)}
                >
                  <span className="wiz-choice-title">{t.name}</span>
                  <span className="wiz-meta">{t.complexity}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && !showResult && (
          <div className="wiz-panel">
            <button type="button" className="wiz-back" onClick={() => setStep(2)}>
              Back
            </button>
            <p className="wiz-q">How many states do you need to be licensed in?</p>
            <div className="wiz-choices">
              {[
                { val: '1', label: 'Just 1 state', sub: 'Starting local' },
                { val: '2-5', label: '2–5 states', sub: 'Regional expansion' },
                { val: '6-15', label: '6–15 states', sub: 'Multi-state operation' },
                { val: '16+', label: '16+ states', sub: 'Nationwide coverage' }
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  className="wiz-choice"
                  onClick={() => handleFinish(opt.val)}
                >
                  <span className="wiz-choice-title">{opt.label}</span>
                  <span className="wiz-choice-sub">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && selectedLicense && (
          <div className="wizard-result">
            <button type="button" className="wiz-back" onClick={reset}>
              Start over
            </button>
            <div className="wr-big">{selectedLicense.name}</div>
            <div className="wr-label">
              {stateCount === '1' ? '1 state' : stateCount + ' states'} · {selectedLicense.complexity} filing
            </div>

            <div className="wr-details">
              <div className="wr-item">
                <div className="wr-item-label">Where to file</div>
                <div className="wr-item-value">{selectedLicense.filing}</div>
              </div>
              <div className="wr-item">
                <div className="wr-item-label">States needed</div>
                <div className="wr-item-value">{stateCount === '1' ? '1' : stateCount}</div>
              </div>
            </div>

            {stateCount !== '1' && (
              <p className="wiz-note">
                Each state is its own filing. Open the directory for the agency in every state you need, then have one specialist coordinate the applications.
              </p>
            )}

            <p className="wiz-note">
              See who needs this license and which agency takes the filing in the{' '}
              <a href={selectedLicense.directory}>directory</a>.
            </p>

            <a
              href="https://cornerstonelicensing.com"
              target="_blank"
              rel="noopener"
              className="btn"
            >
              Have Cornerstone file it
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
