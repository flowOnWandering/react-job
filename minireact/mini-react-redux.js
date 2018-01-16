import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './mini-redux'


export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
    return class ConnectComponent extends React.Component{
        static  contextTypes = {
            store:PropTypes.object
        }
        constructor(props,context){
            super(props,context)
            this.state = {
                props:{}
            }
        }
        componentDidMount(){
            const {store} = this.context
            store.subscribe(() => this.update())
            this.update()
        }
        update(){
            // 获取mapStateToProps和mapDispatchToProps 放入this.props里
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
            this.setState({
                props:{
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render(){
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

// Provider，把store放到context里，所有的子元素可以直接取到store

export class Provider extends React.Component{
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return {store:this.store}
    }
    constructor(props,context){
        super(props, context)
        this.store = props.store
    }
    render(){
        return this.props.childern
    }
}