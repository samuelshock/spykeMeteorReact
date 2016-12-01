import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResolutionsForm from './ResolutionsForm.jsx'
import ResolutionSingle from './ResolutionSingle.jsx'

Resolutions = new Mongo.Collection("resolutions");

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                resolutions: Meteor.subscribe("userResolutions")
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.resolutions.stop();
    }

    resolutions() {
        return Resolutions.find({}, {sort:{createdAt:-1}}).fetch();
    }

    render(){
        return (
            <div>
                <h1>My Resolution</h1>
                <ResolutionsForm />
                <ReactCSSTransitionGroup
                    component="ul"
                    className="resolutions"
                    transitionName="resolutionLoad"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}>
                    {this.resolutions().map( (resolution)=>{
                        return <ResolutionSingle key={resolution._id} resolution={resolution}/>
                    })}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}
