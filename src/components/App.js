import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';
import update from 'react-addons-update';

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
            ],
            selectedKey : -1,
            selected : {
                name : "",
                phone : ""
            }
        };
    }

    _insertContact(name, phone){
        let newState = update(this.state,{
            contactData: {
                $push : [{"name":name, "phone":phone}]
            }
        });
        this.setState(newState);
    }

    /**
     * 선택 할 컴포넌트가 이미 선택되어있다면 선택을 해제합니다.
     이 메소드는 child 컴포넌트의 onSelect prop 으로 전달됩니다.
     * @param key
     * @private
     */
    _onSelect(key) {
        if(key == this.state.selectedKey) {
            console.log("key select cancelled");
            this.setState({
                selectedKey : -1,
                selected: {
                    name: "",
                    phone: ""
                }
            });
            return;
        }
        /*
         state selectedKey 는 현재 선택된 컴포넌트의 고유번호 입니다.
         만약에 선택된 Contact 가 없을 시에는 -1 로 설정됩니다.
         */

        this.setState({
            selectedKey : key,
            selected: this.state.contactData[key]
        });
        console.log(key + " is selected ! ");
    }

    /**
     * 메소드는 child 컴포넌트에게 해당 컴포넌트가 선택된 상태인지 아닌지 알려줍니다.
     이 메소드를 실행 한 결과 값이 child 컴포넌트의 isSelected prop 으로 전달 됩니다.
     * @param key
     * @returns {boolean}
     * @private
     */
    _isSelected(key) {
        if(this.state.selectedKey == key) {
            return true;
        } else  {
            return false;
        }
    }

    _removeContact(){
        if(this.state.selectedKey == -1 ){
            console.log("contact not selected");
            return;
        }

        this.setState({
            contactData : update(this.state.contactData, {
                $splice : [[this.state.selectedKey,1]]
            } ),
            selectedKey : -1
        });
    }

    _editContact(name, phone) {
        this.setState({
            contactData : update(
                this.state.contactData,
                {
                    [this.state.selectedKey] :{
                        name : {$set : name},
                        phone : {$set : phone}
                    }
                }
            ),

            selected :{
                name : name,
                phone : phone
            }
        });
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
                                         contactKey={i}
                                         isSelected={this._isSelected.bind(this)(i)}
                                         onSelect={this._onSelect.bind(this)}
                          />
                        );
                  })}
              </ul>
              <ContactCreator onInsert={this._insertContact.bind(this)} />
              <ContactRemover onRemove={this._removeContact.bind(this)} />
              <ContactEditor onEdit={this._editContact.bind(this)}
                                onSelected={(this.state.selectedKey != -1)}
                             contact={this.state.selected} />
          </div>

        );
    }
}

class ContactInfo extends React.Component {
    handleClick() {
        this.props.onSelect(this.props.contactKey);
        /*
         parent 컴포넌트에서 prop 으로 전달받은 onSelect() 메소드를 실행합니다.
         인수 contactKey 는 해당 컴포넌트의 고유 번호입니다.
         컴포넌트를 매핑할 때 key 를 사용하긴 하였으나,
         이는 prop으로 간주되지 않으며 React 내부에서 사용하는 용도이기에 직접 접근이 불가합니다.
         */
    }

    /**
     *
     데이터가 수정 될 때 마다, 상태에 변동이 없는, 즉 리렌더링 할 필요가 없는 컴포넌트들도 리렌더링이 되고있습니다.
     Component Lifecycle API 중 하나인 shouldComponentUpdate() 메소드를 컴포넌트 클래스 안에 작성해주면됩니다.
     이 메소드는 컴포넌트를 다시 렌더링 해야 할 지 말지 정의해준답니다.
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }

    render(){
        /**
         * arrow function 이 사용되었는데요, 매개변수가 오직 하나라면 괄호가 생략 될 수 있습니다.
         이 함수는 매개변수가 참이면 배경색이 아쿠아색인 스타일을 반환하며 거짓이면 비어있는 스타일을 반환합니다.
         강좌 3편 JSX 에서 언급했었던 inline styling이 사용되었습니다
         * @param isSelect
         * @returns {{fontWeight: string, backgroundColor: string}}
         */
        let getStyle = isSelect => {
            if(!isSelect)   return;
            let style = {
                fontWeight : 'bold',
                backgroundColor: '#4efcd8'
            }
            return style;
        };

        return(
            <li style={getStyle(this.props.isSelected)} onClick={this.handleClick.bind(this)}>{this.props.name} {this.props.phone}</li>
        );
    }
}

class ContactCreator extends React.Component {
    constructor(props) {
        super(props);
        // Configure default state
        this.state = {
            name : "",
            phone : ""
        }
    }
    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleClick(e) {
        this.props.onInsert(this.state.name, this.state.phone); //상위의 함수를 호출하여 새로운 배열에 add해줍니다.
        //자신것은 초기화
        this.setState({
            name:"",
            phone:""
        });
    }

    render() {
        return(
            <div>
                <p>
                    <input type="text" name="name" placeholder="name" value={this.state.name}
                            onChange={this.handleChange.bind(this)}/>
                    <input type="text" name="phone" placeholder="phone" value={this.state.phone}
                           onChange={this.handleChange.bind(this)}  />
                    <button onClick={this.handleClick.bind(this)}>
                        Insert
                    </button>
                </p>
            </div>
        );
    }
}


class ContactRemover extends React.Component {
    handleClick(e) {
        this.props.onRemove(); //당 메소드에선 parent 컴포넌트에서 전달 받은 onRemove() 메소드가 실행됩니다.
    }

    render() {
        return(
          <button onClick={this.handleClick.bind(this)}>
                Remove Selected contct
          </button>
        );
    }

}

class ContactEditor extends React.Component {
    constructor(props) {
        super(props);
        // Configure default state
        this.state = {
            name: "",
            phone: ""
        };
    }
    /*
     하지만, 인풋박스의 value 부분은 유동적이기에 그 부분에 { this.props.contact.name } 을 할 수는 없습니다.
     prop값이 바뀔 때마다 state를 업데이트 해줄 필요가 있는데요, 이는 Component Lifecycle API 중 하나인
     componentWillReceiveProps()를 사용하면됩니다. 이 컴포넌트 내장메소드는, prop 값을 받게 될 때 실행되는 메소드입니다.
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }

    handleClick(){
        if(!this.state.isSelected){
            console.log("contact not selected");
            return ;
        }
        this.props.onEdit(this.state.name, this.state.phone); //parent 컴포넌트에서 전달 받을 메소드 입니다.
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
                <p>
                    <input type="text"
                           name="name"
                           placeholder="name"
                           value={this.state.name}
                           onChange={this.handleChange.bind(this)}/>

                    <input type="text"
                           name="phone"
                           placeholder="phone"
                           value={this.state.phone}
                           onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleClick.bind(this)}>
                        Edit
                    </button>
                </p>
            </div>
        );
    }
}




export default App;