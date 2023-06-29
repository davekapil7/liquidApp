
const initialState = {
    proofdata : [],
    verification:{},
    verificationId: '',
    prrofdataApi : [],
    companydetail : {},
   };
   
   const certificateReducer = (state = initialState, action) => {
     switch (action.type) {
       case "ADD_PROOF":
         return {
           ...state,
           proofdata: action.payload,
         };
         case "ADD_PROOF_API":
         return {
           ...state,
           prrofdataApi: action.payload,
         };
         case "VERIFICATION_DATA" : 
         return{
          ...state,
          verification : action.payload
         }
         case "VERIFICATION_ID" : 
         return{
          ...state,
          verificationId : action.payload
         }
         case "ADD_COMPANY_DETAIL" : 
     
         return{
          ...state,
          companydetail : action.payload
         }
         case "CLEAR_ALL" : 
         return{
          ...initialState,
         }
       
   
       default:
         return state;
     }
   };
   
   export default certificateReducer;
   