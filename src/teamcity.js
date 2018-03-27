import React from 'react';

export default class TeamCity extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      teamCityApps: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ teamCityApps: response }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/teamcity');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const apps = this.state.teamCityApps.map((item, i) => {
      return <div>{item.name}: {item.status}</div>
    })
    
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="bitrise-apps">
          <div>
            TeamCity Results:
            <p>{apps}</p>
          </div>
        </div>
      </div>
    )
  }
}
