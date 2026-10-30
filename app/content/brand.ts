import type { BrandConcept } from "./types";

export const brand: BrandConcept = {
  id: "lamplight",
  letter: "A",
  direction: "Heritage devotional: warm and reverent",
  name: "Lamplight",
  productName: "Lamplight Bible Guide",
  tagline: "A lamp for every book.",
  story:
    "Lamplight takes its name from Psalm 119:105. It is for faithful readers who love their Bible and still sometimes feel they are reading it in the dark: who wrote this, and why, and what was happening at the time? One page of background for each of the 66 books, bound like the Bibles they treasure, and set in print they can read.",
  audience:
    "Devoted churchgoers aged 40–65, many of them women who lead or attend a weekly study, and the people who buy gifts for them: children, grandchildren, friends from church.",
  positioning:
    "The reverent companion to your Bible: a beautifully bound guide to the background of every book, written plainly and printed to be read.",
  personality: ["Reverent", "Warm", "Unhurried", "Trustworthy"],
  hypothesis:
    "Readers who already own a well-loved Bible respond to an object that feels like it belongs beside it. Heritage design, honest copy and large print should convert gift buyers and devoted readers from Facebook and win the competitor's unhappy small-print customers.",
  traffic:
    "Facebook and Instagram, church-community audiences, gifting seasons",
  photography:
    "Morning light on a reading table: an open Bible, the guide beside it, a cup of tea, a pencil. Warm wood and linen, real hands, no posed smiles at the camera.",
  packaging:
    "A cream box with an oxblood band and a gold lamp mark, the guide wrapped in tissue, and a card printed with Psalm 119:105 (KJV).",
  promotion:
    "Quiet, gracious announcements on parchment ('Our gifting prices, ahead of the season'). No countdowns, no stock warnings.",
  logoNote:
    "Cormorant Garamond wordmark with a small oil-lamp mark. The lamp debosses in gold on the cover and stands alone as a seal.",
  palette: [
    { name: "Parchment", hex: "#F6EFE3", role: "Background" },
    { name: "Ink", hex: "#2B2118", role: "Text" },
    { name: "Oxblood", hex: "#6B1E23", role: "Buttons, headings" },
    { name: "Gold leaf", hex: "#9A7631", role: "Labels, rules" },
    { name: "Sand", hex: "#ECE0CA", role: "Panels" },
    { name: "Saddle", hex: "#A8622F", role: "Cover leather" },
  ],
  fonts: {
    heading: {
      family: "Cormorant Garamond",
      weights: "500, 600, 700 + italic 500",
    },
    body: { family: "Source Sans 3", weights: "400, 600" },
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;600&display=swap",
  },
  layout: {
    header: "centred",
    hero: "gallery-left",
    bundlePicker: "stacked",
    reviews: "pull-quotes",
    valueProps: "alternating",
    divider: "double-rule",
  },
  compare: {
    heroImage: "flatlay-coffee",
    headline: "A lamp for every book.",
    cta: "See the guide",
  },
  bundleNames: {
    one: { title: "One guide", subtitle: "For your own study" },
    three: { title: "Three guides", subtitle: "Keep one, give two" },
    five: { title: "Five guides", subtitle: "For a household or a group" },
  },
  offers: {
    standard: {
      banner: "Complimentary 30-day reading plan with three or more guides",
      eyebrow: "A guide to the 66 books",
      cta: "Add to bag",
      badge: "Saving",
    },
    "early-black-friday": {
      banner: "Early Black Friday · Our gifting prices, ahead of the season",
      eyebrow: "Early Black Friday",
      headline: "Give the gift of understanding, early",
      cta: "Add at the early price",
      badge: "Early Black Friday",
    },
  },
  pdp: {
    eyebrow: "A guide to the 66 books",
    titleBenefit:
      "the background to every book of the Bible, one page at a time",
    subheadline:
      "Who wrote it, when, why and to whom, with an outline, the key themes and one step to take. Read the page in five minutes, then open your Bible knowing where you are.",
    bullets: [
      { icon: "book", text: "One page for each of the 66 books" },
      { icon: "context", text: "Author, date, audience and setting" },
      { icon: "type", text: "Larger print, made to be read" },
      { icon: "ribbon", text: "Bound in faux leather with a ribbon marker" },
    ],
    stepHeading: "Step 1. Choose how many",
    colourStep: "Step 2. Choose a cover for each",
    underButtonReview: "cherri",
    gallery: {
      benefit: {
        eyebrow: "Lamplight",
        headline: "Know the story behind every book.",
        sub: "One page of background for each of the 66",
      },
      inUse: {
        headline: "Five minutes before you read",
        sub: "The page first, then the passage",
      },
      comparison: {
        headline: "The same verse, read two ways",
        left: "Read on its own",
        right: "With the page first",
        note: "John 2:6, King James Version. The background notes are from our sample page.",
      },
      included: { headline: "In the box" },
      howItWorks: { headline: "Four quiet steps" },
      versus: { headline: "How it compares" },
      review: { headline: "In a reader's words", reviewId: "carol" },
    },
    description: [
      "The Lamplight Bible Guide is a companion to the Bible you already love. For each of its 66 books there is one page: who wrote it and when, who it was first written to, what was happening in the world at the time, how the book unfolds, the themes it returns to, and one truth and one step to carry with you.",
      "It is written in plain language, without seminary terms, and set in larger print than most guides of its kind, so you can read it in the morning light without reaching for a magnifier. Each page faces a blank one for your own notes, questions and prayers.",
      "Read a page in five minutes before you begin a book, then keep it open beside your Bible as you read. The guide doesn't replace Scripture or tell you what to believe; it gives you the background that the first readers already knew. Bound in faux leather with a ribbon marker, in Saddle, Walnut or Ebony.",
    ],
    whyLove: [
      {
        title: "The background, before you begin",
        body: "Author, date, audience and setting for every book, so the text makes sense from the first verse.",
      },
      {
        title: "One page, every time",
        body: "The same layout for all 66 books. Once you've read one page, you know your way around them all.",
      },
      {
        title: "Print made to be read",
        body: "Larger type than the competitor's guide, because small print was their readers' most common complaint.",
      },
      {
        title: "Room for your own words",
        body: "A facing page for each book, for questions, cross-references and prayers.",
      },
      {
        title: "Plain language, careful scholarship",
        body: "No jargon. Where scholars differ on authorship or dates, the page says so.",
      },
      {
        title: "A gift worth keeping",
        body: "Bound in faux leather with a ribbon marker, in three covers. Three guides cost the same as two at the single price.",
      },
    ],
    problem: {
      eyebrow: "Why Lamplight",
      headline: "Faithful readers deserve the background, too",
      body: [
        "So many of us have read the Bible for years and still, quietly, feel we are missing something. We know the stories, but not who first heard them, or why, or what was happening in the world when they were written.",
        "Pastors and scholars carry that background with them. Lamplight puts it on a single page for every book, in plain words and readable print, so anyone can open their Bible the way its first readers did: knowing where they are.",
      ],
    },
    useCases: {
      headline: "Where it belongs",
      items: [
        {
          title: "Morning devotions",
          body: "A page before your reading, a note on the facing page, and a step for the day.",
          image: "flatlay-coffee",
        },
        {
          title: "Your weekly study",
          body: "Read the book's page before the group meets, and arrive knowing its story.",
          image: "interior-exodus",
        },
        {
          title: "Reading the whole Bible",
          body: "Sixty-six pages that keep you oriented from Genesis to Revelation.",
          image: "open-pages",
        },
        {
          title: "A gift for someone you love",
          body: "For a new believer, a graduate or a grandparent: a guide they will use, not shelve.",
          image: "flatlay-autumn",
        },
      ],
    },
    calloutsHeadline: "What every page holds",
    promise: {
      headline: "A note from Lamplight",
      body: [
        "We made this guide for readers who love their Bible and want to understand it more deeply. If it doesn't earn its place beside yours within {days} days, return it for a full refund, even if you've written in it.",
        "We will always tell you plainly what is confirmed and what is not. Where scholars differ, our pages say so.",
      ],
      signoff: "The Lamplight team",
    },
    proofLine: "Read by {customers} people who want to understand their Bible",
    pressHeadline: "As noted in",
    ugcHeadline: "On readers' tables",
    expertHeadline: "A teacher's view",
    qnaHeadline: "Questions from readers",
    kitHeadline: "For your study",
    guaranteeHeadline: "Thirty days to decide",
    finalCta: {
      headline: "Open your Bible knowing where you are",
      body: "Rated {rating} out of 5 by {count} readers, with free shipping over {free} and {days} days to decide.",
      cta: "Choose your guide",
    },
    stripHeadline: "Beside the Bible",
    reviewsHeadline: "In their words",
    reviewsSub: "Rated {rating} out of 5 across {count} reviews.",
    valuePropsHeadline: "Made to sit beside your Bible",
    valuePropsSub:
      "Everything about Lamplight is meant to help you read Scripture with understanding, and nothing more.",
    valueProps: [
      {
        headline: "The context the first readers already had",
        body: "Who wrote each book, when, to whom, and what was happening at the time. One page, read in five minutes before you begin.",
        image: "interior-exodus",
      },
      {
        headline: "One layout for all sixty-six",
        body: "The same order on every page: snapshot, outline, themes, what to look for, and one truth and one step to carry with you.",
        image: "open-pages",
      },
      {
        headline: "Print you can read in the morning light",
        body: "We heard what readers of other guides said about tiny type. Lamplight is set larger, so you can read without a magnifier.",
        image: "gallery-in-use",
      },
      {
        headline: "Bound to last, made to be given",
        body: "Faux leather, a ribbon marker and a facing page for your notes, in Saddle, Walnut or Ebony.",
        image: "flatlay-autumn",
      },
    ],
    howItWorksHeadline: "How it works",
    comparisonHeadline: "Lamplight, a study Bible and a commentary",
    closingHeadline: "Before you decide",
    faqHeadline: "Questions",
    footerBlurb:
      "Lamplight is a provisional brand. Orders aren't open yet: this store is still in development.",
  },
  advertorial: {
    kicker: "The Lamplight Journal",
    headline:
      "Why faithful readers still feel lost in Scripture, and the one page that helps",
    dek: "On reading the Bible with the background its first readers already had.",
    byline: "Words by the Lamplight editors (concept byline)",
    readTime: "6 min read",
    leadImage: "flatlay-coffee",
    leadCaption: "Competitor photo, used as a placeholder for our own.",
    intro: [
      "There is a particular kind of quiet frustration that many faithful readers know. You have read the Bible for years. You know the stories. And still, alone with a page of Habakkuk or Hebrews, you sense that something important is passing you by.",
      "It is rarely a matter of faith or effort. More often it is a matter of background: the things the first readers knew without being told, which we now have to learn.",
    ],
    sections: [
      {
        title: "The Bible was written to someone first",
        body: [
          "Every book of the Bible was written by someone, to someone, at a particular moment. Paul's letters answer questions we never see. The prophets speak into crises their hearers were living through.",
          "When we know who was speaking, and to whom, the words stop floating free and settle into their place.",
        ],
        verse: "nehemiah-8-8",
      },
      {
        title: "A story you know, with the background",
        body: [
          'At Cana, John tells us there were six stone jars "after the manner of the purifying of the Jews". Many readers pass over the detail. Yet those were the jars of ritual washing, and Jesus filled them with wine. John calls it the first of His signs.',
          "Nothing in the story changes. But read with its background, it says far more.",
        ],
        verse: "john-2-6",
        image: "interior-exodus",
        caption:
          "Competitor photo of their interior page, used as a placeholder.",
      },
      {
        title: "Why one page is enough to begin",
        body: [
          "Commentaries are wonderful, and long. Most of us need something shorter: a page we can read in five minutes before we open the book, and keep beside us as we read.",
          "That is the whole idea of the Lamplight guide. One page for each book: who wrote it, when and why, how it unfolds, the themes it returns to, and one truth and one step to carry into the week.",
        ],
      },
      {
        title: "A pastor's view",
        body: [
          "This is where a real pastor or Bible teacher will share, in their own words, how they use background pages like these with their congregation.",
        ],
        placeholder:
          "Slot for a real, consenting pastor's words: no invented quotes",
      },
      {
        title: "Print that respects the reader",
        body: [
          "Readers of other guides like this one have told the same story again and again: the content helped, but the print was too small to read without a magnifier.",
          "So Lamplight is set larger. It is a small decision, and it matters to the people this guide is for.",
        ],
        image: "gallery-in-use",
        caption: "Competitor photo, used as a placeholder.",
      },
      {
        title: "A lamp, not a substitute",
        body: [
          "The guide doesn't replace Scripture, and it doesn't tell you what to believe. It gives you the background, and then it gets out of the way.",
        ],
        verse: "psalm-119-105",
      },
    ],
    closing: {
      headline: "Open your Bible knowing where you are",
      body: "The Lamplight Bible Guide: one page of background for each of the 66 books, in larger print, bound in faux leather.",
      cta: "See the guide",
    },
  },
  advertorialSlug: "why-faithful-readers-still-feel-lost-in-scripture",
  store: {
    motion: "drift",
    nav: {
      shop: "Collection",
      product: "The Guide",
      how: "How it works",
      journal: "Journal",
      about: "About",
    },
    products: {
      guide: {
        name: "Lamplight Bible Guide",
        blurb:
          "One page of background for each of the 66 books, in larger print, bound in faux leather with a ribbon marker.",
      },
      "leader-pack": {
        name: "The Lamplight Group Set",
        blurb:
          "Five guides, printed leader notes for six sessions and a bookmark for each member.",
      },
      highlighters: {
        name: "Gel Highlighter Set",
        blurb:
          "Six soft gel highlighters and two fine pens for thin Bible paper.",
      },
      "verse-cards": {
        name: "Memory Verse Cards",
        blurb:
          "Fifty-two King James verses, one for each week, with their context.",
      },
      "gift-card": {
        name: "Lamplight Gift Card",
        blurb: "Let them choose their cover. Digital, sent by email.",
      },
    },
    colourNames: {
      saddle: "Saddle",
      espresso: "Walnut",
      black: "Ebony",
    },
    home: {
      hero: {
        eyebrow: "The Lamplight Bible Guide",
        headline: "A lamp for every book.",
        sub: "One page of background for each of the 66 books of the Bible: who wrote it, when, why and to whom. Read it in five minutes, then open your Bible knowing where you are.",
        cta: "See the guide",
        secondary: "How it works",
        image: "flatlay-coffee",
      },
      ticker: [
        "66 books",
        "One page each",
        "Larger print",
        "Faux leather",
        "Ribbon marker",
        "Any translation",
      ],
      featured: {
        eyebrow: "Three covers",
        headline: "Saddle, Walnut or Ebony",
        body: "Bound in soft faux leather with a debossed lamp and a ribbon marker. Choose one for yourself, and perhaps two to give.",
        cta: "Choose a cover",
      },
      inside: {
        eyebrow: "Inside the guide",
        headline: "Sixty-six books. Sixty-six pages.",
        body: "Every page follows the same order: the snapshot, the outline, the themes, what to look for, and one truth and one step. Here is the page for Exodus, and the full list of books.",
      },
      howHeadline: "Four quiet steps",
      reviewsHeadline: "In their words",
      accessoriesHeadline: "For your study",
      story: {
        headline: "Why we called it Lamplight",
        body: '"Thy word is a lamp unto my feet, and a light unto my path" (Psalm 119:105, KJV). We made a guide for faithful readers who want to understand the books they love: the background on one page, in print they can read.',
        image: "book-wood",
        cta: "Our story",
      },
      journalHeadline: "From the journal",
      newsletter: {
        headline: "A page a week",
        body: "One book of the Bible, its background in a few paragraphs, every Sunday morning.",
        cta: "Subscribe",
        success: "Sign-up isn't connected yet, so nothing was sent.",
      },
    },
    shop: {
      headline: "The collection",
      sub: "The guide in three covers, a group set, and a few quiet companions for your study.",
    },
    about: {
      headline: "For readers who love their Bible",
      intro:
        "Lamplight began with a simple observation: faithful readers often know the stories of Scripture but not the background, and the background changes how the stories read.",
      image: "book-wood",
      sections: [
        {
          title: "Background, not opinion",
          body: "Each page gives the context of a book: who wrote it, when, to whom and why. It doesn't tell you what to believe. Where scholars differ, the page says so.",
          image: "interior-exodus",
        },
        {
          title: "Made to be read",
          body: "Larger print, a facing page for notes and a ribbon marker. A guide should be a pleasure to open.",
          image: "gallery-in-use",
        },
      ],
      values: [
        {
          title: "Reverent",
          body: "Scripture first. The guide is a lamp, not a substitute.",
        },
        {
          title: "Plain",
          body: "No jargon, no hype. Clear words for every reader.",
        },
        {
          title: "Honest",
          body: "Everything on this site that isn't confirmed yet says so.",
        },
      ],
    },
    contact: {
      headline: "Write to us",
      body: "Questions about the guide, an order or a gift? Send us a note and we'll reply within one business day.",
    },
    cart: {
      empty: "Your bag is empty.",
      upsell: "For your study",
    },
    thankYou: {
      headline: "Thank you. Your order is in.",
      body: "Orders aren't open yet: this store is in development, so nothing was charged and nothing will ship.",
    },
    notFound: {
      headline: "This page has gone astray",
      body: "We couldn't find what you were looking for. The collection is a good place to begin again.",
    },
  },
};
