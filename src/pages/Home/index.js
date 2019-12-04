import React from 'react'
import './index.less'
// * import OnRef from '../proofOfConcept/onRef';
// * import stateHook from '../../commons/hooks/stateHook-number'
// * import stateHook from '../../commons/hooks/stateHook-object'
// * import stateHook from '../../commons/hooks/stateHook-function'
// * import effectHook from '../../commons/hooks/effectHook-isRefesh'
// * import effectLayoutHook from '../../commons/hooks/effectLayoutHook'
// * import StaticPropsContext from '../../commons/contextApi/staticProps'
// * import ContextHook from '../../commons/hooks/contextHook'
// * import reducerHook from '../../commons/hooks/reducerHook'
import reduxHook from '../../commons/hooks/reducerHook-contextHook'
// * import callbackHook from '../../commons/hooks/callbackHook'
// * import refHook from '../../commons/hooks/refHook'

export default props => {
    return (
        <div className='home'>
            <h1>共享单车后台管理系统</h1>
            <h2>React Hooks</h2>
            { reduxHook() }
        </div>
    )
}
// export default class Home extends React.Component {
//     componentDidMount() {
//         console.log(this.refs)
//     }
//     handleChildInstance = ref => {
//         //console.log(ref.state)
//         ref.handleClick()
//     }
//     render() {
//         return (
//             <div className='home'>
//                 <h1>Proof of Concept</h1>
//                 <div className='test-container'>
//                     <h1>onRef</h1>
//                     <OnRef ref='test' onRef={this.handleChildInstance} />
//                 </div>
//             </div>
//         )
//     }
// }