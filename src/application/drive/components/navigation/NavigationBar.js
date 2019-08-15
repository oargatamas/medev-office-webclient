import React, {Component} from "react";
import {Breadcrumbs, Link} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";


class NavigationBar extends Component {


    render() {
        const {items} = this.props;

        return (
            <Breadcrumbs>
                {items.map((item) => (
                    <Link component{RouterLink} to={"/drive/" + item.id}>
                        {item.name}
                    </Link>
                ))}
            </Breadcrumbs>
        );
    }
}