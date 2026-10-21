import type { ContractTemplate } from '@/types';

export const contractTemplates: ContractTemplate[] = [
  {
    id: 'lease',
    name: 'Lease Agreement',
    description: 'Residential rental contract',
    text: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is made on 15th day of March, 2025, between Mr. Ramesh Verma ("Lessor") and Ms. Anjali Sharma ("Lessee").

1. TERM: The lease shall be for a period of 11 months commencing from 1st April 2025.

2. RENT: The Lessee shall pay a monthly rent of Rs. 25,000 payable in advance before the 5th of each month. Delay in payment beyond 15 days shall attract a penalty of 2% per month.

3. SECURITY DEPOSIT: The Lessee has paid a refundable security deposit of Rs. 75,000. The Lessor may deduct any unpaid rent or damage charges from this deposit at the time of vacating.

4. The Lessor reserves the right to terminate this agreement at any time without assigning any reason whatsoever, and the Lessee shall vacate within 7 days of such notice.

5. The Lessee shall not sub-let the premises or make any structural alterations without prior written consent.

6. Any dispute arising out of this agreement shall be subject to the exclusive jurisdiction of the courts at Mumbai only.`,
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'Confidentiality contract',
    text: `MUTUAL NON-DISCLOSURE AGREEMENT

This NDA is entered into between TechNova Solutions Pvt. Ltd. ("Disclosing Party") and Mr. Arjun Kapoor ("Receiving Party").

1. CONFIDENTIAL INFORMATION: All technical data, source code, client lists, business strategies, and financial information shared during the engagement shall be treated as confidential.

2. OBLIGATIONS: The Receiving Party shall not disclose, copy, or use the confidential information for any purpose other than the agreed engagement, for a period of 5 years from the date of disclosure.

3. The Receiving Party shall be liable for damages of Rs. 10,00,000 for any breach of this agreement, and the Disclosing Party may also seek injunctive relief without prejudice to other remedies.

4. The Receiving Party shall return or destroy all confidential materials within 7 days of termination of the engagement.

5. All intellectual property developed during the engagement shall vest solely with the Disclosing Party.

6. This agreement shall be governed by the laws of India and subject to arbitration in Bengaluru under the Arbitration and Conciliation Act, 1996.`,
  },
  {
    id: 'employment',
    name: 'Employment Contract',
    description: 'Standard job offer terms',
    text: `EMPLOYMENT AGREEMENT

This Employment Agreement is made between BrightPath Technologies Pvt. Ltd. ("Employer") and Ms. Priya Nair ("Employee").

1. POSITION & TERM: The Employee is appointed as Senior Software Engineer for a period of 2 years, subject to a 3-month probation period.

2. COMPENSATION: The Employee shall receive a monthly salary of Rs. 80,000 along with an annual bonus at the discretion of the Employer.

3. WORKING HOURS: The Employee shall work 9 hours per day, 6 days a week, and may be required to work overtime without additional compensation.

4. NON-COMPETE: The Employee shall not, during the term of employment and for 2 years thereafter, work for any competitor or start a competing business anywhere in India.

5. TERMINATION: The Employer may terminate this agreement at any time without notice during the probation period, and with 1 month's notice or salary in lieu thereof after confirmation.

6. The Employee shall not be entitled to any gratuity or severance beyond the notice period specified herein.

7. All inventions and work product created by the Employee during employment shall be the sole property of the Employer.`,
  },
];
