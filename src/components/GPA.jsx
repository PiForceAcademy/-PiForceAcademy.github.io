import React, { useState } from 'react';

const CREDIT_HOURS = {
  "English": { total: 5, theory: 3.75, practical: 1.25 },
  "Nepali": { total: 5, theory: 3.75, practical: 1.25 },
  "Mathematics": { total: 5, theory: 3.75, practical: 1.25 },
  "Science": { total: 5, theory: 3.75, practical: 1.25 },
  "Social Studies": { total: 4, theory: 3.0, practical: 1.0 },
  "Opt I": { total: 4 }, // will be dynamic
  "Opt II": { total: 4, theory: 3.0, practical: 1.0 },
};

const getOptionalCreditHours = (optName, optType) => {
  // For Opt I: all optionals (including Computer) are 3+1
  if (optType === 'Opt I') {
    return { total: 4, theory: 3, practical: 1 };
  }
  // For Opt II: all are 3+1
  return { total: 4, theory: 3, practical: 1 };
};

// GPA chart for SEE
const SEE_GPA_CHART = [
  { min: 90, max: 100, gpa: 4.0, grade: 'A+', desc: 'Outstanding' },
  { min: 80, max: 90, gpa: 3.6, grade: 'A', desc: 'Excellent' },
  { min: 70, max: 80, gpa: 3.2, grade: 'B+', desc: 'Very Good' },
  { min: 60, max: 70, gpa: 2.8, grade: 'B', desc: 'Good' },
  { min: 50, max: 60, gpa: 2.4, grade: 'C+', desc: 'Satisfactory' },
  { min: 40, max: 50, gpa: 2.0, grade: 'C', desc: 'Acceptable' },
  { min: 35, max: 40, gpa: 1.6, grade: 'D', desc: 'Basic' }, // Theory only
];

// NEB +2 Science grade mapping (theory out of 75, practical out of 25, Computer out of 50)
const NEB_GRADE_CHART = [
  { min: 90, max: 100, gpa: 4.0, grade: 'A+', desc: 'Outstanding' },
  { min: 80, max: 90, gpa: 3.6, grade: 'A', desc: 'Excellent' },
  { min: 70, max: 80, gpa: 3.2, grade: 'B+', desc: 'Very Good' },
  { min: 60, max: 70, gpa: 2.8, grade: 'B', desc: 'Good' },
  { min: 50, max: 60, gpa: 2.4, grade: 'C+', desc: 'Satisfactory' },
  { min: 40, max: 50, gpa: 2.0, grade: 'C', desc: 'Acceptable' },
  { min: 35, max: 40, gpa: 1.6, grade: 'D', desc: 'Basic' },
  { min: 0, max: 35, gpa: 0, grade: 'NG', desc: 'Not Graded (Fail)' },
];

function getSEETheoryGPA(marks, maxMarks) {
  if (marks === '' || isNaN(marks)) return null;
  const percent = (marks / maxMarks) * 100;
  if (percent < 35) return 'NG';
  for (const row of SEE_GPA_CHART) {
    if (percent >= row.min && percent < row.max) return row.gpa;
  }
  if (percent === 100) return 4.0;
  return 0;
}

function getSEEPracticalGPA(marks, maxMarks) {
  if (marks === '' || isNaN(marks)) return null;
  const percent = (marks / maxMarks) * 100;
  if (percent < 40) return 'NG';
  for (const row of SEE_GPA_CHART) {
    if (percent >= row.min && percent < row.max) return row.gpa;
  }
  if (percent === 100) return 4.0;
  return 0;
}

function getNEBGrade(marks, maxMarks) {
  if (marks === '' || isNaN(marks)) return { gpa: '', grade: '' };
  const percent = (marks / maxMarks) * 100;
  for (const row of NEB_GRADE_CHART) {
    if (percent >= row.min && percent < row.max) return { gpa: row.gpa, grade: row.grade };
  }
  if (percent === 100) return { gpa: 4.0, grade: 'A+' };
  return { gpa: 0, grade: 'NG' };
}

// Helper to get SEE grade (letter) for summary table
function getSEEGrade(marks, maxMarks, isTheory) {
  if (marks === '' || isNaN(marks)) return '';
  const percent = (marks / maxMarks) * 100;
  if (isTheory && percent < 35) return 'NG';
  if (!isTheory && percent < 40) return 'NG';
  for (const row of SEE_GPA_CHART) {
    if (percent >= row.min && percent < row.max) return row.grade;
  }
  if (percent === 100) return 'A+';
  return 'NG';
}

// Helper to get NG status for +2 Science
function getPlusTwoNG(theory, practical, maxTheory, maxPractical) {
  const t = parseFloat(theory);
  const p = parseFloat(practical);
  const tNG = !isNaN(t) && (t / maxTheory) * 100 < 35;
  const pNG = !isNaN(p) && (p / maxPractical) * 100 < 40;
  const tOver = !isNaN(t) && t > maxTheory;
  const pOver = !isNaN(p) && p > maxPractical;
  if (tOver && pOver) return <span className="max-warning">Theory & Practical cannot exceed max marks</span>;
  if (tOver) return <span className="max-warning">Theory cannot exceed max marks</span>;
  if (pOver) return <span className="max-warning">Practical cannot exceed max marks</span>;
  if (tNG && pNG) return <span className="ng-warning">Not Graded (Fail): Theory & Practical below pass marks</span>;
  if (tNG) return <span className="ng-warning">Not Graded (Fail): Theory below 35%</span>;
  if (pNG) return <span className="ng-warning">Not Graded (Fail): Practical below 40%</span>;
  return null;
}

// +2 Management subject and optionals
const MANAGEMENT_OPTIONALS = [
  "Accountancy",
  "Economics",
  "Computer Science",
  "Business Studies",
  "Tourism & Mountaineering",
  "Business Mathematics",
  "Hotel Management"
];
const MANAGEMENT_COMPULSORY = [
  { name: "English", theory: "", practical: "" },
  { name: "Nepali", theory: "", practical: "" },
  { name: "Mathematics/Social Studies & Life Skills", theory: "", practical: "", isChoice: true, choice: "Mathematics" },
];

function getLetterGrade(gpa) {
  const g = parseFloat(gpa);
  if (g >= 3.6) return "A+";
  if (g >= 3.2) return "A";
  if (g >= 2.8) return "B+";
  if (g >= 2.4) return "B";
  if (g >= 2.0) return "C+";
  if (g >= 1.6) return "C";
  if (g > 0) return "D";
  return "NG";
}

// Define credit hours for +2 Science and Management subjects
const PLUS_TWO_CREDITS = {
  'English': 4,
  'Nepali': 3,
  'Mathematics': 5,
  'Physics': 5,
  'Chemistry': 5,
  'Biology': 5,
  'Computer Science': 5,
  'Accountancy': 5,
  'Economics': 5,
  'Business Studies': 5,
  'Tourism & Mountaineering': 5,
  'Business Mathematics': 5,
  'Hotel Management': 5,
  'Social Studies & Life Skills': 3,
};

const GPA = () => {
  const [gpaData, setGpaData] = useState({
    level: "SEE",
    subjects: [
      { name: "English", theory: "", practical: "" },
      { name: "Nepali", theory: "", practical: "" },
      { name: "Mathematics", theory: "", practical: "" },
      { name: "Science", theory: "", practical: "" },
      { name: "Social Studies", theory: "", practical: "" },
      { name: "Opt I", theory: "", practical: "", optName: "Computer" },
      { name: "Opt II", theory: "", practical: "", optName: "Optional Math" },
    ]
  });

  const optionalSubjects = ["Computer", "Account", "Other"];
  const optionalSubjectsII = ["Optional Math", "Population", "Environment Science", "Other"];

  // For +2, allow user to choose between Biology and Computer Science as optional (dropdown in subject row)
  const [plusTwoOptional, setPlusTwoOptional] = useState('Biology');

  // For +2 Management optionals
  const [managementOptionals, setManagementOptionals] = useState([
    { name: MANAGEMENT_OPTIONALS[0], theory: "", practical: "" },
    { name: MANAGEMENT_OPTIONALS[1], theory: "", practical: "" },
    { name: MANAGEMENT_OPTIONALS[2], theory: "", practical: "" }
  ]);
  const [managementChoice, setManagementChoice] = useState("Mathematics");

  const handleGpaLevelChange = (level) => {
    let subjects;
    if (level === "SEE") {
      subjects = [
        { name: "English", theory: "", practical: "" },
        { name: "Nepali", theory: "", practical: "" },
        { name: "Mathematics", theory: "", practical: "" },
        { name: "Science", theory: "", practical: "" },
        { name: "Social Studies", theory: "", practical: "" },
        { name: "Opt I", theory: "", practical: "", optName: "Computer" },
        { name: "Opt II", theory: "", practical: "", optName: "Optional Math" },
      ];
    } else if (level === "+2") {
      subjects = [
        { name: "English", theory: "", practical: "" },
        { name: "Nepali", theory: "", practical: "" },
        { name: "Mathematics", theory: "", practical: "" },
        { name: "Physics", theory: "", practical: "" },
        { name: "Chemistry", theory: "", practical: "" },
        { name: plusTwoOptional, theory: "", practical: "", isOptional: true },
      ];
    } else if (level === "+2M") {
      // +2 Management
      subjects = [
        { name: "English", theory: "", practical: "" },
        { name: "Nepali", theory: "", practical: "" },
        { name: managementChoice, theory: "", practical: "", isChoice: true },
        ...managementOptionals.map(opt => ({ ...opt })),
      ];
    }
    setGpaData({ level, subjects });
  };

  const handleMarksChange = (index, field, value) => {
    const updatedSubjects = [...gpaData.subjects];
    updatedSubjects[index][field] = value;
    setGpaData({ ...gpaData, subjects: updatedSubjects });
  };

  // For +2, handle marks input for theory/practical
  const handlePlusTwoMarksChange = (index, field, value) => {
    const updatedSubjects = [...gpaData.subjects];
    updatedSubjects[index][field] = value;
    setGpaData({ ...gpaData, subjects: updatedSubjects });
  };

  // When user changes the +2 optional, update only the last subject
  const handlePlusTwoOptionalChange = (e) => {
    const newOpt = e.target.value;
    setPlusTwoOptional(newOpt);
    if (gpaData.level === "+2") {
      const updatedSubjects = gpaData.subjects.map((subj, idx) =>
        idx === gpaData.subjects.length - 1
          ? { ...subj, name: newOpt, theory: "", practical: "" }
          : subj
      );
      setGpaData({ ...gpaData, subjects: updatedSubjects });
    }
  };

  // For +2 Management: handle compulsory subject choice
  const handleManagementChoiceChange = (e) => {
    setManagementChoice(e.target.value);
    if (gpaData.level === "+2M") {
      const updatedSubjects = [
        { name: "English", theory: "", practical: "" },
        { name: "Nepali", theory: "", practical: "" },
        { name: e.target.value, theory: "", practical: "", isChoice: true },
        ...managementOptionals.map(opt => ({ ...opt })),
      ];
      setGpaData({ ...gpaData, subjects: updatedSubjects });
    }
  };

  // For +2 Management: handle optional subject change
  const handleManagementOptionalChange = (idx, newName) => {
    const newOptionals = managementOptionals.map((opt, i) =>
      i === idx ? { name: newName, theory: "", practical: "" } : opt
    );
    setManagementOptionals(newOptionals);
    if (gpaData.level === "+2M") {
      const updatedSubjects = [
        { name: "English", theory: "", practical: "" },
        { name: "Nepali", theory: "", practical: "" },
        { name: managementChoice, theory: "", practical: "", isChoice: true },
        ...newOptionals.map(opt => ({ ...opt })),
      ];
      setGpaData({ ...gpaData, subjects: updatedSubjects });
    }
  };

  const calculateGPA = () => {
    if (gpaData.level === "SEE") {
      let totalWeightedPoints = 0;
      let totalCredits = 0;
      gpaData.subjects.forEach(subject => {
        const theory = parseFloat(subject.theory);
        const practical = parseFloat(subject.practical);
        let creditInfo;
        if (subject.name === "Opt I") {
          creditInfo = getOptionalCreditHours(subject.optName, 'Opt I');
        } else if (subject.name === "Opt II") {
          creditInfo = getOptionalCreditHours(subject.optName, 'Opt II');
        } else {
          creditInfo = CREDIT_HOURS[subject.name];
        }
        if (!isNaN(theory) && !isNaN(practical)) {
          const maxTheory = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75;
          const maxPractical = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25;
          const theoryGPA = getSEETheoryGPA(theory, maxTheory);
          const practicalGPA = getSEEPracticalGPA(practical, maxPractical);
          let subjectGPA;
          if (theoryGPA === 'NG' || practicalGPA === 'NG') {
            subjectGPA = 0; // Not Graded, fail
          } else {
            subjectGPA = ((theoryGPA * creditInfo.theory) + (practicalGPA * creditInfo.practical)) / creditInfo.total;
          }
          totalWeightedPoints += subjectGPA * creditInfo.total;
          totalCredits += creditInfo.total;
        }
      });
      return totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : 0;
    } else {
      // +2 Science/Management: weighted GPA by subject credit
      let totalWeightedPoints = 0;
      let totalCredits = 0;
    gpaData.subjects.forEach(subject => {
        const isComputer = subject.name === "Computer Science";
        const maxTheory = isComputer ? 50 : 75;
        const maxPractical = isComputer ? 50 : 25;
        const theory = parseFloat(subject.theory);
        const practical = parseFloat(subject.practical);
        const credit = PLUS_TWO_CREDITS[subject.name] || 5;
        if (!isNaN(theory) && !isNaN(practical)) {
          const tGrade = getNEBGrade(theory, maxTheory);
          const pGrade = getNEBGrade(practical, maxPractical);
          if (tGrade.gpa !== '' && pGrade.gpa !== '') {
            const subjectGPA = (parseFloat(tGrade.gpa) + parseFloat(pGrade.gpa)) / 2;
            totalWeightedPoints += subjectGPA * credit;
            totalCredits += credit;
          }
      }
    });
      return totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : 0;
    }
  };

  const currentGPA = calculateGPA();

  const allSEEFieldsFilled = gpaData.level === "SEE" && gpaData.subjects.every(subj =>
    subj.theory !== "" && subj.practical !== "" && !isNaN(parseFloat(subj.theory)) && !isNaN(parseFloat(subj.practical))
  );
  const allPlusTwoFieldsFilled =
    (gpaData.level === "+2" || gpaData.level === "+2M") &&
    gpaData.subjects.every(subj =>
    subj.theory !== "" && subj.practical !== "" && !isNaN(parseFloat(subj.theory)) && !isNaN(parseFloat(subj.practical))
  );

  return (
    <div className="gpa-calculator">
      <div className="gpa-header gpa-header-card">
        <h2><i className="fas fa-calculator"></i> GPA Calculator</h2>
        <div className="gpa-level-selector">
          <button 
            className={gpaData.level === "SEE" ? "active" : ""}
            onClick={() => handleGpaLevelChange("SEE")}
          >
            <i className="fas fa-graduation-cap"></i> SEE
          </button>
          <button 
            className={gpaData.level === "+2" ? "active" : ""}
            onClick={() => handleGpaLevelChange("+2")}
          >
            <i className="fas fa-university"></i> +2 Science
          </button>
          <button 
            className={gpaData.level === "+2M" ? "active" : ""}
            onClick={() => handleGpaLevelChange("+2M")}
          >
            <i className="fas fa-briefcase"></i> +2 Management
          </button>
        </div>
      </div>
      <div className="gpa-form">
        <h3>{gpaData.level === "SEE" ? "SEE Subjects" : gpaData.level === "+2" ? "+2 Science Subjects" : "+2 Management Subjects"}</h3>
        {gpaData.level === "SEE" && (
          <div className="credit-hours-info">
            <details>
              <summary style={{cursor:'pointer',fontWeight:'bold',marginBottom:'0.5rem'}}>SEE Credit Hours Info</summary>
              <table className="credit-hours-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total</th>
                    <th>Theory</th>
                    <th>Practical</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Nepali</td><td>5</td><td>3.75</td><td>1.25</td></tr>
                  <tr><td>English</td><td>5</td><td>3.75</td><td>1.25</td></tr>
                  <tr><td>Mathematics</td><td>5</td><td>3.75</td><td>1.25</td></tr>
                  <tr><td>Science & Technology</td><td>5</td><td>3.75</td><td>1.25</td></tr>
                  <tr><td>Social Studies</td><td>4</td><td>3.0</td><td>1.0</td></tr>
                  <tr className="opt-row"><td>Optional I</td><td>4</td><td>3</td><td>1</td></tr>
                  <tr className="opt-row"><td>Optional II</td><td>4</td><td>3.0</td><td>1.0</td></tr>
                </tbody>
              </table>
              <div style={{fontSize:'0.95em',marginTop:'0.5em'}}>
                <b>Note:</b> Optional I and II are always 3+1 split (theory+practical).<br/>
                These reflect annual working hours (5-credit: 160h, 4-credit: 128h).
              </div>
            </details>
          </div>
        )}
        {gpaData.level === "SEE" && (
          <div className="gpa-charts-info">
            <details>
              <summary style={{cursor:'pointer',fontWeight:'bold',marginBottom:'0.5rem'}}>SEE GPA Chart</summary>
              <table className="gpa-chart-table">
                <thead>
                  <tr><th>Percentage Range</th><th>GPA</th><th>Letter Grade</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr><td>90% – 100%</td><td>4.0</td><td>A+</td><td>Outstanding</td></tr>
                  <tr><td>80% – &lt;90%</td><td>3.6</td><td>A</td><td>Excellent</td></tr>
                  <tr><td>70% – &lt;80%</td><td>3.2</td><td>B+</td><td>Very Good</td></tr>
                  <tr><td>60% – &lt;70%</td><td>2.8</td><td>B</td><td>Good</td></tr>
                  <tr><td>50% – &lt;60%</td><td>2.4</td><td>C+</td><td>Satisfactory</td></tr>
                  <tr><td>40% – &lt;50%</td><td>2.0</td><td>C</td><td>Acceptable</td></tr>
                  <tr><td>35% – &lt;40% (theory only)</td><td>1.6</td><td>D</td><td>Basic</td></tr>
                  <tr className="ng-row"><td>Below 35% (theory) or 40% (practical)</td><td>NG</td><td>NG</td><td>Not Graded (Fail)</td></tr>
                </tbody>
              </table>
              <div style={{fontSize:'0.95em',marginTop:'0.5em'}}>
                <b>Note:</b> Must secure minimum 35% in theory and 40% in practical/internal to pass.<br/>
                "NG" means Not Graded (Fail).
              </div>
            </details>
          </div>
        )}
        {gpaData.level !== "+2M" && (
          <div className="subjects-grid">
            {gpaData.subjects.map((subject, index) => (
              <div key={index} className="subject-input subject-card">
                {/* For +2, only the last subject (optional) is selectable */}
                {gpaData.level === "+2" && subject.isOptional ? (
                  <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                    <label style={{fontWeight:600, fontSize:'1.1em', marginBottom:'0.2em', display:'block'}}>{plusTwoOptional}</label>
                    <select
                      value={plusTwoOptional}
                      onChange={handlePlusTwoOptionalChange}
                      style={{ padding:'0.4em 1em', borderRadius:'6px', fontSize:'1em' }}
                    >
                      <option value="Biology">Biology</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>
                ) : (
                  <label>{(subject.name === "Opt I" || subject.name === "Opt II") && subject.optName ? subject.optName : subject.name}</label>
                )}
                {gpaData.level === "SEE" && (subject.name === "Opt I" || subject.name === "Opt II") && (
                  <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                    <select
                      value={subject.optName}
                      onChange={e => {
                        const updatedSubjects = [...gpaData.subjects];
                        updatedSubjects[index].optName = e.target.value;
                        setGpaData({ ...gpaData, subjects: updatedSubjects });
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1.5px solid #d1d5db', fontSize: '1rem' }}
                    >
                      {(subject.name === "Opt I" ? optionalSubjects : optionalSubjectsII).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
                {gpaData.level === "SEE" ? (
                  <>
                    <div className="marks-row">
                      <input
                        type="number"
                        min="0"
                        max={(subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75}
                        value={subject.theory}
                        onChange={(e) => handleMarksChange(index, 'theory', e.target.value)}
                        placeholder={`Theory (max ${(subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75})`}
                        className={(() => {
                          const val = parseFloat(subject.theory);
                          const max = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75;
                          if (isNaN(val)) return '';
                          if (val > max) return 'input-error';
                          const percent = (val / max) * 100;
                          if (percent < 35) return 'input-ng';
                          return '';
                        })()}
                      />
                      <input
                        type="number"
                        min="0"
                        max={(subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25}
                        value={subject.practical}
                        onChange={(e) => handleMarksChange(index, 'practical', e.target.value)}
                        placeholder={`Practical (max ${(subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25})`}
                        className={(() => {
                          const val = parseFloat(subject.practical);
                          const max = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25;
                          if (isNaN(val)) return '';
                          if (val > max) return 'input-error';
                          const percent = (val / max) * 100;
                          if (percent < 40) return 'input-ng';
                          return '';
                        })()}
                      />
                    </div>
                    <div className="neb-grade-row">
                      {(() => {
                        const t = parseFloat(subject.theory);
                        const p = parseFloat(subject.practical);
                        const maxT = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75;
                        const maxP = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25;
                        const tGrade = getSEEGrade(t, maxT, true);
                        const pGrade = getSEEGrade(p, maxP, false);
                        return (
                          <>
                            <span className="neb-grade">Theory Grade: <b>{tGrade || '-'}</b></span>
                            <span className="neb-grade">Practical Grade: <b>{pGrade || '-'}</b></span>
                          </>
                        );
                      })()}
                    </div>
                    {/* NG warning and max warning */}
                    <div style={{minHeight:'1.2em'}}>
                      {(() => {
                        const t = parseFloat(subject.theory);
                        const p = parseFloat(subject.practical);
                        const maxT = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 75;
                        const maxP = (subject.name === "Opt I" && subject.optName === "Computer") ? 50 : 25;
                        const tNG = !isNaN(t) && (t / maxT) * 100 < 35;
                        const pNG = !isNaN(p) && (p / maxP) * 100 < 40;
                        const tOver = !isNaN(t) && t > maxT;
                        const pOver = !isNaN(p) && p > maxP;
                        if (tOver && pOver) return <span className="max-warning">Theory & Practical cannot exceed max marks</span>;
                        if (tOver) return <span className="max-warning">Theory cannot exceed max marks</span>;
                        if (pOver) return <span className="max-warning">Practical cannot exceed max marks</span>;
                        if (tNG && pNG) return <span className="ng-warning">Not Graded (Fail): Theory & Practical below pass marks</span>;
                        if (tNG) return <span className="ng-warning">Not Graded (Fail): Theory below 35%</span>;
                        if (pNG) return <span className="ng-warning">Not Graded (Fail): Practical below 40%</span>;
                        return null;
                      })()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="marks-row">
                      <input
                        type="number"
                        min="0"
                        max={subject.name === "Computer Science" ? 50 : 75}
                        value={subject.theory}
                        onChange={e => handlePlusTwoMarksChange(index, 'theory', e.target.value)}
                        placeholder={`Theory (max ${subject.name === "Computer Science" ? 50 : 75})`}
                        className={(() => {
                          const val = parseFloat(subject.theory);
                          const max = subject.name === "Computer Science" ? 50 : 75;
                          if (isNaN(val)) return '';
                          if (val > max) return 'input-error';
                          const percent = (val / max) * 100;
                          if (percent < 35) return 'input-ng';
                          return '';
                        })()}
                      />
                      <input
                        type="number"
                        min="0"
                        max={subject.name === "Computer Science" ? 50 : 25}
                        value={subject.practical}
                        onChange={e => handlePlusTwoMarksChange(index, 'practical', e.target.value)}
                        placeholder={`Practical (max ${subject.name === "Computer Science" ? 50 : 25})`}
                        className={(() => {
                          const val = parseFloat(subject.practical);
                          const max = subject.name === "Computer Science" ? 50 : 25;
                          if (isNaN(val)) return '';
                          if (val > max) return 'input-error';
                          const percent = (val / max) * 100;
                          if (percent < 40) return 'input-ng';
                          return '';
                        })()}
                      />
                    </div>
                    <div className="neb-grade-row">
                      {(() => {
                        const t = parseFloat(subject.theory);
                        const p = parseFloat(subject.practical);
                        const maxT = subject.name === "Computer Science" ? 50 : 75;
                        const maxP = subject.name === "Computer Science" ? 50 : 25;
                        const tGrade = getNEBGrade(t, maxT);
                        const pGrade = getNEBGrade(p, maxP);
                        return (
                          <>
                            <span className="neb-grade">Theory Grade: <b>{tGrade.grade || '-'}</b></span>
                            <span className="neb-grade">Practical Grade: <b>{pGrade.grade || '-'}</b></span>
                          </>
                        );
                      })()}
                    </div>
                    {/* NG warning and max warning */}
                    <div style={{minHeight:'1.2em'}}>
                      {(() => {
                        const maxT = subject.name === "Computer Science" ? 50 : 75;
                        const maxP = subject.name === "Computer Science" ? 50 : 25;
                        return getPlusTwoNG(subject.theory, subject.practical, maxT, maxP);
                      })()}
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
        )}
      </div>
      {/* +2 GPA summary table */}
      {gpaData.level === "+2" && allPlusTwoFieldsFilled && (
        <div className="gpa-result">
          <div className="result-card">
            <h3>GPA Result</h3>
            <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'0.2rem'}}>GPA: {currentGPA}</div>
            <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'0.5rem'}}>Grade: {getLetterGrade(currentGPA)}</div>
            <div style={{fontSize:'1.1rem', marginBottom:'1.5rem'}}>Total Credits: {gpaData.subjects.length * 5}</div>
            <table className="gpa-summary-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Theory Marks</th>
                  <th>Theory Grade</th>
                  <th>Practical Marks</th>
                  <th>Practical Grade</th>
                  <th>Final Grade</th>
                  <th>Credit Hours</th>
                </tr>
              </thead>
              <tbody>
                {gpaData.subjects.map((subject, idx) => {
                  const isComputer = subject.name === "Computer Science";
                  const maxT = isComputer ? 50 : 75;
                  const maxP = isComputer ? 50 : 25;
                  const t = parseFloat(subject.theory);
                  const p = parseFloat(subject.practical);
                  const tGrade = getNEBGrade(t, maxT);
                  const pGrade = getNEBGrade(p, maxP);
                  let finalGrade = "-";
                  if (tGrade.grade && pGrade.grade) {
                    if (tGrade.grade === "NG" || pGrade.grade === "NG") finalGrade = "NG";
                    else {
                      // Calculate combined percentage and grade
                      const totalMarks = (isNaN(t) ? 0 : t) + (isNaN(p) ? 0 : p);
                      const maxTotal = maxT + maxP;
                      const percent = (totalMarks / maxTotal) * 100;
                      for (const row of NEB_GRADE_CHART) {
                        if (percent >= row.min && percent < row.max) {
                          finalGrade = row.grade;
                          break;
                        }
                      }
                      if (percent === 100) finalGrade = 'A+';
                      if (finalGrade === '-') finalGrade = 'NG';
                    }
                  }
                  return (
                    <tr key={idx}>
                      <td>{subject.name}</td>
                      <td>{isNaN(t) ? '-' : t}</td>
                      <td>{tGrade.grade || '-'}</td>
                      <td>{isNaN(p) ? '-' : p}</td>
                      <td>{pGrade.grade || '-'}</td>
                      <td>{finalGrade}</td>
                      <td>{PLUS_TWO_CREDITS[subject.name] || 5}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* SEE GPA summary table */}
      {gpaData.level === "SEE" && allSEEFieldsFilled && (
        <div className="gpa-result">
          <div className="result-card">
            <h3>GPA Result</h3>
            <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'0.2rem'}}>GPA: {currentGPA}</div>
            <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'1.5rem'}}>Grade: {getLetterGrade(currentGPA)}</div>
            <h3>SEE GPA Summary</h3>
            <table className="gpa-summary-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Theory</th>
                  <th>Theory Grade</th>
                  <th>Practical</th>
                  <th>Practical Grade</th>
                  <th>Subject GPA</th>
                </tr>
              </thead>
              <tbody>
                {gpaData.subjects.map((subject, idx) => {
                  const isOptI = subject.name === "Opt I";
                  const maxT = isOptI && subject.optName === "Computer" ? 50 : 75;
                  const maxP = isOptI && subject.optName === "Computer" ? 50 : 25;
                  const t = parseFloat(subject.theory);
                  const p = parseFloat(subject.practical);
                  const tGrade = getSEEGrade(t, maxT, true);
                  const pGrade = getSEEGrade(p, maxP, false);
                  let subjectGPA = null;
                  if (!isNaN(t) && !isNaN(p)) {
                    const theoryGPA = getSEETheoryGPA(t, maxT);
                    const practicalGPA = getSEEPracticalGPA(p, maxP);
                    let creditInfo;
                    if (subject.name === "Opt I") {
                      creditInfo = getOptionalCreditHours(subject.optName, 'Opt I');
                    } else if (subject.name === "Opt II") {
                      creditInfo = getOptionalCreditHours(subject.optName, 'Opt II');
                    } else {
                      creditInfo = CREDIT_HOURS[subject.name];
                    }
                    if (theoryGPA === 'NG' || practicalGPA === 'NG') {
                      subjectGPA = 0;
                    } else {
                      subjectGPA = ((theoryGPA * creditInfo.theory) + (practicalGPA * creditInfo.practical)) / creditInfo.total;
                    }
                  }
                  return (
                    <tr key={idx}>
                      <td>{(subject.name === "Opt I" || subject.name === "Opt II") && subject.optName ? subject.optName : subject.name}</td>
                      <td>{isNaN(t) ? '-' : t}</td>
                      <td>{tGrade || '-'}</td>
                      <td>{isNaN(p) ? '-' : p}</td>
                      <td>{pGrade || '-'}</td>
                      <td>{subjectGPA === null ? '-' : subjectGPA.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Only render the +2 Management subject cards once, not duplicated */}
      {gpaData.level === "+2M" && (
        <>
        <div className="subjects-grid">
          {gpaData.subjects.map((subject, index) => (
            <div key={index} className="subject-input subject-card">
              {/* Subject name or dropdown as bold label at the top */}
              {index < 2 ? (
                <label style={{fontWeight:600, fontSize:'1.1em', marginBottom:'0.5em', display:'block'}}>{subject.name}</label>
              ) : index === 2 ? (
                <>
                  <label style={{fontWeight:600, fontSize:'1.1em', marginBottom:'0.2em', display:'block'}}>{subject.name}</label>
                <select
                  value={subject.name}
                  onChange={handleManagementChoiceChange}
                  style={{ width: '100%', marginBottom: '0.5rem', padding:'0.4em 1em', borderRadius:'6px', fontSize:'1em', fontWeight:600 }}
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Social Studies & Life Skills">Social Studies & Life Skills</option>
                </select>
                </>
              ) : (
                <>
                  <label style={{fontWeight:600, fontSize:'1.1em', marginBottom:'0.2em', display:'block'}}>{subject.name}</label>
                <select
                  value={subject.name}
                  onChange={e => handleManagementOptionalChange(index-3, e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding:'0.4em 1em', borderRadius:'6px', fontSize:'1em', fontWeight:600 }}
                >
                  {MANAGEMENT_OPTIONALS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                </>
              )}
              <div className="marks-row">
                <input
                  type="number"
                  min="0"
                  max={subject.name === "Computer Science" ? 50 : 75}
                  value={subject.theory}
                  onChange={e => {
                    const updatedSubjects = [...gpaData.subjects];
                    updatedSubjects[index].theory = e.target.value;
                    setGpaData({ ...gpaData, subjects: updatedSubjects });
                  }}
                  placeholder={`Theory (max ${subject.name === "Computer Science" ? 50 : 75})`}
                  className={(() => {
                    const val = parseFloat(subject.theory);
                    const max = subject.name === "Computer Science" ? 50 : 75;
                    if (isNaN(val)) return '';
                    if (val > max) return 'input-error';
                    const percent = (val / max) * 100;
                    if (percent < 35) return 'input-ng';
                    return '';
                  })()}
                />
                <input
                  type="number"
                  min="0"
                  max={subject.name === "Computer Science" ? 50 : 25}
                  value={subject.practical}
                  onChange={e => {
                    const updatedSubjects = [...gpaData.subjects];
                    updatedSubjects[index].practical = e.target.value;
                    setGpaData({ ...gpaData, subjects: updatedSubjects });
                  }}
                  placeholder={`Practical (max ${subject.name === "Computer Science" ? 50 : 25})`}
                  className={(() => {
                    const val = parseFloat(subject.practical);
                    const max = subject.name === "Computer Science" ? 50 : 25;
                    if (isNaN(val)) return '';
                    if (val > max) return 'input-error';
                    const percent = (val / max) * 100;
                    if (percent < 40) return 'input-ng';
                    return '';
                  })()}
                />
              </div>
              <div className="neb-grade-row">
                {(() => {
                  const t = parseFloat(subject.theory);
                  const p = parseFloat(subject.practical);
                  const maxT = subject.name === "Computer Science" ? 50 : 75;
                  const maxP = subject.name === "Computer Science" ? 50 : 25;
                  const tGrade = getSEEGrade(t, maxT, true);
                  const pGrade = getSEEGrade(p, maxP, false);
                  return (
                    <>
                      <span className="neb-grade">Theory Grade: <b>{tGrade || '-'}</b></span>
                      <span className="neb-grade">Practical Grade: <b>{pGrade || '-'}</b></span>
                    </>
                  );
                })()}
              </div>
              {/* NG warning and max warning */}
              <div style={{minHeight:'1.2em'}}>
                {(() => {
                  const t = parseFloat(subject.theory);
                  const p = parseFloat(subject.practical);
                  const maxT = subject.name === "Computer Science" ? 50 : 75;
                  const maxP = subject.name === "Computer Science" ? 50 : 25;
                  const tNG = !isNaN(t) && (t / maxT) * 100 < 35;
                  const pNG = !isNaN(p) && (p / maxP) * 100 < 40;
                  const tOver = !isNaN(t) && t > maxT;
                  const pOver = !isNaN(p) && p > maxP;
                  if (tOver && pOver) return <span className="max-warning">Theory & Practical cannot exceed max marks</span>;
                  if (tOver) return <span className="max-warning">Theory cannot exceed max marks</span>;
                  if (pOver) return <span className="max-warning">Practical cannot exceed max marks</span>;
                  if (tNG && pNG) return <span className="ng-warning">Not Graded (Fail): Theory & Practical below pass marks</span>;
                  if (tNG) return <span className="ng-warning">Not Graded (Fail): Theory below 35%</span>;
                  if (pNG) return <span className="ng-warning">Not Graded (Fail): Practical below 40%</span>;
                  return null;
                })()}
              </div>
            </div>
          ))}
        </div>
        {/* +2 Management GPA summary table */}
        {allPlusTwoFieldsFilled && (
          <div className="gpa-result">
            <div className="result-card">
              <h3>GPA Result</h3>
              <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'0.2rem'}}>GPA: {currentGPA}</div>
              <div style={{fontSize:'1.2rem', fontWeight:600, marginBottom:'0.5rem'}}>Grade: {getLetterGrade(currentGPA)}</div>
              <div style={{fontSize:'1.1rem', marginBottom:'1.5rem'}}>Total Credits: {gpaData.subjects.length * 5}</div>
              <table className="gpa-summary-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Theory Marks</th>
                    <th>Theory Grade</th>
                    <th>Practical Marks</th>
                    <th>Practical Grade</th>
                    <th>Final Grade</th>
                    <th>Credit Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {gpaData.subjects.map((subject, idx) => {
                    const t = parseFloat(subject.theory);
                    const p = parseFloat(subject.practical);
                    const tGrade = getSEEGrade(t, 75, true);
                    const pGrade = getSEEGrade(p, 25, false);
                    let finalGrade = "-";
                    if (tGrade.grade && pGrade.grade) {
                      if (tGrade.grade === "NG" || pGrade.grade === "NG") finalGrade = "NG";
                      else {
                        // Calculate combined percentage and grade
                        const totalMarks = (isNaN(t) ? 0 : t) + (isNaN(p) ? 0 : p);
                        const maxTotal = 75 + 25;
                        const percent = (totalMarks / maxTotal) * 100;
                        for (const row of NEB_GRADE_CHART) {
                          if (percent >= row.min && percent < row.max) {
                            finalGrade = row.grade;
                            break;
                          }
                        }
                        if (percent === 100) finalGrade = 'A+';
                        if (finalGrade === '-') finalGrade = 'NG';
                      }
                    }
                    return (
                      <tr key={idx}>
                        <td>{subject.name}</td>
                        <td>{isNaN(t) ? '-' : t}</td>
                        <td>{tGrade || '-'}</td>
                        <td>{isNaN(p) ? '-' : p}</td>
                        <td>{pGrade || '-'}</td>
                        <td>{finalGrade}</td>
                        <td>{PLUS_TWO_CREDITS[subject.name] || 5}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
        </div>
        )}
        </>
      )}
    </div>
  );
};

export default GPA; 