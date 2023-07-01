const categories = [
    {
        title: 'Tech',
        image: 'https://example.com/tech-image.jpg'
    },
    {
        title: 'Fashion',
        image: 'https://example.com/fashion-image.jpg'
    },
    {
        title: 'Sports',
        image: 'https://example.com/sports-image.jpg'
    },
    {
        title: 'Food',
        image: 'https://example.com/food-image.jpg'
    },
    {
        title: 'Travel',
        image: 'https://example.com/travel-image.jpg'
    },
    {
        title: 'Music',
        image: 'https://example.com/music-image.jpg'
    },
    {
        title: 'Art',
        image: 'https://example.com/art-image.jpg'
    },
    {
        title: 'Science',
        image: 'https://example.com/science-image.jpg'
    },
    {
        title: 'Books',
        image: 'https://example.com/books-image.jpg'
    },
    {
        title: 'Movies',
        image: 'https://example.com/movies-image.jpg'
    }
];


const subCategory = [
    {title: 'Mobile Phones', image: 'https://example.com/art-image.jpg', parent_id: "64a0374932460ebd5a7b2fef"},
    {title: 'Laptops', image: 'https://example.com/art-image.jpg', parent_id: "64a0374932460ebd5a7b2fef"},
    {title: 'Gadgets', image: 'https://example.com/art-image.jpg', parent_id: "64a0374932460ebd5a7b2fef"},

    {title: 'Mobile Phones', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad0"},
    {title: 'Laptops', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad0"},
    {title: 'Gadgets', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad0"},

    {title: 'Mobile Phones', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad5"},
    {title: 'Laptops', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad5"},
    {title: 'Gadgets', image: 'https://example.com/art-image.jpg', parent_id: "64a053fffa55ac8382c01ad5"},
]

module.exports = {
    categories, subCategory
}