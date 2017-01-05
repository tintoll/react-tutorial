import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: Math.round(Math.random()*100)
        };

        this.updateValue = this.updateValue.bind(this);
    }
    updateValue(randomValue){
        this.setState({
            value: randomValue
        });
    }

    sayHey() {
        alert('hey');
    }
    render(){
        let text = 'Dev-Server';
        let pStyle = {
            color: 'aqua',
            backgroundColor: 'black'
        };
        return (
            <Contacts />
        );
    }
}

//디폴트 prop 설정
App.defaultProps = {
    headerTitle : "defaultHeadTitle",
    contentTitle : "defaultContentTitle",
    contentBody : "defaultContentBody"
};

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData : [
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ]
        };
    }

    render() {
        return (
          <div>
              <h1>Contacts</h1>
              <ul>
                  {this.state.contactData.map((contact,i) => {
                        return (
                          <ContactInfo name={contact.name}
                                         phone={contact.phone}
                                         key={i}
                                       />
                        );
                  })}
              </ul>

          </div>

        );
    }
}

class ContactInfo extends React.Component {
    render(){
        return(
            <li>{this.props.name} {this.props.phone}</li>
        );
    }
}

export default App;