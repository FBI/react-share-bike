import React from 'react';

//通过Ref访问组件实例的方法
export function renderLoading(WrappedComponent) {
    return class Loading extends React.Component {
        renderEntryFunc = instance => {// WrappedComponent组件在初始渲染的时候会调用ref并传入该组件实例
            instance.method() // 调用WrappedComponent组件实例的方法
        }
        render() {
            let props = {
                ...this.props,
                ref: this.renderEntryFunc
            }
            return <WrappedComponent {...props} />
        }
    }
}