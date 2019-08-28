import {
    CLEAR_ITEM_QUEUE,
    ITEM_UPLOAD_ERROR,
    ITEM_UPLOAD_FETCH,
    ITEM_UPLOAD_SUCCESS, ITEMS_UPLOADED,
    UPDATE_ITEM_QUEUE
} from "../actions/uploadFileActions";
import {initialState} from "../state/uploadState";


export const driveUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ITEM_QUEUE:
            return Object.assign({}, state, {items: action.items});
        case ITEMS_UPLOADED:
            return Object.assign({}, state, {finished: true});
        case CLEAR_ITEM_QUEUE:
            return Object.assign({}, state, {items: []});
        case ITEM_UPLOAD_FETCH:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                        if (item.filename === action.filename) {
                            return {...item, uploading: true}
                        } else {
                            return item
                        }
                    }
                )
            });
        case ITEM_UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                        if (item.filename === action.filename) {
                            return {...item, uploading: false, success: true, error: false}
                        } else {
                            return item
                        }
                    }
                )
            });
        case ITEM_UPLOAD_ERROR:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                        if (item.filename === action.filename) {
                            return {...item, uploading: false, success: false, error: true}
                        } else {
                            return item
                        }
                    }
                )
            });
        default:
            return state;
    }
};