import React, { Component } from "react";
import '@/statics/serarchbar/iconfont.css';
import { add, changeQty, addSameCart } from '@/action/cartAction';
import { connect } from 'react-redux';
import axios from 'axios';
import './style.scss';
import { Carousel, ActivityIndicator, Toast } from 'antd-mobile';
class Detail extends Component {
    state = {
        open: false,
        photo: [],
        loading: false,
        allData: [],
        productInfo: [],
        productEvaSum: [],
        productEvaluation: [],
        supplyInfo: [],
        desc: '',
        number: 1
    }
    handleBack() {
        let { history } = this.props;
        history.goBack();
    }
    handleCancel() {
        this.setState({
            open: false
        })
    }
    handleShop() {
        this.setState({
            open: true
        })
    }
    handleCountNum(mode) {
        if (mode === '-') {
            let num = this.state.number;
            num = --num < 1 ? 1 : num
            this.setState({
                number: num
            })
        } else if (mode === '+') {
            let num = this.state.number;
            num++;
            this.setState({
                number: num
            })
        } else {
            return
        }
    }
    handlAddCart(item) {
        let { goods } = this.props;
        let currentGoods = goods.filter(goods => goods.id === item.id);
        if (currentGoods.length > 0) {
            let goods=currentGoods[0].product.filter(goods=>goods.id===item.product[0].id);
            let {id,product}=item;
            if(goods.length>0){
                let num=product[0].qty+goods[0].qty;
                this.props.changeQty(id,product[0].id,num)
            }else{
                this.props.addSameCart(id,item.product[0])
            }
        } else {
            this.props.addToCart(item)
        }
        this.setState({
            open: false
        }, () => { Toast.success('已成功加入购物车', 1); })
    }
    componentWillMount() {
        let { params } = this.props.match;
        this.setState({
            loading: true
        })
        let data = new FormData();
        data.append('id', params.id);
        data.append('device', 'mobile');
        axios.post('supply/product/GetProductDetail', data)
            .then(res => {
                this.setState({
                    allData: res.data.data,
                    photo: res.data.data.productInfo.image_list.split(','),
                    productInfo: res.data.data.productInfo,
                    productEvaSum: res.data.data.productEvaSum,
                    productEvaluation: res.data.data.productEvaluation[0],
                    supplyInfo: res.data.data.supplyInfo
                })
            })
        let desc = new FormData();
        desc.append('product_id', params.id);
        desc.append('device', 'mobile');
        axios.post('basic/product/Desc', desc)
            .then(res => {
                let { desc } = res.data.data;
                this.setState({
                    desc
                })
            })
    }
    render() {
        let { supplyInfo, number, photo, loading, allData, productInfo, desc, productEvaSum, productEvaluation = [], open } = this.state;

        let num = productEvaSum.ms_lev ? parseInt(productEvaSum.ms_lev) : '';
        return (
            <div className='app-content'>
                <div className='section-box'>
                    <ActivityIndicator toast text="Loading" animating={loading} />
                    <Carousel
                        dots={true}
                        autoplay={true}
                        infinite
                        dotActiveStyle={{ background: '#f35' }}
                    >
                        {
                            photo.map(item => {
                                return (
                                    <img key={item}
                                        src={item}
                                        alt=""
                                        style={{ width: '100%', height: '320px' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ loading: false })
                                        }}
                                    />
                                )
                            })
                        }
                    </Carousel>
                    <div className='round-btn left flex-center' onClick={this.handleBack.bind(this)}>
                        <i className='iconfont icon-back'></i>
                    </div>
                    <div className='round-btn right flex-center'>
                        <i className='iconfont icon-more'></i>
                    </div>
                    <div className="product-info">
                        <div className="base-info">
                            <div className="flex-item">
                                <div className="multi-ellipsis name">
                                    {productInfo.product_name}
                                </div>
                            </div>
                            <div className="side">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgwMDQyRDc0ODJGNTExRTdBRDFDQzJGMEVDMTcyM0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgwMDQyRDc1ODJGNTExRTdBRDFDQzJGMEVDMTcyM0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODAwNDJENzI4MkY1MTFFN0FEMUNDMkYwRUMxNzIzRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODAwNDJENzM4MkY1MTFFN0FEMUNDMkYwRUMxNzIzRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6yGBdtAAADuElEQVR42uxZaUhUURQeozT8ES3/gjahVVq1slBsEQuiyBZpsbRIox1LWqiopA216IdJGWVl/bCNFvwxWFqBS1m0a9KiRQVREVQQWTR9B74Hl8fM8znTzFWYAx/n3vvOO+97d+4959w3IS6Xy9GepIOjnUmQsL+lo68OCgsLvbltKJAKjAVCgGrgREZGRn1LN4b4uulaSVh+0WJggYfrci0dxH+1hSURDjxRyD4GcoE84D7HFkkbkxDutyXRCjkLDGF7HlAiDcym8UslcywSOEry2mY4CpjJ9lyDrCogfg5qCbspeIFROgnHU78GLngyAumTUDXsztFJeDB1hQ3by9Td20scNvaVSyfh69QTbdjOov6si3AisJrtCE9rk5FCQoax2S4GmnBfyV6AE4hVxs8DyW7IpjKciRRhAz70Og7DWQTTaE+m0vdALZy+9DAJ64G9QCeOSWQ4AmwDJjCsSdsJ32KfAAyj7SNghVepGc5CoXYCWzyY7OGDDZkKHFSiwnNguymUnQIWe/AnM7wSE/HX20wnYWg825+ABs7wIKAHsBUYA6zhS6Uq9+Zz3CxikwPMB6LJoRI4DqJvvS5+MLuH5W3ZFTJ5cPiH18KgMoF9bm69xZ+03s5yM1KzT+UlCPVSyGbC6SHTQ6Sa2g+7ZugDHH4BZANndBTwa6nrzGRNxGW9fmF3l7/JWhGOpj5tw8cl6kk6j0idqX/b8NFM3U0n4QbqJBs+plE7dRLOp47FxkqyiNPTmdFE7mgjjM10D6rcSKUgluiGrGSnq8qQk2EuzJ+EreKw1KONQBcO3eVLyEtO5ilC5A0gYW4A+x+Z3Y618OwE+pB9UoNJqvKJMEn354PjPZg4uc5/ApsYh0N5rYr1RKnpns1AGjDQNP4MKADxAp+P+SAuGytOqRGeCiE4LzUd83uz8FmnjF0BNgCvWFPMVq5VM9XHKGNSqS0N9HeJKKbuhexLSq8FxrG/W2oHoElSM3z0Q3sVX0xkI8ZzA1kPy3eGFK71SpYABtkdXONNyiZvBLKUNJ/D8iDgJ45yFu8FSsWXbZHqs7jRjW8X2s50H6hv2LAtUU4s2ghHUn+1YfvDqpIMFOE66hgbtnHU33USrqYeCQy3iDiy3qdY1SaBIlyhzPJNYIQbsqOhrrF7GxuwzOtT838QOVTOYDbrCjzggbOKcVxmNp2235T4rY2wg5lOlkQxE8tywrx00jC779oCYQcPpnKaWcbvE324LKWAKgPRIp+Kn7Yowb+9goRN8k+AAQBw8RZakIfGqgAAAABJRU5ErkJggg==" alt="" />
                                <div>分享</div>
                            </div>
                        </div>
                        <div className="row flex-between">
                            <div>
                                <span className='price'>
                                    ¥{productInfo.sell_price}
                                </span>
                                <del className='tip'>
                                    ¥0.00
                                </del>
                            </div>
                            <div className="tip-text">
                                已售{productInfo.sell_num}件
                            </div>
                        </div>
                        <div className="flex-between tip-text">
                            <div>{allData.sendAddress}</div>
                            <div>库存{productInfo.stock_real}件</div>
                        </div>
                        <div className="spec-box1 flex">
                            <div className="flex-item">
                                <div className="flex">
                                    <div className="service-item tip flex-item">价格优惠</div>
                                    <div className="service-item tip flex-item">快速发货</div>
                                    <div className="service-item tip flex-item">品质保证</div>
                                </div>
                            </div>
                            <div className="side flex-center tip">
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section-box desc-wrap'>
                    <div className='flex spec-box'>
                        <div className="flex-itme">
                            <span className="tip">商品描述</span>
                        </div>
                    </div>
                    <p className='pro-desc grey text-normal multi-ellipsis'>
                        {desc}
                    </p>
                </div>
                <div className='flex spec-box'>
                    <div className="flex-item text-ellipsis">
                        <span className="tip">选择：</span><span>套</span>
                    </div>
                </div>
                <div className="comment comment-wrap">
                    <div className="head">
                        <div className="title  flex-between">
                            <div className="flex-center">
                                <div className="flex">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                </div>
                                <p className="num">{num}</p>
                            </div>
                            <div className="flex-center">
                                {productEvaSum.sum}人已评价
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment" style={{ marginBottom: '10px' }}>
                    <div className="list">
                        <div className='item flex'>
                            <div className="avatar">
                                <img src={productEvaluation.logo} alt="" />
                            </div>
                            <div className="contents flex-item">
                                <div className="flex-between">
                                    <div className="name">{productEvaluation.nickname}</div>
                                    <div className="tip">1000</div>
                                </div>
                                <div className="flex">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5NDk4RUVBQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5NDk4RUVCQTM0QzExRTdBQkNFQjVBMzIzMTdGOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDk0OThFRThBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0OThFRTlBMzRDMTFFN0FCQ0VCNUEzMjMxN0Y4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TffswAAAB8UlEQVR42mL8//8/w0ACJoYBBuQ7wCRMFohvAnHoQIXAciBWA+K5QEfw0tcBJmGmQNIaygNZ7k/vEChG45eT6wBGknOBSZgCkLyPRSaS4cyqFfQIgYU4xKfRPgpMwqSApB0OWUGgvDvtHGASxgwkNxLMGZAoomIaMAkTAJLOQNwIxNpEmPkBiPOAeB8wTTwl3gEmYWxAUhWIlYBYB4hVoNgAiPnIiN4/QHwGmmBvAvFVKPsW0GGfUR1gErYZyDYHYlE6lL6fgPgU0BGuIA4LVNCOTF+SA0D2uKAnQlDq3kMnBzwCYnXsidAk7AKQ1Keh5R/A6QspcaJmwzOrQAluP40sfwzEmug5A1s54AnEB6ls+QMgtgda/oL4csAk7DI0O1IK3oCzNlLWI7YkjKKS74txWU64JDQJOwYkLSlKdGdWCVJSFxyi0PdnKa2MeCl0AD+lDjCn0AGGwGgkMwpMwniIrP3wAVAVrkduCICyIAcVcoEhPkkWMjWCyvOlQPwW6khQq9gUh1oFch2ghkXsGxC3AHEPMHv9RhJvBUZZDJDuhFZsyECU3ChQRWL/AuJCIFYEWtyOZjmsHlkCbcBEA/FzJBldckPgCRC/AuJ1QNwGtOAxwdg+s+o7kFwGDI31QLoGiBOglRAV+wXDrXcMEGAAiPOCJ2AAQ2cAAAAASUVORK5CYII=" alt="" className="rate" />
                                </div>
                                <div className="msg">
                                    {productEvaluation.comments}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-center">
                    <div className="divider flex-center">
                        购买这件商品的人还买了
                    </div>
                </div>
                <div className="wrapper">
                    <div className="product-list">
                        <div className="item">
                            <div className="contents">
                                <div className="square-box">
                                    <img src="http://buyshowimg.oss-cn-qingdao.aliyuncs.com/20190125%2F1ebe3a0520b032509e0827367d71eaac.jpg?x-oss-process=image/resize,m_lfit,w_400,h_400" alt="" className="thumb" />
                                </div>
                                <div className="section-content">
                                    <div className="name multi-ellipsis">
                                        2019年春联增福
                                    </div>
                                    <div className="text-between text">
                                        <div className="theme-color">
                                            ￥
                                            <span className="price">0.01</span>
                                        </div>
                                        <div className="tip">已售50件</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tabbar flex ">
                    <div className="btn-item flex-center">
                        <div className="text-small">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5MDRERTc2QTM0RDExRTdCQjc5REQ2QkU0RUNERDdGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5MDRERTc3QTM0RDExRTdCQjc5REQ2QkU0RUNERDdGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzkwNERFNzRBMzREMTFFN0JCNzlERDZCRTRFQ0REN0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzkwNERFNzVBMzREMTFFN0JCNzlERDZCRTRFQ0REN0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43U+9BAAAEQklEQVR42uxaaUgVURSel7ZoBalQUlBUVpTRYkMbiJT2o6Cg7UaLtECrphGRrWSQ0QYZFJkVRT8KJmwjW36YLfSjGkGhKEiLkgoyotKkyLLvvnce3oZ733szviXhHfjumzlz597z3eWcM5fnam1t1TqydNI6uEQJRAm0U2Lb3YLOeDkKGAsMAiYAA4FkwEW1GoBXQDXwAngEPHU/MY0IEtBZBsocYL6fmj2JXJaguwMcAm62xwSXIzeqM068FFguefoVeE6j/g3oASQBqUCCpP55YBNm4kN4COiMr5kiIEXQ3gWqgErgARlule7AOGAakA5kCM++A+tA4lxoCehsH8oCQcNHegdwycHgcQIHgPGC7ghIbAiNF9JZnsX4U+hshEPjudyjDX9M0OWjn9PBJ6Cz7e7RaZO1MH5lUPygaeSinAn8IM0K9FcYPAI646O0R9BkodOSoDpz07iOcoag2YV+M4M1A0eF683orCIkEck0Kt0buU2ugISrfQR0ls9LuqtEJwdDGlZN4zjKw3TH3e8F5wR0FoeymO64q5oVltzANDaifEt3C2BHb6czkCtc70XDTWFMcc4I17PtE9BZjOAyP7k3lVoGOjSSv9dV8axY8EpbncxACoV/LhUY/d8Ski6gnJK0xTaNX0bv3VAsoy9CfBmAfgYFTkBnQ1GeEDQvFe8mC65vnk0CK+h3KvrrrqhzWbi+iHrp/gnobCmlu2Ke8kDRQWdLAmdHPtNvs4+MmGerLXSdBtyHffPUBHTGU96zQg7v9T5PAzCol00CifQb78MbcZKvLVo+E0mqGVioGKkGRRcfheX1xEEexKWWMlGVvJPodqsIZEsqN2IkfilGiHuJMZRNFtkksJMC5CS00+KjnmxpZqsIyHa6y0/QaXYw+l6pIhftS2IkujgVgS7Staqz+Ah+sydKdH9UBN4ovmVTImK6J5gOlzxpURG4pWhqbIRGP0XxDf1QReCkQwLp7oBkT6YHkBzOUOgL5ARMgy+hLZIXpvjpKMedbmjaHBvfwjyFKAmgXaushp3V6khsGvtRrqcI6ZVRWI9LfHS0zu1uNa0sAHeaSycY3Pdn+lj/k1EOtqz7QthX6v9gyzSOooEyym+SiORPP2nBaMqftgH8VIEfj9QBTRRthwBrqP5jarveR5sFlsB1GnbVB+9g69/REu8y6eM/VVLzMR2jlFkGzNpeGsUIT7Q3jT6+uo8Nsufge2Gk1naUmECHXLWKwy6ZXBOuV/mrHBsiF8j3RI3NmexGGWg/0pRi9K8G72Ar9FLuzo08UgPjVwfyUmzEzdaZ9/RBjCVzA309UgSGaZ5jxf4aP+XTtL6k5/n/Iox+3f9MIINigcxL8VO/RjuNhXsPuISDK82Sh020a3ykNrEsRpTAeEcBKdwEuJG3JfpnThuMxAzkkcF8ubwHGEa/1vGajP7VIEogSqBjy18BBgDDSAxKxUFDVQAAAABJRU5ErkJggg==" alt="" className="icon" />
                            <div>客服</div>
                        </div>
                    </div>
                    <div className="btn-item flex-center">
                        <div className="text-small">
                            <svg data-v-4f6b7cd0="" type="ios-heart-outline" size="20" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" ><path data-v-4f6b7cd0="" d="M359.385 80C319.966 80 277.171 97.599 256 132.8 234.83 97.599 192.034 80 152.615 80 83.647 80 32 123.238 32 195.779c0 31.288 12.562 71.924 40.923 105.657 28.359 33.735 45.229 51.7 100.153 88C228 425.738 256 432 256 432s28-6.262 82.924-42.564c54.923-36.3 71.794-54.265 100.153-88C467.438 267.703 480 227.067 480 195.779 480 123.238 428.353 80 359.385 80zm67.445 211.141c-26.852 31.94-42.18 48.895-96.729 84.947-40.237 26.596-65.252 36.301-74.102 39.233-8.85-2.933-33.864-12.639-74.102-39.233-54.548-36.052-69.876-53.006-96.729-84.948-12.065-14.351-21.857-31.274-28.316-48.943C51.062 226.355 48 210.304 48 195.779c0-30.284 10.131-55.643 29.297-73.335 9.14-8.437 20.158-14.992 32.752-19.484 12.945-4.619 27.266-6.96 42.566-6.96 38.018 0 73.217 17.682 89.674 45.046L256 163.844l13.711-22.798C286.169 113.682 321.368 96 359.385 96c15.3 0 29.621 2.341 42.566 6.959 12.594 4.493 23.612 11.048 32.752 19.484C453.869 140.136 464 165.495 464 195.779c0 14.525-3.062 30.576-8.854 46.418-6.458 17.668-16.25 34.592-28.316 48.944z"></path></svg>
                            <div>收藏</div>
                        </div>
                    </div>
                    <div className="btn-main flex-item btn-cart" onClick={this.handleShop.bind(this)}>加入购物车</div>
                    <div className="btn-main flex-item btn-buy" onClick={this.handleShop.bind(this)}>立即购买</div>

                </div>
                <div className="shop">
                    <div className={`mask ${open ? 'active' : ''}`} onClick={this.handleCancel.bind(this)}></div>
                    <div className={`spec-box1 ${open ? 'active' : ''}`}>
                        <div className="close-btn" onClick={this.handleCancel.bind(this)}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5RTc4ODIzODJGQTExRTdCOEZFOEEwNzI3RjU5NjlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5RTc4ODI0ODJGQTExRTdCOEZFOEEwNzI3RjU5NjlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzlFNzg4MjE4MkZBMTFFN0I4RkU4QTA3MjdGNTk2OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFNzg4MjI4MkZBMTFFN0I4RkU4QTA3MjdGNTk2OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/mcKVAAAEt0lEQVR42tSZaWwVVRTHu4gUBeuCYZUQBSQsVWqwVmVRg4YgXwRpgmBAIRoBTSRKFNcIhhKC4QOJwaVILaKtMQofCBr9IFB3lAoScKGRRXBJEQW11ufv6H+SycvMmzvzXifpSf45774399z/nLn3LPOKM5lMUVeSkqIuJmfka2DO/PtM9QJVYBi4GJSBv0Er+BbsBD8GzV//3Jp0CEN0EOpKMAPcDHpETHkbvAqawd7UPAzR/qgl4N6sn46Cr8DX4Hd5+SIwCgwGkwSTJvAE2BN3/eI4hw6yy1BLfV9tAi+CXeCnHFN7gtFgFrjH9309mMe2+KughCHaF/WmtoDJSvACC+3XHo4jfUAN8DbvEXArtnYWhDCExqO26GB9AO7HeHPWoUsidjhrwXSNb8PuxrwIQ6ZKJE1exuDskCiRjzwJHtPn21mjPlEchkg/1HYN64LIFkKw+zhqsYYbWPeapInjXUWRBoze0ZnJAPurUU/5wl88wtylTR4OdmNsVhoZjHVsW7xl8Zz1tzgT5uJzUY9oOD3lzGvOaQNT4HGZq4fXeqGLuz6QJlvWO4laoOHGSMKKtzM1rI0Id88A2+fnxOBkGe79iDT+CjgFRmC/IsrD10k3cre/RCw+Qdd/Bs52ILsZTAPXgjNzeDmjtG1ySxThO6VXOxAwsi3gEvCREkuYNKpAMs+NAScibHuxeAFeLgkkzA8Xom7Q8FOH/WaLVuraEeDjkEfdqMP7GxgHPnew/QPK9nNvPZFAD3sBu5UJ7Y6HxGresdoWl1oYBN0DyP4BrtZ1rrJDujKM8EjpXTEPt+25KzRvCPhCZeXzIvuPFm2JaXe39Hlh9XA/6e8TRqVKFedXge9AqWJqNdiXwN5h6V5hHu7wCqI8Qmm1DlSpxlMSkjU57qulAwmflj4rD8K2Dcp946ez9nSSBjkTRvhnX4GdRBoVFtvVCr2jWN2SkHR/6V/DCO/POnxxyXp1R4XI3qgDOFShrEdMmx6PtjDCXqE+mJhcmoBshxbZ53uUYxQ9rPL7JHs/RshE6W8CCRNTj/lIj3JsSjeL7CnF470BIa9K8deSy4cupLHbXZ22ydZcqXmd9GIHo01Kt14GC4vf7WpevYx4MCKNF6nm+M+POLItF+H3pGdDKCpanK/0We2QwTr0BOydxQUOD8+rFOtyFj/czUEf6bsj0vL1qAHgyxgZcahesJzM8eQshQ/Uk2t2KeC9iq2Wyb0dCu648mfE7y9Jzw2qaUoCSFhafU1pe0OaHQcOqlU9cgAeTc5NKBfX6LFNxsjDKZG1Yv1BDSclafMnSy/H2F2dTNaagdc1XIjDWmMTZtIOdbEmz2J0aSeRrdE7EJNlrLs26YsUI91gd+wZw/g6UF5Avvb+Y5M+r2C9R10rolyk7Y6nKszMt1QJ6Rl5Er1JRZH3/mMR6zxUkLeXWT1fg+9AHDKvqxs+4mCij+Yu8aV+SzhzIOvcjRTH/RcJ4taorgKXZxXb2+W1Q6otytTFjFS/OMh3vR2qB/Q6Idb6xUn/9oL4BG2VuUrTUXJaSeENsM235dIh7CNeJg9WqC038t2K/v8XqU2NwR51wScCzki6hNOWLvfHYpcj/K8AAwDn23wVw8UvgAAAAABJRU5ErkJggg==" alt="" />
                        </div>
                        <div className="section">
                            <div className="section-head">
                                <div className="base-info">
                                    <div className="thumb">
                                        <img src={productInfo.image_thumb} alt="" />
                                    </div>
                                    <div className="contents">
                                        <div className="price">¥{productInfo.sell_price}</div>
                                        <div>库存{productInfo.stock_real}件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-body">
                                <div className="select-box">
                                    <div>购买数量</div>
                                    <div style={{ display: 'inline-block' }}>
                                        <span className="number" onClick={this.handleCountNum.bind(this, '-')}>-</span>
                                        <input type="number" readOnly="readonly" value={number} className="number-input" />
                                        <span className="number" onClick={this.handleCountNum.bind(this, '+')}>+</span>
                                    </div>
                                </div>
                            </div>
                            <div className="section-foot flex" onClick={this.handlAddCart.bind(this, 
                                {   
                                    bussiness: supplyInfo.name, 
                                    id: supplyInfo.id,
                                    product: [{ 
                                        imgURL: productInfo.image_thumb, 
                                        qty: number, 
                                        id: productInfo.category_id, 
                                        name: productInfo.product_name, 
                                        price: productInfo.sell_price,
                                        open:false
                                    }] 
                                })}>
                                <div className="flex-item btn btn-cart">加入购物车</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        goods: state.cart.goodslist
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart(goods) {
            dispatch(add(goods))
        },
        changeQty(id,uid, qty) {
            dispatch(changeQty(id,uid, qty))
        },
        addToSameCart(id,goods){
            dispatch(addSameCart(id,goods))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);