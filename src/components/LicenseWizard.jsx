import { useState } from 'react';
import data from '../data/licenses.json';

const allTypes = data.categories.flatMap(c => c.types.map(t => ({ ...t, category: c.label })));

export default function LicenseWizard() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [stateCount, setStateCount] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleLead = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setCategory('');
    setLicenseType('');
    setStateCount('');
    setShowResult(false);
    setShowForm(false);
    setSubmitted(false);
  };

  return (
    <div className="wizard-wrap" id="wizard">
      <div className="wizard-card">
        <h3>Your Licensing Roadmap</h3>
        <p className="wizard-sub">3 questions. No jargon. Your personalized plan.</p>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: s <= step ? '#EA580C' : '#E7E5E4'
            }} />
          ))}
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
              What kind of business are you in?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleCategorySelect(c.id)}
                  style={{
                    padding: '16px 20px', border: '1px solid #E7E5E4', borderRadius: '12px',
                    background: 'white', cursor: 'pointer', textAlign: 'left',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '2px' }}>{c.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#57534E' }}>{c.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: License Type */}
        {step === 2 && selectedCategory && (
          <div>
            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: '#EA580C', fontWeight: 600, marginBottom: '12px', padding: 0 }}>
              ← Back
            </button>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
              What type of license do you need?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCategory.types.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleTypeSelect(t.id)}
                  style={{
                    padding: '14px 20px', border: '1px solid #E7E5E4', borderRadius: '12px',
                    background: 'white', cursor: 'pointer', textAlign: 'left',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.93rem' }}>{t.name}</span>
                  <span style={{ fontSize: '0.78rem', color: '#EA580C', fontWeight: 600 }}>{t.complexity}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: How many states */}
        {step === 3 && !showResult && (
          <div>
            <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: '#EA580C', fontWeight: 600, marginBottom: '12px', padding: 0 }}>
              ← Back
            </button>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
              How many states do you need to be licensed in?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { val: '1', label: 'Just 1 state', sub: 'Starting local' },
                { val: '2-5', label: '2-5 states', sub: 'Regional expansion' },
                { val: '6-15', label: '6-15 states', sub: 'Multi-state operation' },
                { val: '16+', label: '16+ states', sub: 'Nationwide coverage' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleFinish(opt.val)}
                  style={{
                    padding: '14px 20px', border: '1px solid #E7E5E4', borderRadius: '12px',
                    background: 'white', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.93rem' }}>{opt.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#57534E' }}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && selectedLicense && (
          <div className="wizard-result">
            <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: '#EA580C', fontWeight: 600, marginBottom: '12px', padding: 0 }}>
              ← Start over
            </button>
            <div className="wr-big">{selectedLicense.name}</div>
            <div className="wr-label">
              {stateCount === '1' ? '1 state' : stateCount + ' states'} · {selectedLicense.complexity} complexity
            </div>

            <div className="wr-details">
              <div className="wr-item">
                <div className="wr-item-label">Typical Timeline</div>
                <div className="wr-item-value">{selectedLicense.timeline}</div>
              </div>
              <div className="wr-item">
                <div className="wr-item-label">Service Fee Range</div>
                <div className="wr-item-value">{selectedLicense.cost}</div>
              </div>
              <div className="wr-item">
                <div className="wr-item-label">Complexity</div>
                <div className="wr-item-value">{selectedLicense.complexity}</div>
              </div>
              <div className="wr-item">
                <div className="wr-item-label">States Needed</div>
                <div className="wr-item-value">{stateCount === '1' ? '1' : stateCount}</div>
              </div>
            </div>

            {stateCount !== '1' && (
              <p style={{ fontSize: '0.82rem', color: '#57534E', marginTop: '12px' }}>
                Multi-state licensing is complex. A specialist coordinates all filings and tracks every deadline across states, saving you 60-80% of the time you'd spend doing it yourself.
              </p>
            )}

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn"
                style={{ marginTop: '16px' }}
              >
                Get My Personalized Plan (Free)
              </button>
            ) : !submitted ? (
              <form onSubmit={handleLead} style={{ marginTop: '20px', textAlign: 'left' }}>
                <div className="form-group">
                  <label>Your name</label>
                  <input type="text" placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@company.com" required />
                </div>
                <div className="form-group">
                  <label>Phone (optional)</label>
                  <input type="tel" placeholder="(555) 123-4567" />
                </div>
                <button type="submit" className="btn">Send My Roadmap</button>
                <p style={{ fontSize: '0.78rem', color: '#A8A29E', textAlign: 'center', marginTop: '8px' }}>
                  A licensing specialist will send your detailed plan within 1 business day.
                </p>
              </form>
            ) : (
              <div style={{ padding: '24px 0 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#EA580C', marginBottom: '8px' }}>Roadmap request sent!</div>
                <p style={{ color: '#57534E', fontSize: '0.88rem' }}>
                  A licensing specialist will email your personalized plan within 1 business day.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
