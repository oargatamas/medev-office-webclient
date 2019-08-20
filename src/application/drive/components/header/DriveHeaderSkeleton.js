import React, {Component} from "react";
import Skeleton from "@material-ui/lab/Skeleton";


class DriveHeaderSkeleton extends Component {
    render() {
        return (
            <Skeleton width={"30%"} height={30}/>
        );
    }
}

export default DriveHeaderSkeleton;