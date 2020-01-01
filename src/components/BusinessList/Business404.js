import React from 'react';
import './BusinessList.css';
import business404 from './404.jpg';


class Business404 extends React.Component {
    render() {
      return(
        <div className="Business404">
          <h3>Business not found</h3>
          <div className="img-container">
            <img id="actual-img" src={business404} />
          </div>
        </div>
      );
    }
}
export default Business404;
