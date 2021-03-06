"use strict";

var React = require('react');

/*
    A delete button asking for confirmation
    
interface DeleteButtonProps{
    askForConfirmation: boolean // (defaults to true)
    onConfirm: () => void
}
interface DeleteButtonState{
    pendingConfirmation: boolean
}

*/

module.exports = React.createClass({
    getInitialState: function(){
        return {pendingConfirmation: false};
    },
    
    render: function(){
        var props = this.props;
        var state = this.state;
        var self = this;
        
        var askForConfirmation = 'askForConfirmation' in props ? props.askForConfirmation : true;
        
        var children = [
            React.DOM.div({
                key: 0,
                onClick: function(){
                    if(askForConfirmation){
                        self.setState({pendingConfirmation: true});
                    }
                    else{
                        props.onConfirm();
                    }       
                }
            })
        ];
        
        if(state.pendingConfirmation){
            children.push(React.DOM.div({className: 'confirmation-box', key: 1},
                React.DOM.h1({}, 'Confirm ?'),
                React.DOM.div({className: "button-group"},
                    React.DOM.button({
                        className: 'cancel',
                        onClick: function(){
                            self.setState({pendingConfirmation: false});
                        }
                    }, 'cancel'),
                    React.DOM.button({
                            className: 'confirm',
                            onClick: function(){
                                props.onConfirm();
                                self.setState({pendingConfirmation: false});
                            }
                        },
                        'confirm'
                    )
            )));
        }
        
        
        return React.DOM.div({
            className: "delete",
            title: "delete"
        }, children);
    }
});
