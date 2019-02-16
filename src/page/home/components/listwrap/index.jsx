import React, { Component } from 'react';
import axios from 'axios';
import './style.scss';
class HomeListWrap extends Component {
  state = {
    listWrapData: []
  }
  componentWillMount() {
    let formData = new FormData();
    formData.append("device", 'mobile');
    axios.post('api/v1/basic/product/RecommendLists', formData)
      .then(res => {
        let { data } = res.data;
        this.setState({
          listWrapData: data
        });
      })
  }
  render() {
    let { listWrapData } = this.state;
    return (
      listWrapData.map(item => (
        <div className='listworap' key={item.rec_image}>
          <div className="list-item">
            <div className="list-img-wrap">
              <img src={item.rec_image} alt="" />
            </div>
            <div className="list-item-detail">
              
            </div>
            <div className="list-item-bottom">
              <div className="item-price">
                <span className="item-price-detail">
                  <span className='text-small'>
                    ￥
                <span className='text-big'>0</span>
                    <span className='text-big'>.</span>
                    <span className='text-small'>0</span>
                  </span>
                  <span className='tip-text'>已售{item.sell_num}件</span>
                </span>
              </div>
              <div className="item-buy">
                <div className="item-buy-btn text-normal">
                  立即购买
            </div>
              </div>
            </div>
          </div>
        </div>
      ))

    )
  }
}
export default HomeListWrap;