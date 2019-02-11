import React, { Component } from "react";
import '@/statics/serarchbar/iconfont.css';
import axios from 'axios';
import './style.scss';
import { Carousel, ActivityIndicator } from 'antd-mobile';
class Detail extends Component {
    state = {
        photo: [],
        loading: false,
        allData: [],

    }
    handleBack() {
        let { history } = this.props;
        history.goBack();
    }
    componentWillMount() {
        let { params } = this.props.match;


        this.setState({
            loading: true
        })
        let data = new FormData();
        data.append('id', params.id);
        data.append('device', 'mobile')
        axios.post('supply/product/GetProductDetail', data)
            .then(res => {
                this.setState({

                    allData: res.data.data,
                    photo: res.data.data.productInfo.image_list.split(',')
                }, () => console.log(this.state.allData))
            })


    }
    render() {
        let { photo, loading, allData } = this.state;

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
                                    {allData.product_name}
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
                                    {/* ¥{allData.productInfo.sell_price ? allData.productInfo.sell_price : ''} */}
                                </span>
                                <del className='tip'>
                                    ¥0.00
                                </del>
                            </div>
                            <div className="tip-text">
                                {/* 已售{allData.productInfo.sell_num ? allData.productInfo.sell_num : ''}件 */}
                            </div>
                        </div>
                        <div className="flex-between tip-text">
                            <div>{allData.sendAddress}</div>
                            <div>{allData.stock_real}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;