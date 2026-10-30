// The 66 books of the Protestant canon, in order, and four full sample pages
// for the "Look inside" previews.
//
// CONTENT REVIEW NEEDED. The sample pages are written for the concept, not
// for print. Before launch every page must be written or reviewed by a
// qualified, consenting reviewer. Authorship says "traditionally attributed
// to" and dates are ranges where scholars differ; verses are King James
// Version (public domain) only.

import type { VerseRef } from "./scripture";

export type Testament = "Old" | "New";

export type Section =
  | "The Law"
  | "History"
  | "Poetry and Wisdom"
  | "Major Prophets"
  | "Minor Prophets"
  | "The Gospels"
  | "Acts"
  | "Paul's Letters"
  | "General Letters"
  | "Prophecy";

export type Book = {
  id: string;
  name: string;
  testament: Testament;
  section: Section;
  chapters: number;
};

const list: [name: string, section: Section, chapters: number][] = [
  ["Genesis", "The Law", 50],
  ["Exodus", "The Law", 40],
  ["Leviticus", "The Law", 27],
  ["Numbers", "The Law", 36],
  ["Deuteronomy", "The Law", 34],
  ["Joshua", "History", 24],
  ["Judges", "History", 21],
  ["Ruth", "History", 4],
  ["1 Samuel", "History", 31],
  ["2 Samuel", "History", 24],
  ["1 Kings", "History", 22],
  ["2 Kings", "History", 25],
  ["1 Chronicles", "History", 29],
  ["2 Chronicles", "History", 36],
  ["Ezra", "History", 10],
  ["Nehemiah", "History", 13],
  ["Esther", "History", 10],
  ["Job", "Poetry and Wisdom", 42],
  ["Psalms", "Poetry and Wisdom", 150],
  ["Proverbs", "Poetry and Wisdom", 31],
  ["Ecclesiastes", "Poetry and Wisdom", 12],
  ["Song of Songs", "Poetry and Wisdom", 8],
  ["Isaiah", "Major Prophets", 66],
  ["Jeremiah", "Major Prophets", 52],
  ["Lamentations", "Major Prophets", 5],
  ["Ezekiel", "Major Prophets", 48],
  ["Daniel", "Major Prophets", 12],
  ["Hosea", "Minor Prophets", 14],
  ["Joel", "Minor Prophets", 3],
  ["Amos", "Minor Prophets", 9],
  ["Obadiah", "Minor Prophets", 1],
  ["Jonah", "Minor Prophets", 4],
  ["Micah", "Minor Prophets", 7],
  ["Nahum", "Minor Prophets", 3],
  ["Habakkuk", "Minor Prophets", 3],
  ["Zephaniah", "Minor Prophets", 3],
  ["Haggai", "Minor Prophets", 2],
  ["Zechariah", "Minor Prophets", 14],
  ["Malachi", "Minor Prophets", 4],
  ["Matthew", "The Gospels", 28],
  ["Mark", "The Gospels", 16],
  ["Luke", "The Gospels", 24],
  ["John", "The Gospels", 21],
  ["Acts", "Acts", 28],
  ["Romans", "Paul's Letters", 16],
  ["1 Corinthians", "Paul's Letters", 16],
  ["2 Corinthians", "Paul's Letters", 13],
  ["Galatians", "Paul's Letters", 6],
  ["Ephesians", "Paul's Letters", 6],
  ["Philippians", "Paul's Letters", 4],
  ["Colossians", "Paul's Letters", 4],
  ["1 Thessalonians", "Paul's Letters", 5],
  ["2 Thessalonians", "Paul's Letters", 3],
  ["1 Timothy", "Paul's Letters", 6],
  ["2 Timothy", "Paul's Letters", 4],
  ["Titus", "Paul's Letters", 3],
  ["Philemon", "Paul's Letters", 1],
  ["Hebrews", "General Letters", 13],
  ["James", "General Letters", 5],
  ["1 Peter", "General Letters", 5],
  ["2 Peter", "General Letters", 3],
  ["1 John", "General Letters", 5],
  ["2 John", "General Letters", 1],
  ["3 John", "General Letters", 1],
  ["Jude", "General Letters", 1],
  ["Revelation", "Prophecy", 22],
];

export const books: Book[] = list.map(([name, section, chapters], i) => ({
  id: name.toLowerCase().replaceAll(" ", "-"),
  name,
  testament: i < 39 ? "Old" : "New",
  section,
  chapters,
}));

/** Sections in canon order, with their books. */
export const sections = books.reduce<{ section: Section; books: Book[] }[]>(
  (out, book) => {
    const last = out.at(-1);
    if (
      last?.section === book.section &&
      last.books[0].testament === book.testament
    )
      last.books.push(book);
    else out.push({ section: book.section, books: [book] });
    return out;
  },
  [],
);

export const bookCounts = {
  total: books.length,
  old: books.filter((b) => b.testament === "Old").length,
  new: books.filter((b) => b.testament === "New").length,
  chapters: books.reduce((sum, b) => sum + b.chapters, 0),
};

/** One printed page of the guide. Every field fits on a single A5 page. */
export type SamplePage = {
  bookId: string;
  /** "Book 2 of 66 · The Law" */
  label: string;
  /** One line under the title. */
  tagline: string;
  author: string;
  written: string;
  audience: string;
  setting: string;
  outline: [chapters: string, summary: string][];
  themes: [theme: string, note: string][];
  lookFor: string[];
  bigIdea: string;
  truth: string;
  step: string;
  keyVerse: VerseRef;
};

export const samplePages: SamplePage[] = [
  {
    bookId: "genesis",
    label: "Book 1 of 66 · The Law",
    tagline: "The book of beginnings",
    author: "Traditionally attributed to Moses",
    written:
      "Traditionally the 1400s BC; many scholars date its final form later",
    audience: "Israel, learning where they came from and who their God is",
    setting: "From creation to Joseph in Egypt",
    outline: [
      ["1–11", "Beginnings: creation, the fall, the flood, Babel"],
      ["12–25", "Abraham: God's call and promise"],
      ["25–36", "Isaac and Jacob: the promise passed on"],
      ["37–50", "Joseph: from the pit to Pharaoh's court"],
    ],
    themes: [
      ["Creation", "God made everything, and made it good"],
      ["Promise", "A covenant with Abraham to bless all nations"],
      ["Faithfulness", "God keeps His word through flawed people"],
      ["Providence", "God works even through what others meant for evil"],
    ],
    lookFor: [
      "Covenant signs: the rainbow and circumcision",
      "Blessings passed from parent to child",
      "Altars and new names marking encounters with God",
    ],
    bigIdea:
      "God creates, His people fall, and He begins a rescue through one family.",
    truth: "God keeps His promises, even through long delays.",
    step: "Write down one promise you're waiting on, and read 50:20 when the wait feels long.",
    keyVerse: "genesis-50-20",
  },
  {
    bookId: "exodus",
    label: "Book 2 of 66 · The Law",
    tagline: "Rescued to belong",
    author: "Traditionally attributed to Moses",
    written: "Traditionally the 1400s BC; scholars differ on the date",
    audience: "Israel, newly freed and learning to live as God's people",
    setting: "Egypt, the Red Sea and Mount Sinai",
    outline: [
      ["1–15", "Slavery and rescue: Moses, the plagues, the Passover"],
      ["16–18", "The wilderness: manna, water and a long walk"],
      ["19–24", "Mount Sinai: the covenant and the Ten Commandments"],
      ["25–40", "The tabernacle: God's presence among His people"],
    ],
    themes: [
      ["Deliverance", "God hears His people and rescues them"],
      ["Covenant", "A people bound to God by promise and law"],
      ["Presence", "God chooses to live among them"],
      ["Worship", "Freedom for the purpose of serving God"],
    ],
    lookFor: [
      "The Passover lamb, remembered at the Last Supper",
      "Manna, echoed when Jesus feeds the crowds",
      "The tabernacle, a picture of God living with His people",
    ],
    bigIdea:
      "God rescues His people from slavery and teaches them how to live with Him.",
    truth: "God hears the cry of people who feel stuck.",
    step: "Read 3:7 each morning this week and bring one honest need to God.",
    keyVerse: "exodus-3-14",
  },
  {
    bookId: "psalms",
    label: "Book 19 of 66 · Poetry and Wisdom",
    tagline: "The Bible's prayer book",
    author:
      "Many writers: about half are attributed to David, others to Asaph, the sons of Korah, Solomon and Moses",
    written: "Over several centuries, roughly 1400–400 BC",
    audience: "Israel at worship, and anyone praying honestly",
    setting: "Temple worship, exile and everyday life",
    outline: [
      ["1–41", "Book I: mostly prayers of David"],
      ["42–72", "Book II: songs of trouble and trust"],
      ["73–89", "Book III: wrestling with a nation's loss"],
      ["90–106", "Book IV: God is King, from everlasting"],
      ["107–150", "Book V: praise, pilgrimage and thanks"],
    ],
    themes: [
      ["Lament", "Bringing grief and anger to God"],
      ["Praise", "Thanks for who God is and what He has done"],
      ["Trust", "Confidence in the middle of trouble"],
      ["Kingship", "God reigns, through His anointed king"],
    ],
    lookFor: [
      "Pairs of lines that say one thing twice, in different words",
      "Headings that name a tune, a writer or an occasion",
      "Psalms that move from complaint to praise",
    ],
    bigIdea: "Words for every season of the soul, given back to God as prayer.",
    truth: "You can bring God every feeling, not just the tidy ones.",
    step: "Read one psalm a day this week and write one line of your own prayer beside it.",
    keyVerse: "psalm-119-105",
  },
  {
    bookId: "john",
    label: "Book 43 of 66 · The Gospels",
    tagline: "Written so that you might believe",
    author: "Traditionally attributed to John, the beloved disciple",
    written: "Commonly dated AD 85–95, likely the last of the four Gospels",
    audience: "Believers and seekers, so that they might believe (20:31)",
    setting: "Galilee and Jerusalem, around the feasts of Israel",
    outline: [
      ["1", "The Word made flesh"],
      ["2–12", "The signs: miracles that point to who Jesus is"],
      ["13–17", "The upper room: Jesus' last teaching"],
      ["18–21", "The cross, the empty tomb and the risen Jesus"],
    ],
    themes: [
      ["Identity", "The seven “I am” sayings"],
      ["Belief", "Signs recorded “that ye might believe”"],
      ["Life", "Eternal life that begins now"],
      ["Love", "“As I have loved you”"],
    ],
    lookFor: [
      "Signs, starting with water into wine at Cana; many readers count seven",
      "Jewish feasts that frame what Jesus says",
      "Light and darkness, from chapter 1 to the empty tomb",
    ],
    bigIdea:
      "John chose his stories as evidence, so readers would believe Jesus is the Son of God.",
    truth: "Every sign in John points to who Jesus is.",
    step: "Read one sign a day and ask: what does this show me about Jesus?",
    keyVerse: "john-20-31",
  },
];

export function getBook(id: string) {
  const book = books.find((b) => b.id === id);
  if (!book) throw new Error(`Unknown book ${id}`);
  return book;
}
