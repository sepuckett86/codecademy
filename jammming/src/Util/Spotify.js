var client_id = '64c11b00e3f648ff8f68fda5600209d1'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri

const apiKey = '';
const Yelp = {
  search(term, location, sortBy){
    return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com',
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          album: /v1/albums/{id},
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
