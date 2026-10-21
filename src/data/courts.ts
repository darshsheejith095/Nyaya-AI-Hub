import type { CourtNode } from '@/types';

export const courtHierarchy: CourtNode[] = [
  {
    id: 'supreme-court',
    name: 'Supreme Court of India',
    level: 1,
    jurisdiction: ['Original', 'Appellate', 'Advisory'],
    caseTypes: [
      'Constitutional disputes',
      'Appeals from High Courts',
      'Presidential references',
      'Public Interest Litigations',
    ],
    description:
      'The apex court of India. It has the power to interpret the Constitution and its decisions are binding on all courts across the country.',
    appealFlow: [
      { step: 1, title: 'File Special Leave Petition', detail: 'Approach the Supreme Court under Article 136 for leave to appeal.' },
      { step: 2, title: 'Issue of Notice', detail: 'The Court issues notice to the opposite party to respond.' },
      { step: 3, title: 'Hearing & Arguments', detail: 'Both sides present oral and written arguments.' },
      { step: 4, title: 'Judgment', detail: 'The Court delivers a binding judgment, final for all of India.' },
    ],
    children: [
      {
        id: 'high-court',
        name: 'High Courts',
        level: 2,
        jurisdiction: ['Original', 'Appellate', 'Writ'],
        caseTypes: [
          'Appeals from District Courts',
          'Writ petitions (Article 226)',
          'Company & constitutional matters',
        ],
        description:
          'Each state (or group of states) has a High Court. It hears appeals from lower courts and can issue writs for fundamental and legal rights.',
        appealFlow: [
          { step: 1, title: 'File First Appeal', detail: 'Appeal from a District Court decree under relevant procedural code.' },
          { step: 2, title: 'Admission Hearing', detail: 'The Court decides whether the appeal has merit to be heard.' },
          { step: 3, title: 'Final Hearing', detail: 'Arguments on facts and law, followed by judgment.' },
          { step: 4, title: 'Further Appeal', detail: 'May approach the Supreme Court via SLP if grounds exist.' },
        ],
        children: [
          {
            id: 'district-court',
            name: 'District & Sessions Courts',
            level: 3,
            jurisdiction: ['Original', 'Appellate'],
            caseTypes: [
              'Civil suits above ₹1 lakh',
              'Sessions trials (serious crimes)',
              'Appeals from subordinate courts',
            ],
            description:
              'The principal courts at the district level. The District Judge handles civil matters; the Sessions Judge handles serious criminal cases.',
            appealFlow: [
              { step: 1, title: 'File Plaint / Appeal', detail: 'Submit a plaint or an appeal memo with court fees.' },
              { step: 2, title: 'Notice to Opposite Party', detail: 'Court issues summons to the respondent.' },
              { step: 3, title: 'Evidence & Arguments', detail: 'Witnesses examined, evidence recorded, arguments heard.' },
              { step: 4, title: 'Decree / Judgment', detail: 'Court passes order; aggrieved party may appeal to High Court.' },
            ],
            children: [
              {
                id: 'subordinate-court',
                name: 'Subordinate Courts',
                level: 4,
                jurisdiction: ['Original'],
                caseTypes: [
                  'Small civil suits',
                  'Summons cases (minor offences)',
                  'Family & rent matters',
                ],
                description:
                  'Courts below the district level — Civil Judge (Junior/Senior) and Judicial Magistrate First/Second Class. They handle smaller and first-instance matters.',
                appealFlow: [
                  { step: 1, title: 'File Complaint / Suit', detail: 'Approach the appropriate magistrate or civil judge.' },
                  { step: 2, title: 'Summons Issued', detail: 'Court issues summons to the other party.' },
                  { step: 3, title: 'Trial', detail: 'Plea, evidence, and examination of witnesses.' },
                  { step: 4, title: 'Order', detail: 'Court passes order; appeal lies to the District Court.' },
                ],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
