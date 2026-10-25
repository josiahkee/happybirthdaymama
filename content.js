/* =====================================================================
 *  MOM'S BIRTHDAY CONTENT FILE (26 October)
 *  Born: 26 October 1982
 *  All messages, puzzles, photo slots, and console replies live here!
 *
 *  TESTER PASSWORD (click the small key icon in the top-right corner):
 *    josiahjosiahjosiah123123123josiahjosiahjosiah!!
 *
 *  HOW TO ADD PHOTOS:
 *    Drop your photos into the "mom_birthday/photos/" folder named:
 *      photo1.jpg (or .png), photo2.jpg, photo3.jpg, photo4.jpg
 *    Or edit the file names and captions in `photos` below!
 * ===================================================================== */
window.BIRTHDAY_CONFIG = {
  name: "Mom",
  birthYear: 1982,
  age: 44,
  cakeBadge: "♥",
  countdownTitle: "Countdown to mom's birthday",
  birthdayTitle: "Happy birthday mom!!",
  signoffLine: "love, josiah",
  testPassword: "josiahjosiahjosiah123123123josiahjosiahjosiah!!",
  timeZone: "Asia/Singapore",
  countdownStart: "2026-10-25T00:00:00+08:00",
  birthday: "2026-10-26T00:00:00+08:00",  // 26 October 00:00!
  candles: 7,
  autoplayMusic: true,

  /* ------------------------------------------------------------------
   *  PHOTOS (Used in both the Photo Album card and Birthday Scrapbook)
   *  Tip: You can drop .jpg, .png, .jpeg, or .webp files into /photos/
   *  and it will automatically find them!
   * ------------------------------------------------------------------ */
  photos: [
    { photo: "photos/photo1.jpg", caption: "best mom ever" },
    { photo: "photos/photo2.jpg", caption: "holiday memories" },
    { photo: "photos/photo3.jpg", caption: "always smiling :)" },
    { photo: "photos/photo4.jpg", caption: "love u mom!!" },
  ],

  /* ------------------------------------------------------------------
   *  6 INTERACTIVE BIRTHDAY ACTIVITIES
   *  Cards 1 to 5 are open right away; Card 6 unlocks at 26/10 00:00!
   *  On and after 26/10, all 6 stay unlocked forever.
   * ------------------------------------------------------------------ */
  advent: [
    {
      day: 1,
      dateText: "Part 1",
      unlock: "2026-10-25T00:00:00+08:00",
      type: "wordle",
      iconKey: "wordle",
      title: "Birthday Wordle",
      subtitle: "guess the 5-letter birthday word in 6 tries!!",
      answer: "HAPPY",
      winMessage: "yay!! you got HAPPY!! now open Part 2 to unlock the second half :)",
    },
    {
      day: 2,
      dateText: "Part 2",
      unlock: "2026-10-25T00:00:00+08:00",
      type: "birthdayPuzzle",
      iconKey: "puzzle",
      title: "Unlock the Secret Word",
      subtitle: "solve each mini clue (their golden 1st letters spell the secret 8-letter word!)",
      targetWord: "BIRTHDAY",
      clues: [
        { answer: "BLOOM",  clue: "What spring flowers do in the garden (5)" },
        { answer: "ISLAND", clue: "A sunny travel getaway surrounded by the sea (6)" },
        { answer: "ROSE",   clue: "Classic romantic flower with soft petals (4)" },
        { answer: "TRIP",   clue: "Packing suitcases for a family holiday (4)" },
        { answer: "HEART",  clue: "K-drama actors always make a cute finger ___ (5)" },
        { answer: "DRAMA",  clue: "Staying up for just one more Korean ___ episode (5)" },
        { answer: "ALBUM",  clue: "Where we keep all our favourite travel photos (5)" },
        { answer: "YEAR",   clue: "1982 was a very iconic ___! (4)" },
      ],
      winMessage: "HAPPY + BIRTHDAY unlocked!! you solved every clue!!",
    },
    {
      day: 3,
      dateText: "Flowers",
      unlock: "2026-10-25T00:00:00+08:00",
      type: "bouquet",
      iconKey: "bouquet",
      title: "Build Your Flower Bouquet",
      subtitle: "tap flowers below to arrange your own birthday bouquet!!",
      flowerNotes: [
        "fresh blooms just for u!!",
        "prettier than any flower shop :)",
        "thank u for taking care of everyone always",
        "hope your day is full of flowers!!",
        "best mom since 1982!!",
      ],
    },
    {
      day: 4,
      dateText: "Travel",
      unlock: "2026-10-25T00:00:00+08:00",
      type: "travelScratch",
      iconKey: "travel",
      title: "Passport & K-Drama Pass",
      subtitle: "stamp your dream destinations + scratch off the golden pass below!",
      destinations: ["Seoul", "Jeju", "Kyoto", "Swiss Alps", "Paris", "Hokkaido"],
      scratchPrompt: "rub / drag across the rose-gold foil to scratch it off!!",
      scratchSecret: "good for: more family trips together + cosy kdrama marathons + all the flowers u deserve!!",
    },
    {
      day: 5,
      dateText: "Memories",
      unlock: "2026-10-25T00:00:00+08:00",
      type: "album",
      iconKey: "album",
      title: "Photo Album",
      subtitle: "tap photos to zoom in, or pick a pixel sticker to decorate :)",
      note: "so grateful for every trip and memory together!!",
    },
    {
      day: 6,
      dateText: "26/10",
      unlock: "2026-10-26T00:00:00+08:00",
      type: "fireworks",
      iconKey: "heart",
      title: "26/10 · Happy Birthday Mom!!",
      message: "happy birthday!! enjoy the day!",
      fireworkPrompt: "tap anywhere in the night sky to launch birthday fireworks!!",
    },
  ],

  /* ------------------------------------------------------------------
   *  DOUBLE-TAP CLOCK PETAL CHEERS
   * ------------------------------------------------------------------ */
  petalCheers: [
    "love u mom!!",
    "best mom since 1982!!",
    "flowers & hugs for u :)",
  ],

  /* ------------------------------------------------------------------
   *  LO-FI RADIO STATIONS
   *  Endless cozy lo-fi beats generated live (chords, drums & vinyl)!
   *  (You can also drop .mp3 files into mom_birthday/audio/ if you want)
   * ------------------------------------------------------------------ */
  playlist: [
    {
      title: "Flower Shop Rain",
      artist: "lofi beats · 74 bpm",
      src: "lofi:flowers",
    },
    {
      title: "Seoul Cafe Midnight",
      artist: "lofi beats · 68 bpm",
      src: "lofi:kdrama",
    },
    {
      title: "Window Seat Clouds",
      artist: "lofi beats · 76 bpm",
      src: "lofi:travel",
    },
    {
      title: "Birthday Tea (26.10)",
      artist: "lofi beats · 72 bpm",
      src: "lofi:birthday",
    },
  ],

  /* ------------------------------------------------------------------
   *  BIRTHDAY DAY (26 Oct 00:00+)
   * ------------------------------------------------------------------ */
  cake: {
    hint: "make a birthday wish, then blow into your mic (or tap the candles)!",
    done: "yay!! scroll down to open your birthday note and photo album :)",
  },

  letter: {
    greeting: "happy birthday mom!!",
    body: "happy birthday!! enjoy the day!",
    signoff: "love, josiah",
  },

  /* ------------------------------------------------------------------
   *  SECRET CONSOLE (the [>_] button at the bottom, or press ` key)
   * ------------------------------------------------------------------ */
  terminal: {
    whoami: "mom · born 26.10.1982 · flower lover, kdrama connoisseur, world traveller :)",
    kdrama:
      "tonight's kdrama checklist:\n" +
      "  1. cosy blanket + tea\n" +
      "  2. zero chores allowed\n" +
      "  3. cliffhanger episode marathon\n" +
      "  4. finger hearts from josiah <3",
    travel:
      "next boarding pass: wherever mom wants to go next!!",
    flowers:
      "   (@) (@) (@)\n" +
      "    \\  |  /\n" +
      "     \\ | /\n" +
      "      \\|/\n" +
      "      ===\n" +
      "   fresh birthday bouquet for mom!!",
    wish: "happy birthday mom!! thank you for everything always. love, josiah",
  },
};
