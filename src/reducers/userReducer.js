const initialState = {
    name: '',
    level: '', //begginer, intermediate, advanced
    workoutDays: [], //1-0
    myWorkouts: [],
    lastWorkout: '', //uuid
    dailyProgress: ['2022-08-11', '2022-08-10']
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'SET_NAME':
            return {...state, name:action.payload.name}
        break;
    }
    return state
}