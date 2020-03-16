let initState = {
  currentItineraryId: null,
  Itineraries: []
}
export const itineraries = (state=initState,action)=>{
  switch (action.type){
      case 'UPDATE_CURRENT_ITINERARY_ID':
          return {...state, currentItineraryId: action.payload}
      case 'UPDATE_ITINERARIES':
          if(!(state.Itineraries.includes(action.payload))) {
              return {...state, Itineraries: [...state.Itineraries, action.payload]}
          } else {
            return state;
        }
      default:
      return state;
  }
}