import React from 'react';
import ReactDOM from 'react-dom';


class RandomNumber extends React.Component {
    updateNumber(){
        let value = Math.round(Math.random()*100);
        this.props.onUpdate(value); // function 형태의 prop 으로서, parent 컴포넌트에 정의된 메소드를 실행 할 수 있게 합니다.
    }

    constructor(props){
        super(props);
        this.updateNumber = this.updateNumber.bind(this);
    }

    render(){
        return (
            <div>
                <h1>RANDOM NUMBER: { this.props.number }</h1>
                <button onClick={this.updateNumber}>Randomize</button>
            </div>
        );
    }
}

export default RandomNumber;