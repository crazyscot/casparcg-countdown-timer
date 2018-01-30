import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import CountdownTimer from './countdown_timer.jsx';
import CasparCGHelper from './CasparCGHelper.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        let self = this;
        self.state = {
            time: '3:00',
            visible: false,
            hideOnEnd: true
        };

        let casparCGHelper = new CasparCGHelper();
        casparCGHelper.on('play', function () {
            self.setState({visible: true});
        });
        casparCGHelper.on('stop', function () {
            self.setState({visible: false});
        });
        casparCGHelper.on('update', function (data) {
            let partialState = {};
            let time = 0;
            if (data.f0) {
                time = data.f0 + '';
            } else if (data.time) {
                time = data.time + '';
            }
            if (time) {
                partialState.time = time;
            }

            if (typeof data.f1 !== 'undefined') {
                partialState.hideOnEnd = data.f1;
            } else if (typeof data.hideOnEnd !== 'undefined') {
                partialState.hideOnEnd = data.hideOnEnd;
            }
            if (partialState.hideOnEnd) {
                // Make sure we are true/false
                if (typeof partialState.hideOnEnd === 'string') {
                    partialState.hideOnEnd = (partialState.hideOnEnd.toLowerCase() === 'true' && partialState.hideOnEnd.toLowerCase() !== 'false' && !!partialState.hideOnEnd);
                } else {
                    partialState.hideOnEnd = !!partialState.hideOnEnd;
                }
            }

            if (typeof data.f2 !== 'undefined') {
                partialState.countUp = data.f2;
            } else if (typeof data.countUp !== 'undefined') {
                partialState.countUp = data.countUp;
            }
            if (partialState.countUp) {
                // Make sure we are true/false
                if (typeof partialState.countUp === 'string') {
                    partialState.countUp = (partialState.countUp.toLowerCase() === 'true' && partialState.countUp.toLowerCase() !== 'false' && !!partialState.countUp);
                } else {
                    partialState.countUp = !!partialState.countUp;
                }
            }

            if (Object.keys(partialState).length) {
                self.setState(partialState);
            }
        });
        if (!CasparCGHelper.isCasgparCG(true)) {
            if (typeof window.isCasparCG !== 'undefined' && !window.isCasparCG) {
                // Running in a browser, trigger some default values
                window.setTimeout(function () {
                    casparCGHelper.emit('update', {'time': '3:00', 'countUp': true});
                    casparCGHelper.emit('play');
                }, 500);
            }
        }
    }

    onCountdownComplete() {
        if (this.state.hideOnEnd) {
            this.setState({visible: false});
        }
    }

    render() {
        return (
            <CountdownTimer initialTimeRemaining={this.state.time} visible={this.state.visible} completeCallback={this.onCountdownComplete.bind(this)} countUp={this.state.countUp}/>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('countdown')
);
