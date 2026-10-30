// Every Bible verse the site quotes. King James Version only: it is in the
// public domain, so it can be printed and shown freely. Other translations
// (NIV, ESV, NLT…) are copyrighted and need the publisher's permission.
// check:content fails if a quoted verse on a page lacks its translation.

export type Translation = "KJV";

export const verses = {
  "genesis-50-20": {
    ref: "Genesis 50:20",
    text: "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.",
  },
  "exodus-3-14": {
    ref: "Exodus 3:14",
    text: "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.",
  },
  "nehemiah-8-8": {
    ref: "Nehemiah 8:8",
    text: "So they read in the book in the law of God distinctly, and gave the sense, and caused them to understand the reading.",
  },
  "psalm-1-2": {
    ref: "Psalm 1:2",
    text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night.",
  },
  "psalm-119-105": {
    ref: "Psalm 119:105",
    text: "Thy word is a lamp unto my feet, and a light unto my path.",
  },
  "psalm-119-130": {
    ref: "Psalm 119:130",
    text: "The entrance of thy words giveth light; it giveth understanding unto the simple.",
  },
  "proverbs-25-2": {
    ref: "Proverbs 25:2",
    text: "It is the glory of God to conceal a thing: but the honour of kings is to search out a matter.",
  },
  "matthew-18-20": {
    ref: "Matthew 18:20",
    text: "For where two or three are gathered together in my name, there am I in the midst of them.",
  },
  "mark-6-43": {
    ref: "Mark 6:43",
    text: "And they took up twelve baskets full of the fragments, and of the fishes.",
  },
  "luke-15-20": {
    ref: "Luke 15:20",
    text: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.",
  },
  "john-1-14": {
    ref: "John 1:14",
    text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
  },
  "john-2-6": {
    ref: "John 2:6",
    text: "And there were set there six waterpots of stone, after the manner of the purifying of the Jews, containing two or three firkins apiece.",
  },
  "john-20-31": {
    ref: "John 20:31",
    text: "But these are written, that ye might believe that Jesus is the Christ, the Son of God; and that believing ye might have life through his name.",
  },
  "acts-8-30": {
    ref: "Acts 8:30–31",
    text: "Understandest thou what thou readest? And he said, How can I, except some man should guide me?",
  },
  "acts-17-11": {
    ref: "Acts 17:11",
    text: "These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.",
  },
  "colossians-3-16": {
    ref: "Colossians 3:16",
    text: "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord.",
  },
  "hebrews-10-24": {
    ref: "Hebrews 10:24–25",
    text: "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together, as the manner of some is…",
  },
  "james-1-22": {
    ref: "James 1:22",
    text: "But be ye doers of the word, and not hearers only, deceiving your own selves.",
  },
} satisfies Record<string, { ref: string; text: string }>;

export type VerseRef = keyof typeof verses;

export const TRANSLATION: Translation = "KJV";

export function getVerse(id: VerseRef) {
  return { ...verses[id], translation: TRANSLATION };
}
