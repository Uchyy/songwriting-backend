import type { Song } from "../models/Song";

// Generic sample audio for frontend development.
// Replace with uploaded audio URLs from the admin dashboard.
const sampleAudio =  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const songs: Song[] = [
  {
    id: "song-001",
    published: true,
    title: "MAD",
    label: "mad",
    description: "Sometimes the line between love and madness is thinner than we think.",
    genre: ["Alternative Pop", "Dark Pop"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/F0E5D8/30251F?text=MAD",

    story:
      "MAD explores the intensity of emotions when feelings become difficult to contain. It plays with the idea of losing control, questioning your own reactions and wondering where passion ends and madness begins.",

    diary: [
      "The initial idea was built around the title and its emotional possibilities.",
      "Experimented with different vocal moods and musical directions.",
      "Developed the arrangement to give the song a stronger emotional identity.",
    ],

    lyrics: `you
(I've gone insane) Mad
(I can’t escape) Mad
(You've driven me) Mad over you
VERSE 2
Every night, you haunt my dreams
Nothing's ever what it seems
I lose myself inside your eyes
Can't tell the truth from the lies
It's a rush I can't deny
You're my poison, my supply
I know I'm playing with a flame
But I'd do it all again
HOOK 
I'm Craving, Ravenous
A hunger I can't undo - hazardous
Zigzaging, lost control 
You’ve invaded my heart and my soul
(I think, I think)
CHORUS
I think 
I've gone 
Mad! Mad!! 
Mad over you
HOOK 
I'm Craving, Ravenous
A hunger I can't undo - hazardous
Zigzaging, lost control 
You’ve invaded my heart and my soul
(I think, I think)
CHORUS
I think 
I've gone 
I think 
I've gone 
Mad! Mad!! 
Mad over you
(I've gone insane) Mad
(I can’t escape) Mad
(You've driven me) Mad over you
I think 
I've gone 
Mad! Mad!! 
Mad over you`,

    media: [
      {
        id: "mad-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
      {
        id: "mad-instrumental",
        mediaType: "INSTRUMENTAL",
        label: "Instrumental Version",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/ZIUXsycA1n973YVM",
    createdAt: "2026-10-01",
  },

  {
    id: "song-002",
    title: "Cheap Perfume",
    label: "cheap-perfume",
    description: "A scent, a memory and something that refuses to disappear.",
    genre: ["Pop", "Alternative"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/E9D9D0/30251F?text=CHEAP+PERFUME",

    story:
      "Cheap Perfume is built around the idea that the smallest details can bring back memories we thought we had left behind. A familiar scent becomes a reminder of someone, somewhere or something that once mattered.",

    diary: [
      "The title became the starting point for exploring the song's imagery.",
      "Experimented with ways to make the central idea feel intimate and memorable.",
      "Worked on finding a musical direction that suited the atmosphere.",
    ],

    lyrics: `Cold cold heart
Cold cold bed
Alone in a dark room
Waiting for you
Empty chair
Broken heart
When he comes in
Smelling like her cheap perfume

[INSTRUMENTAL]

A rotten smell
Poisoned air
I can barely breathe in
Suffocating 
Tainted shirt
With lipstick marks
Red is a colour 
And I'm seeing it

[INSTRUMENTAL]

CHORUS
What was love is now a lie
What was gold has lost its shine
What's a flower without it's bloom?
What's left of us but cheap perfume?


VERSE 3:
Clean white shirt
Stained beneath 
Still stinking of her cheap perfume
White to flames
Still remains
Can see the red
Beneath the amber flame

[INSTRUMENTAL]

Fists are balled
Voices raised
But neither of us can hear a thing


CHORUS
What was love is now a lie
What was gold has lost its shine
What's a flower without it's bloom?
What's left of us but cheap perfume?


What was love is now a lie
What was gold has lost its shine
What's a flower without it's bloom?
What's left of us but cheap perfume?

[INSTRUMENTAL]


Bridge:
(in almost a hushed whisper)
Wash it clean
Burn it down
Bury the ashes underground
The wall is stained
With the truth
What remains of me and you?

Wash it clean
Burn it down
Bury the ashes underground
The wall is stained
With the truth
What remains of me and you?

[INSTRUMENTAL]

CHORUS
What was love is now a lie
What was gold has lost its shine
What's a flower without it's bloom?
What's left of us but cheap perfume?`,

    media: [
      {
        id: "cheap-perfume-demo",
        mediaType : "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/o8VduQLmW98oelaW",
    createdAt: "2026-10-05",
     published: false,
  },

  {
    id: "song-003",
    title: "Lady in Red",
    label: "lady-in-red",
    description: "A mysterious presence wrapped in a bluesy, jazz-inspired atmosphere.",
    genre: ["Jazz", "Blues"],
    status: "IN_PROGRESS",
    artwork: "https://placehold.co/800x800/6B302F/FFF8ED?text=LADY+IN+RED",

    story:
      "Lady in Red creates an atmosphere around a striking figure. The song explores the intrigue and fascination that can surround someone who seems to command attention without saying very much.",

    diary: [
      "Started exploring a blues and jazz direction.",
      "Experimented with a more distinctive piano sound.",
      "Considered a slightly faster tempo while keeping the arrangement mellow.",
    ],

    lyrics: `VERSE 1

[Sample lyrics go here]

CHORUS

[Sample chorus goes here]`,

    media: [
      {
        id: "lady-in-red-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
      {
        id: "lady-in-red-instrumental",
        mediaType: "INSTRUMENTAL",
        label: "Instrumental",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/0lWoiWozyltCCORG",
    createdAt: "2026-10-08",
     published: true,
  },

  {
    id: "song-004",
    title: "Again",
    label: "again",
    description: "Some things have a way of bringing us right back to where we started.",
    genre: ["R&B", "Pop"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/D7C9BA/30251F?text=AGAIN",

    story:
      "Again explores the idea of repetition: returning to a familiar feeling, revisiting an old decision or finding yourself in a situation you thought you had moved beyond.",

    diary: [
      "Explored the emotional meaning behind the title.",
      "Worked on developing a memorable central hook.",
      "Tested different approaches to the arrangement.",
    ],

    lyrics: `AGAIN


There’s no one to hold me
No one to catch my fall
I'm floating in this void,
An abyss where echoes call.
I don’t know if can feel again
For your touch has left me wanting more

I don’t know if can ever
Ever feel again
I don’t know if can ever
Ever feel again

I’m looking all o’er
Did anyone find my love?
Came like a robber
Made away with my heart
Your love was my guiding star,
Now darkness is all that I can see.
I don’t know if I will ever
Ever love again


Again! Again!! Again!!!
Come and make me feel again


Standing at a crossroad
Not knowing what path to walk
Voices overload
Even gravity fights my fall
Left or right, or I’m stuck where I am
There is no light at the end of this

I don’t know if can ever
Ever feel again
I don’t know if can ever
Ever feel again


Again! Again!! Again!!!
Come and make me feel again
Again! Again!! Again!!!
Come and make me love again



I don’t think that I can breathe (Again)
Without you I lose my feet
Close to you, I stand so tall
Someone please catch my fall

Chorus:
Again! Again!! Again!!!
Come and make me feel again
Again! Again!! Again!!!
Come and make me love again
Again! Again!! Again!!!
Come and make me breathe again
`,

    media: [
      {
        id: "again-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/3scTvXrMQ98OCRSM",
    createdAt: "2026-10-10",
     published: true,
  },

  {
    id: "song-005",
    title: "Dance with Me",
    label: "dance-with-me",
    description: "An invitation to forget everything else and enjoy the moment.",
    genre: ["Acoustic", "Folk"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/C6A987/30251F?text=DANCE+WITH+ME",

    story:
      "Dance with Me captures the feeling of a carefree evening: friends gathered around a fire, music playing, the moon overhead and nobody in a hurry to go home.",

    diary: [
      "The concept began with a warm, outdoorsy atmosphere.",
      "Explored an acoustic campfire-inspired sound.",
      "Focused on keeping the production natural and relaxed.",
    ],

    lyrics: `VERSE 1

[Sample lyrics go here]

CHORUS

[Sample chorus goes here]`,

    media: [
      {
        id: "dance-with-me-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/sQCCuoO2YQY2DcGI",
    createdAt: "2026-10-12",
     published: true,
  },

  {
    id: "song-006",
    title: "Tis' the Night of All Nights",
    label: "tis-the-night-of-all-nights",
    description: "A night that feels unlike any other.",
    genre: ["Seasonal", "Pop"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/293044/FFF8ED?text=TIS+THE+NIGHT",

    story:
      "A song built around the atmosphere of a special night. It explores anticipation, celebration and the feeling that something memorable is about to happen.",

    diary: [
      "Developed the concept around the idea of one unforgettable night.",
      "Explored the atmosphere and musical direction.",
      "Worked on giving the title a strong place in the song.",
    ],

    lyrics: `VERSE 1

[Sample lyrics go here]

CHORUS

[Sample chorus goes here]`,

    media: [
      {
        id: "tis-the-night-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/eferg26QrY8wdzXO1",
    createdAt: "2026-10-15",
     published: false
  },

  {
    id: "song-007",
    title: "Thief",
    label: "thief",
    description: "An innocent appearance can hide a much darker story.",
    genre: ["Jazz", "Dark Pop"],
    status: "COMPLETED",
    artwork: "https://placehold.co/800x800/44352F/E9D9C8?text=THIEF",

    story:
      "Thief began as a poem about a woman with an almost angelic nature. As the idea developed, the character took on a darker identity, evolving into a story of obsession and revenge.",

    diary: [
      "The original idea started as a poem.",
      "The character was initially imagined as someone with an angelic nature.",
      "The narrative evolved into something darker, with obsession and revenge becoming central themes.",
      "Explored jazz-inspired musical arrangements for the song.",
    ],

    lyrics: `VERSE 1

I didn't hear a sound,
Not a peep was made.

[Continue with your original lyrics here]

CHORUS

[Sample chorus goes here]`,

    media: [
      {
        id: "thief-demo",
        mediaType: "DEMO",
        label: "Main Demo",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
      {
        id: "thief-instrumental",
        mediaType: "INSTRUMENTAL",
        label: "Instrumental",
        audioUrl: sampleAudio,
        duration: "00:30",
      },
    ],

    externalLink: "https://suno.com/s/tCeF5167Dmm0zN6z",
    createdAt: "2026-10-18",
     published: true,
  },
];