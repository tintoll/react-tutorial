import React from 'react';
import Header from './Header';
import Content from './Content';

class App extends React.Component {
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
            <div>
                <Header />
                <Content />
            </div>
        );
    }
}





export default App;