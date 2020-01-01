const headers = {
  headers: {Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`}
};
function getCoords_GEOLOC() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      if (resolve) {
        resolve({
          lon: position.coords.longitude,
          lat: position.coords.latitude
        });
      }
      else reject(Error('getCoods error'));
    });
  });
}
async function getCoords_IPAPI() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    if (response.ok) {
      const jsonResponse = await response.json();
      return {
        lon: jsonResponse.lon,
        lat: jsonResponse.lat
      };
    }
  } catch (error) {
    console.log(error);
  }
}

const Yelp = {
  search(term, location, sortedBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${term}&location=${location}&sort_by=${sortedBy}`,
      {
     headers: {
       Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`
     }
     }).then((response) => {
        return response.json().then((jsonResponse) => {
          if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count
              }
            });
          }
        });
      });
  },
  businessHoures(id) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
      {headers: {
        Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`
      }})
      .then(response => response.json()).then(jsonResponse => {
        return jsonResponse.hours;
      });
  },
  searchNearYou() {
    const defaultCat = "coffee";
    return new Promise((resolve, reject) => {
      if (resolve) {
        getCoords_IPAPI().then(coords => {          
          return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${defaultCat}&latitude=${coords.lat}&longitude=${coords.lon}`,
            {headers: {
              Authorization: `Bearer ${process.env.REACT_APP_APIKEY}`
            }}).then(response => response.json()).then(jsonResponse => {
              if (jsonResponse.businesses) {
                resolve(
                  jsonResponse.businesses.map(business => {
                    return {
                      id: business.id,
                      imageSrc: business.image_url,
                      name: business.name,
                      address: business.location.address1,
                      city: business.location.city,
                      state: business.location.state,
                      zipCode: business.location.zip_code,
                      category: business.categories[0].title,
                      rating: business.rating,
                      reviewCount: business.review_count
                    }
                  })
                );
              } else console.error("no businesses found :(");
            });
        });
      } else reject(Error("searchNearYou promise reject"));
    });

  }
}
export default Yelp;
