/**
 * Created by tintoll on 2017-01-04.
 */
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}

export default Header;