import React from 'react'

const StoreContext = React.createContext();
// export class contex extends Component {
//     state = {
//         count: 3
//     }
//   render() {
//     return (
//       <StoreContext.Provider value={{
//           state: this.state
//       }}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }

// export default contex
export default StoreContext;
export const StoreContextProvider = StoreContext.Provider;
export const StoreContextConsumer = StoreContext.Consumer;
