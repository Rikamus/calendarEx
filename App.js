import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  Modal,
  ScrollView,
} from 'react-native';
import { Item, Input, } from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import moment from 'moment'

import Display from 'react-native-display'

const testIDs = require('./testIDs');

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(90, 'days').format(_format)
var _selectedDay = ''
var _day = ''

export default class App extends Component{

  initialState = {
    [_today]: {disabled: true}
  }


  constructor(props) {
    super(props);
  
    this.state = {
      //----- STATES DE CALENDARLIST -----//
      calendarVisible: false,
      fecha: '',
      items: {},
      //----- STATES DE AGENDA -----//
      selected: undefined,
      showDisplay: true,
      name: 'Evento',
      date: '',
      _markedDates: this.initialState,
    };
  } 

  ////// COMPONENTE CALENDARLIST Y SUS METODOS ////// 

    

    ///// COMPONENTE DE AGENDA Y SUS METODOS //////

  /*loadItems(day) {
    setTimeout(() => {
        const time = day.timestamp
        const strTime = this.timeToString(time);        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);          
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(10, Math.floor(Math.random() * 150))
            });          
        }      
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }*/
  
  onDaySelect = (day) => {
    console.log('********* Aqui inicia todo *********');
    console.log(day);
    _selectedDay = moment(day.dateString).format(_format);
    _day= day;
    var modificar = false;
    var cancelado = '';
    let tmp = {};
    /*if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      selected = !this.state._markedDates[_selectedDay].selected;
    }
    const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }

    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });*/
    const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];
        console.log('items:');
        console.log(this.state.items);
        console.log('key');
        console.log(key);
        console.log('selectedDay:');
        console.log(_selectedDay);
        console.log('items[key]:');
        console.log(this.state.items[key]);
        console.log('newitems:');
        console.log(newItems);
        if (key == _selectedDay){
          console.log('day.dateString:' + day.dateString);
          modificar = true;
          cancelado = key;
          console.log('modificar: ' + modificar);
          }
        });
      //this.setState({
      //  items: newItems
      //});
    /*if (this.state.items[0] == _selectedDay) {
      console.log('modificar: ' + modificar);
      tmp = this.state.items.map(function(val, key)
      { 
        console.log('day.dateString:' + day.dateString);
        console.log('val.date:' + val.date);
        if (day.dateString == val.date) {
          modificar = true;
          cancelado = key;
        }
      }); 
    }*/
    //this.setState({selected: day.dateString, showDisplay:true});
    if (modificar == true){
      Alert.alert(
        "Modificar evento",
        "Que deseas hacer modificar o borrar un evento?",
        [
          { text: "Modificar", onPress: () => {this.Borrar(_day, cancelado, _selectedDay), this.Agregar(day, _selectedDay);} },
          { text: "Borrar", onPress: () => this.Borrar(_day, cancelado, _selectedDay) },
          { text: "Cancelar", onPress: () => console.log("Cancel Pressed") }
        ]
      );
    } else {
      Alert.alert(
        "Agregar evento",
        "Deseas agregar un evento?",
        [
          //AQUI MODIFIQUE PARA AGREGAR DESDE EL MODAL PERO DEBO VER COMO ENVIARLE LOS PARAMETROS NECESARIOS "day, _selectedDay"
          { text: "Agregar", onPress: () => this.setState({selected: day.dateString, calendarVisible:true}) }, //this.Agregar(day, _selectedDay)
          { text: "Cancelar", onPress: () => console.log("Cancel Pressed") }
        ]
      );
    }
    //this.loadItems(day);
    /*  this.setState({selected: day.dateString, showDisplay:true});


    //const _selectedDay = moment(day.dateString).format(_format);
    
    /*let selected = true;
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      selected = !this.state._markedDates[_selectedDay].selected;
    }
    
    // Create a new object using object property spread since it should be immutable
    // Reading: https://davidwalsh.name/merge-objects
    const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }

    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });
    this.loadItems(day);*/

  }

  loadItems(day) {
    setTimeout(() => {
        const time = day.timestamp
        const strTime = this.timeToString(time);        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);          
            this.state.items[strTime].push({
              name: this.state.name,
              date: strTime,//****** */
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
      <ScrollView 

      ref="listRef"


      >
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: '100%'}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
      </ScrollView>
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

  Borrar = (day, cancelado, _selectedDay) => {
    const newItems = {};
    console.log('********* datos despues de Borrar *********');
    var array = [this.state.items]; 
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];
      if (key == cancelado){
        console.log('array antes del delete');
        console.log(JSON.stringify(array));
        //console.log(JSON.stringify(newItems));
        //newItems.splice(key, 1);
        //var array = [newItems]; // make a separate copy of the array
        console.log(key);
        console.log('array en posicion 0');
        console.log(array[0]);       
        var index = array[0].hasOwnProperty(key); //array.indexOf([0]); //.indexOf();
        //var index = array.indexOf(this.state.items[0].date);
        
        console.log('index: ' +index);
        if (index == true) {
          console.log('if del borrador '+ index);
          array = array.filter(function( obj ) {
            return obj.field == key;
        });//array.splice(index, 1);
          this.setState({items: array},()=>console.log(this.state.items));
        }
        
        //delete(newItems[key]);
        //delete(newItems[key]);
        console.log('array despues del delete');
        //this.setSaste({variable:value},()=>console.log(variable))
        () => console.log(array); //console.log(JSON.stringify(newItems));
        //this.setState({items: newItems},()=>console.log(this.state.items));
        console.log('items:');
        () => console.log(this.state.items);
        console.log('day');
        console.log(day);
        }
      });
    let selected = true;
    /*console.log(cancelado);
    var temp = this.state.items; 
    console.log(temp);
    //var i = temp.findIndex(obj => obj.key === cancelado);
    //var i = this.state.items.indexOf(() => cancelado );
    temp.splice(i, 1);
    this.setState({items: temp});*/
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      selected = !this.state._markedDates[_selectedDay].selected;
    }
    const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }
    this.setState({ _markedDates: updatedMarkedDates });
    console.log(this.state.items);
    this.loadItems(day);
  }

  Agregar = (day, _selectedDay) => {
    let selected = true;
    console.log('********* datos despues de Agregar *********');
    this.setState({calendarVisible: !this.state.calendarVisible});
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      selected = !this.state._markedDates[_selectedDay].selected;
    }
    const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }
    this.setState({ _markedDates: updatedMarkedDates });
    console.log('item recien agregado');
    console.log(this.state.items);
    this.loadItems(day);
  }


  render() {
    scrollView = React.createRef();
    return (
      <View style={styles.sectionContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.calendarVisible}
          onRequestClose={() => {
            esVisible = false;
          }}
          onDismiss={() => {
            esVisible = false;
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textos}>Nombre Evento:</Text>
              <Item rounded style={styles.inputs}>
                  <Input
                    style={styles.inputs}
                    value={this.state.name}
                    ref={c => (this._name = c)}
                    onChangeText={name => this.setState({ name })}
                  />
              </Item>
              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  this.setState({calendarVisible: !this.state.calendarVisible}), this.Agregar(_day, _selectedDay)}} //ESTA ES LA PARTE QUE SE CAMBIO, NO ME ACUERDO QUE IBA JAJAJA
              >
              <Text style={styles.textStyle}>Agregar</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <Text style={styles.text}>Agenda de eventos</Text>
             <Agenda
                testID={testIDs.agenda.CONTAINER}
                items={this.state.items}              
                //loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.state.selected}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                //style={styles.calendar}
                theme={{
                  textSectionTitleColor: 'pink',
                  calendarBackground: 'white',
                  agendaDayTextColor: 'blue',
                  agendaDayNumColor: 'pink',
                  agendaTodayColor: 'pink',
                  agendaKnobColor: 'pink'}}
                hideExtraDays
                onDayPress={this.onDaySelect}
                //onDayPress={this.onDayPress}
                markedDates={this.state._markedDates}
                /*markedDates={{
                  [this.state.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: 'blue',
                    selectedTextColor: 'white'
                  },
                  '2020-06-26': {
                    marked: true,              
                    selectedColor: 'blue',
                    selected: this.state.selected == '2020-06-26'              
                  },
                  '2020-06-27': {
                    marked: true,              
                    selectedColor: 'blue',
                    selected: this.state.selected == '2020-06-27'              
                  }           
                }}*/
              />
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    //alignItems: "center",
    //justifyContent: "center",
    marginTop: 38,
    marginBottom: 20,
    flex: 1,
    //flexDirection: "column",
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    color: 'blue',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  textos: {
    //fontFamily: "Modeka",
    fontSize: 20,
    textAlign: "left",
    alignSelf: "flex-start",
    color: "black",
    marginLeft: 60,
  },
  inputs: {
    //fontFamily: "Modeka",
    textAlign: "center",
    color: "black",
    //alignSelf: 'flex-end',
    fontSize: 20,
    width: 300,
    height: 40,
    borderColor: "white",
  },
});
/*
    render() {
    
      const getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
    
        //Alert.alert(year + '-' + month + '-' + date);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
      }

      return (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.calendarVisible}
          onRequestClose={() => {
            alert(this.state.fecha);
          }}
          onDismiss={() => {
            alert(this.state.fecha);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarList
                testID={testIDs.calendarList.CONTAINER}
                //current={fecha} //'2020-05-16' 
                onDayPress={(day) => this.setState({calendarVisible: !this.state.calendarVisible, fecha: day.dateString})} //{console.log('selected day', day, fecha)}}
                pastScrollRange={24}
                futureScrollRange={24}
              />
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setState({calendarVisible: !this.state.calendarVisible});
          }}
        >
          <Text style={styles.textStyle}>Seleccionar fecha..</Text>
        </TouchableHighlight>
        <Text>{this.state.fecha}</Text>
        <TouchableHighlight
          style={styles.openButton}
          
        >
          <Text style={styles.textStyle}>Ver calendario</Text>
        </TouchableHighlight>
      </View>
        
      );
    }
  */