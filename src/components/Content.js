/**
 * Created by tintoll on 2017-01-04.
 */
import React from 'react';

class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p> {this.props.body}</p>
            </div>
        );
    }
}


//Props Type 검증
Content.propTypes = {
    title : React.PropTypes.string,
    body : React.PropTypes.string.isRequired
};

export default Content;