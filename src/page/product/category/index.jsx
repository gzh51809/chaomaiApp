import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import axios from 'axios';
import './style.scss';

import '@/statics/serarchbar/iconfont.css';
class category extends Component {
    state = {
        tab: [],
        complete: 0,
        newtab: [],
        loading: true,
        text: '',
        shaDow: false,
        nav: [
            { text: '消息', path: '/' },
            { text: '首页', path: '/' },
            { text: '会员中心', path: '/' },
            { text: '购物车', path: '/' },
        ]
    }
    handleShadow() {
        this.setState({
            shaDow: false
        })
    }
    handleChangeTab(idx, id, name, device = 'mobile') {
        this.setState({
            complete: idx,
            loading: true
        })
        let formData = new FormData();
        formData.append('category_id', id);
        formData.append('device', device);
        axios.post('basic/category/lists', formData)
            .then(res => {
                let { data } = res.data
                this.setState({
                    loading: false,
                    newtab: data,
                    text: name
                })
            })
    }
    handleBack() {
        let { history } = this.props;
        history.goBack();
    }
    handleNav() {
        this.setState({
            shaDow: true
        })
    }
    handleNavTo(path){
        this.props.history.push(path);
    }
    componentWillMount() {
        let Form = new FormData();
        Form.append('device', 'mobile')
        axios.post('basic/category/lists', Form)
            .then(res => {
                let { data } = res.data;
                this.setState({
                    tab: data
                })
            })
        let newForm = new FormData();
        newForm.append('device', 'mobile')
        newForm.append('category_id', 1)
        axios.post('basic/category/lists', newForm)
            .then(res => {
                let { data } = res.data;
                this.setState({
                    newtab: data,
                    loading: false
                })
            })
    }
    render() {
        let { tab, complete, newtab, loading, text, shaDow, nav } = this.state;
        return (
            <div className='container'>
                <div>
                    <div className='header'>
                        <div className='nav'>
                            <div className='side' onClick={this.handleBack.bind(this)}>
                                <i className='iconfont icon-back'></i>
                            </div>
                            <div className='header-main'>
                                <div className='sch-bar'>
                                    <i className='iconfont icon-search'></i>
                                    <span>搜索宝贝/店铺</span>
                                </div>
                            </div>
                            <div className='side' onClick={this.handleNav.bind(this)}>
                                <i className='iconfont icon-more'></i>
                            </div>

                        </div>
                    </div>
                    <div className='dialog-more' style={{ 'display': shaDow ? 'block' : 'none' }}>
                        <div className='weui-mask' onClick={this.handleShadow.bind(this)}>
                        </div>
                        <div className="weui-dialog">
                            <ul className="more-box">
                            {
                                nav.map(item=>{
                                    return (
                                        <li key={item.text} onClick={this.handleNavTo.bind(this,item.path)}>
                                            <span className='text-box'>{item.text}</span>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div >
                    <ActivityIndicator toast text="Loading" animating={loading} />
                    <div className='elevator'>
                        <ul className='side-bar'>

                            {
                                tab.map((item, idx) => {
                                    return (
                                        <li className={`sub ${idx === complete ? 'cur' : ''}`}
                                            onClick={this.handleChangeTab.bind(this, idx, item.category_id, item.category_name)}
                                            key={item.category_id}
                                        >
                                            {item.category_name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='pro-box'>
                        <div className="show-box">
                            <div className="show-tit">
                                {text ? text : '农业'}
                                <span className="get-more">
                                    查看更多>
                                </span>
                            </div>
                            <ul className="pro-show">
                                {
                                    newtab.map(item => {
                                        return (
                                            <li className='sub' key={item.category_id}>
                                                <div className="pro-link">
                                                    <div className="img-box">
                                                        <img className='pro-img' src={item.logo} alt="" />
                                                    </div>
                                                    <p className="pro-name">
                                                        {item.category_name}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default category;