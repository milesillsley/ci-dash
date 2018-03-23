import React from 'react';
import { JENKINS_USER, JENKINS_PASSWORD } from './credentials.js';

export default class Jenkins extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      jenkinsApps: []
    };
  }

  componentWillMount() {
    const url = 'http://jenkins.dev.tnl-core.ntch.co.uk/api/json';
    fetch(url, {
      headers: {
        'Authorization': ('Basic ' + JENKINS_USER +':' + JENKINS_PASSWORD)
      }
    }).catch(error => console.log(error))
      .then(response => response)
      .then(json => this.setState({ jenkinsApps: json.jobs }));
  }

  render() {
    const apps = this.state.jenkinsApps.map((item, i) => {
      return <div>{item.name}</div>
    })
    
    console.log(JSON.stringify(this.state.jenkinsApps));

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