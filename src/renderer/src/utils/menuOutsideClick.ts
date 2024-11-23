
const menuOutsideClick = (e, ref, setter) => {
  if (!ref.current?.contains(e.target)) {
    setter(false);
  }
}

export default menuOutsideClick;