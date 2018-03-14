const apiKey = '4vJtJwP7DG6Waq6lUABaRYIjYCtQXKHo542bqakWKN5-090yBwnQVEF23KmgZc75j4X7wiLyo4tskVHIXRsnDlLIGLgPgu6tozBmNE-tw7O8QrTU5XaWWKaXv2GpWnYx';
export const Yelp = {
  function search(term, location, sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories,
          rating: business.rating,
          reviewCount: business.review_count,
        });
      }
    });
  }
};
