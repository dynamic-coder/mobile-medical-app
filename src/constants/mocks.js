//{ transform: [{ scaleX: this.state.isRTL ? -1 : 1 }] } style rtl image
//style={{ direction: isRTL ? "rtl" : "ltr" }} style rtl view

const location = [
  {
    id: 0,
    name: 'Tunis',
    value: 'Tunis',
  },
  {
    id: 1,
    name: 'Bizert',
    value: 'Bizert',
  },
  {
    id: 2,
    name: 'Ariana',
    value: 'Ariana',
  },
  {
    id: 3,
    name: 'Manouba',
    value: 'Manouba',
  },
  {
    id: 4,
    name: 'Ben Arous',
    value: 'Ben Arous',
  },
  {
    id: 5,
    name: 'Kef',
    value: 'Kef',
  },
  {
    id: 6,
    name: 'Nabeul',
    value: 'Nabeul',
  },
  {
    id: 7,
    name: 'Jendouba',
    value: 'Jendouba',
  },
  {
    id: 8,
    name: 'Béja',
    value: 'Béja',
  },
  {
    id: 9,
    name: 'Siliana',
    value: 'Siliana',
  },
  {
    id: 10,
    name: 'Zaghouan',
    value: 'Zaghouan',
  },
  {
    id: 11,
    name: 'Sousse',
    value: 'Sousse',
  },
  {
    id: 12,
    name: 'Monastir',
    value: 'Monastir',
  },
  {
    id: 13,
    name: 'Mahdia',
    value: 'Mahdia',
  },
  {
    id: 14,
    name: 'Kairouan',
    value: 'Kairouan',
  },
  {
    id: 15,
    name: 'Kasserine',
    value: 'Kasserine',
  },
  {
    id: 16,
    name: 'Sidi Bouzid',
    value: 'Sidi Bouzid',
  },
  {
    id: 17,
    name: 'Sfax',
    value: 'Sfax',
  },
  {
    id: 18,
    name: 'Gafsa',
    value: 'Gafsa',
  },
  {
    id: 19,
    name: 'Tozeur',
    value: 'Tozeur',
  },
  {
    id: 20,
    name: 'Gabès',
    value: 'Gabès',
  },
  {
    id: 21,
    name: 'Kebili',
    value: 'Kebili',
  },
  {
    id: 22,
    name: 'Medenine',
    value: 'Medenine',
  },
  {
    id: 23,
    name: 'Tataouine',
    value: 'Tataouine',
  },
];
const location_ar = [
  {
    id: 0,
    name: 'تونس',
    value: 'Tunis',
  },
  {
    id: 1,
    name: 'بنزرت',
    value: 'Bizert',
  },
  {
    id: 2,
    name: 'أريانة',
    value: 'Ariana',
  },
  {
    id: 3,
    name: 'منوبة',
    value: 'Manouba',
  },
  {
    id: 4,
    name: 'بن عروس',
    value: 'Ben Arous',
  },
  {
    id: 5,
    name: 'كاف',
    value: 'Kef',
  },
  {
    id: 6,
    name: 'نابل',
    value: 'Nabeul',
  },
  {
    id: 7,
    name: 'جندوبة',
    value: 'Jendouba',
  },
  {
    id: 8,
    name: 'باجة',
    value: 'Béja',
  },
  {
    id: 9,
    name: 'سليانة',
    value: 'Siliana',
  },
  {
    id: 10,
    name: 'زغوان',
    value: 'Zaghouan',
  },
  {
    id: 11,
    name: 'سوسة',
    value: 'Sousse',
  },
  {
    id: 12,
    name: 'منستير',
    value: 'Monastir',
  },
  {
    id: 13,
    name: 'مهدية',
    value: 'Mahdia',
  },
  {
    id: 14,
    name: 'قيروان',
    value: 'Kairouan',
  },
  {
    id: 15,
    name: 'قصرين',
    value: 'Kasserine',
  },
  {
    id: 16,
    name: 'سيدي بوزيد',
    value: 'Sidi Bouzid',
  },
  {
    id: 17,
    name: 'صفاقس',
    value: 'Sfax',
  },
  {
    id: 18,
    name: 'قفصة',
    value: 'Gafsa',
  },
  {
    id: 19,
    name: 'توزر',
    value: 'Tozeur',
  },
  {
    id: 20,
    name: 'قابس',
    value: 'Gabès',
  },
  {
    id: 21,
    name: 'قبلي',
    value: 'Kebili',
  },
  {
    id: 22,
    name: 'مدنين',
    value: 'Medenine',
  },
  {
    id: 23,
    name: 'تطاوين',
    value: 'Tataouine',
  },
];

const specialite = [
  {
    id: 0,
    name: 'ANATOMIE-PATHOLOGIE',
    value: 'ANATOMIE-PATHOLOGIE',
  },
  {
    id: 1,
    name: 'ANESTHESIE-REANIMATION',
    value: 'ANESTHESIE-REANIMATION',
  },
  {
    id: 2,
    name: 'BIOLOGIE CLINIQUE',
    value: 'BIOLOGIE CLINIQUE',
  },
  {
    id: 3,
    name: 'CARCINOLOGIE MEDICALE',
    value: 'CARCINOLOGIE MEDICALE',
  },
  {
    id: 4,
    name: 'CARDIOLOGIE',
    value: 'CARDIOLOGIE',
  },
  {
    id: 5,
    name: 'CHI. CARDIOVASCULAIRE T',
    value: 'CHI. CARDIOVASCULAIRE T',
  },
  {
    id: 6,
    name: 'CHIRURGIE CARCINOLOGIE',
    value: 'CHIRURGIE CARCINOLOGIE',
  },
  {
    id: 7,
    name: 'CHIRURGIE GENERALE',
    value: 'CHIRURGIE GENERALE',
  },
  {
    id: 8,
    name: 'CHIRURGIE INFANTILE',
    value: 'CHIRURGIE INFANTILE',
  },
  {
    id: 9,
    name: 'CHIRURGIE MAXILLO-FACIALE',
    value: 'CHIRURGIE MAXILLO-FACIALE',
  },
  {
    id: 10,
    name: 'CHIRURGIE ORTHOPEDIQUE',
    value: 'CHIRURGIE ORTHOPEDIQUE',
  },
  {
    id: 11,
    name: 'CHIRURGIE PLASTIQUE',
    value: 'CHIRURGIE PLASTIQUE',
  },
  {
    id: 12,
    name: 'DERMATOLOGIE',
    value: 'DERMATOLOGIE',
  },
  {
    id: 13,
    name: 'ENDOCRINOLOGIE',
    value: 'ENDOCRINOLOGIE',
  },
  {
    id: 14,
    name: 'GASTROLOGIE',
    value: 'GASTROLOGIE',
  },
  {
    id: 15,
    name: 'GYNECOLOGIE-OBSTETRIQUE',
    value: 'GYNECOLOGIE-OBSTETRIQUE',
  },
  {
    id: 16,
    name: 'HEMATOLOGIE',
    value: 'HEMATOLOGIE',
  },
  {
    id: 17,
    name: 'HISTOLOGIE EMBRYOLOGIE',
    value: 'HISTOLOGIE EMBRYOLOGIE',
  },
  {
    id: 18,
    name: 'MALADIES INFECTIEUSES',
    value: 'MALADIES INFECTIEUSES',
  },
  {
    id: 19,
    name: 'MEDECINE INTERNE',
    value: 'MEDECINE INTERNE',
  },
  {
    id: 20,
    name: 'MEDECINE LEGALE',
    value: 'MEDECINE LEGALE',
  },
  {
    id: 21,
    name: 'MEDECINE NUCLEAIRE',
    value: 'MEDECINE NUCLEAIRE',
  },
  {
    id: 22,
    name: 'MEDECINE PHYSIQUE',
    value: 'MEDECINE PHYSIQUE',
  },
  {
    id: 23,
    name: 'NEPHROLOGIE',
    value: 'NEPHROLOGIE',
  },
  {
    id: 24,
    name: 'NEURO-CHIRURGIE',
    value: 'NEURO-CHIRURGIE',
  },
  {
    id: 25,
    name: 'NEUROLOGIE',
    value: 'NEUROLOGIE',
  },
  {
    id: 26,
    name: 'NON CLASSE',
    value: 'NON CLASSE',
  },
  {
    id: 27,
    name: 'NUTRITION',
    value: 'NUTRITION',
  },
  {
    id: 28,
    name: 'O R L',
    value: 'O R L',
  },
  {
    id: 29,
    name: 'OPHTALMOLOGIE',
    value: 'OPHTALMOLOGIE',
  },
  {
    id: 30,
    name: 'PARASITOLOGIE',
    value: 'PARASITOLOGIE',
  },
  {
    id: 31,
    name: 'PEDIATRIE',
    value: 'PEDIATRIE',
  },
  {
    id: 32,
    name: 'PNEUMOLOGIE',
    value: 'PNEUMOLOGIE',
  },
  {
    id: 33,
    name: 'PSYCHIATRIE',
    value: 'PSYCHIATRIE',
  },
  {
    id: 34,
    name: 'RADIOLOGIE',
    value: 'RADIOLOGIE',
  },
  {
    id: 35,
    name: 'RADIOTHERAPIE',
    value: 'RADIOTHERAPIE',
  },
  {
    id: 36,
    name: 'RHUMATOLOGIE',
    value: 'RHUMATOLOGIE',
  },
  {
    id: 37,
    name: 'STOMATOLOGIE',
    value: 'STOMATOLOGIE',
  },
  {
    id: 38,
    name: 'UROLOGIE',
    value: 'UROLOGIE',
  },
];
const specialite_ar = [
  {
    id: 0,
    name: 'التشريح- علم الأمراض',
    value: 'ANATOMIE-PATHOLOGIE',
  },
  {
    id: 1,
    name: 'التخدير- الإنعاش',
    value: 'ANESTHESIE-REANIMATION',
  },
  {
    id: 2,
    name: 'البيولوجيا السريرية',
    value: 'BIOLOGIE CLINIQUE',
  },
  {
    id: 3,
    name: 'طب الأسنان',
    value: 'CARCINOLOGIE MEDICALE',
  },
  {
    id: 4,
    name: 'طب القلب',
    value: 'CARDIOLOGIE',
  },
  {
    id: 5,
    name: 'جراحة القلب والشرايين',
    value: 'CHI. CARDIOVASCULAIRE T',
  },
  {
    id: 6,
    name: 'جراحة التجميل',
    value: 'CHIRURGIE CARCINOLOGIE',
  },
  {
    id: 7,
    name: 'الجراحة العامة',
    value: 'CHIRURGIE GENERALE',
  },
  {
    id: 8,
    name: 'جراحة الأطفال',
    value: 'CHIRURGIE INFANTILE',
  },
  {
    id: 9,
    name: 'جراحة الوجه والفكين',
    value: 'CHIRURGIE MAXILLO-FACIALE',
  },
  {
    id: 10,
    name: 'جراحة العظام',
    value: 'CHIRURGIE ORTHOPEDIQUE',
  },
  {
    id: 11,
    name: 'الجراحة البلاستيكية',
    value: 'CHIRURGIE PLASTIQUE',
  },
  {
    id: 12,
    name: 'الأمراض الجلدية',
    value: 'DERMATOLOGIE',
  },
  {
    id: 13,
    name: 'علم الغدد',
    value: 'ENDOCRINOLOGIE',
  },
  {
    id: 14,
    name: 'الجهاز الهضمي',
    value: 'GASTROLOGIE',
  },
  {
    id: 15,
    name: 'طب نسائي توليدي',
    value: 'GYNECOLOGIE-OBSTETRIQUE',
  },
  {
    id: 16,
    name: 'مبحث الدم',
    value: 'HEMATOLOGIE',
  },
  {
    id: 17,
    name: 'علم الهيستولوجيا (الأنسجة)',
    value: 'HISTOLOGIE EMBRYOLOGIE',
  },
  {
    id: 18,
    name: 'أمراض معدية',
    value: 'MALADIES INFECTIEUSES',
  },
  {
    id: 19,
    name: 'الطب الداخلي',
    value: 'MEDECINE INTERNE',
  },
  {
    id: 20,
    name: 'الطب القانوني',
    value: 'MEDECINE LEGALE',
  },
  {
    id: 21,
    name: 'الطب النووي',
    value: 'MEDECINE NUCLEAIRE',
  },
  {
    id: 22,
    name: 'الطب الفيزيائي',
    value: 'MEDECINE PHYSIQUE',
  },
  {
    id: 23,
    name: 'طب الكلي',
    value: 'NEPHROLOGIE',
  },
  {
    id: 24,
    name: 'جراحة المخ والأعصاب',
    value: 'NEURO-CHIRURGIE',
  },
  {
    id: 25,
    name: 'علم الأعصاب',
    value: 'NEUROLOGIE',
  },
  {
    id: 26,
    name: 'غير مصنف',
    value: 'NON CLASSE',
  },
  {
    id: 27,
    name: 'طب تغذية',
    value: 'NUTRITION',
  },
  {
    id: 28,
    name: 'أمراض الأنف والأذن والحنجرة',
    value: 'O R L',
  },
  {
    id: 29,
    name: 'طب العيون',
    value: 'OPHTALMOLOGIE',
  },
  {
    id: 30,
    name: 'علم الطفيليات',
    value: 'PARASITOLOGIE',
  },
  {
    id: 31,
    name: 'طب الأطفال',
    value: 'PEDIATRIE',
  },
  {
    id: 32,
    name: 'أمراض الرئة',
    value: 'PNEUMOLOGIE',
  },
  {
    id: 33,
    name: 'طب النفس',
    value: 'PSYCHIATRIE',
  },
  {
    id: 34,
    name: 'طب إشعاعي',
    value: 'RADIOLOGIE',
  },
  {
    id: 35,
    name: 'العلاج الإشعاعي',
    value: 'RADIOTHERAPIE',
  },
  {
    id: 36,
    name: 'الروماتيزم',
    value: 'RHUMATOLOGIE',
  },
  {
    id: 37,
    name: 'أمراض المعدة',
    value: 'STOMATOLOGIE',
  },
  {
    id: 38,
    name: 'جراحة المسالك البولية',
    value: 'UROLOGIE',
  },
];

const specialite_en = [
  {
    id: 0,
    name: 'ANATOMY-PATHOLOGY',
    value: 'ANATOMIE-PATHOLOGIE',
  },
  {
    id: 1,
    name: 'ANESTHESIA- RESUSCITATION',
    value: 'ANESTHESIE-REANIMATION',
  },
  {
    id: 2,
    name: 'CLINICAL BIOLOGY',
    value: 'BIOLOGIE CLINIQUE',
  },
  {
    id: 3,
    name: 'MEDICAL CARCINOLOGY',
    value: 'CARCINOLOGIE MEDICALE',
  },
  {
    id: 4,
    name: 'CARDIOLOGY',
    value: 'CARDIOLOGIE',
  },
  {
    id: 5,
    name: 'CHI. CARDIOVASCULAR T',
    value: 'CHI. CARDIOVASCULAIRE T',
  },
  {
    id: 6,
    name: 'CARCINOLOGY SURGERY',
    value: 'CHIRURGIE CARCINOLOGIE',
  },
  {
    id: 7,
    name: 'GENERAL SURGERY',
    value: 'CHIRURGIE GENERALE',
  },
  {
    id: 8,
    name: 'CHILD SURGERY',
    value: 'CHIRURGIE INFANTILE',
  },
  {
    id: 9,
    name: 'MAXILLO-FACIAL SURGERY',
    value: 'CHIRURGIE MAXILLO-FACIALE',
  },
  {
    id: 10,
    name: 'ORTHOPEDIC SURGERY',
    value: 'CHIRURGIE ORTHOPEDIQUE',
  },
  {
    id: 11,
    name: 'PLASTIC SURGERY',
    value: 'CHIRURGIE PLASTIQUE',
  },
  {
    id: 12,
    name: 'DERMATOLOGY',
    value: 'DERMATOLOGIE',
  },
  {
    id: 13,
    name: 'ENDOCRINOLOGY',
    value: 'ENDOCRINOLOGIE',
  },
  {
    id: 14,
    name: 'GASTROLOGY',
    value: 'GASTROLOGIE',
  },
  {
    id: 15,
    name: 'OBSTETRIC GYNECOLOGY',
    value: 'GYNECOLOGIE-OBSTETRIQUE',
  },
  {
    id: 16,
    name: 'HEMATOLOGY',
    value: 'HEMATOLOGIE',
  },
  {
    id: 17,
    name: 'HISTOLOGY EMBRYOLOGY',
    value: 'HISTOLOGIE EMBRYOLOGIE',
  },
  {
    id: 18,
    name: 'INFECTIOUS DISEASES',
    value: 'MALADIES INFECTIEUSES',
  },
  {
    id: 19,
    name: 'INTERNAL MEDICINE',
    value: 'MEDECINE INTERNE',
  },
  {
    id: 20,
    name: 'FORENSIC MEDECINE',
    value: 'MEDECINE LEGALE',
  },
  {
    id: 21,
    name: 'NUCLEAR MEDICINE',
    value: 'MEDECINE NUCLEAIRE',
  },
  {
    id: 22,
    name: 'PHYSICAL MEDICINE',
    value: 'MEDECINE PHYSIQUE',
  },
  {
    id: 23,
    name: 'NEPHROLOGY',
    value: 'NEPHROLOGIE',
  },
  {
    id: 24,
    name: 'NEURO-SURGERY',
    value: 'NEURO-CHIRURGIE',
  },
  {
    id: 25,
    name: 'NEUROLOGY',
    value: 'NEUROLOGIE',
  },
  {
    id: 26,
    name: 'UNCLASSIFIED',
    value: 'NON CLASSE',
  },
  {
    id: 27,
    name: 'NUTRITION',
    value: 'NUTRITION',
  },
  {
    id: 28,
    name: 'O R L',
    value: 'O R L',
  },
  {
    id: 29,
    name: 'OPHTHALMOLOGY',
    value: 'OPHTALMOLOGIE',
  },
  {
    id: 30,
    name: 'PARASITOLOGY',
    value: 'PARASITOLOGIE',
  },
  {
    id: 31,
    name: 'PEDIATRICS',
    value: 'PEDIATRIE',
  },
  {
    id: 32,
    name: 'PULMONOLOGY',
    value: 'PNEUMOLOGIE',
  },
  {
    id: 33,
    name: 'PSYCHIATRY',
    value: 'PSYCHIATRIE',
  },
  {
    id: 34,
    name: 'RADIOLOGY',
    value: 'RADIOLOGIE',
  },
  {
    id: 35,
    name: 'RADIOTHERAPY',
    value: 'RADIOTHERAPIE',
  },
  {
    id: 36,
    name: 'RHEUMATOLOGY',
    value: 'RHUMATOLOGIE',
  },
  {
    id: 37,
    name: 'STOMATOLOGY',
    value: 'STOMATOLOGIE',
  },
  {
    id: 38,
    name: 'UROLOGY',
    value: 'UROLOGIE',
  },
];

const slider = [
  {
    id: 0,
    source: require('../../assets/images/illustration_1.png'),
    value: 'slide1',
    title_fr: 'text de slide n°1 ici',
    title_en: 'text of slide n°1 here',
    title_ar:
      'البحث السريع على الأطباء والمستشفيات والمختبرات وتحديد المواعيد عبر الإنترنت.',
  },
  {
    id: 1,
    source: require('../../assets/images/illustration_2.png'),
    value: 'slide2',
    title_fr: 'text de slide n°2 ici',
    title_en: 'text of slide n°2 here',
    title_ar: 'يمكنك التواصل مباشرة مع المرضى واستئناف أسئلتهم متى أردت.',
  },
  {
    id: 2,
    source: require('../../assets/images/illustration_3.png'),
    value: 'slide3',
    title_fr: 'text de slide n°3 ici',
    title_en: 'text de slide n°3 here',
    title_ar:
      'الهدف النهائي هو تحسين الوصول إلى الخدمات الصحية من خلال تزويدك بأدوات بسيطة.',
  },
];

export {
  // categories,

  location,
  location_ar,
  specialite,
  specialite_en,
  specialite_ar,
  slider,
};
