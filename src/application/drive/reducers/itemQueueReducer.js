import {
    CLEAR_ITEM_QUEUE,
    QUEUE_ITEM_ERROR,
    QUEUE_ITEM_FETCH,
    QUEUE_ITEM_SUCCESS,
    QUEUE_PROCESSED,
    UPDATE_QUEUE
} from "../actions/itemQueueActions";
import {initialState} from "../state/itemQueueState";


export const driveItemQueueReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUEUE:
            return Object.assign({}, state, {itemQueue: action.items, finished: false});
        case QUEUE_PROCESSED:
            return Object.assign({}, state, {finished: true});
        case CLEAR_ITEM_QUEUE:
            return Object.assign({}, state, {itemQueue: [], finished: false});
        case QUEUE_ITEM_FETCH:
            return Object.assign({}, state, {
                itemQueue: state.itemQueue.map(item => {
                        if (item.filename === action.filename) { //Todo double check the other cases (ItemMove, Delete, etc...)
                            return {...item, fetching: true}
                        } else {
                            return item
                        }
                    }
                )
            });
        case QUEUE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                itemQueue: state.itemQueue.map(item => {
                        if (item.filename === action.filename) { //Todo double check the other cases (ItemMove, Delete, etc...)
                            return {...item, fetching: false, success: true, error: false}
                        } else {
                            return item
                        }
                    }
                )
            });
        case QUEUE_ITEM_ERROR:
            return Object.assign({}, state, {
                itemQueue: state.itemQueue.map(item => {
                        if (item.filename === action.filename) { //Todo double check the other cases (ItemMove, Delete, etc...)
                            return {...item, fetching: false, success: false, error: true}
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