import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";


const styles = () => ({
    avatar: {
        margin: 10,
    },
    userName: {
        alignItems: "flex-start",
        justifyContent: "center",
    }
});


class ProfileCard extends Component {
    render() {
        const {classes, user} = this.props;

        return (
            <FormGroup row className={classes.userName}>
                <Avatar className={classes.avatar}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
                <FormGroup column className={classes.userName}>
                    <Typography variant={"subtitle1"}>{user.firstName + " " + user.lastName}</Typography>
                    <Typography variant={"subtitle2"}>{"(" + user.username + ")"}</Typography>
                </FormGroup>
            </FormGroup>
        );
    }
}


export default withStyles(styles, {withTheme: false})(ProfileCard);