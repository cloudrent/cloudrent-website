// ============================================================
// CloudRent Pro — Google Reviews data
// ============================================================
// Real reviews sourced from Google Business Profile.
// Ordered newest first. Dates estimated from relative timestamps —
// replace with exact dates from your Google dashboard if needed.
//
// To update: edit, add, or remove entries below. The carousel
// auto-adjusts to the array length.
// ============================================================

export interface Review {
  name: string
  rating: number
  date: string
  text: string
  initial?: string
}

export const reviews: Review[] = [
  {
    name: 'Aidan Corbley',
    rating: 5,
    date: 'August 2025',
    text: 'Thank you for launching the CloudRent app. It is great! I am really looking forward to the ability to create bookings and quotes and to be able to view bookings that are for customer collect.',
  },
  {
    name: 'Event Services International',
    rating: 5,
    date: 'July 2025',
    text: 'We have just started the process of integrating our old systems into this wonderful new product. It is exciting to see the potential that CloudRent will undoubtedly bring to our business overall. Anyone looking into this will quickly find out the passion and care that Ron and his team bring to the table. Looking forward to a bright and successful future using CloudRent.',
  },
  {
    name: 'Keshia Dorrington',
    rating: 5,
    date: 'June 2025',
    text: "We've been working with Ron to implement the CloudRent program into All The Fence U Rent and the experience has been outstanding. What impresses me most is Ron's commitment to making it work for our team.",
  },
  {
    name: 'Emily Smith',
    rating: 5,
    date: 'May 2025',
    text: 'Absolutely love Ron and the team, so helpful and understanding of our business needs. CloudRent is the perfect addition to grow our business to the next step. Thanks team!',
  },
  {
    name: 'Polo Ruiz',
    rating: 5,
    date: 'March 2025',
    text: 'I was looking for a great and simple software to use for my Machinery Rental Company located here in Austin, Texas, USA. All the other options were expensive and hard to use, until I found CloudRent — great price and easy to use.',
  },
  {
    name: 'Blayney Skips',
    rating: 5,
    date: 'August 2024',
    text: "We are just starting out with CloudRent. Ron is really easy to talk with and has been really helpful in figuring out how to use the system for our business needs. He's available after hours to sort out any issues and fixes them there and then. Thanks Ron.",
  },
  {
    name: 'Travis Matheson',
    rating: 5,
    date: 'November 2020',
    text: 'With 12 years in the industry, CloudRent is by far the best system I have used. The software can be adapted to anything that is hired out, or even a service that you offer and need to keep track of.',
  },
  {
    name: 'Aidan C',
    rating: 5,
    date: 'October 2022',
    text: "Love the latest version of CloudRent and have been adding input into making this the easiest and most user-friendly software on the market. The Party Hire Place was one of CloudRent's first customers and we have been using the software since 2006. Ron and his team have always solved any issues with prompt attention and support.",
  },
  {
    name: 'Natalie Lowe',
    rating: 5,
    date: 'September 2022',
    text: 'We are a scaffold hire business and have just started using CloudRent. Ron and his team have developed this user-friendly software perfect for our needs. They are highly skilled and prompt with the support. Would definitely recommend to anyone.',
  },
  {
    name: 'Rod Preller',
    rating: 5,
    date: 'July 2022',
    text: 'Prestige Weddings and Events have been a client of this company for many years and currently have 9 users that use the software daily. Ron and his team have always been accessible and truly looked after us.',
  },
  {
    name: 'Ron Anderson',
    rating: 5,
    date: 'May 2022',
    text: 'Our client base ranges from tradeshows, special events and activations to a huge school market. We produce upwards of 800 events per year. We were in need of a single source software for inventory control, contracts and invoicing — CloudRent delivered.',
  },
  {
    name: 'Danielle Rico',
    rating: 5,
    date: 'March 2022',
    text: "I won't pretend to know a lot about software development, but as a newly hired admin using CloudRent for the very first time I was pleasantly surprised at how user-friendly it is. I was able to get in and use the software with relative ease.",
  },
]
