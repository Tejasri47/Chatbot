import { QuestionItem, JobRole, InterviewType, DifficultyLevel } from '../types';

export const questionBank: QuestionItem[] = [
  // ==================== SOFTWARE DEVELOPER ====================
  {
    id: 'sd-intro-1',
    role: 'Software Developer',
    type: 'HR',
    difficulty: 'Beginner',
    question: {
      en: 'Tell me about yourself, your educational background, and why you are interested in software engineering.',
      te: 'మీ గురించి, మీ విద్యా నేపథ్యం మరియు సాఫ్ట్‌వేర్ ఇంజనీరింగ్‌పై మీకున్న ఆసక్తి గురించి వివరించండి.',
      hi: 'अपने बारे में बताएं, अपनी शैक्षिक पृष्ठभूमि और सॉफ्टवेयर इंजीनियरिंग में आपकी रुचि के बारे में साझा करें।',
    },
    sampleAnswer: {
      en: 'I am a computer science graduate passionate about building robust applications, with experience in modern languages and hands-on projects.',
      te: 'నేను కంప్యూటర్ సైన్స్ గ్రాడ్యుయేట్‌ని. ఆధునిక ప్రోగ్రామింగ్ భాషలు మరియు ప్రాజెక్ట్‌లతో బలమైన అప్లికేషన్లను నిర్మించడంలో నాకు ఆసక్తి ఉంది.',
      hi: 'मैं कंप्यूटर साइंस ग्रेजुएट हूँ, जिसे मजबूत सॉफ्टवेयर एप्लिकेशन बनाने और नई तकनीकों पर काम करने का गहरा जुनून है।',
    },
    keywords: ['experience', 'education', 'passion', 'projects', 'technologies'],
  },
  {
    id: 'sd-oop-2',
    role: 'Software Developer',
    type: 'Technical',
    difficulty: 'Beginner',
    question: {
      en: 'Explain object-oriented programming and its four core pillars with brief examples.',
      te: 'ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) మరియు దాని నాలుగు ప్రధాన స్తంభాలను (Encapsulation, Abstraction, Inheritance, Polymorphism) సంక్షిప్తంగా వివరించండి.',
      hi: 'ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP) और इसके चार मुख्य स्तंभों (Encapsulation, Abstraction, Inheritance, Polymorphism) को संक्षेप में समझाइए।',
    },
    sampleAnswer: {
      en: 'OOP organizes code around objects. The four pillars are Encapsulation (data hiding), Abstraction (hiding implementation details), Inheritance (code reuse), and Polymorphism (multiple forms of a method).',
      te: 'OOP కోడ్‌ను ఆబ్జెక్ట్‌ల ఆధారంగా నిర్వహిస్తుంది. నాలుగు స్తంభాలు: ఎన్‌క్యాప్సులేషన్, అబ్‌స్ట్రాక్షన్, ఇన్హెరిటెన్స్ మరియు పాలిమార్ఫిజం.',
      hi: 'OOP ऑब्जेक्ट्स के इर्द-गिर्द कोड व्यवस्थित करता है। चार मुख्य स्तंभ हैं: एनकैप्सुलेशन, एब्स्ट्रैक्शन, इनहेरिटेंस और पॉलीमॉर्फिज्म।',
    },
    keywords: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism', 'objects', 'classes'],
  },
  {
    id: 'sd-rest-3',
    role: 'Software Developer',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'What is a REST API? Explain standard HTTP methods and what makes an API stateless.',
      te: 'REST API అంటే ఏమిటి? ప్రామాణిక HTTP పద్ధతులు (GET, POST, PUT, DELETE) మరియు API స్టేట్‌లెస్ (Stateless) గా ఎలా పనిచేస్తుందో వివరించండి.',
      hi: 'REST API क्या है? मानक HTTP विधियों (GET, POST, PUT, DELETE) और स्टेटलेसनेस के सिद्धांत को समझाइए।',
    },
    sampleAnswer: {
      en: 'REST is an architectural style based on HTTP resources. It is stateless because every request contains all context needed for the server to process it without relying on stored server session.',
      te: 'REST అనేది HTTP వనరులపై ఆధారపడిన ఆర్కిటెక్చర్. ప్రతి అభ్యర్థన (request) అవసరమైన అన్ని వివరాలను కలిగి ఉంటుంది కాబట్టి ఇది స్టేట్‌లెస్.',
      hi: 'REST एक आर्किटेक्चरल स्टाइल है जो HTTP पर काम करता है। यह स्टेटलेस है क्योंकि हर रिक्वेस्ट में सर्वर के लिए पूरी जानकारी शामिल होती है।',
    },
    keywords: ['http', 'get', 'post', 'put', 'delete', 'stateless', 'resources', 'json'],
  },
  {
    id: 'sd-dsa-4',
    role: 'Software Developer',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'Explain the difference between an array and a linked list in terms of memory layout and time complexity for insertion and search.',
      te: 'మెమరీ కేటాయింపు మరియు ఇన్సర్షన్, సెర్చ్ టైమ్ కాంప్లెక్సిటీ పరంగా అర్రే (Array) మరియు లింక్డ్ లిస్ట్ (Linked List) మధ్య తేడాలను వివరించండి.',
      hi: 'मेमोरी लेआउट तथा सम्मिलन और खोज की टाइम कॉम्प्लेक्सिटी के संदर्भ में एरे (Array) और लिंक्ड लिस्ट (Linked List) के बीच अंतर स्पष्ट कीजिए।',
    },
    sampleAnswer: {
      en: 'Arrays store elements contiguously allowing O(1) random access, but insertions take O(n). Linked lists use nodes with pointers, offering O(1) insertion at the head but O(n) traversal search.',
      te: 'అర్రేలు వరుస మెమరీని ఉపయోగించి O(1) యాక్సెస్ ఇస్తాయి. లింక్డ్ లిస్ట్‌లు పాయింటర్ల ద్వారా అనుసంధానించబడి O(1) ఇన్సర్షన్ మరియు O(n) సెర్చ్ కలిగి ఉంటాయి.',
      hi: 'एरे सन्निहित मेमोरी का उपयोग करते हैं और O(1) एक्सेस देते हैं। लिंक्ड लिस्ट नोड्स और पॉइंटर्स का उपयोग करती हैं, जहां इंसर्शन O(1) और सर्च O(n) होती है।',
    },
    keywords: ['array', 'linked list', 'contiguous', 'pointers', 'complexity', 'o(1)', 'o(n)'],
  },
  {
    id: 'sd-proj-5',
    role: 'Software Developer',
    type: 'Behavioral',
    difficulty: 'Intermediate',
    question: {
      en: 'Describe a significant software project you developed. What technical challenges did you face and how did you resolve them?',
      te: 'మీరు అభివృద్ధి చేసిన ఒక ముఖ్యమైన సాఫ్ట్‌వేర్ ప్రాజెక్ట్ గురించి వివరించండి. మీరు ఎదుర్కొన్న సాంకేతిక సవాళ్లు ఏమిటి మరియు వాటిని ఎలా పరిష్కరించారు?',
      hi: 'अपने द्वारा विकसित किसी महत्वपूर्ण सॉफ्टवेयर प्रोजेक्ट का वर्णन करें। आपने किन तकनीकी चुनौतियों का सामना किया और उन्हें कैसे हल किया?',
    },
    sampleAnswer: {
      en: 'I developed a full-stack web application. A major challenge was query performance under load, which I solved by indexing MongoDB collections and implementing Redis caching.',
      te: 'నేను ఒక ఫుల్‌స్టాక్ వెబ్ అప్లికేషన్ తయారు చేసాను. పెర్ఫార్మెన్స్ సమస్యలను డేటాబేస్ ఇండెక్సింగ్ మరియు కాషింగ్ ద్వారా పరిష్కరించాను.',
      hi: 'मैंने एक फुल-स्टैक वेब एप्लिकेशन बनाया। मुख्य चुनौती डेटाबेस ऑप्टिमाइजेशन की थी, जिसे मैंने इंडेक्सिंग और कैशिंग लागू करके हल किया।',
    },
    keywords: ['project', 'architecture', 'challenge', 'solution', 'testing', 'deployment'],
  },

  // ==================== DATA ANALYST ====================
  {
    id: 'da-clean-1',
    role: 'Data Analyst',
    type: 'Technical',
    difficulty: 'Beginner',
    question: {
      en: 'What is data cleaning, and why is it essential before performing exploratory data analysis or building models?',
      te: 'డేటా క్లీనింగ్ (Data Cleaning) అంటే ఏమిటి? విశ్లేషణ లేదా మోడల్స్ నిర్మించే ముందు ఇది ఎందుకు ఎంతో అవసరం?',
      hi: 'डेटा क्लीनिंग क्या है, और विश्लेषणात्मक डेटा अध्ययन या मॉडल बनाने से पहले यह क्यों महत्वपूर्ण है?',
    },
    sampleAnswer: {
      en: 'Data cleaning is identifying and correcting errors, missing values, duplicates, and inconsistent formats so that downstream analysis is accurate and reliable.',
      te: 'డేటా క్లీనింగ్ అనేది తప్పులు, ఖాళీ విలువలు, డూప్లికేట్‌లను తొలగించి డేటాను కచ్చితంగా మార్చే ప్రక్రియ.',
      hi: 'डेटा क्लीनिंग डेटा में मौजूद अशुद्धियों, डुप्लिकेट्स और रिक्त मानों को ठीक करने की प्रक्रिया है ताकि विश्लेषण सटीक हो।',
    },
    keywords: ['duplicates', 'missing values', 'outliers', 'normalization', 'accuracy', 'imputation'],
  },
  {
    id: 'da-sql-2',
    role: 'Data Analyst',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'Explain the difference between an INNER JOIN and a LEFT JOIN in SQL with a practical scenario.',
      te: 'SQL లో ఇన్నర్ జాయిన్ (INNER JOIN) మరియు లెఫ్ట్ జాయిన్ (LEFT JOIN) మధ్య వ్యత్యాసాన్ని ఒక ఉదాహరణతో వివరించండి.',
      hi: 'SQL में INNER JOIN और LEFT JOIN के बीच क्या अंतर है? एक व्यावहारिक उदाहरण देकर समझाइए।',
    },
    sampleAnswer: {
      en: 'INNER JOIN returns only rows that have matching keys in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right table, with NULLs for unmatched rows.',
      te: 'ఇన్నర్ జాయిన్ రెండు టేబుళ్లలో మ్యాచ్ అయిన రికార్డులను మాత్రమే ఇస్తుంది. లెఫ్ట్ జాయిన్ ఎడమ టేబుల్‌లోని అన్ని రికార్డులను చూపిస్తుంది.',
      hi: 'INNER JOIN केवल उन रिकॉर्ड्स को लौटाता है जो दोनों तालिकाओं में मेल खाते हैं। LEFT JOIN बाईं तालिका के सभी रिकॉर्ड्स लौटाता है।',
    },
    keywords: ['sql', 'inner join', 'left join', 'null', 'tables', 'keys'],
  },
  {
    id: 'da-missing-3',
    role: 'Data Analyst',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'How would you handle missing data in a numerical dataset versus a categorical dataset?',
      te: 'ఒక సంఖ్యాపరమైన (Numerical) డేటాసెట్‌లో మరియు వర్గీకరణ (Categorical) డేటాసెట్‌లో తప్పిపోయిన డేటా (Missing Data) ను మీరు ఎలా పరిష్కరిస్తారు?',
      hi: 'किसी संख्यात्मक (Numerical) डेटासेट और श्रेणीबद्ध (Categorical) डेटासेट में गायब डेटा (Missing Data) को आप कैसे संभालेंगे?',
    },
    sampleAnswer: {
      en: 'For numerical data, I impute using mean/median or advanced regression if MCAR. For categorical data, I use mode imputation, add a "Missing" category, or predictive classification.',
      te: 'సంఖ్యా డేటా కోసం మీన్ లేదా మీడియన్ ఉపయోగిస్తాను. వర్గీకరణ డేటా కోసం మోడ్ లేదా ప్రత్యేక కేటగిరీని కేటాయిస్తాను.',
      hi: 'संख्यात्मक डेटा के लिए मीन या मीडियन का उपयोग किया जाता है। श्रेणीबद्ध डेटा के लिए मोड या अलग श्रेणी बनाई जाती है।',
    },
    keywords: ['imputation', 'mean', 'median', 'mode', 'drop', 'forward fill', 'categorical'],
  },
  {
    id: 'da-corr-4',
    role: 'Data Analyst',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'What is the fundamental difference between correlation and causation? Give an example of a spurious correlation.',
      te: 'సహసంబంధం (Correlation) మరియు కారణం (Causation) మధ్య ప్రాథమిక వ్యత్యాసం ఏమిటి? ఒక ఉదాహరణ ఇవ్వండి.',
      hi: 'सहसंबंध (Correlation) और कारण संबंध (Causation) में क्या अंतर है? एक उदाहरण देकर समझाइए।',
    },
    sampleAnswer: {
      en: 'Correlation shows that two variables change together, while causation proves that one variable directly produces change in the other. For example, ice cream sales and sunburns correlate due to hot weather (confounding variable).',
      te: 'రెండు వేరియబుల్స్ కలిసి మారితే అది కొరిలేషన్. ఒకటి మరొకదానికి కారణమైతే అది కాజేషన్. ఉదాహరణకు ఎండ తీవ్రత వల్ల ఐస్ క్రీమ్ అమ్మకాలు పెరగడం.',
      hi: 'सहसंबंध यह दर्शाता है कि दो चर एक साथ बदलते हैं, जबकि कार्य-कारण साबित करता है कि एक के कारण दूसरा बदला है।',
    },
    keywords: ['correlation', 'causation', 'confounding variable', 'relationship', 'cause and effect'],
  },
  {
    id: 'da-insights-5',
    role: 'Data Analyst',
    type: 'Behavioral',
    difficulty: 'Intermediate',
    question: {
      en: 'Describe a time when you presented complex data findings to non-technical business stakeholders. How did you ensure your insights were actionable?',
      te: 'సాంకేతిక పరిజ్ఞానం లేని బిజినెస్ టీమ్‌కు సంక్లిష్టమైన డేటా ఫలితాలను వివరించిన అనుభవాన్ని చెప్పండి. మీ విశ్లేషణను వారు ఎలా అర్థం చేసుకున్నారు?',
      hi: 'किसी ऐसे अवसर का वर्णन करें जब आपने गैर-तकनीकी हितधारकों के सामने जटिल डेटा निष्कर्ष प्रस्तुत किए। आपने इसे कैसे सरल बनाया?',
    },
    sampleAnswer: {
      en: 'I used clean data visualizations, focused on ROI and key business metrics rather than statistical jargon, and provided 3 concrete recommendations.',
      te: 'నేను చార్ట్‌లు మరియు విజువలైజేషన్స్ ఉపయోగించి వ్యాపార లాభాలను స్పష్టంగా వివరించాను.',
      hi: 'मैंने तकनीकी शब्दावली के बजाय सरल चार्ट्स और व्यावसायिक परिणामों पर ध्यान केंद्रित करके निष्कर्ष प्रस्तुत किए।',
    },
    keywords: ['visualization', 'stakeholders', 'storytelling', 'business metrics', 'dashboards'],
  },

  // ==================== AI/ML ENGINEER ====================
  {
    id: 'ml-sup-1',
    role: 'AI/ML Engineer',
    type: 'Technical',
    difficulty: 'Beginner',
    question: {
      en: 'Explain supervised versus unsupervised learning, giving examples of real-world use cases for each.',
      te: 'సూపర్‌వైజ్డ్ లెర్నింగ్ మరియు అన్‌సూపర్‌వైజ్డ్ లెర్నింగ్ మధ్య తేడాలను వాస్తవిక ఉదాహరణలతో వివరించండి.',
      hi: 'सुपरवाइज्ड और अनसुपरवाइज्ड लर्निंग में क्या अंतर है? प्रत्येक के लिए वास्तविक दुनिया के उदाहरण दें।',
    },
    sampleAnswer: {
      en: 'Supervised learning trains on labeled data (e.g. spam detection, price prediction). Unsupervised learning finds hidden patterns in unlabeled data (e.g. customer segmentation, anomaly detection).',
      te: 'సూపర్‌వైజ్డ్ లెర్నింగ్ లేబుల్ చేయబడిన డేటాను ఉపయోగిస్తుంది (ఉదా: స్పామ్ డిటెక్షన్). అన్‌సూపర్‌వైజ్డ్ లెర్నింగ్ దాగి ఉన్న నమూనాలను గుర్తిస్తుంది (ఉదా: కస్టమర్ క్లస్టరింగ్).',
      hi: 'सुपरवाइज्ड लर्निंग लेबल किए गए डेटा पर काम करती है जैसे ईमेल स्पैम डिटेक्शन। अनसुपरवाइज्ड लर्निंग बिना लेबल वाले डेटा में पैटर्न ढूंढती है जैसे क्लस्टरिंग।',
    },
    keywords: ['supervised', 'unsupervised', 'labeled', 'unlabeled', 'clustering', 'classification'],
  },
  {
    id: 'ml-overfit-2',
    role: 'AI/ML Engineer',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'What is overfitting in machine learning? What techniques do you use to detect and prevent it?',
      te: 'మెషిన్ లెర్నింగ్‌లో ఓవర్‌ఫిట్టింగ్ (Overfitting) అంటే ఏమిటి? దీన్ని గుర్తించడానికి మరియు నివారించడానికి మీరు ఏ పద్ధతులను ఉపయోగిస్తారు?',
      hi: 'मशीन लर्निंग में ओवरफिटिंग क्या है? इसका पता लगाने और इसे रोकने के लिए आप किन तकनीकों का उपयोग करते हैं?',
    },
    sampleAnswer: {
      en: 'Overfitting occurs when a model memorizes training noise and fails to generalize. We prevent it via cross-validation, regularization (L1/L2), dropout, pruning, and collecting more data.',
      te: 'ట్రైనింగ్ డేటాను మాత్రమే ఎక్కువగా బట్టీ పట్టి కొత్త డేటాపై విఫలమవడాన్ని ఓవర్‌ఫిట్టింగ్ అంటారు. రెగ్యులరైజేషన్, క్రాస్-వాలిడేషన్ ద్వారా దీన్ని నివారిస్తాము.',
      hi: 'ओवरफिटिंग तब होती है जब मॉडल ट्रेनिंग डेटा को रट लेता है और नए डेटा पर खराब प्रदर्शन करता है। इसे रोकने के लिए नियमितीकरण और क्रॉस-वैलिडेशन का उपयोग होता है।',
    },
    keywords: ['overfitting', 'regularization', 'dropout', 'cross-validation', 'generalization', 'bias-variance'],
  },
  {
    id: 'ml-metrics-3',
    role: 'AI/ML Engineer',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'Explain precision and recall. In what scenario would you prioritize high recall over high precision?',
      te: 'ప్రెసిషన్ (Precision) మరియు రీకాల్ (Recall) ను వివరించండి. ఏ సందర్భంలో ప్రెసిషన్ కంటే రీకాల్‌కు ఎక్కువ ప్రాధాన్యత ఇస్తారు?',
      hi: 'सटीकता (Precision) और रिकॉल (Recall) को समझाइए। किस स्थिति में आप हाई प्रिसिजन की तुलना में हाई रिकॉल को प्राथमिकता देंगे?',
    },
    sampleAnswer: {
      en: 'Precision is true positives over all positive predictions. Recall is true positives over all actual positives. In medical cancer diagnosis or fraud detection, high recall is prioritized to avoid false negatives.',
      te: 'ప్రెసిషన్ అంటే ప్రిడిక్ట్ చేసిన వాటిలో సరైనవి. రీకాల్ అంటే అసలైన పాజిటివ్‌లలో మోడల్ గుర్తించినవి. క్యాన్సర్ వంటి వ్యాధి నిర్ధారణలో రీకాల్ చాలా ముఖ్యం.',
      hi: 'प्रिसिजन वास्तविक पॉजिटिव की सटीकता है, जबकि रिकॉल सभी पॉजिटिव्स को पहचानने की क्षमता है। कैंसर पहचान जैसे मामलों में हाई रिकॉल जरूरी है।',
    },
    keywords: ['precision', 'recall', 'false negative', 'false positive', 'f1 score', 'medical diagnosis'],
  },
  {
    id: 'ml-eval-4',
    role: 'AI/ML Engineer',
    type: 'Technical',
    difficulty: 'Advanced',
    question: {
      en: 'How would you evaluate a classification model on an imbalanced dataset where the positive class is only 1% of the total samples?',
      te: 'పాజిటివ్ క్లాస్ కేవలం 1% మాత్రమే ఉన్న ఇంబాలెన్స్‌డ్ డేటాసెట్ (Imbalanced Dataset) లో క్లాసిఫికేషన్ మోడల్‌ను ఎలా మూల్యాంకనం చేస్తారు?',
      hi: 'एक असंतुलित डेटासेट पर जिसमें केवल 1% पॉजिटिव क्लास है, आप क्लासिफिकेशन मॉडल का मूल्यांकन कैसे करेंगे?',
    },
    sampleAnswer: {
      en: 'Accuracy is misleading here. I would evaluate using PR-AUC (Precision-Recall curve), ROC-AUC, F1-Score, and balanced confusion matrices, alongside techniques like SMOTE or focal loss.',
      te: 'ఇలాంటి సందర్భంలో అక్యూరసీ సరైనది కాదు. PR-AUC, F1-స్కోరు మరియు కన్‌ఫ్యూజన్ మ్యాట్రిక్స్ ఉపయోగించి మూల్యాంకనం చేస్తాము.',
      hi: 'यहाँ केवल एक्यूरेसी देखना गलत होगा। इसके बजाय PR-AUC, F1-स्कोर, कन्फ्यूजन मैट्रिक्स और SMOTE जैसी तकनीकों का उपयोग किया जाता है।',
    },
    keywords: ['imbalance', 'pr-auc', 'roc-auc', 'f1-score', 'smote', 'accuracy paradox'],
  },
  {
    id: 'ml-pipeline-5',
    role: 'AI/ML Engineer',
    type: 'Behavioral',
    difficulty: 'Advanced',
    question: {
      en: 'Describe your end-to-end pipeline for taking a machine learning model from experimental notebook to production API with monitoring.',
      te: 'మెషిన్ లెర్నింగ్ మోడల్‌ను నోట్‌బుక్ పరిశోధన నుండి ప్రొడక్షన్ API గా తీసుకెళ్లి మానిటరింగ్ చేసే ఎండ్-టు-ఎండ్ పైప్‌లైన్ విధానాన్ని వివరించండి.',
      hi: 'एक मशीन लर्निंग मॉडल को जुपिटर नोटबुक से प्रोडक्शन API और मॉनिटरिंग तक ले जाने की एंड-टू-एंड प्रक्रिया का वर्णन करें।',
    },
    sampleAnswer: {
      en: 'I structure the pipeline with data validation, containerized training using Docker, model registry via MLflow, CI/CD deployment, and drift monitoring for features and predictions.',
      te: 'డేటా వాలిడేషన్, డాకర్ కంటైనరైజేషన్, మోడల్ రిజిస్ట్రీ మరియు డ్రిఫ్ట్ మానిటరింగ్‌తో కూడిన CI/CD పైప్‌లైన్ ఉపయోగిస్తాను.',
      hi: 'डेटा वैलिडेशन, डॉकर कंटेनर, MLflow रजिस्ट्री और ड्रिफ्ट मॉनिटरिंग के साथ CI/CD पाइपलाइन स्थापित की जाती है।',
    },
    keywords: ['mlops', 'pipeline', 'deployment', 'docker', 'drift', 'monitoring', 'ci/cd'],
  },

  // ==================== WEB DEVELOPER ====================
  {
    id: 'wd-dom-1',
    role: 'Web Developer',
    type: 'Technical',
    difficulty: 'Beginner',
    question: {
      en: 'What is the Virtual DOM in React, and how does reconciliation work to optimize UI updates?',
      te: 'రియాక్ట్ (React) లో వర్చువల్ డామ్ (Virtual DOM) అంటే ఏమిటి? మరియు రీకన్సిలియేషన్ (Reconciliation) ప్రక్రియ UI అప్‌డేట్‌లను ఎలా వేగవంతం చేస్తుంది?',
      hi: 'रिएक्ट (React) में वर्चुअल DOM क्या है, और यूआई अपडेट्स को अनुकूलित करने के लिए रीकंसीलिएशन कैसे काम करता है?',
    },
    sampleAnswer: {
      en: 'The Virtual DOM is an in-memory representation of the real DOM. React diffs changes using reconciliation algorithm and applies only the minimal batch updates to the real DOM.',
      te: 'వర్చువల్ డామ్ అనేది నిజమైన డామ్ యొక్క మెమరీ ప్రతిరూపం. మార్పులను గుర్తించి కేవలం అవసరమైన భాగాలను మాత్రమే బ్రౌజర్‌లో అప్‌డేట్ చేస్తుంది.',
      hi: 'वर्चुअल DOM वास्तविक DOM का मेमोरी रिप्रेजेंटेशन है। रिएक्ट केवल बदले हुए हिस्सों को डिफिंग एल्गोरिथ्म के जरिए अपडेट करता है।',
    },
    keywords: ['virtual dom', 'reconciliation', 'diffing', 'state', 'performance', 'real dom'],
  },
  {
    id: 'wd-async-2',
    role: 'Web Developer',
    type: 'Technical',
    difficulty: 'Intermediate',
    question: {
      en: 'Explain asynchronous JavaScript: compare Callbacks, Promises, and Async/Await with error handling.',
      te: 'అసింక్రోనస్ జావాస్క్రిప్ట్ (Async JS) గురించి వివరించండి: కాల్‌బ్యాక్స్, ప్రామిసెస్ మరియు అసైంక్/అవైట్ (Async/Await) మధ్య తేడాలను చెప్పండి.',
      hi: 'एसिंक्रोनस जावास्क्रिप्ट समझाइए: कॉलबैक, प्रॉमिस और Async/Await में क्या अंतर है?',
    },
    sampleAnswer: {
      en: 'Callbacks handle async tasks but lead to callback hell. Promises provide chainable then/catch. Async/await is syntactic sugar over promises making code read synchronously with try/catch.',
      te: 'కాల్‌బ్యాక్స్ ప్రాథమిక విధానం అయితే ప్రామిస్‌లు చైనింగ్ అందిస్తాయి. అసైంక్/అవైట్ కోడ్‌ను మరింత శుభ్రంగా మరియు సులభంగా చదవడానికి వీలు కల్పిస్తుంది.',
      hi: 'कॉलबैक से कॉलबैक हेल बनता है। प्रॉमिस चेनिंग की सुविधा देता है। Async/Await कोड को आसान और सिंक्रोनस जैसा बनाता है।',
    },
    keywords: ['promises', 'async', 'await', 'callbacks', 'event loop', 'try catch'],
  },
  {
    id: 'wd-perf-3',
    role: 'Web Developer',
    type: 'Technical',
    difficulty: 'Advanced',
    question: {
      en: 'What strategies do you implement to optimize web performance, Core Web Vitals (LCP, FID/INP, CLS), and bundle size?',
      te: 'వెబ్ పెర్ఫార్మెన్స్, కోర్ వెబ్ వైటల్స్ (LCP, INP, CLS) మరియు బండిల్ సైజును తగ్గించడానికి మీరు ఏ వ్యూహాలను అనుసరిస్తారు?',
      hi: 'वेबसाइट प्रदर्शन, कोर वेब वाइटल्स और बंडल आकार को अनुकूलित करने के लिए आप किन रणनीतियों का उपयोग करते हैं?',
    },
    sampleAnswer: {
      en: 'Code splitting with dynamic imports, image optimization (WebP/AVIF), lazy loading, caching with service workers, and minimizing layout shifts.',
      te: 'కోడ్ స్ప్లిట్టింగ్, లేజీ లోడింగ్, ఆధునిక ఇమేజ్ ఫార్మాట్‌లు మరియు బండిల్ ఆప్టిమైజేషన్ ద్వారా వేగాన్ని పెంచుతాను.',
      hi: 'कोड स्प्लिटिंग, लेजी लोडिंग, इमेज ऑप्टिमाइजेशन और बंडल साइज कम करके वेब स्पीड सुधारी जाती है।',
    },
    keywords: ['lcp', 'fid', 'inp', 'cls', 'code splitting', 'lazy loading', 'bundle'],
  },

  // ==================== HR EXECUTIVE ====================
  {
    id: 'hr-conflict-1',
    role: 'HR Executive',
    type: 'Behavioral',
    difficulty: 'Intermediate',
    question: {
      en: 'How do you handle a sensitive workplace conflict between two team members with conflicting personalities?',
      te: 'భిన్నమైన స్వభావాలు కలిగిన ఇద్దరు ఉద్యోగుల మధ్య కార్యాలయంలో తలెత్తిన సున్నితమైన వివాదాన్ని మీరు ఎలా పరిష్కరిస్తారు?',
      hi: 'कार्यस्थल पर दो कर्मचारियों के बीच व्यक्तिगत मतभेद या विवाद को आप कैसे सुलझाएंगे?',
    },
    sampleAnswer: {
      en: 'I conduct separate private active-listening sessions, identify root issues without taking sides, facilitate a collaborative meeting focusing on shared objectives, and follow up periodically.',
      te: 'ఇద్దరితో వేర్వేరుగా మాట్లాడి సమస్య మూలాలను తెలుసుకుంటాను. కంపెనీ లక్ష్యాల ఆధారంగా పరస్పర అవగాహనతో పరిష్కారం కనుగొంటాను.',
      hi: 'दोनों पक्षों को अलग-अलग सुनकर बिना किसी पक्षपात के मूल कारण की पहचान करना और आपसी सहमति से समाधान निकालना।',
    },
    keywords: ['conflict resolution', 'empathy', 'active listening', 'mediation', 'policy'],
  },
  {
    id: 'hr-retention-2',
    role: 'HR Executive',
    type: 'HR',
    difficulty: 'Intermediate',
    question: {
      en: 'What employee retention and wellness initiatives would you design to reduce turnover in high-demand technical teams?',
      te: 'అధిక డిమాండ్ ఉన్న టెక్నికల్ బృందాలలో ఉద్యోగుల వలసలను (Turnover) తగ్గించడానికి మీరు ఎలాంటి వెల్నెస్ మరియు రిటెన్షన్ కార్యక్రమాలను రూపొందిస్తారు?',
      hi: 'तकनीकी टीमों में कर्मचारियों के पलायन (Turnover) को कम करने के लिए आप कौन से वेलनेस और रिटेंशन कार्यक्रम तैयार करेंगे?',
    },
    sampleAnswer: {
      en: 'Transparent career ladders, competitive compensation benchmarks, flexible hybrid work arrangements, mental wellness stipends, and continuous learning budgets.',
      te: 'స్పష్టమైన కెరీర్ ఎదుగుదల, తగిన వేతనం, హైబ్రిడ్ పని విధానం మరియు అభ్యాస అవకాశాల ద్వారా రిటెన్షన్ పెంచుతాను.',
      hi: 'स्पष्ट करियर ग्रोथ, प्रतिस्पर्धी वेतन, हाइब्रिड कार्य संस्कृति और निरंतर सीखने के अवसर प्रदान करके।',
    },
    keywords: ['retention', 'wellness', 'culture', 'compensation', 'career growth'],
  },
];

/**
 * Filter questions based on configuration and randomize without duplicates
 */
export function getQuestionsForSession(
  role: JobRole,
  type: InterviewType,
  difficulty: DifficultyLevel,
  count: number
): QuestionItem[] {
  // First try exact matches
  let pool = questionBank.filter((q) => {
    const roleMatch = q.role === role || role === 'Custom Role';
    const typeMatch = type === 'Mixed' || q.type === type;
    return roleMatch && typeMatch;
  });

  // If pool is small, relax type constraint
  if (pool.length < count) {
    const extra = questionBank.filter(
      (q) => (q.role === role || role === 'Custom Role') && !pool.some((p) => p.id === q.id)
    );
    pool = [...pool, ...extra];
  }

  // If still small, include general software / HR questions
  if (pool.length < count) {
    const general = questionBank.filter((q) => !pool.some((p) => p.id === q.id));
    pool = [...pool, ...general];
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
