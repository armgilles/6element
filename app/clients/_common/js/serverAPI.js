"use strict";

var sendReq = require('./sendReq.js');

module.exports = {
    getLiveAffluence: function(){
        return sendReq('GET', '/live-affluence');
    },
    getPlaceMeasurements: function(id){
        return sendReq('GET', '/places/'+rcId);
    },
    getAllPlacesInfos: function(id){
        return sendReq('GET', '/allPlacesInfos');
    },
    getAllSensors: function(){
        return sendReq('GET', '/allSensors');
    },
    updateRC: function(data){
    	return sendReq('POST', '/updateRC', data);
    },
    updateSensor: function(data){
        return sendReq('POST', '/updateSensor', data);
    }
    // updateSensorPlace: function(date){
    //     return sendReq('POST', '/updateSensorPlace', data);
    // }
};
