import React from 'react';

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
                <h1>Hello Lee</h1>
                <h2> Welcome to {text}</h2>
                <button onClick={this.sayHey}>Click Me</button>

                <p style = {pStyle}>{1 == 1 ? 'True' : 'False'}</p>
                {/*jsx에서는 if-else가 없어서 위와 같이 처리한다. */}
            </div>
        );
    }
}

export default App;