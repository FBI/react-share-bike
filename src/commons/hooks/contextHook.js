import React, { useContext, createContext } from 'react'
// * 创建多个context
const userInfoContext = createContext(null)
const NotificationContext = createContext(null)

// export default class Parent extends React.Component {
//     render() {
//         return (
//             <userInfoContext.Provider value={{name: 'Charis-W',age: 18}}>
//                 <NotificationContext.Provider value='今天学了点React高级特性Hooks'>
//                     <SonComponent />
//                 </NotificationContext.Provider>
//             </userInfoContext.Provider>
//         )
//     }
// }
export default () => (
    <userInfoContext.Provider value={{name: 'Charis-W',age: 18}}>
        <NotificationContext.Provider value='今天学了点React高级特性Hooks'>
            <SonComponent />
        </NotificationContext.Provider>
    </userInfoContext.Provider>
)
function SonComponent() {
    return <UserInfoComponent />
}
function UserInfoComponent() {
    const userInfo = useContext(userInfoContext)
    const notification = useContext(NotificationContext)
    return <div>
                <h2>name：{userInfo.name}&nbsp;&nbsp;年龄：{userInfo.age}</h2>
                <h2>{notification}</h2>
           </div>
}