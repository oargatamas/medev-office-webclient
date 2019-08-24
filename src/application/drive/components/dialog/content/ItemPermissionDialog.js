import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import Select from "react-select";
import {mapUsersToOptions} from "../../../../core/action/getUserInfoActions";


const styles = (theme) => ({
    content: {
        minWidth: 500,
        overflowY: "visible",
    },
    table: {
        //minWidth: 650,
        marginBottom: theme.spacing(1)
    },
    cell: {
        maxWidth: 50,
        padding: theme.spacing(1)
    },
    userSelect: {
        flexGrow: 1
    }
});


const hasPermission = (permission, permissionTypes) => {
    const found = Object.keys(permissionTypes).find((item) => {
        return permissionTypes[item].id === permission
    });
    return !!found;
};


class ItemPermissionDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.saveChanges = this.saveChanges.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.togglePermission = this.togglePermission.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.state = {
            editing: false,
            item: this.props.dialogItem
        };
    }

    saveChanges() {
        if (this.props.dialogItem !== this.state.item) {
            this.props.actions.updateItemPermissions(this.state.item);
        }else{
            this.props.action.closeItemDialog();
        }
    }

    handleClose() {
        this.props.actions.closeItemDialog();
    }

    togglePermission(event) {
        const state = this.state;
        const checkbox = event.target;
        const user = checkbox.getAttribute("user");
        const permission = checkbox.getAttribute("permission");

        let newPermissions = state.item.permissions[user];

        if (checkbox.checked) {
            newPermissions.push({id: permission, createdAt: moment().unix()});
        } else {
            newPermissions = newPermissions.filter(item => item.id !== permission);
        }

        this.setState({
            editing: state.editing,
            item: {...state.item, permissions: {...state.item.permissions, [user]: newPermissions}}
        });
    }

    toggleEditMode() {
        const {editing, item} = this.state;
        this.setState({editing: !editing, ...item});
    }

    addNewUser(selectedOption) {
        const state = this.state;
        this.setState({
            editing: state.editing,
            item: {...state.item, permissions: {...state.item.permissions, [selectedOption.value.id]: []}}
        });
    };

    render() {
        const {classes, permissionTypes, systemUsers, isDialogFetching} = this.props;
        const {editing, item} = this.state;
        const itemPermissions = item.permissions;

        const itemPermissionKeys = Object.keys(item.permissions);
        const userOptions = mapUsersToOptions(systemUsers).filter(item => !itemPermissionKeys.includes(item.value.id));

        return (
            <React.Fragment>
                <DialogTitle>Permissions of {item.name}</DialogTitle>
                <DialogContent className={classes.content}>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={editing} onChange={this.toggleEditMode}/>}
                            label="Edit permissions"
                        />
                    </FormGroup>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}/>
                                {permissionTypes.map((item) => (<TableCell key={item} className={classes.cell}
                                                                           align={"center"}>{item}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(itemPermissions).map((user) => {
                                const userData = systemUsers.find(item => item.id === user);
                                const userRelatedPermissions = itemPermissions[user];

                                return (
                                    <TableRow key={user}>
                                        <TableCell align={"right"}>
                                            {userData.firstName + " " + userData.lastName}
                                        </TableCell>
                                        {permissionTypes.map((item) => {
                                            return (
                                                <TableCell key={item} className={classes.cell} align={"center"}>
                                                    <Checkbox
                                                        disabled={isDialogFetching ? isDialogFetching : !editing}
                                                        checked={hasPermission(item, userRelatedPermissions)}
                                                        inputProps={{user: user, permission: item}}
                                                        onChange={this.togglePermission}
                                                    />
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <FormGroup row>
                        <Select isDisabled={isDialogFetching ? isDialogFetching : !editing}
                                className={classes.userSelect}
                                placeholder={"Type name of the user..."}
                                onChange={this.addNewUser}
                                isSearchable
                                value={""}
                                options={userOptions}
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} disabled={isDialogFetching} onClick={this.saveChanges}>Save</Button>
                    <Button color={"default"} disabled={isDialogFetching} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ItemPermissionDialog);