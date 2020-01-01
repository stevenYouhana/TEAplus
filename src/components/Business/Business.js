import React from 'react';
import Yelp from '../../util/Yelp';
import './Business.css';

export default class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hours: [], showHoursText: 'show opening hours'};
  }
  handleDetails = (e) => {
    if (e.target.checked) {
      function openClosed(state) {
        return state ? 'open' : 'closed'
      }
      function days(int) {
        switch (int) {
          case 0: return 'Monday';
          case 1: return 'Tuesday';
          case 2: return 'Wednesday';
          case 3: return 'Thursday';
          case 4: return 'Friday';
          case 5: return 'Saturday';
          default: return 'Sunday';
        }
      }
      function stringifyTimeData(data, id) {
        let str = '';
        return data.map((day, i) => {
          return(
            <ul className="opening-times">
              <li key={`${id}${i}`}>{`${days(i)}: ${day.start} - ${day.end}\n`}</li>
            </ul>
          );
        });
      }
      Yelp.businessHoures(this.props.id)
        .then(response => {
          if (!response) {
              this.setState({hours: ['unkown']});
              return;
          }
          this.setState({
            hours: [...this.state.hours, stringifyTimeData(response[0].open, this.props.id)]
          });
        });
        this.setState({showHoursText: 'hide hours'});
    }

    else this.setState({hours: [], showHoursText: 'show opening hours'});
  }
  render() {
    return (
      <div className="Business">
        <div className="business-title">
        {this.props.name}
        </div>
        <div className="business-image">
          <img className="actual-image" src={this.props.image} />
        </div>
        <div className="business-info">
          <p>{this.props.category}</p>
          <p>{this.props.address}</p>
          <p>{this.props.city} {this.props.zipCode}</p>
          <p>{this.open}</p>
          <div className="opening-hours-div">
            <h5>{this.state.showHoursText}</h5>
            <label className="switch" onChange={this.handleDetails}>
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <div>{this.state.hours}</div>
          </div>
        </div>
      </div>
    );
  }
}
