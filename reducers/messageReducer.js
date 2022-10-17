import { types } from "../type";

const initialStates = {
  message: [],
  testimonials: [],
  cant: [],
};

export const messageReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.cheListMessage:
      return {
        ...state,
        message: [...action.payload],
      };
    case types.accumulateMessage:
      return {
        ...state,
        message: [...state.message, ...action.payload],
      };
    case types.userTestimonials:
      return {
        ...state,
        testimonials: action.payload,
      };
    case types.userTestimonialsAdd:
      return {
        ...state,
        testimonials: [action.payload, ...state.testimonials],
      };
    case types.cheListMessageEdit:
      return {
        ...state,
        message: state.message.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.cheListMessageClear:
      return {
        ...state,
        message: [],
      };
    case types.cheListMessageCant:
      return {
        ...state,
        cant: [...action.payload],
      };
    default:
      return state;
  }
};
