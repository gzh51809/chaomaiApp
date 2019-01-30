import React,{ Component } from 'react';
import FootBar from '../../components/footbar';
import { NavBar, Icon, Tabs, Carousel, WhiteSpace } from 'antd-mobile';
import HomeSwiper from './components/swiper';
import HomeNews from './components/news';
import HomeListWrap from './components/listwrap';
import HomeListContent from './components/listcontent';
import './style.scss';
class Home extends Component{
    state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 175,
    }
    render(){
        const tabs = [
            { title: '首页' },
            { title: '农业' },
            { title: '食品、饮料' },
            { title: '纺织、皮革' },
            { title: '5th Tab' },
            { title: '6th Tab' },
            { title: '7th Tab' },
            { title: '8th Tab' },
            { title: '9th Tab' },
        ];
        return(
            <div >
                <NavBar
                    rightContent={[
                        <Icon key="0" type="search" />,
                    ]}
                >首页</NavBar>
                <Tabs
                    animated={false}
                    tabs={tabs}
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarBackgroundColor=''
                    tabBarUnderlineStyle={{ 'border': 'none' }}
                    usePaged={false}
                    swipeable={false}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                >
                    <div style={{paddingBottom: '95px' }}>
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
                                        src={`http://buyshowimg.oss-cn-qingdao.aliyuncs.com/20180331%2F24cb7ebe41ceccbbbf74e090183e93dc.jpg`}
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
                        <HomeListContent />
                    </div>
                </Tabs>
                <FootBar />
            </div>
        ) 
    }
}

export default Home;