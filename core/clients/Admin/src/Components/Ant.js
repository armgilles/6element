'use strict';

var React = require('react');
var Modifiable = React.createFactory(require('./Modifiable.js'));

var moment = require('moment');

/*

interface AntProps{
    ant: {
        create_at : string,
        id: int,
        installed_at: int,
        isUpdating: boolean,
        latest_input: string,
        latest_output: string,
        name: string,
        phone_number: string,
        quipu_status: string,
        sense_status: string,
        updated_at: string,
        isSelected: bool
    },
    isSelected: boolean,
    antFromNameMap: Map(string -> integer),
    currentPlaceId: int,
    onChangeSensor: function(),
    onSelectedAnts: function()
}
interface AntState{
    isListOpen: boolean
}

*/

var Ant = React.createClass({
    displayName: 'Ant',

    getInitialState: function(){
        return {
            isOpen: false
        };
    },

    toggleList: function(){
        this.setState(Object.assign(this.state, {
            isListOpen: !this.state.isListOpen
        }));
    },

    render: function() {
        var props = this.props;

        // console.log('ANT props', props);
        // console.log('ANT state', state);

        var classes = [
            'ant',
            props.isSelected ? 'isSelected' : ''
            // props.ant.isUpdating ? 'updating' : '',
            // props.ant.quipu_status,
            // props.ant.sense_status
        ];

        return React.DOM.div({className: classes.join(' ')},
            React.DOM.form({className: 'ant-selector'},
                React.DOM.input({
                    onClick: function(){
                        props.onSelectedAnts(props.ant.id);
                    },
                    type: "checkbox",
                    checked: props.isSelected
                })
            ),
            React.DOM.ul({},
                React.DOM.li({}, 
                    React.DOM.div({}, 'Name'),
                    new Modifiable({
                        className: 'sensorName',
                        isUpdating: false,
                        text: props.ant.name,
                        dbLink: {
                            id: props.ant.id,
                            field: 'name'
                        },
                        onChange: props.onChangeSensor
                    })
                ),
                
                React.DOM.li({}, 
                    React.DOM.div({}, 'Phone'),
                    new Modifiable({
                        className: 'phone-number',
                        isUpdating: false,
                        text: props.ant.phone_number,
                        dbLink: {
                            id: props.ant.id,
                            field: 'phone_number'
                        },
                        onChange: props.onChangeSensor
                    })
                ),
                React.DOM.li({className: 'quipu'},
                    React.DOM.div({}, 'Quipu Status'),
                    React.DOM.div({}, props.ant.quipu_status),
                    React.DOM.div({}, props.ant.signal) // Pas de signal ???
                ),
                React.DOM.li({className: '6sense'},
                    React.DOM.div({}, '6sense Status'),
                    React.DOM.div({}, props.ant.sense_status)
                ),
                React.DOM.li({className: 'command'},
                    React.DOM.div({}, 'Latest Command'),
                    React.DOM.div({}, props.ant.latest_input),
                    React.DOM.div({}, props.ant.latest_output)
                ),
                React.DOM.li({className: 'low-importance'}, 
                    React.DOM.div({}, 'Created'),
                    React.DOM.div({}, moment(props.ant.created_at).format("DD/MM/YYYY HH:mm:ss"))
                ),
                React.DOM.li({className: 'low-importance'}, 
                    React.DOM.div({}, 'Updated'),
                    React.DOM.div({}, moment(props.ant.updated_at).fromNow())
                )
            ),
            React.DOM.div({
                    className: 'ant-unistalling clickable',
                    onClick: function(){
                        console.log('Uninstalling');
                        var dbData = {
                            'field': 'installed_at',
                            'id': props.ant.id,
                            'value': null
                        };
                        props.onChangeSensor([dbData]);
                    }
                },
                'Uninstall'
            )
        );
    }
});

module.exports = Ant;
