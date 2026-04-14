import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './index.css';

// ── CONFIG & CONSTANTS ──
const CYCLE_ID = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

function getInitials(p) {
  if (!p) return "??";
  const f = p.first_name?.[0] || "";
  const l = p.last_name?.[0] || "";
  return (f + l).toUpperCase() || "??";
}

// ── SHARED COMPONENTS ──
function Toast({ msg, color, show }) {
  return (
    <div className={`toast ${show ? "toast-show" : "toast-hidden"}`} style={{ background: color }}>
      <span className="toast-icon">✓</span><span>{msg}</span>
    </div>
  );
}

function Badge({ cls, dot, children }) {
  return (
    <span className={`badge badge-${cls}`}>
      {dot && <span className="badge-dot" />}{children}
    </span>
  );
}

function StatCard({ cls, label, val, valCls, note }) {
  return (
    <div className={`stat-card stat-card-${cls}`}>
      <div className="stat-label">{label}</div>
      <div className={`stat-val ${valCls || ""}`}>{val}</div>
      {note && <div className="stat-note">{note}</div>}
    </div>
  );
}

// ── OVERVIEW PORTAL ──
function Overview({ profile }) {
  return (
    <div className="page">
      <div className="portal-label">◆ EXECUTIVE OVERVIEW · APRIL 2025</div>
      <div className="page-title">Continuous Performance<br/><span>Framework Dashboard</span></div>
      <div className="page-sub">Monthly binary review cycles · Theme validation · Rolling period roll-up · SAP Connect integration</div>
      
      <div className="stats-grid">
        <StatCard cls="blue" label="Active Employees" val="847" note="↑ Synced from SAP Connect" />
        <StatCard cls="blue" label="Submission Completion" val="89%" note="↑ +8% vs last month" />
        <StatCard cls="yellow" label="Overall YES Rate" val="72%" valCls="yellow" note="↑ 3+ Yes outcomes" />
        <StatCard cls="purple" label="Pending Validations" val="31" valCls="purple" note="Themes awaiting manager" />
      </div>

      <div className="sec-title">How It Works</div>
      <div className="flow-container">
        <div className="flow-rows">
          <div className="flow-row">
            <div className="flow-step"><div className="flow-step-label">SAP CONNECT</div><div className="flow-step-name">Employee Data</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-label">STEP 1</div><div className="flow-step-name">Manager Direction</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step hl"><div className="flow-step-label">STEP 2</div><div className="flow-step-name">Employee Themes</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step hl"><div className="flow-step-label">STEP 3</div><div className="flow-step-name">4 Binary Inputs</div></div>
            <div className="flow-arrow">→</div>
          </div>
          <div className="flow-row" style={{ marginTop: 12 }}>
            <div className="flow-step green-step"><div className="flow-step-label">AUTO CALC</div><div className="flow-step-name">Yes / No Result</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-step-label">STEP 4</div><div className="flow-step-name">Theme Validation</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step purple-step"><div className="flow-step-label">ROLL-UP</div><div className="flow-step-name">Q / Annual View</div></div>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="frame frame-blue">
          <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 14 }}>Decision Rule</div>
          <div className="rule-row"><span>4 Yes / 3 Yes + 1 No / 2 + 2</span><Badge cls="green">YES</Badge></div>
          <div className="rule-row"><span>1 Yes + 3 No / 4 No</span><Badge cls="red">NO</Badge></div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 10, padding: 8, background: 'var(--bg2)', borderRadius: 6 }}>2 or more Yes inputs = overall monthly YES</div>
        </div>
        <div className="frame frame-purple">
          <div className="stat-label" style={{ color: 'var(--purple)', marginBottom: 14 }}>Period Roll-Up</div>
          <div className="v-stack" style={{ gap: 12 }}>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-teal" style={{ minWidth: 70 }}>Monthly</span><span style={{ fontSize: 13 }}>4 binary inputs + themes</span></div>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-purple" style={{ minWidth: 70 }}>Quarterly</span><span style={{ fontSize: 13 }}>Roll-up of 3 results + trends</span></div>
            <div className="h-stack" style={{ gap: 12 }}><span className="badge badge-green" style={{ minWidth: 70 }}>Annual</span><span style={{ fontSize: 13 }}>Full year aggregate + rewards</span></div>
          </div>
        </div>
        <div className="frame frame-blue">
          <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 14 }}>User Roles</div>
          <div className="v-stack" style={{ gap: 10 }}>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Employee</span> — Create themes, submit evidence</div>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>Manager</span> — 4 binary inputs, validate themes</div>
            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--purple)', fontWeight: 700 }}>HR</span> — Dashboards, trends, governance</div>
          </div>
        </div>
      </div>

      <div className="frame">
        <div className="sec-title">Department Distribution</div>
        <div className="bar-row"><span className="bar-label">Engineering</span><div className="bar-track"><div className="bar-fill" style={{ width: '76%', background: 'var(--cyan)' }}></div></div><span className="bar-pct">76%</span></div>
        <div className="bar-row"><span className="bar-label">Product</span><div className="bar-track"><div className="bar-fill" style={{ width: '71%', background: 'var(--purple)' }}></div></div><span className="bar-pct">71%</span></div>
        <div className="bar-row"><span className="bar-label">Marketing</span><div className="bar-track"><div className="bar-fill" style={{ width: '68%', background: 'var(--blue)' }}></div></div><span className="bar-pct">68%</span></div>
        <div className="bar-row"><span className="bar-label">Operations</span><div className="bar-track"><div className="bar-fill" style={{ width: '74%', background: 'var(--yellow)' }}></div></div><span className="bar-pct">74%</span></div>
        <div className="bar-row"><span className="bar-label">Sales</span><div className="bar-track"><div className="bar-fill" style={{ width: '63%', background: 'var(--red)' }}></div></div><span className="bar-pct">63%</span></div>
        <div className="bar-row"><span className="bar-label">HR</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%', background: 'var(--green)' }}></div></div><span className="bar-pct">80%</span></div>
      </div>

      <div className="frame" style={{ marginBottom: 20 }}>
        <div className="sec-title">Monthly Trend — Yes Rate</div>
        <svg width="100%" viewBox="0 0 800 80" style={{ display: 'block' }}>
          <polyline points="0,65 160,58 320,48 480,42 640,36 800,30" style={{ stroke: 'var(--cyan)', strokeWidth: 2, fill: 'none' }}/>
          <circle cx="0" cy="65" r="4" fill="var(--cyan)"/><circle cx="160" cy="58" r="4" fill="var(--cyan)"/><circle cx="320" cy="48" r="4" fill="var(--cyan)"/><circle cx="480" cy="42" r="4" fill="var(--cyan)"/><circle cx="640" cy="36" r="4" fill="var(--cyan)"/><circle cx="800" cy="30" r="4" fill="var(--cyan)"/>
          <text x="0" y="78" fontSize="10" fill="#8c959f">Nov</text><text x="148" y="78" fontSize="10" fill="#8c959f">Dec</text><text x="308" y="78" fontSize="10" fill="#8c959f">Jan</text><text x="462" y="78" fontSize="10" fill="#8c959f">Feb</text><text x="622" y="78" fontSize="10" fill="#8c959f">Mar</text><text x="778" y="78" fontSize="10" fill="#8c959f">Apr</text>
        </svg>
      </div>

      <div className="sec-title">Exceptions & Alerts</div>
      <div className="v-stack" style={{ gap: 8 }}>
        <div className="alert-item alert-warn"><div style={{ color: 'var(--red)', flexShrink: 0 }}>⚠</div><div><strong style={{ color: 'var(--red)' }}>3 employees</strong> have received No results for 3+ consecutive months — flagged for manager follow-up</div></div>
        <div className="alert-item alert-info"><div style={{ color: 'var(--yellow)', flexShrink: 0 }}>○</div><div><strong style={{ color: 'var(--yellow)' }}>14 theme submissions</strong> pending manager validation — cycle closes in 4 days</div></div>
        <div className="alert-item alert-ok"><div style={{ color: 'var(--green)', flexShrink: 0 }}>✓</div><div>Nightly SAP Connect sync completed successfully — 847 employee records current</div></div>
      </div>
    </div>
  );
}

// ── EMPLOYEE PORTAL ──
function Employee({ profile, activeUser, showToast }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [form, setForm] = useState({ title: "", category: "Delivery Quality", description: "", linked_objective: "", achievement_evidence: "" });

  useEffect(() => {
    fetchMyThemes();
  }, [activeUser]);

  async function fetchMyThemes() {
    const { data } = await supabase.from('themes').select('*').eq('employee_id', activeUser).eq('cycle_id', CYCLE_ID);
    setThemes(data || []);
  }

  async function handleSubmit(e) {
    if (!form.title || !form.description) return showToast("Title and Description required", "#cf222e");
    const { error } = await supabase.from('themes').insert([{
      ...form,
      employee_id: activeUser,
      cycle_id: CYCLE_ID,
      status: 'pending_review'
    }]);
    if (error) {
      console.error("Theme submission error:", error);
      showToast("Error submitting theme", "#cf222e");
    } else {
      showToast("Theme submitted successfully", "var(--green)");
      setIsFormOpen(false);
      setForm({ title: "", category: "Delivery Quality", description: "", linked_objective: "", achievement_evidence: "" });
      fetchMyThemes();
    }
  }

  return (
    <div className="page">
      <div className="portal-label">○ EMPLOYEE PORTAL</div>
      <div className="page-title">My <span>Monthly Review</span></div>
      <div className="page-sub">April 2025 · {profile?.first_name} {profile?.last_name} · {profile?.job_title}</div>
      
      <div className="emp-profile">
        <div className="emp-left">
          <div className="emp-avatar">{getInitials(profile)}</div>
          <div><div className="emp-name">{profile?.first_name} {profile?.last_name}</div><div className="emp-meta">EMP-{profile?.id?.slice(0,5)} · {profile?.job_title}</div></div>
        </div>
        <div className="emp-right">
          <Badge cls="yellow" dot>In Progress</Badge>
          <div className="v-stack"><div className="period-label-sm">Review Period</div><div className="period-val">APR 2025</div></div>
        </div>
      </div>

      <div className="frame frame-blue">
        <div className="sec-title">My Themes — April 2025</div>
        <div className="theme-notice">
          <span style={{ color: 'var(--cyan)' }}>ℹ</span> Your line manager has directed themes: Delivery Quality, Stakeholder Collaboration, Technical Initiative
        </div>
        
        {themes.map(t => (
          <div key={t.id} className={`theme-card ${t.status === 'pending_review' ? 'pending' : ''}`}>
             <div className="theme-card-header">
                <div><div className="theme-card-name">{t.title}</div><div className="theme-card-cat">Category: {t.category} · Period: Apr 2025</div></div>
                <Badge cls={t.status === 'validated' ? 'green' : 'yellow'} dot>{t.status === 'validated' ? 'Approved' : 'Pending Review'}</Badge>
             </div>
             <div className="theme-card-desc">{t.description}</div>
             <div className="theme-card-footer">
                <span>○ Submitted {new Date(t.created_at).toLocaleDateString()}</span>
                {t.status === 'validated' ? <span style={{ color: 'var(--cyan)' }}>◆ Manager: "{t.manager_comment || "Approved"}"</span> : <span>○ Awaiting validation</span>}
             </div>
          </div>
        ))}

        {!isFormOpen ? (
          <button className="badge badge-teal" style={{ padding: '8px 16px', cursor: 'pointer', fontWeight: 600, marginTop: 12 }} onClick={() => setIsFormOpen(true)}>
            + Add New Theme
          </button>
        ) : (
          <div className="card" style={{ background: 'var(--bg2)', border: '1px solid rgba(0,178,236,.3)', padding: 20 }}>
             <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 16 }}>NEW THEME ENTRY</div>
             
             <div className="form-row">
                <div className="form-group">
                   <label className="form-label">THEME TITLE</label>
                   <input className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. React Component Library Upgrade" />
                </div>
                <div className="form-group">
                   <label className="form-label">CATEGORY</label>
                   <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option>Delivery Quality</option>
                      <option>Stakeholder Collaboration</option>
                      <option>Technical Initiative</option>
                   </select>
                </div>
             </div>

             <div className="form-group">
                <label className="form-label">SHORT DESCRIPTION</label>
                <textarea className="input" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe what you did, the approach, and the outcome..." style={{ height: 80 }} />
             </div>

             <div className="form-row">
                <div className="form-group">
                   <label className="form-label">LINK TO OBJECTIVE / TASK / PROJECT</label>
                   <input className="input" value={form.linked_objective} onChange={e => setForm({...form, linked_objective: e.target.value})} placeholder="e.g. OKR-2025-Q2-07" />
                </div>
                <div className="form-group">
                   <label className="form-label">ACHIEVEMENT EVIDENCE</label>
                   <input className="input" value={form.achievement_evidence} onChange={e => setForm({...form, achievement_evidence: e.target.value})} placeholder="e.g. Reduced build time by 40%" />
                </div>
             </div>

             <div className="h-stack" style={{ gap: 12 }}>
                <button className="btn-outline" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Submit Theme →</button>
             </div>
          </div>
        )}
      </div>

      <div className="frame">
        <div className="sec-title">Supporting Evidence</div>
        <div className="form-group">
          <label className="form-label">Evidence & Proof Points</label>
          <textarea className="input" placeholder="Project outcomes, behavioural examples, quality metrics, recognition instances, specific delivery proof..." style={{ height: 100 }} />
        </div>
      </div>

      {/* REVIEW HISTORY */}
      <div className="frame" style={{ marginBottom: 24 }}>
        <div className="sec-title">My Review History</div>
        <table className="hist-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Result</th>
              <th>Themes</th>
              <th>Manager Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mar 2025</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">3 Approved</Badge></td>
              <td>🔥 Strong delivery, great collaboration this month</td>
            </tr>
            <tr>
              <td>Feb 2025</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">2 Approved</Badge></td>
              <td>🔥 Met expectations across all areas</td>
            </tr>
            <tr>
              <td>Jan 2025</td>
              <td><Badge cls="red">NO</Badge></td>
              <td><Badge cls="yellow">1 Returned</Badge></td>
              <td>💡 Please address Q4 carry-over items before next cycle</td>
            </tr>
            <tr>
              <td>Dec 2024</td>
              <td><Badge cls="green">YES</Badge></td>
              <td><Badge cls="green">2 Approved</Badge></td>
              <td>🔥 Excellent end of year contribution</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="action-row" style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'center' }}>
        <button className="btn-outline" onClick={() => showToast('💾 Draft saved successfully', 'var(--cyan)')}>
          <span style={{ marginRight: 6 }}>💾</span> Save Draft
        </button>
        <button className="btn-primary" onClick={() => showToast('✓ Review submitted successfully', 'var(--green)')}>
          Submit for Review →
        </button>
      </div>
    </div>
  );
}

// ── MANAGER PORTAL ──
function ManagerPortal({ profile, activeUser, showToast }) {
  const [team, setTeam] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pendingThemes, setPendingThemes] = useState([]);
  const [activePanel, setActivePanel] = useState(null);
  const [binaryInputs, setBinaryInputs] = useState({ Contribution: true, Collaboration: true, Consistency: true, Growth: true });

  useEffect(() => {
    fetchManagerData();
  }, [activeUser]);

  async function fetchManagerData() {
    const { data: teamData } = await supabase.from('profiles').select('*').eq('manager_id', activeUser);
    setTeam(teamData || []);
    
    if (teamData?.length) {
      const ids = teamData.map(t => t.id);
      const { data: revs } = await supabase.from('monthly_reviews').select('*').in('employee_id', ids).eq('cycle_id', CYCLE_ID);
      const { data: themes } = await supabase.from('themes').select('*').in('employee_id', ids).eq('status', 'pending_review');
      setReviews(revs || []);
      setPendingThemes(themes || []);
    }
  }

  async function handleReviewSubmit(employeeId) {
    const yesCount = Object.values(binaryInputs).filter(v => v).length;
    const overall = yesCount >= 2 ? 'YES' : 'NO';
    
    const { error } = await supabase.from('monthly_reviews').upsert({
      employee_id: employeeId,
      manager_id: activeUser,
      cycle_id: CYCLE_ID,
      input_contribution: binaryInputs.Contribution,
      input_collaboration: binaryInputs.Collaboration,
      input_consistency: binaryInputs.Consistency,
      input_growth: binaryInputs.Growth,
      overall_result: overall,
      is_draft: false,
      submitted_at: new Date().toISOString()
    }, { onConflict: 'employee_id,cycle_id' });

    if (!error) {
      showToast(`Review submitted for ${team.find(t => t.id === employeeId)?.first_name}`, "var(--green)");
      setActivePanel(null);
      fetchManagerData();
    } else {
      showToast("Error saving review", "var(--red)");
    }
  }

  async function handleValidation(id, status) {
    const { error } = await supabase.from('themes').update({ status: status === 'Approved' ? 'validated' : 'returned' }).eq('id', id);
    if (!error) {
      showToast(`Theme ${status}`, "var(--green)");
      fetchManagerData();
    }
  }

  // Calculate live stats
  const completedCount = reviews.length;
  const pendingCount = team.length - completedCount;
  const yesRate = completedCount > 0 
    ? Math.round((reviews.filter(r => r.overall_result === 'YES').length / completedCount) * 100) 
    : 0;

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER SECTION */}
      <div className="portal-label">◈ MANAGER PORTAL</div>
      <div className="page-title">Team <span>Reviews</span></div>
      <div className="page-sub">April 2025 · {profile?.first_name} {profile?.last_name} · {team.length} Direct Reports</div>

      {/* SECTION 1: STATS GRID */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <StatCard cls="blue" label="Direct Reports" val={team.length} valCls="cyan" note="Staff in your team" />
        <StatCard cls={pendingCount > 0 ? "orange" : "blue"} label="Pending Inputs" val={pendingCount} valCls={pendingCount > 0 ? "orange" : "cyan"} note="Requires action" />
        <StatCard cls="blue" label="Completed" val={completedCount} valCls="green" note="For April 2025" />
        <StatCard cls="blue" label="Team YES Rate" val={`${yesRate}%`} valCls="cyan" note="Overall monthly result" />
      </div>

      {/* SECTION 2: TEAM MONTHLY INPUTS */}
      <div className="frame">
        <div className="sec-title">Team Monthly Inputs — April 2025</div>
        {team.map(m => {
          const review = reviews.find(r => r.employee_id === m.id);
          const themesForUser = pendingThemes.filter(t => t.employee_id === m.id);
          
          return (
            <React.Fragment key={m.id}>
              <div className="member-row">
                <div className="member-info">
                  <div className="emp-avatar" style={{ width: 34, height: 34, fontSize: 12 }}>{getInitials(m)}</div>
                  <div className="v-stack">
                    <div className="member-name">{m.first_name} {m.last_name}</div>
                    <div className="member-role">{m.job_title}</div>
                  </div>
                </div>
                <div className="member-actions">
                  {review ? (
                    <Badge cls={review.overall_result === 'YES' ? 'green' : 'red'}>{review.overall_result}</Badge>
                  ) : (
                    <Badge cls="yellow" dot>Inputs Needed</Badge>
                  )}
                  {themesForUser.length > 0 && <Badge cls="purple">Ready to Validate</Badge>}
                  <button className="badge badge-teal" style={{ cursor: 'pointer', minWidth: 100, justifyContent: 'center' }} onClick={() => {
                    setActivePanel(activePanel === m.id ? null : m.id);
                    if (review) {
                       setBinaryInputs({
                         Contribution: review.input_contribution ?? true,
                         Collaboration: review.input_collaboration ?? true,
                         Consistency: review.input_consistency ?? true,
                         Growth: review.input_growth ?? true,
                         comment: review.manager_comment ?? ""
                       });
                    } else {
                       setBinaryInputs({ Contribution: true, Collaboration: true, Consistency: true, Growth: true, comment: "" });
                    }
                  }}>
                    {review ? "Edit Inputs →" : "Enter Inputs →"}
                  </button>
                </div>
              </div>

              {/* SECTION 3: EXPANDED BINARY PANEL */}
              {activePanel === m.id && (
                <div className="binary-panel">
                   <div className="binary-panel-header">
                      <div className="h-stack" style={{ gap: 12 }}>
                        <div className="emp-avatar">{getInitials(m)}</div>
                        <div className="v-stack">
                          <div className="member-name">{m.first_name} {m.last_name}</div>
                          <div className="member-role">{m.job_title} · April 2025</div>
                        </div>
                      </div>
                      <button className="badge badge-gray" onClick={() => setActivePanel(null)} style={{ cursor: 'pointer' }}>✕ Close</button>
                   </div>
                   
                   <div className="stat-label" style={{ color: 'var(--cyan)', marginBottom: 16 }}>4 MONTHLY BINARY INPUTS</div>
                   
                   {[
                     { id: 'Contribution', label: 'Contribution & Delivery', sub: 'Input 1 of 4 - April 2025' },
                     { id: 'Collaboration', label: 'Collaboration & Teamwork', sub: 'Input 2 of 4 - April 2025' },
                     { id: 'Consistency', label: 'Consistency & Reliability', sub: 'Input 3 of 4 - April 2025' },
                     { id: 'Growth', label: 'Growth & Initiative', sub: 'Input 4 of 4 - April 2025' }
                   ].map((row) => (
                     <div key={row.id} className="binary-row">
                        <div>
                          <div className="binary-row-label">{row.label}</div>
                          <div className="binary-row-sub">{row.sub}</div>
                        </div>
                        <div className="binary-btns">
                           <button 
                             className={`btn-binary ${binaryInputs[row.id] ? 'active-yes' : ''}`}
                             onClick={() => setBinaryInputs({...binaryInputs, [row.id]: true})}
                           >
                              👍 Yes
                           </button>
                           <button 
                             className={`btn-binary ${binaryInputs[row.id] === false ? 'active-no' : ''}`}
                             onClick={() => setBinaryInputs({...binaryInputs, [row.id]: false})}
                           >
                              👎 No
                           </button>
                        </div>
                     </div>
                   ))}

                   <div className="card" style={{ padding: '12px 20px', background: 'var(--bg2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                         {Object.values(binaryInputs).filter(v => v === true).length} Yes · {Object.values(binaryInputs).filter(v => v === false).length} No
                      </div>
                      <div className="h-stack" style={{ gap: 12 }}>
                         <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Auto-Calculated Result</div>
                         <Badge cls={Object.values(binaryInputs).filter(v => v === true).length >= 2 ? 'green' : 'red'}>
                            {Object.values(binaryInputs).filter(v => v === true).length >= 2 ? '✓ YES' : '✕ NO'}
                         </Badge>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text3)' }}>Rules: 2+ Yes = Overall YES</div>
                   </div>

                   <div className="form-group">
                      <label className="form-label">MANAGER COMMENT</label>
                      <textarea 
                        className="input" 
                        placeholder="Add context, guidance, or feedback for this employee..." 
                        style={{ height: 100 }}
                        value={binaryInputs.comment}
                        onChange={e => setBinaryInputs({...binaryInputs, comment: e.target.value})}
                      />
                   </div>

                   <div className="h-stack" style={{ gap: 12, marginTop: 20 }}>
                      <button className="btn-outline" onClick={() => showToast('💾 Draft saved successfully', 'var(--cyan)')}>Save Draft</button>
                      <button className="btn-primary" onClick={() => handleReviewSubmit(m.id)}>Submit Inputs →</button>
                   </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* SECTION 4: THEME VALIDATIONS */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">Theme Validations Pending</div>
        {pendingThemes.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--text3)' }}>No themes pending validation</div>
        ) : (
          pendingThemes.map(t => (
            <div key={t.id} className="theme-card pending" style={{ padding: 16 }}>
              <div className="theme-card-header">
                 <div>
                    <div className="theme-card-name">{t.title}</div>
                    <div className="theme-card-cat">{team.find(e => e.id === t.employee_id)?.first_name} · {t.category} · Apr 2025</div>
                 </div>
                 <Badge cls="yellow" dot>Pending</Badge>
              </div>
              <div className="h-stack" style={{ gap: 8, marginTop: 12 }}>
                 <button className="badge badge-green" style={{ padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleValidation(t.id, 'Approved')}>✓ Approve</button>
                 <button className="badge badge-yellow" style={{ padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleValidation(t.id, 'Returned')}>↵ Return</button>
                 <button className="badge badge-red" style={{ padding: '6px 14px', cursor: 'pointer' }}>✕ Reject</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SECTION 5: ANNUAL VIEW HEATMAP */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">Team Annual View (YTD 2025)</div>
        <div className="heatmap-container">
           <table className="heatmap-table">
              <thead>
                <tr>
                  <th style={{ width: 250 }}>Employee</th>
                  <th style={{ textAlign: 'center' }}>Jan</th>
                  <th style={{ textAlign: 'center' }}>Feb</th>
                  <th style={{ textAlign: 'center' }}>Mar</th>
                  <th style={{ textAlign: 'center' }}>Apr</th>
                  <th style={{ textAlign: 'center' }}>YTD Pattern</th>
                  <th style={{ textAlign: 'center' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {team.map(m => {
                  const aprReview = reviews.find(r => r.employee_id === m.id);
                  // Simulate Jan-Mar for visual fidelity
                  return (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.first_name} {m.last_name}</td>
                      <td><div className="cell-y">Y</div></td>
                      <td><div className="cell-y">Y</div></td>
                      <td><div className={m.id.endsWith('1') ? 'cell-n' : 'cell-y'}>{m.id.endsWith('1') ? 'N' : 'Y'}</div></td>
                      <td>
                        {aprReview ? (
                          <div className={aprReview.overall_result === 'YES' ? 'cell-y' : 'cell-n'}>
                            {aprReview.overall_result === 'YES' ? 'Y' : 'N'}
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', color: '#ccc' }}>—</div>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text2)' }}>↑ Strong</td>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--cyan)' }}>↑ Strong</td>
                    </tr>
                  );
                })}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

// ── HR DASHBOARD ──
function HRDashboard() {
  const depts = [
    { name: 'Engineering', yes: 76, nov: 70, dec: 75, jan: 80, feb: 73, mar: 74, apr: 76, color: 'var(--cyan)' },
    { name: 'Product', yes: 71, nov: 66, dec: 67, jan: 64, feb: 69, mar: 70, apr: 71, color: 'var(--purple)' },
    { name: 'Marketing', yes: 68, nov: 62, dec: 61, jan: 53, feb: 60, mar: 67, apr: 68, color: 'var(--blue)' },
    { name: 'Operations', yes: 74, nov: 71, dec: 78, jan: 59, feb: 65, mar: 68, apr: 74, color: 'var(--yellow)' },
    { name: 'Sales', yes: 63, nov: 65, dec: 62, jan: 60, feb: 58, mar: 61, apr: 63, color: 'var(--red)' },
    { name: 'HR', yes: 80, nov: 78, dec: 82, jan: 81, feb: 79, mar: 80, apr: 80, color: 'var(--green)' },
  ];

  const managers = [
    { name: 'J. Okafor', rate: 76, color: 'var(--cyan)' },
    { name: 'P. Sharma', rate: 82, color: 'var(--green)' },
    { name: 'M. Chen', rate: 68, color: 'var(--blue)' },
    { name: 'A. Patel', rate: 73, color: 'var(--purple)' },
    { name: 'L. Torres', rate: 61, color: 'var(--red)' },
  ];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER */}
      <div className="portal-label">◆ HR / BUSINESS DASHBOARD</div>
      <div className="page-title">Organisation <span>Analytics</span></div>
      <div className="page-sub">April 2025 · Company-wide performance and trend visibility</div>
      
      {/* STATS */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <StatCard cls="blue" label="OVERALL YES" val="610" note="72.1% of employees" />
        <StatCard cls="orange" label="OVERALL NO" val="237" valCls="orange" note="27.9% — needs attention" />
        <StatCard cls="blue" label="COMPLETION RATE" val="96%" valCls="green" note="↑ 811 of 847 submitted" />
        <StatCard cls="purple" label="VALIDATION RATE" val="84%" valCls="purple" note="Themes validated by managers" />
      </div>

      {/* NEW: DISTRIBUTION GRID */}
      <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">YES/NO Rate by Department</div>
          <div className="v-stack" style={{ gap: 12, marginTop: 16 }}>
            {depts.map(d => (
              <div key={d.name} className="bar-row">
                <span className="bar-label" style={{ width: 100 }}>{d.name}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${d.yes}%`, background: d.color }}></div></div>
                <span className="bar-pct">{d.yes}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">YES/NO Rate by Manager</div>
          <div className="v-stack" style={{ gap: 12, marginTop: 16 }}>
            {managers.map(m => (
              <div key={m.name} className="bar-row">
                <span className="bar-label" style={{ width: 100 }}>{m.name}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${m.rate}%`, background: m.color }}></div></div>
                <span className="bar-pct">{m.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE HEAT MAP */}
      <div className="frame">
        <div className="sec-title">Performance Heat Map — Monthly Yes Rate</div>
        <div className="heatmap-container" style={{ marginTop: 16 }}>
          <table className="heatmap-table">
            <thead>
              <tr>
                <th style={{ width: 200 }}>Dept</th>
                {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map(m => (
                  <th key={m} style={{ textAlign: 'center' }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {depts.map(d => (
                <tr key={d.name}>
                  <td style={{ fontWeight: 700 }}>{d.name}</td>
                  {['nov', 'dec', 'jan', 'feb', 'mar', 'apr'].map(m => (
                    <td key={m} style={{ textAlign: 'center' }}>
                      <div style={{ 
                        background: d[m] > 75 ? 'var(--cyan-bg)' : d[m] > 65 ? 'var(--yellow-bg)' : 'var(--red-bg)', 
                        color: d[m] > 75 ? 'var(--cyan)' : d[m] > 65 ? 'var(--yellow)' : 'var(--red)',
                        padding: '6px 0', borderRadius: 4, fontWeight: 700, fontSize: 13
                      }}>
                        {d[m]}%
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-stack" style={{ gap: 12, marginTop: 16, fontSize: 11, color: 'var(--text3)' }}>
             <span>Low</span>
             <div style={{ width: 100, height: 8, borderRadius: 4, background: 'linear-gradient(to right, var(--red), var(--yellow), var(--cyan))' }}></div>
             <span>High</span>
          </div>
        </div>
      </div>

      {/* 6-MONTH TREND ANALYSIS */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">6-Month Trend Analysis</div>
        <div style={{ padding: '20px 0' }}>
           <svg width="100%" height="120" viewBox="0 0 800 120" preserveAspectRatio="none">
             {/* Lines */}
             <polyline points="0,90 160,82 320,72 480,66 640,60 800,54" fill="none" stroke="var(--cyan)" strokeWidth="3" />
             <polyline points="0,70 160,65 320,55 480,50 640,45 800,40" fill="none" stroke="var(--green)" strokeWidth="3" />
             <polyline points="0,110 160,105 320,95 480,90 640,85 800,80" fill="none" stroke="var(--yellow)" strokeWidth="3" />
             
             {/* Labels X */}
             {['Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25'].map((m, i) => (
                <text key={m} x={i * 155} y="135" fontSize="10" fill="var(--text3)" textAnchor="start">{m}</text>
             ))}
           </svg>
           <div className="h-stack" style={{ gap: 24, marginTop: 32, justifyContent: 'center' }}>
              <div className="h-stack" style={{ gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--cyan)' }}></div><span style={{ fontSize: 12, fontWeight: 600 }}>Overall Yes Rate</span></div>
              <div className="h-stack" style={{ gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--green)' }}></div><span style={{ fontSize: 12, fontWeight: 600 }}>Completion Rate</span></div>
              <div className="h-stack" style={{ gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--yellow)' }}></div><span style={{ fontSize: 12, fontWeight: 600 }}>Theme Validation Rate</span></div>
           </div>
        </div>
      </div>

      {/* EXCEPTION REPORTS */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">Exception Reports</div>
        <table className="heatmap-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', color: 'var(--cyan)', fontSize: 10 }}>EXCEPTION TYPE</th>
              <th style={{ textAlign: 'center', color: 'var(--cyan)', fontSize: 10 }}>COUNT</th>
              <th style={{ textAlign: 'left', color: 'var(--cyan)', fontSize: 10 }}>DEPARTMENT</th>
              <th style={{ textAlign: 'left', color: 'var(--cyan)', fontSize: 10 }}>ACTION REQUIRED</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: '3+ consecutive No results', count: 8, dept: 'Sales, Operations', action: 'Manager review conversation required', cls: 'red' },
              { type: 'Missing manager submission', count: 12, dept: 'Marketing, Product', action: 'Escalate to department head', cls: 'yellow' },
              { type: 'Theme submission overdue', count: 19, dept: 'All departments', action: 'Automated reminder sent', cls: 'orange' },
              { type: 'Repeated theme rejection', count: 4, dept: 'Engineering, HR', action: 'L&D support offered', cls: 'purple' },
              { type: 'No input for 2+ months', count: 3, dept: 'Operations', action: 'Manager conversation flagged', cls: 'green' }
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ fontSize: 13, color: 'var(--text)' }}>{row.type}</td>
                <td style={{ textAlign: 'center' }}><Badge cls={row.cls}>{row.count}</Badge></td>
                <td style={{ fontSize: 13, color: 'var(--text2)' }}>{row.dept}</td>
                <td style={{ fontSize: 13, color: 'var(--text2)' }}>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* THEME FREQUENCY ANALYSIS */}
      <div className="frame" style={{ marginTop: 24 }}>
        <div className="sec-title">Theme Frequency Analysis</div>
        <div className="v-stack" style={{ gap: 16, marginTop: 20 }}>
          {[
            { label: 'Delivery Quality', pct: 72, color: 'var(--cyan)' },
            { label: 'Collaboration', pct: 64, color: 'var(--purple)' },
            { label: 'Technical Initiative', pct: 51, color: 'var(--blue)' },
            { label: 'Process Improvement', pct: 43, color: 'var(--green)' },
            { label: 'Leadership & Mentoring', pct: 38, color: 'var(--yellow)' },
          ].map(item => (
            <div key={item.label} className="bar-row">
              <span className="bar-label" style={{ width: 180 }}>{item.label}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${item.pct}%`, background: item.color }}></div></div>
              <span className="bar-pct">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION ROW */}
      <div className="h-stack" style={{ gap: 16, marginTop: 32, marginBottom: 40 }}>
         <button className="btn-outline">Export Full Report</button>
         <button className="btn-outline">Send Exception Alerts</button>
         <button className="btn-primary" style={{ marginLeft: 'auto' }}>Refresh Dashboard</button>
      </div>
    </div>
  );
}

// ── ARCHITECTURE ──
function Architecture() {
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <div className="portal-label">⊞ SYSTEM ARCHITECTURE</div>
      <div className="page-title">Integration <span>Blueprint</span></div>
      <div className="page-sub" style={{ marginBottom: 32 }}>SAP Connect Integration · Data flows · Authentication · Tech stack · 8-week delivery</div>

      {/* CLOUD TIER */}
      <div className="arch-tier">
        <div className="arch-tier-label">SAP CONNECT / SUCCESSFACTORS (CLOUD)</div>
        <div className="arch-grid">
           {[
             { title: 'Employee Central', sub: 'Master Data', icon: '👥' },
             { title: 'PM/GM Module', sub: 'Annual Rating', icon: '📋' },
             { title: 'SAML 2.0 IdP', sub: 'SSO Source', icon: '🔒' },
             { title: 'OData v4 API', sub: 'REST Interface', icon: '🔌' },
           ].map(c => (
             <div key={c.title} className="arch-card">
               <div className="arch-card-icon">{c.icon}</div>
               <div className="arch-card-title">{c.title}</div>
               <div className="arch-card-sub">{c.sub}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="arch-connector-line">┇ OData v4 GET/POST · SAML Assertions · OAuth 2.0 Tokens</div>

      {/* MIDDLEWARE TIER */}
      <div className="arch-tier" style={{ background: 'rgba(121,82,179,0.03)', borderColor: 'rgba(121,82,179,0.15)' }}>
        <div className="arch-tier-label" style={{ color: 'var(--purple)', borderColor: 'rgba(121,82,179,0.15)' }}>MIDDLEWARE LAYER (NODE.JS / FASTAPI)</div>
        <div className="arch-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
           {[
             { title: 'SF Sync Job', sub: 'Nightly Cron', icon: '🔄' },
             { title: 'Decision Engine', sub: '2+ Yes = YES rule', icon: '⚙️' },
             { title: 'Auth Service', sub: 'JWT + SAML', icon: '🔑' },
             { title: 'Score Upload', sub: 'SF Write-back', icon: '📤' },
             { title: 'PostgreSQL DB', sub: 'Review Store', icon: '🗄️' },
             { title: 'n8n Workflows', sub: 'Automation', icon: '⛓️' },
           ].map(c => (
             <div key={c.title} className="arch-card">
               <div className="arch-card-icon">{c.icon}</div>
               <div className="arch-card-title">{c.title}</div>
               <div className="arch-card-sub">{c.sub}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="arch-connector-line" style={{ color: 'var(--blue)' }}>↕ REST API /api/v1...</div>

      {/* FRONTEND TIER */}
      <div className="arch-tier" style={{ background: 'rgba(0,123,255,0.03)', borderColor: 'rgba(0,123,255,0.15)' }}>
        <div className="arch-tier-label" style={{ color: 'var(--blue)', borderColor: 'rgba(0,123,255,0.15)' }}>FRONTEND SPA (REACT — EMPLOYEE / MANAGER / HR)</div>
        <div className="arch-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
           {[
             { title: 'Employee Portal', sub: 'Themes + Evidence', icon: '👤' },
             { title: 'Manager Portal', sub: 'Binary Input + Validate', icon: '📊' },
             { title: 'HR Dashboard', sub: 'Reports + Trends', icon: '📈' },
           ].map(c => (
             <div key={c.title} className="arch-card" style={{ padding: '20px 12px' }}>
               <div className="arch-card-icon">{c.icon}</div>
               <div className="arch-card-title">{c.title}</div>
               <div className="arch-card-sub">{c.sub}</div>
             </div>
           ))}
        </div>
      </div>

      {/* LOGIC & TIMELINE */}
      <div className="grid-2-1" style={{ marginTop: 32 }}>
        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">Decision Logic — All 16 Combinations</div>
          <div className="v-stack" style={{ marginTop: 16 }}>
            {[
              { label: '4Y + 0N', val: 'YES', cls: 'green' },
              { label: '3Y + 1N', val: 'YES', cls: 'green' },
              { label: '2Y + 2N', val: 'YES', cls: 'green' },
              { label: '1Y + 3N', val: 'NO', cls: 'red' },
              { label: '0Y + 4N', val: 'NO', cls: 'red' },
              { label: 'All 16 combos', val: 'Supported', cls: 'gray' }
            ].map(row => (
              <div key={row.label} className="logic-row">
                 <span style={{ color: 'var(--text2)', fontWeight: 600 }}>{row.label}</span>
                 <span className={`logic-val ${row.cls}`} style={{ background: `var(--${row.cls}-bg)`, color: `var(--${row.cls})` }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="frame" style={{ margin: 0 }}>
          <div className="sec-title">Delivery Timeline — 8 Weeks</div>
          <div className="v-stack" style={{ marginTop: 20 }}>
            {[
              { id: 'Sprint 1 (Wk 1-2)', desc: 'SF OData connection + employee sync' },
              { id: 'Sprint 2 (Wk 3-4)', desc: 'Binary inputs + decision engine + themes' },
              { id: 'Sprint 3 (Wk 5-6)', desc: 'Dashboards + roll-up + exceptions' },
              { id: 'Sprint 4 (Wk 7-8)', desc: 'UAT + SF write-back + go-live' },
            ].map((s, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" style={{ borderColor: 'var(--cyan)' }} />
                <div className="timeline-content">
                  <div className="timeline-title" style={{ color: 'var(--cyan)' }}>{s.id}</div>
                  <div className="timeline-date">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TECH STACK */}
      <div className="sec-title" style={{ marginTop: 40 }}>Tech Stack</div>
      <div className="tech-stack-grid">
        <div className="tech-col frontend">
          <div className="tech-col-title">Frontend</div>
          {[
            'React 19 + Vite',
            'Vanilla CSS - Flex/Grid',
            'Recharts + Lucide',
            'React Hook Form',
            'SPA Architecture'
          ].map(t => <div key={t} className="tech-item" style={{ color: 'var(--blue)' }}><div className="tech-dot" />{t}</div>)}
        </div>
        <div className="tech-col backend">
          <div className="tech-col-title">Backend</div>
          {[
            'Node.js 20 + Express',
            'or Python FastAPI',
            'node-cron / JWT',
            'OData Client / SAML',
            'n8n Automation'
          ].map(t => <div key={t} className="tech-item" style={{ color: 'var(--purple)' }}><div className="tech-dot" />{t}</div>)}
        </div>
        <div className="tech-col infra">
          <div className="tech-col-title">Infrastructure</div>
          {[
            'Azure App Service',
            'Supabase / PostgreSQL',
            'Key Vault / Docker',
            'GitHub Actions CI/CD',
            'Azure / AWS Multicloud'
          ].map(t => <div key={t} className="tech-item" style={{ color: 'var(--green)' }}><div className="tech-dot" />{t}</div>)}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APPLICATION ──
export default function App() {
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("Employee");
  const [profile, setProfile] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "", color: "" });
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => {
    async function initSession() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
      } else {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('auth_email', user.email).single();
        setProfile(profileData);
        if (profileData?.role === 'manager') setRole('Manager');
        else if (profileData?.role === 'hr') setRole('HR');
      }
    }
    initSession();
  }, [navigate]);

  function showToast(msg, color) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ show: true, msg, color });
    timerRef.current = setTimeout(() => setToast({ show: false, msg: "", color: "" }), 3000);
  }

  const TABS = [
    ["overview", "◆ Overview"],
    ["employee", "○ Employee"],
    ["manager", "◈ Manager"],
    ["hr", "◆ HR Dashboard"],
    ["themes", "◈ Themes"],
    ["architecture", "⊞ Architecture"]
  ];

  return (
    <div className="pr-wrap">
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("overview")}>
          <div className="nav-dot" />
          <span>PulseReview</span>
        </div>
        <div className="nav-tabs">
          {TABS.map(([id, label]) => (
            <button key={id} className={`nav-tab ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>{label}</button>
          ))}
        </div>
        <div className="nav-right">
          <div className="role-pills">
            {['Employee', 'Manager', 'HR'].map(r => (
              <button key={r} className={`role-pill ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>{r}</button>
            ))}
          </div>
          <div className="nav-user" onClick={() => supabase.auth.signOut().then(() => navigate("/"))}>
             {profile?.first_name} {profile?.last_name}
             <div className="avatar">{getInitials(profile)}</div>
          </div>
        </div>
      </nav>

      {page === "overview" && <Overview profile={profile} />}
      {page === "employee" && <Employee profile={profile} activeUser={profile?.id} showToast={showToast} />}
      {page === "manager" && <ManagerPortal profile={profile} activeUser={profile?.id} showToast={showToast} />}
      {page === "hr" && <HRDashboard />}
      {page === "themes" && <Themes />}
      {page === "architecture" && <Architecture />}
      
      <Toast {...toast} />
    </div>
  );
}

// ── THEMES PAGE ──
function Themes() {
  const [allThemes, setAllThemes] = React.useState([]);

  React.useEffect(() => {
    supabase.from('themes').select('*, profiles(first_name, last_name)').order('submitted_at', { ascending: false })
      .then(({data}) => setAllThemes(data || []));
  }, []);

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      {/* HEADER */}
      <div className="portal-label">◈ THEMES WORKFLOW</div>
      <div className="page-title">Theme <span>Validation</span></div>
      <div className="page-sub">Employee-owned themes · Manager validation · Status tracking · Locked outcomes</div>

      {/* LIFECYCLE FLOW */}
      <div className="frame" style={{ marginTop: 24, paddingBottom: 8 }}>
        <div className="sec-title">Theme Lifecycle</div>
        <div className="flow-lifecycle" style={{ marginTop: 16 }}>
          <div className="lifecycle-step done"><span>Manager Direction</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step done"><span>Employee Creates</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step active"><span>Employee Submits</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step"><span>Manager Reviews</span></div><div className="lifecycle-arrow">→</div>
          <div className="lifecycle-step"><span>Locked & Recorded</span></div>
        </div>
        <div className="h-stack" style={{ gap: 8, marginTop: 12 }}>
          {['Pending', 'Approved', 'Returned for Revision', 'Rejected', 'Finalized'].map(s => (
             <Badge key={s} cls={s.toLowerCase() === 'approved' ? 'green' : s.toLowerCase() === 'pending' ? 'yellow' : s.toLowerCase() === 'finalized' ? 'blue' : 'gray'}>{s}</Badge>
          ))}
        </div>
      </div>

      <div className="grid-2-1" style={{ marginTop: 32 }}>
        {/* LEFT: THEME LIST */}
        <div className="v-stack" style={{ gap: 16 }}>
          <div className="sec-title">All Themes — April 2025</div>
          {allThemes.map(t => (
            <div key={t.id} className="theme-card" style={{ margin: 0, borderLeftWidth: 6 }}>
              <div className="theme-card-header">
                <div className="theme-card-name" style={{ fontSize: 16 }}>{t.title}</div>
                <Badge cls={t.status === 'approved' ? 'green' : t.status === 'pending_review' ? 'yellow' : 'blue'}>
                  {t.status === 'pending_review' ? 'Pending' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </Badge>
              </div>
              <div className="theme-card-cat" style={{ fontSize: 13 }}>
                {t.profiles?.first_name} {t.profiles?.last_name} · {t.category} · Submitted {new Date(t.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="v-stack" style={{ gap: 24 }}>
          <div className="frame" style={{ margin: 0 }}>
            <div className="sec-title">Theme Field Requirements</div>
            <table className="req-table" style={{ marginTop: 12 }}>
              <tbody>
                {[
                  { name: 'Theme title', tag: 'Required', cls: 'required' },
                  { name: 'Theme category', tag: 'Required', cls: 'required' },
                  { name: 'Short description', tag: 'Required', cls: 'required' },
                  { name: 'Review period', tag: 'Required', cls: 'required' },
                  { name: 'Link to objective / project', tag: 'Optional', cls: 'optional' },
                  { name: 'Employee evidence / comments', tag: 'Required', cls: 'required' },
                  { name: 'Manager comments', tag: 'Required', cls: 'required' },
                  { name: 'Validation status → dates', tag: 'Auto tracked', cls: 'required' },
                ].map(r => (
                  <tr key={r.name}>
                    <td style={{ color: 'var(--text2)', fontWeight: 500 }}>{r.name}</td>
                    <td style={{ textAlign: 'right' }}><span className={`req-tag ${r.cls}`}>{r.tag}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="frame" style={{ margin: 0 }}>
            <div className="sec-title">Monthly Cycle Summary</div>
            <div className="v-stack" style={{ marginTop: 20 }}>
              {[
                { title: 'Manager sets theme direction', date: 'Apr 1 — Communicated to all direct reports', done: true },
                { title: 'Employee theme submission window', date: 'Apr 5-16 — 47 of 53 themes submitted', done: true },
                { title: 'Manager validation period', date: 'Apr 16-25 — 31 validations remaining', done: false },
                { title: '4 binary monthly inputs', date: 'Apr 25-30 — Manager completes for each report', done: false },
                { title: 'Cycle close & lock', date: 'Apr 30 — Results finalized, dashboard updated', done: false },
              ].map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot ${item.done ? 'done' : ''}`} />
                  <div className="timeline-content">
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
