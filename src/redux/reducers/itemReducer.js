export const initialState = {
  id: "",
  dob: "",
  username: "",
  password: "",
  fname: "",
  lname: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  image: "",
  items: [],
  isEdit: false,
  isLoading: false,
  user: [],
  errorMessage: "",
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        ...state.input,
        ...action.payload,
      };
    case "SUBMIT":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case "FETCH":
      return {
        ...state,
        items: [...action.payload, ...state.items],
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "EDIT":
      return {
        ...state,
        isEdit: true,
        id: action.payload.id,
        fname: action.payload.fname,
        lname: action.payload.lname,
        phone: action.payload.phone,
        email: action.payload.email,
        image: action.payload.image,
      };
    case "UPDATE":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                fname: state.fname,
                lname: state.lname,
                phone: state.phone,
                email: state.email,
                image: state.image,
              }
            : item
        ),
      };
    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_FORM":
      return {
        ...state,
        dob: "",
        username: "",
        password: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        image: "",
        isEdit: false,
      };
    case "SET_USER":
      // console.log(action.payload.results, "action.payload");
      // return { ...state, user: action.payload.results };
      const { user } = action;
      return {
        ...state,
        items: [...user, ...state.items],
        isLoading: false,
      };
    default:
      return state;
  }
};
