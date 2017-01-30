let view = null;
export const init = (viewToUpdate) => view = viewToUpdate;
export const dispatch = (action) => view(action)
