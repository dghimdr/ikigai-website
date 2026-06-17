import { Resend } from 'resend';

const recipients = ['alexei@ikigaiintl.com', 'SWIFTY@ikigaiintl.com', 'dgim@ikigaiintl.com'];
// Set IKIGAI_SUBMISSIONS_FROM in Vercel to a Resend-verified IKIGAI sender,
// for example: IKIGAI Submissions <submissions@ikigaiintl.com>.
const fromAddress = process.env.IKIGAI_SUBMISSIONS_FROM || 'IKIGAI Submissions <submissions@ikigaiintl.com>';

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'companyName',
  'projectRole',
  'countryRegion',
  'projectTitle',
  'format',
  'primaryLanguage',
  'countryOfProduction',
  'currentStage',
  'shortSummary',
  'totalBudget',
  'budgetCurrency',
  'amountRaised',
  'amountRequested',
  'useOfFunds',
  'requiredClosingDate',
  'salesAgentAttached',
  'distributorAttached',
  'directorAttached',
  'keyCastAttached',
  'producerDetails',
  'materialsLink',
];

const requiredDeclarations = ['authorized', 'financeOnly', 'accurate', 'contactConsent'];

const labels = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone',
  companyName: 'Company name',
  projectRole: 'Role on project',
  website: 'Website',
  profileUrl: 'IMDb or LinkedIn profile',
  countryRegion: 'Country / region',
  projectTitle: 'Project title',
  format: 'Format',
  genre: 'Genre',
  primaryLanguage: 'Primary language',
  countryOfProduction: 'Country of production',
  currentStage: 'Current stage',
  shortSummary: 'Short project summary',
  packageElements: 'Key attachments / package elements',
  totalBudget: 'Total budget',
  budgetCurrency: 'Budget currency',
  amountRaised: 'Amount already raised',
  amountRequested: 'Amount requested from IKIGAI',
  useOfFunds: 'Intended use of funds',
  requiredClosingDate: 'Required closing date',
  expectedShootDate: 'Expected shoot date',
  expectedDeliveryDate: 'Expected delivery date',
  collateralAvailable: 'Available collateral',
  taxIncentiveJurisdiction: 'Tax incentive jurisdiction',
  taxIncentiveValue: 'Estimated tax incentive value',
  taxIncentiveStatus: 'Tax incentive approved or assessed',
  salesAgentAttached: 'Sales agent attached',
  salesAgentName: 'Sales agent name',
  distributorAttached: 'Distributor attached',
  distributorNameTerritory: 'Distributor name / territory',
  completionBondStatus: 'Completion bond status',
  directorAttached: 'Director attached',
  keyCastAttached: 'Key cast attached',
  producerDetails: 'Producer / production company details',
  financingPartners: 'Financing partners already involved',
  executiveProducersLenders: 'Executive producers or lenders already involved',
  marketHistory: 'Relevant market history',
  materialsLink: 'Link to materials',
  materialsAccessNotes: 'Password / access notes',
  additionalNotes: 'Anything else IKIGAI should know',
  heardAbout: 'How did you hear about IKIGAI',
  updatesOptIn: 'Occasional IKIGAI updates opt-in',
};

const sections = [
  ['Applicant Details', ['firstName', 'lastName', 'email', 'phone', 'companyName', 'projectRole', 'website', 'profileUrl', 'countryRegion']],
  ['Project Overview', ['projectTitle', 'format', 'genre', 'primaryLanguage', 'countryOfProduction', 'currentStage', 'shortSummary', 'packageElements']],
  ['Finance Requirement', ['totalBudget', 'budgetCurrency', 'amountRaised', 'amountRequested', 'useOfFunds', 'requiredClosingDate', 'expectedShootDate', 'expectedDeliveryDate']],
  ['Collateral', ['collateralAvailable', 'taxIncentiveJurisdiction', 'taxIncentiveValue', 'taxIncentiveStatus', 'salesAgentAttached', 'salesAgentName', 'distributorAttached', 'distributorNameTerritory', 'completionBondStatus']],
  ['Package', ['directorAttached', 'keyCastAttached', 'producerDetails', 'financingPartners', 'executiveProducersLenders', 'marketHistory']],
  ['Materials', ['materialsLink', 'materialsAccessNotes']],
  ['Additional Notes', ['additionalNotes', 'heardAbout', 'updatesOptIn']],
];

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
}

function clean(value) {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean);
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, 5000);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function validate(data) {
  if (clean(data.websiteUrl)) {
    return 'Spam protection rejected this submission.';
  }

  const missing = requiredFields.filter((field) => !clean(data[field]));
  if (missing.length) {
    return `Missing required fields: ${missing.map((field) => labels[field] || field).join(', ')}`;
  }

  if (!Array.isArray(data.collateralAvailable) || data.collateralAvailable.length === 0) {
    return 'Please select at least one available collateral item.';
  }

  const missingDeclarations = requiredDeclarations.filter((field) => data[field] !== 'on' && data[field] !== true);
  if (missingDeclarations.length) {
    return 'Please confirm all required declarations.';
  }

  if (!isValidEmail(clean(data.email))) {
    return 'Please provide a valid email address.';
  }

  for (const field of ['totalBudget', 'amountRaised', 'amountRequested']) {
    const amount = Number(data[field]);
    if (Number.isNaN(amount) || amount < 0) {
      return `${labels[field]} must be a valid number.`;
    }
  }

  for (const field of ['website', 'profileUrl', 'materialsLink']) {
    if (!isValidUrl(clean(data[field]))) {
      return `${labels[field]} must be a valid URL.`;
    }
  }

  return '';
}

function valueForEmail(data, field) {
  const value = data[field];
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Not provided';
  if (field === 'updatesOptIn') return value === 'on' || value === true ? 'Yes' : 'No';
  return clean(value) || 'Not provided';
}

function renderRows(data, fields) {
  return fields
    .map((field) => {
      const label = escapeHtml(labels[field] || field);
      const value = escapeHtml(valueForEmail(data, field));
      return `<tr><th>${label}</th><td>${value}</td></tr>`;
    })
    .join('');
}

function renderTextRows(data, fields) {
  return fields.map((field) => `${labels[field] || field}: ${valueForEmail(data, field)}`).join('\n');
}

function buildEmail(data) {
  const applicant = `${clean(data.firstName)} ${clean(data.lastName)}`.trim();
  const timestamp = new Date().toISOString();

  const htmlSections = sections
    .map(([title, fields]) => `<h2>${escapeHtml(title)}</h2><table>${renderRows(data, fields)}</table>`)
    .join('');

  const textSections = sections
    .map(([title, fields]) => `${title}\n${renderTextRows(data, fields)}`)
    .join('\n\n');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#151515;line-height:1.5">
      <h1>New IKIGAI Project Finance Submission</h1>
      <p><strong>Submitted:</strong> ${escapeHtml(timestamp)}</p>
      <p><strong>Applicant:</strong> ${escapeHtml(applicant)} &lt;${escapeHtml(clean(data.email))}&gt;</p>
      <p><strong>Project:</strong> ${escapeHtml(clean(data.projectTitle))}</p>
      <p><strong>Budget:</strong> ${escapeHtml(clean(data.budgetCurrency))} ${escapeHtml(clean(data.totalBudget))}</p>
      <p><strong>Requested:</strong> ${escapeHtml(clean(data.budgetCurrency))} ${escapeHtml(clean(data.amountRequested))}</p>
      <p><strong>Collateral:</strong> ${escapeHtml(valueForEmail(data, 'collateralAvailable'))}</p>
      <p><strong>Stage:</strong> ${escapeHtml(clean(data.currentStage))}</p>
      <p><strong>Closing date:</strong> ${escapeHtml(clean(data.requiredClosingDate))}</p>
      ${htmlSections}
      <style>
        h1 { font-size: 22px; margin: 0 0 18px; }
        h2 { margin: 28px 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: .08em; }
        table { width: 100%; border-collapse: collapse; }
        th, td { vertical-align: top; text-align: left; border-top: 1px solid #ddd; padding: 8px 10px 8px 0; }
        th { width: 260px; color: #555; font-weight: 600; }
      </style>
    </div>
  `;

  const text = [
    'New IKIGAI Project Finance Submission',
    `Submitted: ${timestamp}`,
    `Applicant: ${applicant} <${clean(data.email)}>`,
    `Project: ${clean(data.projectTitle)}`,
    `Budget: ${clean(data.budgetCurrency)} ${clean(data.totalBudget)}`,
    `Requested: ${clean(data.budgetCurrency)} ${clean(data.amountRequested)}`,
    `Collateral: ${valueForEmail(data, 'collateralAvailable')}`,
    `Stage: ${clean(data.currentStage)}`,
    `Closing date: ${clean(data.requiredClosingDate)}`,
    '',
    textSections,
  ].join('\n');

  return { html, text };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  const data = request.body && typeof request.body === 'object' ? request.body : {};
  const validationError = validate(data);

  if (validationError) {
    return sendJson(response, 400, { error: validationError });
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(response, 500, {
      error: 'Email service is not configured. Set RESEND_API_KEY and verify IKIGAI_SUBMISSIONS_FROM in Vercel.',
    });
  }

  const sanitized = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, clean(value)]));
  sanitized.collateralAvailable = clean(data.collateralAvailable);

  const { html, text } = buildEmail(sanitized);
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: fromAddress,
      to: recipients,
      replyTo: clean(sanitized.email),
      subject: `New IKIGAI Project Finance Submission: ${clean(sanitized.projectTitle)}`,
      html,
      text,
    });

    return sendJson(response, 200, { ok: true });
  } catch {
    return sendJson(response, 502, { error: 'Email delivery failed.' });
  }
}
