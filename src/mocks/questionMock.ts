// src/mocks/questionMock.ts

export interface TOEFLQuestion {
  id: string;
  section: 'listening' | 'structure' | 'reading'; // Sesuai endpoint API backend
  audio_url?: string;       // Hanya ada kalau section === 'listening'
  passage_text?: string;    // Hanya ada kalau section === 'reading' (teks bacaan panjang)
  question_text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer?: string;
}

export const mockTOEFLQuestions: TOEFLQuestion[] = [
  // 1. Contoh Data Fitur dari API Listening
  {
    id: "LIST_001",
    section: "listening",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    question_text: "What does the man imply about the research paper?",
    options: {
      A: "He has already finished it.",
      B: "He needs more time to gather data.",
      C: "He wants the woman to look at his draft.",
      D: "He is going to change his topic entirely."
    }
  },
  // 2. Contoh Data Fitur dari API Structure
  {
    id: "STR_001",
    section: "structure",
    question_text: "The North Pole ________ a latitude of 90 degrees North.",
    options: {
      A: "has",
      B: "is having",
      C: "which has",
      D: "it has"
    }
  },
  // 3. Contoh Data Fitur dari API Reading
  {
    id: "READ_001",
    section: "reading",
    passage_text: "The United States severe weather networks are highly advanced. Tornadoes, which are violently rotating columns of air, can cause immense destruction within minutes...",
    question_text: "What is the main topic of the passage?",
    options: {
      A: "The history of tornadoes in America.",
      B: "Advanced severe weather networks in the US.",
      C: "How to survive a rotating column of air.",
      D: "The destruction caused by local storms."
    }
  }
];

// Tambahkan ini di bagian paling bawah src/mocks/questionMock.ts

export interface TOEFLResultAnalytic {
  student_id: string;
  total_score: number;
  section_scores: {
    listening: number;
    structure: number;
    reading: number;
  };
  ai_analysis: {
    strength: string;
    weakness: string;
    recommendation: string;
    topic_mastery: { topic: string; mastery_percentage: number; section: string }[];
  };
}

export const mockTOEFLResult: TOEFLResultAnalytic = {
  student_id: "STUD001",
  total_score: 520, // Skor total TOEFL instan
  section_scores: {
    listening: 52,
    structure: 48,
    reading: 56
  },
  ai_analysis: { // Hasil olahan engine machine learning / analitik backend [cite: uploaded:ayala-crea/api-be_toefl/api-be_toefl-64a492a616c466d8e9e4ea78fc960c1d80576bcb/analytic score student/get analisis jawaban student.yml, uploaded:ayala-crea/api-be_toefl/api-be_toefl-64a492a616c466d8e9e4ea78fc960c1d80576bcb/model machine learning/folder.yml]
    strength: "Sangat kuat dalam memahami ide utama (main idea) pada bacaan panjang di sesi Reading.",
    weakness: "Sering terkecoh pada penggunaan Participle Clauses dan Inversion pada sesi Structure.",
    recommendation: "Fokuskan latihan mandiri pada topik tata bahasa 'Inversion' dan perbanyak mendengarkan percakapan idiomatis (idioms) untuk mendongkrak nilai Listening.",
    topic_mastery: [
      { topic: "Main Idea Questions", mastery_percentage: 85, section: "reading" },
      { topic: "Vocabulary in Context", mastery_percentage: 70, section: "reading" },
      { topic: "Inversion Structure", mastery_percentage: 40, section: "structure" },
      { topic: "Participle Clauses", mastery_percentage: 35, section: "structure" },
      { topic: "Short Dialogues", mastery_percentage: 60, section: "listening" }
    ]
  }
 } 

export interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  joined_date: string;
}

export const mockStudents: Student[] = [
  {
    id: "STUD001",
    name: "Rangga Maulana",
    email: "rangga@piksi.ac.id",
    major: "Teknik Elektro & Informatika",
    joined_date: "2026-01-15"
  },
  {
    id: "STUD002",
    name: "Siti Rahma",
    email: "siti.rahma@piksi.ac.id",
    major: "Akuntansi Komputer",
    joined_date: "2026-02-10"
  },
  {
    id: "STUD003",
    name: "Budi Santoso",
    email: "budi.s@piksi.ac.id",
    major: "Manajemen Informatika",
    joined_date: "2026-03-01"
  }
];
