import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    practice: string;
    history: string;
    about: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    startInterview: string;
    exploreFeatures: string;
    avatarBubble: string;
    statusAria: string;
    featuresHeading: string;
    featuresSubtitle: string;
    voiceInterview: {
      title: string;
      desc: string;
    };
    multilingual: {
      title: string;
      desc: string;
    };
    roleSpecific: {
      title: string;
      desc: string;
    };
    instantFeedback: {
      title: string;
      desc: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  setup: {
    title: string;
    subtitle: string;
    candidateName: string;
    namePlaceholder: string;
    targetRole: string;
    customRole: string;
    customRolePlaceholder: string;
    interviewType: string;
    difficulty: string;
    language: string;
    englishVariant: string;
    questionCount: string;
    interviewMode: string;
    modeVoice: string;
    modeText: string;
    timer: string;
    timerOff: string;
    timer15: string;
    timer30: string;
    testMic: string;
    previewVoice: string;
    startMock: string;
    errors: {
      nameRequired: string;
      customRoleRequired: string;
    };
  };
  interview: {
    ariaTitle: string;
    stateIdle: string;
    stateSpeaking: string;
    stateListening: string;
    stateThinking: string;
    stateCompleted: string;
    questionOf: string;
    startAnswerPrompt: string;
    listeningFeedback: string;
    tapToSpeak: string;
    recordingActive: string;
    transcriptPlaceholder: string;
    editTranscriptHint: string;
    submitAnswer: string;
    stopRecording: string;
    retryRecording: string;
    repeatQuestion: string;
    skipQuestion: string;
    endInterview: string;
    endConfirm: string;
    micPermissionDenied: string;
    micUnavailable: string;
    noSpeechDetected: string;
    processingAnswer: string;
    evaluatingFeedback: string;
    timeRemaining: string;
  };
  results: {
    title: string;
    subtitle: string;
    overallScore: string;
    relevance: string;
    communication: string;
    technical: string;
    strengths: string;
    improvements: string;
    suggestedAnswer: string;
    questionReview: string;
    candidateAnswer: string;
    ariaFeedback: string;
    duration: string;
    questionsCompleted: string;
    practiceAgain: string;
    tryAnotherRole: string;
    viewHistory: string;
    returnHome: string;
    demoNote: string;
  };
  history: {
    title: string;
    subtitle: string;
    noHistory: string;
    noHistoryDesc: string;
    clearHistory: string;
    clearConfirm: string;
    date: string;
    role: string;
    score: string;
    questions: string;
    viewDetails: string;
  };
  micModal: {
    title: string;
    subtitle: string;
    micStatus: string;
    micWorking: string;
    micFailed: string;
    testSpeaking: string;
    hearSampleAria: string;
    playingAudio: string;
    close: string;
  };
  greetings: {
    en: string;
    te: string;
    hi: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'InterVue AI',
    tagline: 'Your next opportunity starts with one conversation.',
    nav: {
      home: 'Home',
      practice: 'Start Interview',
      history: 'History',
      about: 'About ARIA',
    },
    home: {
      heroBadge: 'Powered by Multilingual Conversational AI',
      heroTitle: 'Your next opportunity starts with one conversation.',
      heroSubtitle:
        'Practice real voice job interviews with ARIA, our virtual AI interviewer. Speak naturally in English, Telugu, or Hindi and receive real-time role-specific evaluation.',
      startInterview: 'Start Your Interview',
      exploreFeatures: 'Explore Features',
      avatarBubble: 'Hello! Ready to practice your interview?',
      statusAria: 'ARIA — Ready to Interview',
      featuresHeading: 'Engineered for Real-World Interview Excellence',
      featuresSubtitle:
        'Everything you need to master your technical, behavioral, and HR interviews with speech intelligence.',
      voiceInterview: {
        title: 'Real Voice Interaction',
        desc: 'Speak directly into your microphone. No typing required. Full natural voice dialogue with realistic speech recognition.',
      },
      multilingual: {
        title: 'Telugu, Hindi & English',
        desc: 'First-class support for te-IN, hi-IN, and en-IN. Speak in your native language with accurate phonetic transcription.',
      },
      roleSpecific: {
        title: 'Role-Specific Question Banks',
        desc: 'Curated technical and behavioral questions for Software Developers, Data Analysts, AI/ML Engineers, Web Developers, and HR.',
      },
      instantFeedback: {
        title: 'Instant In-Depth Evaluation',
        desc: 'Get structured scores for answer relevance, technical depth, and communication clarity with constructive recommendations.',
      },
      howItWorks: {
        title: 'How InterVue AI Works',
        subtitle: 'Four simple steps to your dream job preparation',
        step1Title: 'Configure Profile',
        step1Desc: 'Pick your job role, interview type, difficulty level, and preferred language.',
        step2Title: 'Meet ARIA',
        step2Desc: 'ARIA welcomes you, sets the context, and speaks the first question aloud.',
        step3Title: 'Speak Your Answer',
        step3Desc: 'Speak into your microphone. View real-time transcription and refine your answer.',
        step4Title: 'Review & Improve',
        step4Desc: 'Receive instant spoken feedback, detailed score breakdowns, and sample answers.',
      },
      ctaTitle: 'Ready to ace your next technical or HR interview?',
      ctaSubtitle: 'Join thousands of students and job seekers practicing with ARIA today.',
      ctaButton: 'Launch Practice Interview Now',
    },
    setup: {
      title: 'Configure Your Interview Session',
      subtitle: 'Customize your practice session to match your target job profile and preferred language.',
      candidateName: 'Candidate Name',
      namePlaceholder: 'Enter your full name',
      targetRole: 'Target Job Role',
      customRole: 'Custom Role Name',
      customRolePlaceholder: 'e.g. Cloud DevOps Engineer',
      interviewType: 'Interview Category',
      difficulty: 'Difficulty Level',
      language: 'Interview Language',
      englishVariant: 'English Accent / Locale',
      questionCount: 'Number of Questions',
      interviewMode: 'Interview Mode',
      modeVoice: 'Voice Interview (Recommended)',
      modeText: 'Text / Hybrid Interview',
      timer: 'Session Timer',
      timerOff: 'No Timer',
      timer15: '15 Minutes',
      timer30: '30 Minutes',
      testMic: 'Test Microphone',
      previewVoice: 'Preview ARIA Voice',
      startMock: 'Start Mock Interview',
      errors: {
        nameRequired: 'Please enter your candidate name before starting.',
        customRoleRequired: 'Please specify the custom role name.',
      },
    },
    interview: {
      ariaTitle: 'ARIA — AI Interviewer',
      stateIdle: 'Idle & Attentive',
      stateSpeaking: 'Speaking Question...',
      stateListening: 'Listening to You...',
      stateThinking: 'Analyzing Answer...',
      stateCompleted: 'Interview Completed!',
      questionOf: 'Question',
      startAnswerPrompt: 'Click the microphone button and speak your answer clearly.',
      listeningFeedback: 'Listening... Speak into your microphone now.',
      tapToSpeak: 'Start Speaking',
      recordingActive: 'Recording... Click to finish speaking',
      transcriptPlaceholder: 'Your recognized speech will appear here in real-time as you speak...',
      editTranscriptHint: 'You can review and edit your transcribed answer before submitting.',
      submitAnswer: 'Submit Answer',
      stopRecording: 'Stop Recording',
      retryRecording: 'Clear & Retry',
      repeatQuestion: 'Repeat Question',
      skipQuestion: 'Skip Question',
      endInterview: 'End Interview',
      endConfirm: 'Are you sure you want to end this interview session? Your progress will be evaluated.',
      micPermissionDenied: 'Microphone access denied. Please allow microphone permissions in your browser settings.',
      micUnavailable: 'Speech recognition is not supported or microphone was not detected.',
      noSpeechDetected: 'No speech was detected. Please try speaking closer to your microphone.',
      processingAnswer: 'ARIA is evaluating your answer and formulating feedback...',
      evaluatingFeedback: 'Evaluating answer accuracy and relevance...',
      timeRemaining: 'Time Left',
    },
    results: {
      title: 'Interview Performance Report',
      subtitle: 'Comprehensive evaluation of your answers, communication clarity, and technical aptitude.',
      overallScore: 'Overall Score',
      relevance: 'Answer Relevance',
      communication: 'Communication Clarity',
      technical: 'Technical Depth',
      strengths: 'Key Strengths Demonstrated',
      improvements: 'Areas for Growth & Improvement',
      suggestedAnswer: 'Model / Improved Answer Approach',
      questionReview: 'Detailed Question-by-Question Breakdown',
      candidateAnswer: 'Your Response:',
      ariaFeedback: 'ARIA Feedback:',
      duration: 'Interview Duration',
      questionsCompleted: 'Questions Answered',
      practiceAgain: 'Practice Again',
      tryAnotherRole: 'Try Another Role',
      viewHistory: 'View Past Sessions',
      returnHome: 'Back to Home',
      demoNote: 'Scores and feedback generated with genuine multi-parameter semantic assessment.',
    },
    history: {
      title: 'Interview History & Progress',
      subtitle: 'Review your past mock interview sessions, tracked scores, and growth over time.',
      noHistory: 'No interview sessions found yet.',
      noHistoryDesc: 'Complete your first practice session with ARIA to see your progress tracked here!',
      clearHistory: 'Clear History',
      clearConfirm: 'Are you sure you want to clear all your saved interview history?',
      date: 'Date & Time',
      role: 'Role & Type',
      score: 'Score',
      questions: 'Questions',
      viewDetails: 'Review Results',
    },
    micModal: {
      title: 'Audio Diagnostics & Preview',
      subtitle: 'Verify your microphone input and preview ARIA’s voice in your chosen language.',
      micStatus: 'Microphone Status',
      micWorking: 'Microphone connected and active! Audio level detected.',
      micFailed: 'Microphone access error. Please check browser permissions.',
      testSpeaking: 'Say "Hello, testing one two three"',
      hearSampleAria: 'Listen to ARIA Speech Sample',
      playingAudio: 'Playing audio...',
      close: 'Done & Return',
    },
    greetings: {
      en: "Hello! Welcome to your mock interview. Let's begin.",
      te: 'నమస్కారం! మీ మాక్ ఇంటర్వ్యూకు స్వాగతం. ప్రారంభిద్దాం.',
      hi: 'नमस्ते! आपके मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।',
    },
  },
  te: {
    appName: 'InterVue AI',
    tagline: 'మీ తదుపరి అవకాశం ఒక సంభాషణతోనే ప్రారంభమవుతుంది.',
    nav: {
      home: 'హోమ్',
      practice: 'ఇంటర్వ్యూ ప్రారంభించండి',
      history: 'చరిత్ర',
      about: 'ARIA గురించి',
    },
    home: {
      heroBadge: 'బహుభాషా AI శక్తితో నడిచే ఇంటర్వ్యూ ప్లాట్‌ఫామ్',
      heroTitle: 'మీ తదుపరి అవకాశం ఒక సంభాషణతోనే ప్రారంభమవుతుంది.',
      heroSubtitle:
        'మా వర్చువల్ AI ఇంటర్వ్యూయర్ ARIA తో నిజమైన వాయిస్ ఇంటర్వ్యూలను అభ్యసించండి. తెలుగు, ఇంగ్లీష్ లేదా హిందీలో మాట్లాడండి మరియు తక్షణ నిపుణుల మూల్యాంకనాన్ని పొందండి.',
      startInterview: 'ఇంటర్వ్యూ ప్రారంభించండి',
      exploreFeatures: 'ఫీచర్లు చూడండి',
      avatarBubble: 'నమస్కారం! ఇంటర్వ్యూ ప్రాక్టీస్ చేయడానికి సిద్ధంగా ఉన్నారా?',
      statusAria: 'ARIA — సంసిద్ధంగా ఉంది',
      featuresHeading: 'వాస్తవిక ఇంటర్వ్యూ నైపుణ్యాల కోసం రూపొందించబడింది',
      featuresSubtitle: 'టెక్నికల్, బిహేవియరల్ మరియు హెచ్‌ఆర్ ఇంటర్వ్యూలలో విజయం సాధించడానికి అవసరమైన సాధనాలు.',
      voiceInterview: {
        title: 'నిజమైన వాయిస్ సంభాషణ',
        desc: 'టైప్ చేయవలసిన అవసరం లేకుండా మైక్రోఫోన్‌లో సూటిగా మాట్లాడండి. సహజ స్వర గుర్తింపుతో ఇంటర్వ్యూ పూర్తి చేయండి.',
      },
      multilingual: {
        title: 'తెలుగు, హిందీ & ఇంగ్లీష్',
        desc: 'te-IN, hi-IN, మరియు en-IN లకు ప్రత్యేక మద్దతు. మీ మాతృభాషలో స్పష్టమైన లిప్యంతరీకరణతో మాట్లాడండి.',
      },
      roleSpecific: {
        title: 'ఉద్యోగ నిర్దిష్ట ప్రశ్నలు',
        desc: 'సాఫ్ట్‌వేర్ డెవలపర్, డేటా అనలిస్ట్, AI/ML, వెబ్ డెవలప్‌మెంట్ మరియు హెచ్‌ఆర్ ఉద్యోగాల కోసం రూపొందించిన ప్రశ్నలు.',
      },
      instantFeedback: {
        title: 'తక్షణ లోతైన మూల్యాంకనం',
        desc: 'మీ సమాధానాల ఔచిత్యం, సాంకేతిక స్పష్టత మరియు కమ్యూనికేషన్ స్కోర్‌లతో కూడిన నిర్మాణాత్మక సూచనలను పొందండి.',
      },
      howItWorks: {
        title: 'InterVue AI ఎలా పనిచేస్తుంది',
        subtitle: 'మీ కలల ఉద్యోగ తయారీకి 4 సాధారణ దశలు',
        step1Title: 'ప్రొఫైల్ ఎంచుకోండి',
        step1Desc: 'మీ ఉద్యోగ పాత్ర, ఇంటర్వ్యూ రకం, క్లిష్టత స్థాయి మరియు భాషను ఎంచుకోండి.',
        step2Title: 'ARIA ని కలవండి',
        step2Desc: 'ARIA మీకు స్వాగతం పలికి మొదటి ప్రశ్నను బిగ్గరగా అడుగుతుంది.',
        step3Title: 'సమాధానం చెప్పండి',
        step3Desc: 'మైక్రోఫోన్‌లో మాట్లాడండి. మీ తెలుగు మాటలు ప్రత్యక్షంగా స్క్రీన్‌పై కనిపిస్తాయి.',
        step4Title: 'ఫలితాలు & సమీక్ష',
        step4Desc: 'స్కోర్ విశ్లేషణ, బలహీనతలు, బలమైన పాయింట్లు మరియు ఉత్తమ నమూనా సమాధానాలను పొందండి.',
      },
      ctaTitle: 'మీ తదుపరి ఇంటర్వ్యూను విజయవంతంగా ఎదుర్కోవడానికి సిద్ధమా?',
      ctaSubtitle: 'ఈరోజే ARIA తో ఉచితంగా మీ ఇంటర్వ్యూ ప్రాక్టీస్ ప్రారంభించండి.',
      ctaButton: 'ఇప్పుడే ప్రారంభించండి',
    },
    setup: {
      title: 'ఇంటర్వ్యూ సెషన్ వివరాలు',
      subtitle: 'మీ లక్ష్య ఉద్యోగం మరియు ప్రాధాన్యత భాషకు అనుగుణంగా ఇంటర్వ్యూని సెటప్ చేయండి.',
      candidateName: 'అభ్యర్థి పేరు',
      namePlaceholder: 'మీ పూర్తి పేరును నమోదు చేయండి',
      targetRole: 'ఉద్యోగ పాత్ర (Job Role)',
      customRole: 'ఇతర పాత్ర పేరు',
      customRolePlaceholder: 'ఉదా: క్లౌడ్ ఆర్కిటెక్ట్',
      interviewType: 'ఇంటర్వ్యూ విభాగం',
      difficulty: 'క్లిష్టత స్థాయి (Difficulty)',
      language: 'ఇంటర్వ్యూ భాష',
      englishVariant: 'ఇంగ్లీష్ యాస',
      questionCount: 'ప్రశ్నల సంఖ్య',
      interviewMode: 'ఇంటర్వ్యూ మోడ్',
      modeVoice: 'వాయిస్ ఇంటర్వ్యూ (సిఫార్సు చేయబడినది)',
      modeText: 'టెక్స్ట్ / హైబ్రిడ్ ఇంటర్వ్యూ',
      timer: 'టైమర్',
      timerOff: 'టైమర్ వద్దు',
      timer15: '15 నిమిషాలు',
      timer30: '30 నిమిషాలు',
      testMic: 'మైక్రోఫోన్ పరీక్షించండి',
      previewVoice: 'ARIA స్వరాన్ని వినండి',
      startMock: 'మాక్ ఇంటర్వ్యూ ప్రారంభించండి',
      errors: {
        nameRequired: 'దయచేసి మీ పేరును నమోదు చేయండి.',
        customRoleRequired: 'దయచేసి ఉద్యోగ పాత్ర పేరును తెలపండి.',
      },
    },
    interview: {
      ariaTitle: 'ARIA — AI ఇంటర్వ్యూయర్',
      stateIdle: 'సిద్ధంగా ఉంది',
      stateSpeaking: 'ప్రశ్న మాట్లాడుతోంది...',
      stateListening: 'మీ సమాధానం వింటోంది...',
      stateThinking: 'సమాధానాన్ని విశ్లేషిస్తోంది...',
      stateCompleted: 'ఇంటర్వ్యూ పూర్తయింది!',
      questionOf: 'ప్రశ్న',
      startAnswerPrompt: 'మైక్రోఫోన్ బటన్ నొక్కి మీ సమాధానాన్ని స్పష్టంగా మాట్లాడండి.',
      listeningFeedback: 'వింటోంది... మైక్రోఫోన్‌లో స్పష్టంగా మాట్లాడండి.',
      tapToSpeak: 'మాట్లాడటం ప్రారంభించండి',
      recordingActive: 'రికార్డింగ్ చురుగ్గా ఉంది... పూర్తయ్యాక క్లిక్ చేయండి',
      transcriptPlaceholder: 'మీరు మాట్లాడే తెలుగు మాటలు ఇక్కడ ప్రత్యక్షంగా కనిపిస్తాయి...',
      editTranscriptHint: 'సమర్పించే ముందు మీ సమాధానాన్ని సరిచూసుకోవచ్చు లేదా సవరించవచ్చు.',
      submitAnswer: 'సమాధానం సమర్పించండి',
      stopRecording: 'రికార్డింగ్ ఆపండి',
      retryRecording: 'మళ్లీ మాట్లాడండి',
      repeatQuestion: 'ప్రశ్న మళ్లీ చదవండి',
      skipQuestion: 'ప్రశ్న దాటవేయండి',
      endInterview: 'ఇంటర్వ్యూ ముగించండి',
      endConfirm: 'మీరు నిజంగానే ఈ ఇంటర్వ్యూను ముగించాలనుకుంటున్నారా? ఇప్పటివరకు చెప్పిన సమాధానాలు మూల్యాంకనం చేయబడతాయి.',
      micPermissionDenied: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.',
      micUnavailable: 'స్పీచ్ రికగ్నిషన్ సపోర్ట్ చేయలేదు లేదా మైక్రోఫోన్ కనెక్ట్ కాలేదు.',
      noSpeechDetected: 'మాటలు గుర్తించబడలేదు. దయచేసి మైక్రోఫోన్ దగ్గరగా మాట్లాడండి.',
      processingAnswer: 'ARIA మీ సమాధానాన్ని పరిశీలిస్తోంది...',
      evaluatingFeedback: 'సమాధాన నాణ్యతను లెక్కిస్తోంది...',
      timeRemaining: 'మిగిలిన సమయం',
    },
    results: {
      title: 'ఇంటర్వ్యూ ఫలితాల నివేదిక',
      subtitle: 'మీ సమాధానాలు, కమ్యూనికేషన్ స్పష్టత మరియు సాంకేతిక నైపుణ్యాల సమగ్ర సమీక్ష.',
      overallScore: 'మొత్తం స్కోరు',
      relevance: 'సమాధాన ఔచిత్యం',
      communication: 'కమ్యూనికేషన్ స్పష్టత',
      technical: 'సాంకేతిక లోతు',
      strengths: 'మీ ప్రధాన బలాలు',
      improvements: 'మెరుగుపరచుకోవలసిన అంశాలు',
      suggestedAnswer: 'ఆదర్శవంతమైన నమూనా సమాధానం',
      questionReview: 'ప్రశ్నల వారీగా వివరణాత్మక సమీక్ష',
      candidateAnswer: 'మీ సమాధానం:',
      ariaFeedback: 'ARIA అభిప్రాయం:',
      duration: 'పట్టిన సమయం',
      questionsCompleted: 'పూర్తయిన ప్రశ్నలు',
      practiceAgain: 'మళ్లీ ప్రాక్టీస్ చేయండి',
      tryAnotherRole: 'మరో పాత్ర ఎంచుకోండి',
      viewHistory: 'గత సెషన్లను చూడండి',
      returnHome: 'హోమ్‌కు వెళ్లండి',
      demoNote: 'ఈ స్కోర్లు మరియు సూచనలు పారదర్శకమైన సెమాంటిక్ విధానం ద్వారా రూపొందించబడ్డాయి.',
    },
    history: {
      title: 'ఇంటర్వ్యూ చరిత్ర & పురోగతి',
      subtitle: 'మీ గత ప్రాక్టీస్ సెషన్ల స్కోర్లు మరియు మెరుగుదలను సమీక్షించండి.',
      noHistory: 'ఇప్పటివరకు ఎలాంటి ఇంటర్వ్యూ సెషన్లు లేవు.',
      noHistoryDesc: 'మీ మొదటి మాక్ ఇంటర్వ్యూ పూర్తి చేసి మీ ఫలితాలను ఇక్కడ ట్రాక్ చేయండి!',
      clearHistory: 'చరిత్రను క్లియర్ చేయండి',
      clearConfirm: 'మీరు నిజంగానే సేవ్ చేయబడిన చరిత్ర మొత్తాన్ని తొలగించాలనుకుంటున్నారా?',
      date: 'తేదీ & సమయం',
      role: 'ఉద్యోగ పాత్ర',
      score: 'స్కోరు',
      questions: 'ప్రశ్నలు',
      viewDetails: 'ఫలితాలు చూడండి',
    },
    micModal: {
      title: 'ఆడియో & మైక్రోఫోన్ పరీక్ష',
      subtitle: 'మీ మైక్రోఫోన్ పనితీరును మరియు ARIA స్వరాన్ని పరీక్షించండి.',
      micStatus: 'మైక్రోఫోన్ స్థితి',
      micWorking: 'మైక్రోఫోన్ సరిగ్గా పనిచేస్తోంది! ధ్వని గుర్తించబడింది.',
      micFailed: 'మైక్రోఫోన్ కనెక్షన్ విఫలమైంది. అనుమతులను తనిఖీ చేయండి.',
      testSpeaking: '"నమస్కారం, మైక్ టెస్టింగ్" అని మాట్లాడండి',
      hearSampleAria: 'ARIA తెలుగు మాటల నమూనా వినండి',
      playingAudio: 'ఆడియో ప్లే అవుతోంది...',
      close: 'పూర్తయింది',
    },
    greetings: {
      en: "Hello! Welcome to your mock interview. Let's begin.",
      te: 'నమస్కారం! మీ మాక్ ఇంటర్వ్యూకు స్వాగతం. ప్రారంభిద్దాం.',
      hi: 'नमस्ते! आपके मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।',
    },
  },
  hi: {
    appName: 'InterVue AI',
    tagline: 'आपका अगला अवसर एक बातचीत से शुरू होता है।',
    nav: {
      home: 'होम',
      practice: 'इंटरव्यू शुरू करें',
      history: 'इतिहास',
      about: 'ARIA के बारे में',
    },
    home: {
      heroBadge: 'बहुभाषी AI वॉयस इंटरव्यू प्लेटफॉर्म',
      heroTitle: 'आपका अगला अवसर एक बातचीत से शुरू होता है।',
      heroSubtitle:
        'हमारी वर्चुअल AI इंटरव्यूअर ARIA के साथ वास्तविक वॉयस इंटरव्यू का अभ्यास करें। हिंदी, अंग्रेजी या तेलुगु में बोलें और वास्तविक समय में मूल्यांकन प्राप्त करें।',
      startInterview: 'अपना इंटरव्यू शुरू करें',
      exploreFeatures: 'फीचर्स देखें',
      avatarBubble: 'नमस्ते! क्या आप मॉक इंटरव्यू के लिए तैयार हैं?',
      statusAria: 'ARIA — साक्षात्कार के लिए तैयार',
      featuresHeading: 'वास्तविक साक्षात्कार सफलता के लिए निर्मित',
      featuresSubtitle: 'तकनीकी, व्यवहारिक और एचआर इंटरव्यू में उत्कृष्ट प्रदर्शन के लिए हर आवश्यक साधन।',
      voiceInterview: {
        title: 'वास्तविक वॉयस संवाद',
        desc: 'टाइप करने की आवश्यकता नहीं है। सीधे माइक्रोफ़ोन में बोलें और स्वाभाविक भाषण पहचान का अनुभव करें।',
      },
      multilingual: {
        title: 'हिंदी, तेलुगु और अंग्रेजी',
        desc: 'hi-IN, te-IN और en-IN के लिए पूर्ण समर्थन। अपनी मातृभाषा में देवनागरी लिपि के साथ बोलें।',
      },
      roleSpecific: {
        title: 'पद-विशिष्ट प्रश्न बैंक',
        desc: 'सॉफ्टवेयर डेवलपर, डेटा एनालिस्ट, AI/ML इंजीनियर और HR के लिए विशेष रूप से तैयार प्रश्न।',
      },
      instantFeedback: {
        title: 'त्वरित और गहन मूल्यांकन',
        desc: 'उत्तर की प्रासंगिकता, तकनीकी गहराई और संचार स्पष्टता पर विस्तृत स्कोर और सुझाव प्राप्त करें।',
      },
      howItWorks: {
        title: 'InterVue AI कैसे काम करता है',
        subtitle: 'सफलतापूर्वक इंटरव्यू की तैयारी के लिए 4 आसान चरण',
        step1Title: 'प्रोफ़ाइल चुनें',
        step1Desc: 'अपना पद, साक्षात्कार प्रकार, कठिनाई स्तर और भाषा चुनें।',
        step2Title: 'ARIA से मिलें',
        step2Desc: 'ARIA आपका स्वागत करेगी और पहला प्रश्न बोलकर पूछेगी।',
        step3Title: 'अपना उत्तर बोलें',
        step3Desc: 'माइक में बोलें। आपके शब्द तुरंत स्क्रीन पर ट्रांसक्राइब होंगे।',
        step4Title: 'समीक्षा और सुधार',
        step4Desc: 'विस्तृत स्कोर, अपनी ताकतें, कमियां और आदर्श उत्तर प्राप्त करें।',
      },
      ctaTitle: 'क्या आप अपने अगले इंटरव्यू में सफल होने के लिए तैयार हैं?',
      ctaSubtitle: 'आज ही ARIA के साथ मुफ्त में मॉक इंटरव्यू का अभ्यास शुरू करें।',
      ctaButton: 'अभी अभ्यास शुरू करें',
    },
    setup: {
      title: 'इंटरव्यू सत्र का विवरण',
      subtitle: 'अपने लक्षित पद और पसंदीदा भाषा के अनुसार इंटरव्यू सत्र को कॉन्फ़िगर करें।',
      candidateName: 'उम्मीदवार का नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      targetRole: 'नौकरी का पद (Job Role)',
      customRole: 'कस्टम पद का नाम',
      customRolePlaceholder: 'उदा: क्लाउड समाधान वास्तुकार',
      interviewType: 'इंटरव्यू श्रेणी',
      difficulty: 'कठिनाई स्तर (Difficulty)',
      language: 'इंटरव्यू की भाषा',
      englishVariant: 'अंग्रेजी उच्चारण',
      questionCount: 'प्रश्नों की संख्या',
      interviewMode: 'इंटरव्यू मोड',
      modeVoice: 'वॉयस इंटरव्यू (अनुशंसित)',
      modeText: 'टेक्स्ट / हाइब्रिड इंटरव्यू',
      timer: 'सत्र टाइमर',
      timerOff: 'कोई टाइमर नहीं',
      timer15: '15 मिनट',
      timer30: '30 मिनट',
      testMic: 'माइक्रोफ़ोन का परीक्षण करें',
      previewVoice: 'ARIA की आवाज़ सुनें',
      startMock: 'मॉक इंटरव्यू शुरू करें',
      errors: {
        nameRequired: 'कृपया शुरू करने से पहले अपना नाम दर्ज करें।',
        customRoleRequired: 'कृपया कस्टम पद का नाम दर्ज करें।',
      },
    },
    interview: {
      ariaTitle: 'ARIA — AI इंटरव्यूअर',
      stateIdle: 'तैयार और सतर्क',
      stateSpeaking: 'प्रश्न बोल रही हैं...',
      stateListening: 'आपका उत्तर सुन रही हैं...',
      stateThinking: 'उत्तर का विश्लेषण कर रही हैं...',
      stateCompleted: 'साक्षात्कार पूरा हुआ!',
      questionOf: 'प्रश्न',
      startAnswerPrompt: 'माइक बटन दबाएं और अपना उत्तर स्पष्ट रूप से बोलें।',
      listeningFeedback: 'सुन रही हूँ... अपने माइक्रोफ़ोन में स्पष्ट बोलें।',
      tapToSpeak: 'बोलना शुरू करें',
      recordingActive: 'रिकॉर्डिंग चालू है... समाप्त करने के लिए क्लिक करें',
      transcriptPlaceholder: 'आपके बोले गए हिंदी शब्द यहाँ वास्तविक समय में दिखाई देंगे...',
      editTranscriptHint: 'आप सबमिट करने से पहले ट्रांसक्रिप्ट की समीक्षा या संपादन कर सकते हैं।',
      submitAnswer: 'उत्तर सबमिट करें',
      stopRecording: 'रिकॉर्डिंग रोकें',
      retryRecording: 'फिर से बोलें',
      repeatQuestion: 'प्रश्न दोहराएं',
      skipQuestion: 'प्रश्न छोड़ें',
      endInterview: 'इंटरव्यू समाप्त करें',
      endConfirm: 'क्या आप वाकई इस इंटरव्यू को समाप्त करना चाहते हैं? अब तक के उत्तरों का मूल्यांकन किया जाएगा।',
      micPermissionDenied: 'माइक्रोफ़ोन की अनुमति अस्वीकृत। कृपया अपनी ब्राउज़र सेटिंग्स में अनुमति दें।',
      micUnavailable: 'स्पीच रिकग्निशन समर्थित नहीं है या माइक्रोफ़ोन कनेक्ट नहीं है।',
      noSpeechDetected: 'कोई आवाज़ नहीं पहचानी गई। कृपया माइक के पास बोलें।',
      processingAnswer: 'ARIA आपके उत्तर का मूल्यांकन कर रही हैं...',
      evaluatingFeedback: 'उत्तर की गुणवत्ता की गणना हो रही है...',
      timeRemaining: 'शेष समय',
    },
    results: {
      title: 'साक्षात्कार प्रदर्शन रिपोर्ट',
      subtitle: 'आपके उत्तरों, संचार स्पष्टता और तकनीकी योग्यता का समग्र विश्लेषण।',
      overallScore: 'कुल स्कोर',
      relevance: 'उत्तर की प्रासंगिकता',
      communication: 'संचार स्पष्टता',
      technical: 'तकनीकी गहराई',
      strengths: 'आपकी मुख्य ताकतें',
      improvements: 'सुधार के प्रमुख क्षेत्र',
      suggestedAnswer: 'आदर्श / अनुशंसित उत्तर',
      questionReview: 'प्रश्नानुसार विस्तृत समीक्षा',
      candidateAnswer: 'आपका उत्तर:',
      ariaFeedback: 'ARIA की प्रतिक्रिया:',
      duration: 'साक्षात्कार की अवधि',
      questionsCompleted: 'पूर्ण किए गए प्रश्न',
      practiceAgain: 'पुनः अभ्यास करें',
      tryAnotherRole: 'अन्य पद चुनें',
      viewHistory: 'पिछला इतिहास देखें',
      returnHome: 'होम पर वापस जाएं',
      demoNote: 'ये स्कोर और प्रतिक्रिया बहु-पैरामीट्रिक शब्दार्थ विश्लेषण पर आधारित हैं।',
    },
    history: {
      title: 'साक्षात्कार इतिहास और प्रगति',
      subtitle: 'अपने पिछले मॉक इंटरव्यू सत्रों और स्कोर की समीक्षा करें।',
      noHistory: 'अभी तक कोई साक्षात्कार सत्र नहीं मिला।',
      noHistoryDesc: 'अपनी प्रगति यहाँ देखने के लिए ARIA के साथ अपना पहला अभ्यास पूरा करें!',
      clearHistory: 'इतिहास साफ़ करें',
      clearConfirm: 'क्या आप वाकई अपना संपूर्ण साक्षात्कार इतिहास हटाना चाहते हैं?',
      date: 'दिनांक और समय',
      role: 'पद और प्रकार',
      score: 'स्कोर',
      questions: 'प्रश्न',
      viewDetails: 'परिणाम देखें',
    },
    micModal: {
      title: 'ऑडियो और माइक परीक्षण',
      subtitle: 'अपने माइक्रोफ़ोन और ARIA की आवाज़ का परीक्षण करें।',
      micStatus: 'माइक्रोफ़ोन स्थिति',
      micWorking: 'माइक्रोफ़ोन ठीक से काम कर रहा है! ध्वनि स्तर पहचाना गया।',
      micFailed: 'माइक्रोफ़ोन कनेक्शन त्रुटि। कृपया अनुमतियों की जांच करें।',
      testSpeaking: '"नमस्ते, माइक टेस्टिंग एक दो तीन" बोलकर देखें',
      hearSampleAria: 'ARIA का हिंदी भाषण नमूना सुनें',
      playingAudio: 'ऑडियो चल रहा है...',
      close: 'संपन्न',
    },
    greetings: {
      en: "Hello! Welcome to your mock interview. Let's begin.",
      te: 'నమస్కారం! మీ మాక్ ఇంటర్వ్యూకు స్వాగతం. ప్రారంభిద్దాం.',
      hi: 'नमस्ते! आपके मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।',
    },
  },
};
