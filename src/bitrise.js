import React from 'react';
import { BITRISE_TOKEN } from './credentials.js';

export default class Bitrise extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      bitriseApps: []
    };
  }

  componentWillMount() {
    const url = 'https://api.bitrise.io/v0.1/apps';
    fetch(url, {
      headers: {
        'Authorization': ('token ' + BITRISE_TOKEN)
      }
    }).catch(error => console.log(error))
      .then(response => response.json())
      .then(json => this.setState({ bitriseApps: json.data }));
  }

  render() {
    const apps = this.state.bitriseApps.map((item, i) => {
      return <div>{item.title} Status: {item.status}</div>
    })

    console.log(JSON.stringify(this.state.bitriseApps));    

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="bitrise-apps">
          <div>
            Bitrise Results:
            <p>{apps}</p>
          </div>
        </div>
      </div>
    )
  }
}