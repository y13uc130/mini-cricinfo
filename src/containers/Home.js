import React, { Component } from 'react';
import { getSchedules, _getSchedules } from '../actions';
import {connect} from 'react-redux';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import classnames from 'classnames';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'all',
      status: 'upcoming',
      page: 0
    }
  }
  componentDidMount() {
    this.callForData();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.status !== this.state.status || prevState.type !== this.state.type) {
      this.callForData();
    }
  }
  callForData = async () => {
    const { type, status, page } = this.state;
    const res = await getSchedules({type, status, page });
    if(res) this.props._getSchedules(res);
  }
  handleStatusLevel = (status) => {
    this.setState({
      status
    })
  }
  handleType = (type) => {
    this.setState({
      type
    })
  }
  render() {
    const { schedules } = this.props;
    return (
      <div className="bg-light-gray mid-gray pv3 ph3" >
        <h2 className="f3 mb0">Schedule</h2>
        <div className="bg-white pb1">
          <div className="flex justify-center pt3 pb3">
            {
              ['upcoming', 'running', 'completed'].map((status)=>{
                return (
                  <div onClick={()=>this.handleStatusLevel(status)} className={classnames('bg-light-gray f7 fw6 pa2 ttu', status===this.state.status && 'bg-white orange', status==='completed' && 'ba b--light-silver', status==='running' && 'bt bl bb b--light-silver' ,status==='upcoming' && " bt bl bb b--light-silver", )}>{status}</div>
                )
              })
            }
          </div>

          <div className="flex justify-between mh2">
            {
              ['all', 'international', 'domestic'].map((type)=>{
                return (
                  <div onClick={()=>this.handleType(type)} className={classnames('f7 fw6 ttc mb0 gray w-third tc mh3', type===this.state.type && 'bb b--orange bw1')}>{type}</div>
                )
              })
            }
          </div>
        </div>
        {
          schedules && !!schedules.length && schedules.map((schedule, index)=> {
            return (
              <div className="w-100 db flex items-center pb3 flex-wrap flex-nowrap-l flex-nowrap-m" > 
                <div className="db pv2 ph2 ph3-ns br2 w-100 shadow-4 bg-white h45">
                  <p className="ma0 f6 fw5 truncate bg-near-white pa2">{schedule.seriesName}</p>
                  <div className="flex items-center pa2">
                    <p className="f6 fw5 mr1 mt0 mb0">{schedule.matchNumber}&nbsp;.</p>
                    <p className="f6 fw5  mt0 mb0">{schedule.venue}</p>
                  </div>
                  {
                    schedule.matchScore.map((team)=>{
                      return (
                        <div className="flex items-center pa2">
                          <div className="h1 w-10 h-auto mr3">
                            <ImageLoader url={`https://images.cricket.com/teams/${team.teamID}_flag.png`} alt={'x'} classNames="img-resp" />
                          </div>
                          <p className="ma0 f6 fw5 truncate">{team.teamFullName}</p>
                        </div>
                      )
                    })
                  }
                  {schedule.statusMessage && <div className="flex justify-center" ><h3 className="w-70 truncate pa1 br4 f6 fw5 tc white bg-light-red mt2">{schedule.statusMessage}</h3></div>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {       
      schedules: state.schedules.schedules,
  };
}

export default connect(mapStateToProps, {
  _getSchedules
})(Home);
