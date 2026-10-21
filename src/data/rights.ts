import type { RightEntry, LandmarkCase } from '@/types';

export const rights: RightEntry[] = [
  {
    id: 'art-14',
    article: 'Article 14',
    title: 'Right to Equality',
    category: 'Fundamental Rights',
    plainEnglish:
      'The government must treat everyone equally. No one can be denied equality before the law or equal protection of the laws.',
    whenToInvoke:
      'When you face discrimination by a public authority or are treated unfairly compared to others in a similar situation.',
  },
  {
    id: 'art-15',
    article: 'Article 15',
    title: 'Prohibition of Discrimination',
    category: 'Fundamental Rights',
    plainEnglish:
      'The State cannot discriminate against anyone on grounds of religion, race, caste, sex, or place of birth.',
    whenToInvoke:
      'When refused access to shops, restaurants, wells, roads, or public places on discriminatory grounds.',
  },
  {
    id: 'art-19',
    article: 'Article 19',
    title: 'Freedom of Speech & Expression',
    category: 'Fundamental Rights',
    plainEnglish:
      'You can speak, write, assemble peacefully, form associations, move freely, and settle anywhere in India — with reasonable restrictions.',
    whenToInvoke:
      'When your peaceful expression, movement, or assembly is unlawfully restricted by authorities.',
  },
  {
    id: 'art-21',
    article: 'Article 21',
    title: 'Right to Life & Personal Liberty',
    category: 'Fundamental Rights',
    plainEnglish:
      'No one can be deprived of life or personal liberty except by a fair and just legal procedure. This includes the right to privacy, dignity, and a clean environment.',
    whenToInvoke:
      'When your life, liberty, privacy, or dignity is threatened by State action without lawful procedure.',
  },
  {
    id: 'art-21a',
    article: 'Article 21A',
    title: 'Right to Education',
    category: 'Fundamental Rights',
    plainEnglish:
      'Every child aged 6 to 14 has the right to free and compulsory education in a neighbourhood school.',
    whenToInvoke:
      'When a child in this age group is denied admission to school or charged fees for basic education.',
  },
  {
    id: 'art-22',
    article: 'Article 22',
    title: 'Protection Against Arrest & Detention',
    category: 'Fundamental Rights',
    plainEnglish:
      'If arrested, you must be told the reason, allowed a lawyer of your choice, and produced before a magistrate within 24 hours.',
    whenToInvoke:
      'When arrested and not informed of grounds, denied legal counsel, or not produced before a magistrate within 24 hours.',
  },
  {
    id: 'art-25',
    article: 'Article 25',
    title: 'Freedom of Religion',
    category: 'Fundamental Rights',
    plainEnglish:
      'You are free to practise, profess, and propagate any religion, subject to public order, morality, and health.',
    whenToInvoke:
      'When your religious practice is unlawfully restricted by the State.',
  },
  {
    id: 'art-32',
    article: 'Article 32',
    title: 'Right to Constitutional Remedies',
    category: 'Writs & Remedies',
    plainEnglish:
      'If your fundamental rights are violated, you can go directly to the Supreme Court to enforce them. Dr. Ambedkar called this the "heart and soul" of the Constitution.',
    whenToInvoke:
      'When a fundamental right is violated and you seek an immediate remedy from the Supreme Court.',
  },
  {
    id: 'art-226',
    article: 'Article 226',
    title: 'Writ Jurisdiction of High Courts',
    category: 'Writs & Remedies',
    plainEnglish:
      'High Courts can issue writs (Habeas Corpus, Mandamus, Certiorari, Quo Warranto, Prohibition) not just for fundamental rights but for any legal right.',
    whenToInvoke:
      'When any legal right (not just a fundamental right) is violated and you want the High Court to intervene.',
  },
  {
    id: 'art-51a',
    article: 'Article 51A',
    title: 'Fundamental Duties',
    category: 'Fundamental Duties',
    plainEnglish:
      'Every citizen has duties — respect the Constitution and National Flag, protect the environment, promote harmony, and preserve our rich heritage.',
    whenToInvoke:
      'When considering your civic responsibilities alongside your rights.',
  },
  {
    id: 'bnss-arrest',
    article: 'BNSS § 35',
    title: 'Arrest Procedure (New BNSS)',
    category: 'Arrest & Bail',
    plainEnglish:
      'Under the new Bharatiya Nagarik Suraksha Sanhita, 2023, police must follow a clear arrest procedure, inform a relative, and record reasons for arrest.',
    whenToInvoke:
      'When you or someone you know is arrested and you want to verify whether police followed the correct procedure.',
  },
  {
    id: 'bnss-bail',
    article: 'BNSS § 480',
    title: 'Bail Provisions',
    category: 'Arrest & Bail',
    plainEnglish:
      'Bail is a legal release from custody on an undertaking to appear in court. Bailable offences grant bail as a right; non-bailable offences require court discretion.',
    whenToInvoke:
      'When seeking release from custody — file a bail application before the competent magistrate or sessions court.',
  },
  {
    id: 'crpc-anticipatory',
    article: 'BNSS § 482',
    title: 'Anticipatory Bail',
    category: 'Arrest & Bail',
    plainEnglish:
      'If you fear arrest on a false accusation, you can apply for anticipatory bail so that if arrested, you are released on bail.',
    whenToInvoke:
      'When you anticipate arrest and want pre-arrest protection from the Sessions Court or High Court.',
  },
];

export const landmarkCases: LandmarkCase[] = [
  {
    id: 'kesavananda',
    name: 'Kesavananda Bharati v. State of Kerala',
    year: '1973',
    summary:
      'The Supreme Court ruled that Parliament cannot alter the "basic structure" of the Constitution. This protects features like democracy, secularism, and judicial review from being amended away.',
    topic: 'Basic Structure Doctrine',
  },
  {
    id: 'puttaswamy',
    name: 'K.S. Puttaswamy v. Union of India',
    year: '2017',
    summary:
      'The Court declared that the Right to Privacy is a fundamental right under Article 21. Your personal data, choices, and dignity are constitutionally protected.',
    topic: 'Right to Privacy',
  },
  {
    id: 'dkbasu',
    name: 'D.K. Basu v. State of West Bengal',
    year: '1997',
    summary:
      'The Court laid down strict guidelines police must follow during arrest — including wearing visible name tags, recording arrest details, and informing a family member.',
    topic: 'Arrest & Custodial Rights',
  },
];
