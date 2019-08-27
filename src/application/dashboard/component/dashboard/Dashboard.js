import React, {Component} from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    root: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    }
});

class Dashboard extends Component {


    componentDidMount() {
        this.props.actions.changeAppTitle();
    }

    render() {
        const {classes, user} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h5"} color={"textPrimary"} gutterBottom>Hi {user.firstName + " " + user.lastName},</Typography>
                <Typography variant={"subtitle1"} color={"textSecondary"}>Select from one of the modules by clicking the <AppsIcon/> icon at the upper left corner.</Typography>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: false})(Dashboard);