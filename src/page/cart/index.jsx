import React, { Component } from 'react';
import FootBar from '../../components/footbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeOpen } from '@/action/cartAction';
import '@/statics/checkbutton/iconfont.css';
import './style.scss';
import { changeQty, deleteSame} from '../../action/cartAction';
class Cart extends Component {

    handleBack() {
        this.props.history.goBack();
    }
    handeCheckAll() {
        this.props.changeOpen();
    }
    handleChangeQty(mode,id,uid,qty){
        if(mode==='-'){
            let num=--qty<1 ? 1 : qty;
            this.props.changeQty(id,uid,num);
        }else if(mode==='+'){
            let num=++qty;
            this.props.changeQty(id, uid, num);
        }
    }
    handleDeleteSame(id,uid){
        this.props.deleteSame(id,uid);
    }
    render() {
        let { open, goodslist } = this.props;
        return (
            <div className="Cart">
                <div className="Header">
                    <div className="left" onClick={this.handleBack.bind(this)}>
                        <div className="left-arrow">
                        </div>
                    </div>
                    <h1 className="header-title">购物车</h1>
                </div>
                <div className="empty-contents" style={{ display: `${goodslist.length > 0 ? 'none' : 'block'}` }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNTE0QzY1OEM1NzExRTdBODE0RkI4QThCNTQ3NjMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxNTE0QzY2OEM1NzExRTdBODE0RkI4QThCNTQ3NjMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTE1MTRDNjM4QzU3MTFFN0E4MTRGQjhBOEI1NDc2MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTE1MTRDNjQ4QzU3MTFFN0E4MTRGQjhBOEI1NDc2MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4p+2gcAAASB0lEQVR42uydCXBdVRnHz8vaJE1Dl6RZmi4UEqjbgBBlVDqyo6OAw4yMKMPoiAKCg7iMMorD6IALM+IKOiLO6OCCUATLUpYCUjFgsRaxTUOT0qZt2mxN0pa0JPX733fu8+SY9t23n3vf/zfzTe5N8l5ezv3fc79zzvd9J3bkyBFFSFQoYRMQCpoQCpoQCpoQCppQ0IRQ0IRQ0IRQ0IRQ0ISCJoSCJoSCJoSCJiQJZam+oLOz8zj5UiPWKHay2ByxKbFU41Bj+ut+sd1ie8UGxIbEDvDSFAcdHR2FE7SIuU2+XCl2oliD2EKxWWmI2eSQ2Jg2iPl5sVViW3m5SarEggT4i5DnyperxK4Va83D59opdq/YHWLbeZnYQ2fbh/652G15EjNoFrtR7FGxd/Cyk6y5HNI7f0a+XOqfV1RUqJaWFlVWVqbKy8tVLBbL6APgCTE5OammpqbUm2++qXbu3KkmJib8H68Qe0DsHLogJGOXQ8S8RL68LAaXQzU2Nqqmpqacf6jh4WG1bds2ZXy2x8Qu4OWiy5Gpy7HSF/OsWbPyImYwd+5ctWzZMvNb52sjJCNBr/AP5s2bl9cPVldXZ99AV/BykUwFfbx/UFlZmfcPh57a4DTcV7xkJBNBj/kHGLjlGwxADZaKncJLRjIRdJ9/cPjw4fyPWGMxVV1dndC32Hm8ZCS0ggbNzc3m6anqf0vmhKQs6C7/YGRkpCAfEHPdBi0qHkNCSFqC3ii2BQdY9BgfH3dB0A28bCRdQQ+KPeKfbN+e/7CK0tJSVVVV5Z8ism8BLxtJS9AdHR1YqrsTHgfO33jjDW9pOt9gUceALgdJu4eGqP8jX77pn/f396uuri518OBBL/4iFdIt3WvNgS/nZSNHI1A8tIj6js7OTiy6fwzn+/fvV5s2bfJ+BnegpKTE+14QMA2HmYva2tp0/Wj20CT9Htrg82K3iE1bYUFPHVTM4MCBA6q7u1v19PQEv+vKymxBl/PSkYwELb30gNjNcvgRsftVPJxzzPQoAtgh/5cxDTg2NpaOy7FUrI6XjsxELF2/VlwQhMPNF5ttCDoZWJ3Bat/NvvvR3t6e9EXw1Tds2OCf4i5A0H8PL1/4KWhOofVBIKgeEXaqL0Xe4JegZ7gfECt88GM+RuTn8NXh3gi1emBIQZOMfOhsgR42MfcXdEl99uzZ5mk7Lx1xRdAoWbAjVUFbMx2tvHTEFUFjlmSzf4LFmjQGhifw0pGs+tAZ8i//YGBgQC1YkHw123I5kDS7Wg8yWf0pxB2qjMEOazd0WGxcP72flDHa5jAJGqsymLyu8Vcckw0MMRdtDAwxbXch9RBZdonQERT3J7G7RNwTLrscAGGpiXjUoNkwra2tZqASiS5IJj1TxQsNrRJxB874j2W6NXIa03be31Xxkl9n4KStrU3V1NQEd8LlBsDqJLd1DjfISPLrsvi1WQYHB826LD77xD4qPfVjrgpa6bvvehwsWrRI1dfX8woTD8x8oTZLX1+f+W2crBRRv+aiywG2+AdDQ0O8iiQBpmgbGhq8J7cxXYvkjmtc9aEBwlK9OTt/xZAQE7ihixcvNr/1YZcFjYHhQf+E/jCZCWu6tsllQW833Y4ZBgKEpEyhFyVe9A9SiakmxcOhQ4fM09ddF3QXe2iSgqB7XRf0Jv9gdHSUV48kE/R21wX9qli/30Oj9gchJnv27DFPX3Jd0JiATjnyjhQHWGAxXNFdKr5FidOCPmgKmn40MbHKzz2jjDh6VwV9xBwYsocmJqgBY3C/LnzktKDBev9g3759vIok8bQ2spl6xf4a5HUuCHobfH8ODImJNeuFgP9dYRE0tkR+jX40Mdm1a5p+Hw/6OhcEjVsxsQehNe9IihCsGhtJH6+IrQmToEGiigwi70hxY8VB/0XcjeGwCXojB4YEIOrSiOtBN/10Kq93RdA7tC/NgSHdDfP0BbFnwyjoXpVGNSUSPXbsmLZ28oy4GwfDKGjUY+j2TzjTUZwga0mXqQCo1fFAqu/hUpGWROCJFZBCigSrvDLcjfVhFjR66KkZ/ChSJFj796wRd2MqzIJGTEdieoYDw+IC885GLA908GA67+OSoJEFvpuCLk6s6doXzDFVWAWNqY1EBgsj74qL3bt3m6cPpONuuCZosJEDw+ID4Q7GzBaUvSbd93JN0PCjJ/2BIWt1FAfW7AYi63qjImjkGCZ8DQq6OLBmN57I5L1cEzTuTK4YFhF4EhsTACg89EiUBI2hbqK6v7FqRCKKFVn3oLgb/VEStH+XenAJPNrMEFn3VKbv6aKgE9krDCWNvrthgLnntVEUNAaGXAIvPnfjqVQj68Ii6G4ODIvD3TCyk5B3tzob7+uioBFKyhXDiGO5k88poxJt1AR9gIKOPlZW98PibkxGVdC+2+HBmY7oYUXWod7X49l6b1cFnZiLZpnd6DE+Pm6e/kMZU7VRFTQqtbPMbnG4G4+Ku3E46oIeUKymFFl3w1gBxshwTTbf31VB4x/t8U9YTSk6WGsL66R33lAMggb/9g8Y0xEdrMi6Z7P9/i4L+tVEd80l8EiAsZBVpmBtMQkaG8R4eyZjisco3kdCijVjhUCk9cUkaNSN5hJ4hLBmNx5S8SXvohH0oDkw5ExH+HtnY3DfpwWtiknQ4BX/gEvg4Wb79mlbDP5S6V0bik3QiULow8PDVEWIXQ2jd4YreWeu/pbrgkZMh7dOitExivmRcIGOyKq58R0V33OwKAWNqDuWBwspqK3S29trfusPYj/L5d8sc7xNdusBRCtOMNNRUVFBpTgOVgPhM1sLYlgRvD7Xf7ssBO2Dhni373bU1NSk9GLMXw8MDHiNXFZWRrXlCGSgYCbqKGlzj4ndpHTAWbELOhFaODg4qBYsWBD4hXv37rUrwpM8d9Z6AHirik/DKgo6Xu8OQ+QK5KChJ4jFYoF6DIq5IGDk/rKKrwSuEluXzz8eBkGv13e65zxjpqO0tDSQH2ewVux2sQbqLSfEdKeDXhibP2FBbKAQHyQMgkbDIPLuvb4fPXv27KQvsmZE8B4PU3fRpyQknzMReRd0xbCystI8XS5Wy8tNQbtCl38QNKbDmtFoVHrqj1DQLpDIaggaG11eXm6eLhRbxMtNQbvkcuz0e+igoaTGnHWJdjsIBe0ECPRPufjMvHnzzNO38nJT0K4ABadcfMZaJl8iVspLTkG7Qsqx0ZYfjUHhAl5yCto5QQetpmRN3Z2ouLBCQTsEAsN3pTIwLCkpUdXV1f5pldjxvOQUtCsgZSflakq1tdPWU9p5ySloV0DmSiLaKOjUnTUwXMZLTkG7RGLFEKGhafjRbWI1vOwUtCug9GpKO81agj5BjHXFIkzYUjgQSop8+KW+25EsJcv6OZa//6ZyUOCkiBnSriAMZZCxV8owBR0MNNpWX9AYGAbJMcQSuI6PxhOpgxrMGZO60/md2K9VnrJUwuxygOf9A6uS5VFpbW1NOReRpAVWYk9X8WSKH7OHDgZ2TMKcXWXQlKyqqirV1tbmHeM1rO+RxS55ctJz/YaGhuwsoctUPFPoLgo6eQ8N18OLnkMGi7F4kpRUfpcEB8nL6FxQVMYoLHOD2O9VfGMguhxHAdu+/TnhVDMR1hnwpFy4cKE9CG+iD52c+8W8OTs85riFsjsg3AAunj8eF1tMQQdzO572T6zKlsQBURtUUNDJQe/8dRXf1sDzozEoIQ5cGPGjjScmUu9fp6CDgQImPzV7aWtDR1IArK1DRvxOh4IOxveU3qcDU3GodDk2NkZVFRDrSYlr05fPvx/26oVYibpaxYvI1GM+tLu7WzU2Nqq6ujovY4UFGvPjZqDt8YTs65umXzxBJyjo1OgUu0LsbqWniKy5UFIYsEPsI3kfkEak8R4VO1fsQerICf4udp0qQBBYlJ7HqH93sdjZYhepeE1p9Nh+HuER6ixnnSKyLfBIfFn3zH9Ueo9JCjpzntSGohyY2K+i5nIKAmkQHIO5ur1a3AUjyiOmoUL1EqSwjwtCKGhCXKTYJmnfpuIVlOBf14mN6sEMbGORawFjjXoxlJvC5j7jFLSb/9+ZYpeq+A4AqBON8v+V+umEmY8D2jCgeU6P0PE16nmHmAE6S+yD+kav0oZB3kFtKO6zWhtiMiYp6MKxUuxGsQuP8X/i4tVoQ++0QuxTKp5p8QMVn9+ejFi7nCz2ObGPq/iuBsdK93mL2Af0DY+t2X6i28bZNomiDw1x3qIb/kNHE/Mxcgzx++eo+HL6r1R06uEhVef7Kj5XfI3YnCRitl97idgTYr9R8TqB7KHzwEliv9DuxTTxIlEWsR2I1TXjdRHUBEMsAiL2rGSBT4i9XQtgXYjbBelqd2v3S83UNma7oD0Qn4GwXGxvjDxMg8t0+16rjMwhV4gFKdZyLDo7O135X/B4vEfsNP8bc+fOVS0tLXZZ3WOC8Mf+/n7PDLBN2eUqXtMjbKzQ7XJ6orutrvZEHDS/EjuKoVKVFR+DMcaVYvdm8uE6OrJbVSIqLgcGON81xYwLtnTp0pTEDLAHYnNzs/daoydHTbzb9U0TJpr1WOB0s13a29tTShZGxGJTU5Navny5WQcFB9gl9mL60NnnBj148ViyZElKWyjPBHp3iNookXCG2DdUeHYBgDuJLYnP9b+xePHijNplzpw5atmyZWbOIPzwO1SeE2GjLmgMUD6d6JKkd7X2VkkbxFSjRzO4xBSI41yk3SQPuF7z58/PfGSp3RWjp0YS7Lcp6OzxWbHjcDBr1iw7jT5jIAJjRgT+y9UhaBPMtV/vP03w+RsasjdZ4w8kDRCPfj4FnTm4Spea/mEusN73ArF3Ot4u55kzGrloF7gfxo2OG+cqF9yxsAv6ffqR5z0Cg+wBng7wGY1BVEUI3I6LTFfD8HlzeaO/ywVfOuyCfr9/UF9fn9tplKZp12qlw4PDhVpciXFArsCNYvjSLWKnUNAZtKcydoeF/5xLZtjzsN7RdjnJbJcg5YYzwRqAn0pBZzDgVsa+g7nO7sb8tAEGoXWOtgs+V5k/eEtWmTVTrHn+Rgo6fSqVEWeRa0Fb79+g3N3Ec2G+nlozCLpJ5bn0V5QEjTJTiSCDXNd8tt5/v/m3HaOQycCxQv/zYRY04nUTW2Eh3iCXWCWukKs44mi7JPIog24hnVGvMr3dB1SBk2TDLug9BRL0iHkzOcaoMkoN51nQ/QV+QoTe5Vjvn+S6UpJVCBIxxa6mKPWKJTafCbpBaboMDk7bF2gzXY7MWO0LC7G7ufSjERds/V1XwfbRiTDX0dHRnPbOxhbVaKB1FHRmvCr2kn8yPJyb7fFQ0fTQoUSKIfLsnnW4TfDIT9SUC7pTWDpY7f2iMvZip6DTAyq7xz+ZIeMkK1g7BNxn+u6O8pD/+EcvOjAwkPU/gHa29rdBoP8UBZ059+newUsbgvjgfmTNIe3tNR+rcNTvCEGbYMD6LfOGzOYOB2hf6yZ/Rl8HRUFnobNQ8VDJcbOxsyFqvI/1WP2Cim/NHAbuNV2jbD69rPbdr9tlgoLOHi+I3aT0HCguXE9PT9pbVOBidXV12Y/qW1WG+XN5BvOMSO79J04wYN66dasaGUl/+txvF+PGQHt/VRmzTRR09vihimdOePOgcBO2bNnizU4ETQTG70HEmzdvtnszVKL/WgjbBCWGr9O9qOdP40ZHwmuq4EbA7ghWu6C9f+TSPxylrG+fT4rdpqxoOISX1tbWevENCDRCAqy/lQIM01vW1JzSg5yv6Is2EeKb/Vx9w5/kfwNtgK07EKhfWVn5f0FMaBvcAPv27fPaxRhHePeG2Bf1e2YkoGxnfUdR0AAJrTerzNKCMJeLTPJVEXmCIfcSWdpnHe0X/AyUJL72JrEv65mUjGEZg+BiRKoUiqI8neJrMWK/XPdqqyLUJltUPDULJcBmLEyZZFdeLGtjb8izsyXmXBD1Yo3YOH217p1wIVDnDpkVSH9Gd4SIuV0qPq+8Vuxx7XdGdW84DBR/q+LbRrxHxUs/4CmGOOZSo4Ob0r+LUTXKf2HvGqwC9rj+D0bV5TgaKE6IIOFyfQGntG88EWERHwu0AeK6kZfp70fjl9Pdob/Ccha255wPTYhLsII/oaAJoaAJoaAJoaAJBU0IBU0IBU0IBU0IBU0oaEIoaEIoaEIoaEKS8V8BBgBxuKUTbl1GzgAAAABJRU5ErkJggg==" alt="" className="icon" />
                    <div className="tip">
                        <p>您的购物车空空如也~</p>
                        <p>赶紧行动吧！</p>
                    </div>
                    <button className="weui-btn weui-btn_primary" onClick={() => this.props.history.push('/')}>去逛逛</button>
                </div>
                <div>
                    <div className="cart-list">
                        {
                            goodslist.map(item => {
                                return (

                                    <div className="item" key={item.id}>
                                        <div className="head-box flex-middle">
                                            <div className="flex-item flex-middle">
                                                <div className="check">
                                                    <i className={`iconfont ${open ? 'icon-xuanzhonggou' : 'icon-weixuan'}`}></i>
                                                </div>
                                                <div className="flex-item flex-middle">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNEFGNzIzODNCQjExRTc5NDgwRkNDMDBERTA5Njg4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYyNEFGNzI0ODNCQjExRTc5NDgwRkNDMDBERTA5Njg4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjI0QUY3MjE4M0JCMTFFNzk0ODBGQ0MwMERFMDk2ODgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjI0QUY3MjI4M0JCMTFFNzk0ODBGQ0MwMERFMDk2ODgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zIC2BAAAC1klEQVR42uyXO2hUQRSGc7Ou0VWj4iMGXcQHaHxUWoiLVoLRQi3EB4gJghsCVioqCOKjSKM2IsTtFFTUwkIsLAyoJJ0KoqCQxqxPVBKNLmqi1+/AuTBcdu5ONje4xQ78/PfOmZ37z5lzzsx6vu/XVEKrramQVhUSbuOijLlc7jDUCmZpl1/mYofAM9CRzWYfFhvk2YIVEaegE2Ow+FWIeeLkEURMNkTsAd2j2Erxhsx3FmwGR8AuJ48gZC90GTxH/co43MCcDdAH8BtMZd6fLsF6VPlMXPvBhz9CPWC8xl101qB8DbQMDPDjmzHHx2nlYy4xEsTGOUNcQraxzKzxWNCweuUec33mcT6c4b27qEcwLoY2aYCd174u6McoUGCOXjBDP3NB+WDU1uxWvo3agj5LDanTva0rA0nQYHj/hnJzlJAm5R4jyCRr6gPwLq72NCXrwzDsSaNvigarzPcK+gRSUTHySzkVivhBY/tklRPpG4hI1XnY3/A4aBmSKpU1940iVuwDjdA30M9zs2XMAygPX7LYW6BJ4K21oDFIPNQH5INXwXFW9lptGS1yi3S4ZMI27HfVnoZOgn3G/B2SfYz5omO2QtfFo6Cd/k5rZWXwUj2gktr1CEwDQYW9oxVyv77nFWv1XTLlopbyoEmaLtQFSruCiJbIgsaAl9By0KVd61SEpHQn9i0gq/VG4iRtiJBtWY1ZKvNG8FT7MyrinQgMi4g8fdU7c6AFKqI3HKDYJ0BLgPB77H1F5pCtnAm+Y39hrXqWQ09OyjQ/3BlnfWfea9BcsIG5h1wOvUNgBz9cEaOIlBbM9WC261UxP0ZXyeGR3ln/hjju5o/08uz971t80P81xotRwfBErestPjgLGrXSugSjFyHC12tAwhYrtvS9BW3X135jAltLlNjGP3payxg5fZtEnItHDmiKSapNjzEUHoO2sIiSlbX637cqpJKE/BNgAF3nDJhBlEM3AAAAAElFTkSuQmCC" alt="" className="store-icon" />
                                                    <span className="text-ellipsis">{item.bussiness}</span>
                                                    <svg type="ios-arrow-right" size="20" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path data-v-8b9c5130="" d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path></svg>
                                                </div>
                                            </div>
                                            <div className="link">联系卖家</div>
                                        </div>
                                        <div className="contents">
                                            {
                                                item.product.map(it => {
                                                    return (
                                                        <div className="product-item flex-middle" key={it.id}>
                                                            <div className="check">
                                                                <i className={`iconfont ${open ? 'icon-xuanzhonggou' : 'icon-weixuan'}`}></i>
                                                            </div>
                                                            <div className="flex-item flex">
                                                                <img  src={it.imgURL} alt="" className="thumb"/>
                                                                <div className="flex-item detail">
                                                                    <img onClick={this.handleDeleteSame.bind(this,item.id,it.id)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMkVGQTA0ODNCQzExRTc5NzU3ODFFMTE3OTdGMEVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyMkVGQTA1ODNCQzExRTc5NzU3ODFFMTE3OTdGMEVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzIyRUZBMDI4M0JDMTFFNzk3NTc4MUUxMTc5N0YwRUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyRUZBMDM4M0JDMTFFNzk3NTc4MUUxMTc5N0YwRUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ByQ/sAAAB00lEQVR42uyZPUsDQRCGcxeNqKSwSGVQa4sgWFja2ImVYOF3IZyFoKWdP0HQasFKRLG1s/FPWKl1Uqn4iUhyt74LI4Swt7nduz2M7MDLwM3e7sPc7Ec2Hue80EvmF3rMHLAD7nXgvrQdBEGwD7cNFaEopplH/gbabA8wxvIFhk1C4wnbTv2FklinDCZRamCv28aBT16DK0FhTJMm9JZwvCFoUJE8AXOPMvkwKgnAnsGt5DyvbqGaaQ2fQwNdJlTWi8B1qpJIsEqkel93lfjfGweyeQrtZjj+LPq7hEYzB0anFbg16CCmiZigx5Lne9AVVJbEFqAlaM5Ghovk65JYP60mO5LYBoFVJbF38qEN4FbHNiuzZ8mzugKqSZ7bAP4FVS1vXDPm5wFsw6wAu/OwbWBuoTS0+3Ql4YAdsAN2wMpte0QSK7ed6HK9SPEVp64WHRUfJbEGHZheFEfWyEaGVbuSGHACmpbEtqAxAu+0UHenM7n5CTXOwsI+STJ71U2cb1AS1Qzn0Az5ko0MP1F2K3TBcgR9G3yliDQPrdKzu8SzW+deAqDiB+VhxivVBWNs2QowQS/S5BqmyWJyEyPe+4IeAHui9aL7F8kBO2AHrLQfAQYAdFtvHA/eIMkAAAAASUVORK5CYII=" alt="" className="del-icon" />
                                                                    <div className="multi-ellipsis name">
                                                                        {it.name}
                                                                    </div>
                                                                    <div className="tip text-ellipsis text-small">套餐: 默认</div>
                                                                    <div className="sub-info">
                                                                        <div className="price text-ellipsis">
                                                                            ￥<span className="num">{it.price}</span>
                                                                        </div>
                                                                        <div className="check">
                                                                            <span className="selector" onClick={this.handleChangeQty.bind(this,'-',item.id,it.id,it.qty)}>-</span>
                                                                            <input type="number" className="number-input" readOnly value={it.qty} />
                                                                            <span className="selector" onClick={this.handleChangeQty.bind(this,'+',item.id,it.id,it.qty)}>+</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="footer-bar flex" style={{ display: `${goodslist.length > 0 ? 'fixed' : 'none'}` }}>
                        <div className="flex-item flex-between content">
                            <div style={{ display: 'flex' }}>
                                <div className="check" onClick={this.handeCheckAll.bind(this)}>
                                    <i className={`iconfont ${open ? 'icon-xuanzhonggou' : 'icon-weixuan'}`}></i>
                                </div>
                                <span style={{ lineHeight: '2.5' }}>全选</span>
                            </div>
                            <div className="text-small">
                                <div>
                                    共计
                                    <span className="theme-color">
                                        <span>￥</span>
                                        0
                                    </span>
                                </div>
                                <div>不含运费</div>
                            </div>
                        </div>
                        <div className="button flex-center">去结算(0)</div>
                    </div>
                </div>
                <FootBar />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        goodslist: state.cart.goodslist,
        open: state.cart.open
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeOpen: () => {
            dispatch(changeOpen())
        },
        changeQty:(id,uid,qty)=>{
            dispatch(changeQty(id,uid,qty))
        },
        deleteSame:(id,uid)=>{
            dispatch(deleteSame(id,uid))
        }
    }
}
Cart = connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))
export default Cart;