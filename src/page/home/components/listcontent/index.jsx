import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile'
import './style.scss';
import axios from 'axios';
class HomeListContent extends Component{
    state={
        listData:[],
        loading:false
    }
    componentWillMount(){
        this.setState({
            loading:true
        })
        //通过父组件传回来的值进行判断
        let {cid} =this.props;
        let recommend=cid ? '1' : '4';

        //生成formData数据结构进行请求
        let formData = new FormData();
        formData.append("page", "1");
        formData.append("recommend", recommend); 
        formData.append("cid", cid); 
        formData.append("device", 'mobile'); 

        //发送请求
        axios.post('/product/Lists', formData)
        .then((res)=>{
            let {data} =res.data;
            this.setState({
                listData:data.data,
                loading:false
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        let { listData,loading } =this.state;
        return (
            <div className='listcontent'>
                <ActivityIndicator toast text="正在加载" animating={loading}/>
                <div className="section-title">
                    <span className="divider">
                        <span className="new-color">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4NDAzN0VCQTMyOTExRTc5RTI1QTI1OUQyRTNENURBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4NDAzN0VDQTMyOTExRTc5RTI1QTI1OUQyRTNENURBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg0MDM3RTlBMzI5MTFFNzlFMjVBMjU5RDJFM0Q1REEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg0MDM3RUFBMzI5MTFFNzlFMjVBMjU5RDJFM0Q1REEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4jGitVAAAFfElEQVR42uxaaWwVVRSeApoACoLEKioqIJXiEnDCInGJiVssSDFeDJtWJEQUA4iCsUajSEEwIYrgAhRcWEYRZTFo+kOMYq2TFhXFSMGlFBorqChGKqF+Z9435jJ23sybmVds0pN882a7c8+599zvnHPbnMbGRqMlSxujhUurASda2kVuaaoiHB/nVal2npnYViwDciItYlMNwrHcc/cmYEtzGxDVhW5o4t4zQF5LWQPrmrh3BFgOVPB3MpCfbQOiutAAHD8FaoAuwLPAY8DpwI3A1cC5QC5wENgLfAZsBXZ4vnYmUAh0BarhUmubw4BaHBeis/k474jzwz5vdgMGA0OAvkAjjRHDvwCGA3cCHbU25c4g2NZv2WEhU011XE+UT8nhNG//DGwiRE4Cngfmp2kjBr8C3JL8GjCVGFwCTMjQ7DOAGcI5wMQQ7w9HX3nZWMSLgEqM/rsh37+Ebao56pdm0NeMZA0w1fk4jieCRBblRvr5vcCpEQhmPPo8JckZWAK8jtHf7fNcGOgB4GvgLaAgBjvKYj8ZuDsZA0x1FY6Xkdu9chGDmBi2gGwTRf4CVgG3c/GHcqOwMyA8Pxuj/7dmlCy09TjbCUwHOseMSULLYxgH6njvbKefWDSaStr24sOL6ZMTyCT9Yih7DPiKAyOB7EngAu355yQAdxY2xJmBu4A1UH4W3WRhTOUNRnFhpKUYmNm8HqU916P1leg7P5oBKaUHkApLyOdRZBcwB7iD17me59cC9ehPaTMQilLb+Cg+Eaik0h1i+HcFUwdR/hFGWMmfezKHclPqP3EcodHtl57vjIU+nYMNMFUnQHKRl4D+MVykjAoNYmowV1NuLFnmOvY5DTgHRmxjYSQG1XLWDC0FuSfMDCxmp1FEcqIVTNxEuXdIEoV0mTf5njDZFCZ6jgnAe1T8mM86MJw2psoJMmBMROVfBHoDRcwmJY95gco+B/wBXK/lUGucoJiSjU7dYKonPN/c7LnuzllNrKh/g64hcprG3T2Ab4BJwHrS40BS51L6v4ibLlfz91EYUUC3yvvXxY6XB9PXA6bazogbJEWY7hVss59cns+g1o5xYhPzfoNu9SGfCf9f7IlFv7ImOMSiZ1iavvuj7+1+M7DEp5GM0u/adS/t3M3tH+bvUX5HlL8N+ATYpgXNfnQrV9prNUWnAOX/MwteA0o5Cq5UAaNh8YXs2PXLYlZiBt1CZJyHbstImYO5LsQlZvHZfVwvM8k2mcSXQn8DbKuBi8+VWtxbzWc1QAEjs8HC3aDBpTyfpLX9AHib9fEQGrSASZvbfm4TQS1I2qeviU0lxfiP2p3LoXil5x2ZkfuZw/zEhSlpxgGNHnVpy9R4HGekbQzy+A769PRnIRnp45OnmZrifYAueGcXMEVjkj3Ax6wJbtXa9qCRNZzZoTGVN7wpvR+NztPOFZTO1RijCtejaOwRT74i0zmVuc1qGlYMnJXAFlCVUyvb1pZw2yqm2qFlnU+hYTHvCz3eTB9+iG7jSl0Enw6S953UxrbWZbYvZCrJWV7l1UFHMds66lkj9TSiK3OV85i3xJVfGKmXo8+qaBtbqS2UOvq14WxA2dZKPivlhlTSIoHwZSdrta0D8XfmTDVHC1DlpMRhHPWBCSpe5ihuWxlvVQcZICnCfu3OPiZVScghLnRxk4rsbe6aShbPyARH+1tgGYNffXP8faAkIcW3MpDJNszTJIDYEmyAbdlN1KiZFDlS3V0BXAO8xliRmITdnZ7HTaew8gOTvGWeNZS4hC1o1nqyVD/5iMleH2cjLMvKhzcgVav6bYs3cKSHOns4qcXZYDSTZPYXGlONYEHRi9FZZkaC2/eRNTghf2b9H0nrvxq0GhBT/hFgAIa7k8sQDumbAAAAAElFTkSuQmCC" alt=""/>
                            超买新品
                        </span>
                    </span>
                </div>
                <div className="list-wrapper">
                    <div className="list-content">
                    {
                        listData.map(item=>(
                            <div className="list-item" key={item.product_name}>
                                <div className="square-box">
                                    <img src={item.image_thumb} alt="" />
                                </div>
                                <div className='detail-content section-content'>
                                    <div className='row-mb12'>{item.product_name}</div>
                                    <div className='text-small'>
                                        <div className='price'>
                                            <span>
                                                <span className='theme-color'>
                                                    <span className='text-small'>￥</span>
                                                    <span className='text-big'>{item.sell_price}</span>
                                                </span>
                                                <del className='tip'>
                                                    <span className='text-small'>￥</span>
                                                    {item.score}
                                            </del>
                                            </span>
                                        </div>
                                        <div className='flex-between'>
                                            <span>已售{item.sell_num}件</span><span>进入店铺</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeListContent;