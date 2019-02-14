import React,{ Component } from 'react';
import FootBar from '../../components/footbar';
import { NavBar, Icon, Tabs, Carousel, WhiteSpace } from 'antd-mobile';
import HomeSwiper from './components/swiper';
import HomeNews from './components/news';
import HomeListWrap from './components/listwrap';
import HomeListContent from './components/listcontent';
import axios from 'axios';
import './style.scss';
class Home extends Component{
    state = {
        data: ['http://buyshowimg.oss-cn-qingdao.aliyuncs.com/20180331%2F24cb7ebe41ceccbbbf74e090183e93dc.jpg'],
        imgHeight: 175,
        tab:[],
        open:true,
        cid:''
    }
    componentWillMount(){
        //请求Tabs的数据
        axios.post('basic/category/Lists')
        .then(res=>{
            let {data} =res.data;
            data.unshift({ category_id: 0, category_name: "首页"})
            
            this.setState({
                tab:data.map(item=>{
                    return {
                        id: item.category_id,
                        title: item.category_name
                    }
                })
            })
            
        })
        .catch(err=>console.log(err))
    }
    handleChangeTab(tab){
        if(tab.title!=='首页'){
            this.setState({
                open:false,
                cid:tab.id
            })
        }else{
            this.setState({
                open: true
            })
        }
    }
    handleRouter(){
        let {history} =this.props;
        history.push('/product/category')
    }
    render(){
        return(
            <div >
                <NavBar
                    rightContent={[
                        <Icon key="0" type="search" onClick={this.handleRouter.bind(this)}/>,
                    ]}
                >首页</NavBar>
                <Tabs
                    initialPage={0}
                    animated={false}
                    tabs={this.state.tab}
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarBackgroundColor=''
                    tabBarUnderlineStyle={{ 'border': 'none' }}
                    usePaged={false}
                    swipeable={false}
                    prerenderingSiblingsNumber={0}
                    onChange={this.handleChangeTab.bind(this)}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4}  />}
                    
                >
                    <div style={{paddingBottom: '95px' }}>
                        {
                            this.state.open ?  (
                                <div>
                                    <Carousel
                                        autoplay={true}
                                        infinite
                                        dotActiveStyle={{ 'backgroundColor': '#f35' }}
                                    >
                                        {this.state.data.map(val => (
                                            <a
                                                key={val}
                                                href="http://www.alipay.com"
                                                style={{ display: 'block', width: '100%', height: this.state.imgHeight }}
                                            >
                                                <img
                                                    src={val}
                                                    alt=""
                                                    style={{ width: '100%', verticalAlign: 'top', height: '175px' }}
                                                    onLoad={() => {
                                                        // fire window resize event to change height
                                                        window.dispatchEvent(new Event('resize'));
                                                        this.setState({ imgHeight: 'auto' });
                                                    }}
                                                />
                                            </a>
                                        ))}
                                    </Carousel>
                                    <WhiteSpace />
                                    <HomeSwiper />
                                    <HomeNews />
                                    <HomeListWrap />
                                </div>
                                
                            ) : null
                        }
                        
                        <HomeListContent cid={this.state.cid}/>
                    </div>
                </Tabs>
                <FootBar />
            </div>
        ) 
    }
}

export default Home;