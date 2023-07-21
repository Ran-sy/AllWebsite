export const loadState = () => {
    try{
        const currentState = localStorage.getItem('appState')
        if (currentState === null) return undefined
        return JSON.parse(currentState)
    }catch(e){
        console.log('error localData loading', e)
        return undefined;
    }
}
export const saveState = (state) => {
    try{
        const currentState = JSON.stringify(state)
        localStorage.setItem('appState', currentState)
    }catch(e){
        console.log('error localData loading', e)
        return undefined;
    }
}