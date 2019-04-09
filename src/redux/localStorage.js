export const loadState = () => {
    try {
        const storedState = localStorage.getItem('state');
        
        if(storedState === null) {
            return undefined;
        }

        return JSON.parse(storedState);

    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const stringifiedState = JSON.stringify(state);
        localStorage.setItem('state', stringifiedState);
    } catch (err) {

    }
} 