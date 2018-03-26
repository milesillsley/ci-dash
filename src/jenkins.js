import React from 'react';
import { JENKINS_USER, JENKINS_PASSWORD, JENKINS_TOKEN, JENKINS_API_CODE } from './credentials.js';

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
      mode: 'no-cors',
      headers: {
        'Authorization': `Basic ${JENKINS_API_CODE}`
      },
      method: 'GET'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))
      // .then(json => this.setState({ jenkinsApps: json }));
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