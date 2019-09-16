import {API_ORIGIN} from "../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "./driveApi";


export const THUMB_SMALL = "small";
export const THUMB_MEDIUM = "medium";
export const THUMB_LARGE = "large";

export const getThumbnailUrl = (item, size = null) => {
    return API_ORIGIN + DRIVE_API_BASE + "/file/" + item.id + "/thumbnail" + (size ? "?size=" + size : "");
};