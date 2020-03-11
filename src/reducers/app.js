export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      window.scrollTo(0, 0);

      setTimeout(() => {
        const screen1 = document.querySelector('.home-banner-1');
        const image1 = document.querySelector('.screen-1 img');

        if (image1) {
          screen1.style.paddingBottom = `${image1.height + 60}px`;
        }
      },100);
      return state;
    default:
      return state;
  }
};
