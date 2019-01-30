import React from 'react';
import './style.scss';
function HomeListWrap(){
    return (
      <div className='listworap'>
        <div className="list-item">
          <div className="list-img-wrap">
              <img src="http://buyshowimg.oss-cn-qingdao.aliyuncs.com/20190125%2Fb977d1c3eb5b45e29ae204c1771ae765.jpg" alt=""/>
          </div>
          <div className="list-item-detail">
              2019年春联增福
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
              <span className='tip-text'>已售49件</span>
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
    )
}
export default HomeListWrap;