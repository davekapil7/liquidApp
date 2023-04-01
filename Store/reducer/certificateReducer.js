
const initialState = {
    proofdata : [],
    verification:{}
   };
   
   const certificateReducer = (state = initialState, action) => {
     switch (action.type) {
       case "ADD_PROOF":
         return {
           ...state,
           proofdata: action.payload,
         };
         case "VERIFICATION_DATA" : 
         return{
          ...state,
          verification : action.payload
         }
       
   
       default:
         return state;
     }
   };
   
   export default certificateReducer;
   