import React from 'react';
// import './BusinessList.css';

import Business from  '../Business/Business';
import Business404 from  './Business404';
import './BusinessList.css';


class BusinessList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {firsload: false};
    this.renderBusinesses = this.renderBusinesses.bind(this);
  }

  renderBusinesses() {
    try {
      if (this.props.businesses[0] === 'FIRSTLOAD') {
        const businesses = this.props.businesses.map(el => el);
        businesses.shift();
        let title = <h3 id="firstload-title">Wecome! Here are some places near you</h3>;
        let jsxarray = [title];
        businesses.forEach(business => {
          jsxarray.push(
            <Business key={business.id}
            id={business.id}
            name={business.name}
            image={business.imageSrc}
            city={business.city}
            category={business.category}
            address={business.address}
            zipCode={business.zipCode}
            />
          )
        });
        return jsxarray;
      }
      return this.props.businesses.map(business => {
        return <Business key={business.id}
          id={business.id}
          name={business.name}
          image={business.imageSrc}
          city={business.city}
          category={business.category}
          address={business.address}
          zipCode={business.zipCode}
          />
        }
      )
    }
    catch(e) {
      console.error(e);
      if (!this.props.businesses) {
        return <Business404 />
      }
    }
  }
  render() {
    return (
      <div id="BussinessList">
        {this.renderBusinesses()}
      </div>
    )
  }
}
export default BusinessList;
