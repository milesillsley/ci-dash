import React from 'react';
import { BUDDYBUILD_TOKEN } from './credentials.js';

export default class BuddyBuild extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      buddyBuildApps: []
    };
  }

  componentWillMount() {
    const url = 'https://api.buddybuild.com/v1/apps';
    fetch(url, {
      headers: {
        'Authorization': ('Bearer ' + BUDDYBUILD_TOKEN)
      }
    }).catch(error => console.log(error))
      .then(response => response.json())
      .then(json => this.setState({ buddyBuildApps: json }));
  }

  render() {
    const apps = this.state.buddyBuildApps.map((item, i) => {
      return <div>{item.app_name}</div>
    })

    // console.log(JSON.stringify(this.state.buddyBuildApps));        
  
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="bitrise-apps">
          <div>
            Buddybuild Results:
            <p>{apps}</p>
          </div>
        </div>
      </div>
    )
  }
}