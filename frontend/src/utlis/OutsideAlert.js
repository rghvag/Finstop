// import React from "react";

// export default function useOutsideAlerter(ref) {
//   React.useEffect(() => {
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         // alert('You clicked outside of me!');
//         // setDisplaySearch();
//         // setlogoutdrop('login-details-header-dropdown-none');
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ref]);
// }
