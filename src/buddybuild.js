import React from 'react';
import { BUDDYBUILD_TOKEN } from './credentials.js';

export default class BuddyBuild extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      buddyBuildApps: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ buddyBuildApps: response }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/buddyBuild');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const apps = this.state.buddyBuildApps.map((item, i) => {
      return <div>{item.app_name}</div>
    })

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