export const destinations = [
  { id: "santorini", name: "Santorini", country: "Greece", continent: "Europe", heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80", priceFrom: 2400, ratingAvg: 4.9, bestSeason: "May–October", timezone: "GMT+3", language: "Greek", currency: "EUR" },
  { id: "kyoto", name: "Kyoto", country: "Japan", continent: "Asia", heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80", priceFrom: 3100, ratingAvg: 4.8, bestSeason: "March–May, Oct–Nov", timezone: "GMT+9", language: "Japanese", currency: "JPY" },
  { id: "maldives", name: "Maldives", country: "Indian Ocean", continent: "Asia", heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80", priceFrom: 5800, ratingAvg: 5.0, bestSeason: "November–April", timezone: "GMT+5", language: "Dhivehi", currency: "USD" },
];

export const hotels = [
  { id: "aman-venice", name: "Aman Venice", location: "Venice, Italy", stars: 5, pricePerNight: 1200, amenities: ["Pool", "Spa", "Fine Dining", "Butler"] },
  { id: "niyama-maldives", name: "Niyama Maldives", location: "Maldives", stars: 5, pricePerNight: 2400, amenities: ["Overwater Villa", "Reef Access", "Submarine Dive"] },
];

export type Destination = typeof destinations[0];
export type Hotel = typeof hotels[0];
