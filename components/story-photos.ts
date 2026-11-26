/* Photographs for "01 / My Story". Keys are milestone numbers and match the folders of the supplied `images` set
   (05, 07, 08, 09, 10, 11, 12, 14, 15, 16). Order inside a milestone is the display order. `w`/`h` are the pixel size of the
   shipped file and are used to reserve the space before the image loads. `label` is only set where the file name
   was a human-written caption; every other image gets a neutral "image N of M" description. */

export type Photo = { src: string; w: number; h: number; label?: string; file: string };

export const storyPhotos: Record<string, Photo[]> = {
  '05': [
    { src: '/images/story/05/05-1.jpg', w: 1600, h: 1200, file: "IMG-20260303-WA0029.jpg" },
    { src: '/images/story/05/05-2.jpg', w: 1600, h: 1200, file: "WhatsApp Image 2026-11-27 at 1.26.02 AM.jpeg" },
  ],
  '07': [
    { src: '/images/story/07/07-1.webp', w: 560, h: 757, file: "Screenshot 2026-11-27 003240.png" },
    { src: '/images/story/07/07-2.webp', w: 582, h: 500, file: "Screenshot 2026-11-27 003435.png" },
  ],
  '08': [
    { src: '/images/story/08/08-1.jpg', w: 1280, h: 960, file: "IMG-20260111-WA0136.jpg" },
    { src: '/images/story/08/08-2.jpg', w: 1280, h: 960, file: "IMG-20260111-WA0149.jpg" },
  ],
  '09': [
    { src: '/images/story/09/09-1.jpg', w: 1280, h: 960, file: "IMG_20250107_182731.jpg" },
    { src: '/images/story/09/09-2.jpg', w: 1600, h: 1202, file: "InShot_20241229_230806358.jpg" },
  ],
  '10': [
    { src: '/images/story/10/10-1.png', w: 131, h: 175, file: "PORTFOLIO ).png" },
    { src: '/images/story/10/10-2.png', w: 270, h: 175, file: "PORTFOLIO ) (1).png" },
    { src: '/images/story/10/10-3.png', w: 291, h: 207, file: "PORTFOLIO ) (2).png" },
  ],
  '11': [
    { src: '/images/story/11/11-1.webp', w: 1183, h: 915, file: "Screenshot 2026-11-27 004656.png" },
    { src: '/images/story/11/11-2.webp', w: 730, h: 790, file: "Screenshot 2026-11-27 004730.png" },
    { src: '/images/story/11/11-3.png', w: 727, h: 812, file: "Screenshot 2026-11-27 004801.png" },
    { src: '/images/story/11/11-4.png', w: 697, h: 537, file: "Screenshot 2026-11-27 004839.png" },
    { src: '/images/story/11/11-5.png', w: 695, h: 537, file: "Screenshot 2026-11-27 004914.png" },
    { src: '/images/story/11/11-6.png', w: 256, h: 360, file: "Screenshot 2026-11-27 005126.png" },
    { src: '/images/story/11/11-7.jpg', w: 1000, h: 1000, file: "stea like an artist.jpg" },
  ],
  '12': [
    { src: '/images/story/12/12-1.png', w: 632, h: 608, label: 'Cold mail 1', file: "cold mail 1.png" },
    { src: '/images/story/12/12-2.png', w: 632, h: 571, label: 'Cold mail 2', file: "cold mail 2.png" },
    { src: '/images/story/12/12-3.png', w: 628, h: 585, label: 'Offer letter from Scale Lab', file: "offer letter from scale lab.png" },
  ],
  '14': [
    { src: '/images/story/14/14-1.jpg', w: 960, h: 1280, label: 'First day at IISc', file: "first day at IISc.jpeg" },
    { src: '/images/story/14/14-2.jpg', w: 1280, h: 883, label: 'Day in my life as an intern', file: "day in my life as an intern.jpeg" },
    { src: '/images/story/14/14-3.jpg', w: 960, h: 1280, label: 'Internship completion', file: "internship completion.jpeg" },
    { src: '/images/story/14/14-4.jpg', w: 1200, h: 1600, file: "WhatsApp Image 2026-11-26 at 10.05.51 PM.jpeg" },
  ],
  '15': [
    { src: '/images/story/15/15-1.webp', w: 527, h: 415, file: "Screenshot 2026-11-27 010641.png" },
    { src: '/images/story/15/15-2.png', w: 526, h: 420, file: "Screenshot 2026-11-27 010712.png" },
    { src: '/images/story/15/15-3.png', w: 525, h: 417, file: "Screenshot 2026-11-27 010723.png" },
    { src: '/images/story/15/15-4.png', w: 525, h: 416, file: "Screenshot 2026-11-27 010741.png" },
  ],
  '16': [
    { src: '/images/story/16/16-1.webp', w: 1440, h: 810, file: "1.png" },
    { src: '/images/story/16/16-2.webp', w: 1440, h: 810, file: "3.png" },
  ],
};
