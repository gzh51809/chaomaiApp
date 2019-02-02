import React,{ Component } from 'react';
import axios from 'axios';
import './style.scss';

class HomeSwiper extends Component{
    state={
        swiperData:[]
    }
    componentWillMount(){
        //请求HomeSwiper数据
        let formData = new FormData();
        formData.append("type", "mobile_index");
        formData.append("device", 'mobile'); 
        axios.post('nav/Lists', formData)
        .then(res=>{
            let {data} =res.data;
            this.setState({
                swiperData:data
            })
        })
        .catch(err=>console.log(err))
    }
    render(){
        let { swiperData}=this.state;
        return (
            <div className='contain'>
                <div className='page'>
                    {
                        swiperData.map(item=>{
                            return (
                                <div className='item' key={item.logo}>
                                    <img src={item.logo} alt='' />
                                    <div className='name'>{item.name}</div>
                                </div>
                            )
                        })
                    }
                   
                </div>
            </div>
        )
    }
}

export default HomeSwiper;
