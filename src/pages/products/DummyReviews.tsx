const DummyReviews = () => {
  const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "July 5, 2026",
    comment:
      "Excellent product! The quality exceeded my expectations and delivery was quick.",
  },
  {
    id: 2,
    name: "Emily Smith",
    rating: 4,
    date: "June 28, 2026",
    comment:
      "Very good value for the price. Packaging was nice and the product matched the description.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    rating: 5,
    date: "June 20, 2026",
    comment:
      "Highly recommended. I would definitely purchase from this store again.",
  },
  {
    id: 4,
    name: "Sophia Brown",
    rating: 5,
    date: "June 15, 2026",
    comment:
      "Amazing quality and elegant design. It fits perfectly with my home decor.",
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 4,
    date: "June 12, 2026",
    comment:
      "Great product overall. Delivery was on time and packaging was secure.",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    rating: 5,
    date: "June 8, 2026",
    comment:
      "Super happy with this purchase. Looks even better in person.",
  },
  {
    id: 7,
    name: "James Anderson",
    rating: 5,
    date: "June 3, 2026",
    comment:
      "Excellent craftsmanship and premium finish. Highly recommended.",
  },
  {
    id: 8,
    name: "Emma Thomas",
    rating: 4,
    date: "May 30, 2026",
    comment:
      "Very satisfied with the quality. Worth every rupee.",
  },
  {
    id: 9,
    name: "Daniel Jackson",
    rating: 5,
    date: "May 25, 2026",
    comment:
      "One of the best products I've purchased recently. Great experience.",
  },
  {
    id: 10,
    name: "Ava White",
    rating: 4,
    date: "May 20, 2026",
    comment:
      "Good quality and exactly as shown in the pictures.",
  },
  {
    id: 11,
    name: "William Harris",
    rating: 5,
    date: "May 16, 2026",
    comment:
      "Fantastic product! Will definitely recommend it to friends.",
  },
  {
    id: 12,
    name: "Mia Martin",
    rating: 5,
    date: "May 11, 2026",
    comment:
      "Exceeded my expectations in terms of quality and finish.",
  },
  {
    id: 13,
    name: "Benjamin Thompson",
    rating: 4,
    date: "May 6, 2026",
    comment:
      "Affordable, durable, and stylish. Great value for money.",
  },
  {
    id: 14,
    name: "Charlotte Garcia",
    rating: 5,
    date: "May 2, 2026",
    comment:
      "Customer support was excellent and the product is outstanding.",
  },
  {
    id: 15,
    name: "Lucas Martinez",
    rating: 4,
    date: "April 28, 2026",
    comment:
      "Nice design, solid build quality, and fast shipping.",
  },
  {
    id: 16,
    name: "Amelia Robinson",
    rating: 5,
    date: "April 23, 2026",
    comment:
      "Looks beautiful and feels premium. Very happy with it.",
  },
  {
    id: 17,
    name: "Henry Clark",
    rating: 5,
    date: "April 18, 2026",
    comment:
      "Excellent finish and quality. Would purchase again without hesitation.",
  },
  {
    id: 18,
    name: "Harper Rodriguez",
    rating: 4,
    date: "April 14, 2026",
    comment:
      "The product arrived safely and works exactly as expected.",
  },
  {
    id: 19,
    name: "Alexander Lewis",
    rating: 5,
    date: "April 9, 2026",
    comment:
      "Beautiful design and outstanding quality. Totally worth it.",
  },
  {
    id: 20,
    name: "Evelyn Lee",
    rating: 5,
    date: "April 4, 2026",
    comment:
      "I'm extremely satisfied with this purchase. Highly recommended.",
  },
  {
    id: 21,
    name: "Jack Walker",
    rating: 4,
    date: "March 30, 2026",
    comment:
      "Reliable product with a premium feel. Good buying experience.",
  },
  {
    id: 22,
    name: "Abigail Hall",
    rating: 5,
    date: "March 25, 2026",
    comment:
      "Very elegant and exactly what I was looking for.",
  },
  {
    id: 23,
    name: "Matthew Allen",
    rating: 5,
    date: "March 20, 2026",
    comment:
      "High-quality product and excellent customer service.",
  },
  {
    id: 24,
    name: "Ella Young",
    rating: 4,
    date: "March 15, 2026",
    comment:
      "The product is sturdy, stylish, and worth the investment.",
  },
  {
    id: 25,
    name: "Samuel King",
    rating: 5,
    date: "March 10, 2026",
    comment:
      "Couldn't be happier with my purchase. Five stars all the way!",
  },
];

  return (
    <div className="space-y-8 mt-8">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 pb-6 last:border-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>

            <div className="text-yellow-500 text-lg">
              {"★".repeat(review.rating)}
              <span className="text-gray-300">
                {"★".repeat(5 - review.rating)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-gray-600 leading-7">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DummyReviews;