export type PaginationState = {
  activePage: number;
  disabledLeft: boolean;
  disabledRight: boolean;
};

export type PaginationAction =
  | { type: "SET_PAGE"; page: number }
  | { type: "CHECK_ARROW"; totalPage: number }
  | { type: "RESET" };

export const initialPaginationState: PaginationState = {
  activePage: 1,
  disabledLeft: true,
  disabledRight: false,
};

export function paginationReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, activePage: action.page };

    case "CHECK_ARROW": {
      const currentGroup = Math.floor((state.activePage - 1) / 5);
      const lastGroup = Math.floor((action.totalPage - 1) / 5);
      return {
        ...state,
        disabledLeft: currentGroup === 0,
        disabledRight: currentGroup === lastGroup || action.totalPage <= 5,
      };
    }

    case "RESET":
      return initialPaginationState;

    default:
      return state;
  }
}
