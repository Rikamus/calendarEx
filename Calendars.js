import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import {Calendar} from 'react-native-calendars';
import {Agenda} from 'react-native-calendars';

import moment from 'moment'

import _ from 'lodash'

import Display from 'react-native-display'

const testIDs = require('./testIDs');


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(90, 'days').format(_format)



export default class Calendars extends Component {

  initialState = {
    [_today]: {disabled: true}
  }


  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      showDisplay: false,
      items: {},
      _markedDates: this.initialState,
    };
  }


  
  onDaySelect = (day) => {
    this.setState({selected: day.dateString, showDisplay:true});
  
    
    const _selectedDay = moment(day.dateString).format(_format);
  
    let selected = true;
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      selected = !this.state._markedDates[_selectedDay].selected;
    }
    
    // Create a new object using object property spread since it should be immutable
    // Reading: https://davidwalsh.name/merge-objects
    const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }
    
    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });
    this.loadItems(day);
    
  }

  
  loadItems(day) {
    setTimeout(() => {
        const time = day.timestamp
        const strTime = this.timeToString(time);        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);//da formato          
            this.state.items[strTime].push({
              name: 'Evento ' + strTime,
              date: strTime,//****** *
              height: Math.max(10, Math.floor(Math.random() * 150))
            });
        }       
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });     
    }, 1000);
  }
  
  
  


  //Agenda
  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  onDayPress = (day) => {
    this.setState({selected: day.dateString, showDisplay:true});
    this.loadItems(day)
  }

  render() {
    scrollView = React.createRef();
    return (
      
      <ScrollView 
     
      ref="listRef"
     
      
      >
        <Text style={styles.text}>Calendar with selectable date</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          
          style={styles.calendar}
          hideExtraDays
          
          onDayPress={this.onDaySelect}
          markedDates={this.state._markedDates}
          
        />
        <Display enable={this.state.showDisplay}>
              <Agenda
              testID={testIDs.agenda.CONTAINER}
              items={this.state.items}              
              loadItemsForMonth={this.loadItems.bind(this)}
              selected={this.state.selected}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
              
              />
              
        </Display>

        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});