// Quiz questions and scoring logic for DIGIMAP

export interface Question {
  id: number;
  text: string;
  description?: string;
}

export interface Track {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Apakah kamu lebih suka tugas kreatif atau analitis?",
    description: "1 = Sangat tidak suka, 5 = Sangat suka"
  },
  {
    id: 2,
    text: "Apakah kamu nyaman bekerja dengan angka dan data?",
    description: "1 = Tidak nyaman, 5 = Sangat nyaman"
  },
  {
    id: 3,
    text: "Apakah kamu suka membuat konten (foto, video, tulisan)?",
    description: "1 = Tidak suka, 5 = Sangat suka"
  },
  {
    id: 4,
    text: "Apakah kamu ingin bekerja lebih ke strategi daripada eksekusi teknis?",
    description: "1 = Tidak ingin, 5 = Sangat ingin"
  },
  {
    id: 5,
    text: "Seberapa nyaman kamu menggunakan tools baru (software, aplikasi, dashboard)?",
    description: "1 = Tidak nyaman, 5 = Sangat nyaman"
  },
  {
    id: 6,
    text: "Seberapa tertarik kamu mempelajari cara kerja iklan berbayar seperti Meta Ads, Google Ads, atau TikTok Ads?",
    description: "1 = Tidak tertarik, 5 = Sangat tertarik"
  },
  {
    id: 7,
    text: "Seberapa tertarik kamu membuat konten kreatif (foto, video, tulisan) untuk sosial media atau brand?",
    description: "1 = Tidak tertarik, 5 = Sangat tertarik"
  },
  {
    id: 8,
    text: "Seberapa tertarik kamu menganalisis data performa (misalnya impression, reach, CPM, CPC, CTR, ROAS, atau keyword SEO)?",
    description: "1 = Tidak tertarik, 5 = Sangat tertarik"
  }
];

export const tracks: Track[] = [
  {
    id: "social_media",
    name: "Social Media Specialist",
    jobTitle: "Social Media Manager, Community Manager",
    description: "Fokus mengelola konten, kalender posting, interaksi audience, dan basic ads di platform sosial media seperti Instagram, TikTok, dan Facebook."
  },
  {
    id: "ads",
    name: "Digital Ads Specialist",
    jobTitle: "Performance Marketing, Paid Ads Specialist",
    description: "Fokus mengelola kampanye iklan berbayar (Google Ads, Facebook Ads, TikTok Ads), optimasi biaya, dan analisis performa iklan untuk ROI maksimal."
  },
  {
    id: "seo",
    name: "SEO Specialist",
    jobTitle: "SEO Manager, Organic Growth Specialist",
    description: "Fokus pada optimasi website agar mudah ditemukan di Google, riset keyword, on-page SEO, link building, dan tracking ranking organik."
  },
  {
    id: "content",
    name: "Content Creator / Copywriter",
    jobTitle: "Content Writer, Creative Copywriter",
    description: "Fokus pada pembuatan ide konten kreatif, penulisan copy untuk ads dan social media, storytelling, dan produksi konten visual maupun tekstual."
  },
  {
    id: "analyst",
    name: "Data & Performance Analyst",
    jobTitle: "Marketing Analyst, Data Analyst",
    description: "Fokus membaca data kampanye marketing, membuat dashboard dan report, memberikan insight dari data, dan membantu optimasi berdasarkan analisis mendalam."
  },
  {
    id: "strategist",
    name: "Digital Strategist",
    jobTitle: "Digital Marketing Strategist, Campaign Manager",
    description: "Fokus merancang campaign dari sudut pandang 360°, menentukan channel mix, budget allocation, mensinkronkan semua tim, dan ensuring overall marketing goals tercapai."
  }
];

// Scoring weights for each question and track
// Each question contributes differently to each track
// Q6 = Ads interest, Q7 = Content interest, Q8 = Data analysis interest
export const scoringWeights: Record<string, number[]> = {
  social_media: [1.2, 0.8, 1.5, 1.0, 1.0, 0, 2, 0],    // Q6A=0, Q6B=2, Q6C=0
  ads: [0.9, 1.5, 0.7, 1.2, 1.3, 2, 0, 1],              // Q6A=2, Q6B=0, Q6C=1
  seo: [0.8, 1.2, 0.6, 0.9, 1.4, 0, 0, 1],              // Q6A=0, Q6B=0, Q6C=1
  content: [1.5, 0.6, 1.8, 0.8, 1.0, 0, 2, 0],          // Q6A=0, Q6B=2, Q6C=0
  analyst: [0.7, 1.8, 0.5, 1.0, 1.3, 0, 0, 2],          // Q6A=0, Q6B=0, Q6C=2
  strategist: [1.0, 1.3, 0.9, 1.8, 1.2, 1, 0, 1]        // Q6A=1, Q6B=0, Q6C=1
};

export interface QuizAnswers {
  [questionId: number]: number;
}

export interface TrackScore {
  trackId: string;
  score: number;
  percentage: number;
}

export const calculateScores = (answers: QuizAnswers): TrackScore[] => {
  const scores: Record<string, number> = {};
  
  // Calculate raw scores for each track
  tracks.forEach(track => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const answer = answers[question.id] || 0;
      const weight = scoringWeights[track.id][index];
      totalScore += answer * weight;
    });
    scores[track.id] = totalScore;
  });
  
  // Find max score for percentage calculation
  const maxScore = Math.max(...Object.values(scores));
  
  // Convert to array and calculate percentages
  const trackScores: TrackScore[] = tracks.map(track => ({
    trackId: track.id,
    score: scores[track.id],
    percentage: maxScore > 0 ? Math.round((scores[track.id] / maxScore) * 100) : 0
  }));
  
  // Sort by score (highest first)
  return trackScores.sort((a, b) => b.score - a.score);
};

export const getTrackById = (trackId: string): Track | undefined => {
  return tracks.find(track => track.id === trackId);
};
