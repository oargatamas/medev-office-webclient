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
import {withWidth} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import LinearProgress from "@material-ui/core/LinearProgress";


const styles = (theme) => ({
    root: {},
    content: {
        maxWidth: "95vw",
        overflow: "visible",
    },
    tableContainer: {
        maxHeight: "40vh",
        overflowY: "auto",
    },
    table: {
        width: "100%",
        marginBottom: theme.spacing(1)
    },
    tableBody: {
        overflow: "auto",
    },
    headerCell: {
        zIndex: 10,
        [theme.breakpoints.down('sm')]: {
            zIndex: 10,
            transform: "rotate(-89deg)",
            transformOrigin: "center",
        },
    },
    cell: {
        //maxWidth: 50,
        padding: theme.spacing(1),

    },
    userSelect: {
        flexGrow: 1,
    }
});


const hasPermission = (permission, permissionTypes) => {
    const found = Object.keys(permissionTypes).find((item) => {
        return permissionTypes[item].id === permission
    });
    return !!found;
};


const flattenItemTree = (rootItem, flatOutput = []) => {
    const item = Object.assign({}, rootItem);
    delete item.content;
    delete item.permissions;
    flatOutput.push(item);

    if (rootItem.content && rootItem.content.length > 0) {
        rootItem.content.forEach((item) => {
            flattenItemTree(item, flatOutput);
        });
    }
    return flatOutput;
};


const getCommonItemPermissions = (items) => {
    let commonPermissions = items[0].permissions;

    items.forEach((item) => {
        let itemPermissionUserIds = Object.keys(item.permissions);

        console.log(itemPermissionUserIds);

        itemPermissionUserIds.forEach((userId) => {
            if(commonPermissions.hasOwnProperty(userId)) {
                commonPermissions[userId] = Array.from(commonPermissions[userId])
                    .filter(cp => item.permissions[userId].some(p => p.id === cp.id));
            }
        });

        Object.keys(commonPermissions)
            .filter(userId => !itemPermissionUserIds.some( u => u === userId))
            .forEach( cp => delete commonPermissions[cp]);
    });

    return commonPermissions;
};


class ItemPermissionDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.saveChanges = this.saveChanges.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.togglePermission = this.togglePermission.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleRecursiveUpdate = this.toggleRecursiveUpdate.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.addNewUserMobile = this.addNewUserMobile.bind(this);
        this.state = {
            editing: false,
            recursive: false,
            item: {
                ...this.props.dialogItem,
                permissions: getCommonItemPermissions(this.props.itemQueue),
            }
        };
    }

    saveChanges() {
        const {folderTree, itemQueue} = this.props;
        const {item, recursive} = this.state;

        let items = itemQueue.map(i => ({...i, permissions: item.permissions}));
        if (recursive) {
            const flattenRootFolder = flattenItemTree(folderTree).map((descendant) => {
                descendant.permissions = item.permissions;
                return descendant;
            });
            items = items.concat(flattenRootFolder);
        }
        this.props.actions.itemQueue.process.toPermission(items);
    }

    handleClose() {
        this.props.actions.dialog.close();
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
        const {editing, item, recursive} = this.state;
        this.setState({recursive: recursive, editing: !editing, ...item});
    }

    toggleRecursiveUpdate() {
        const {actions, dialogItem} = this.props;
        const {editing, item, recursive} = this.state;
        this.setState({recursive: !recursive, editing: editing, ...item});

        if (!recursive) {
            actions.folder.requestFolderTree(dialogItem, true);
        }
    }

    addNewUserMobile(e) {
        this.addNewUser(JSON.parse(e.target.value));
    }

    addNewUser(selectedOption) {
        const state = this.state;
        this.setState({
            editing: state.editing,
            item: {...state.item, permissions: {...state.item.permissions, [selectedOption.value.id]: []}}
        });
    };

    render() {
        const {classes, width, permissionTypes, systemUsers, isDialogFetching, itemQueue} = this.props;
        const {editing, item, recursive} = this.state;
        const itemPermissions = item.permissions;

        const uiDisabled = isDialogFetching ? isDialogFetching : !editing;
        const isSingleItem = itemQueue.length <= 1;
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
                    {
                        item.type === "folder" && isSingleItem ? (
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox checked={recursive} onChange={this.toggleRecursiveUpdate}/>}
                                    label="Update recursively"
                                />
                            </FormGroup>
                        ) : null
                    }
                    {isDialogFetching ? (<LinearProgress/>) : null}
                    <div className={classes.tableContainer}>
                        <Table stickyHeader className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell key={"base"} className={classes.cell}/>
                                    {permissionTypes.map((item) => (
                                        <TableCell key={item} className={classes.cell + " " + classes.headerCell}
                                                   align={"center"}>{item}</TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                                {Object.keys(itemPermissions).map((user) => {
                                    const userData = systemUsers.find(item => item.id === user);
                                    const userRelatedPermissions = itemPermissions[user];

                                    return (
                                        <TableRow key={user}>
                                            <TableCell key={user} align={"right"}>
                                                {userData.firstName + " " + userData.lastName}
                                            </TableCell>
                                            {permissionTypes.map((item) => {
                                                return (
                                                    <TableCell key={item} className={classes.cell} align={"center"}>
                                                        <Checkbox
                                                            disabled={uiDisabled}
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
                    </div>

                    <FormGroup row>
                        {width === "xs" || width === "sm" ? (
                            <FormControl>
                                <NativeSelect
                                    value={" "}
                                    onChange={this.addNewUserMobile}
                                    name="userToAddPermission"
                                    disabled={uiDisabled}
                                >
                                    <option value="">{" "}</option>
                                    {userOptions.map(userOption => (
                                        <option value={JSON.stringify(userOption)}>{userOption.label}</option>
                                    ))}
                                </NativeSelect>
                                <FormHelperText>Select a user from the list</FormHelperText>
                            </FormControl>
                        ) : (
                            <Select isDisabled={uiDisabled}
                                    className={classes.userSelect}
                                    placeholder={"Type name of the user..."}
                                    onChange={this.addNewUser}
                                    isSearchable
                                    value={""}
                                    options={userOptions}
                            />
                        )}
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

export default withWidth()(withStyles(styles, {withTheme: true})(ItemPermissionDialog));